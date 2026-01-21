import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'temp-user';

    // Get date range for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's completed sessions
    const todaySessions = await prisma.studySession.findMany({
      where: {
        userId,
        completed: true,
        startTime: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        focusChecks: true,
      },
    });

    // Calculate total study time
    const totalTime = todaySessions.reduce((sum, session) => {
      return sum + (session.duration || 0);
    }, 0);

    // Calculate average focus score
    let totalFocusScore = 0;
    let focusCheckCount = 0;

    todaySessions.forEach(session => {
      session.focusChecks.forEach(check => {
        focusCheckCount++;
        totalFocusScore += check.wasFocused ? 100 : 0;
      });
    });

    const avgFocusScore = focusCheckCount > 0 ? Math.round(totalFocusScore / focusCheckCount) : 0;

    // Get completed tasks today
    const completedTasks = await prisma.task.count({
      where: {
        userId,
        completed: true,
        completedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Calculate streak
    const streak = await calculateStreak(userId);

    return NextResponse.json({
      totalTime,
      sessionsCount: todaySessions.length,
      avgFocusScore,
      completedTasks,
      streak,
    });
  } catch (error) {
    console.error('Error fetching today stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

async function calculateStreak(userId: string): Promise<number> {
  const sessions = await prisma.studySession.findMany({
    where: {
      userId,
      completed: true,
    },
    orderBy: { startTime: 'desc' },
    take: 100,
  });

  if (sessions.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < 30; i++) {
    const dayStart = new Date(currentDate);
    const dayEnd = new Date(currentDate);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const hasSession = sessions.some(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate >= dayStart && sessionDate < dayEnd;
    });

    if (hasSession) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (i > 0) {
      break;
    } else {
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }

  return streak;
}
