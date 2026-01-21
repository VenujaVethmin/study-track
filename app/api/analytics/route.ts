import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'temp-user';
    const range = searchParams.get('range') || 'week'; // week, month, year

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();

    if (range === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (range === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // Get all completed sessions in range
    const sessions = await prisma.studySession.findMany({
      where: {
        userId,
        completed: true,
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        focusChecks: true,
      },
      orderBy: { startTime: 'asc' },
    });

    // Calculate total study time
    const totalTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);

    // Calculate average focus score
    let totalFocusChecks = 0;
    let focusedChecks = 0;

    sessions.forEach(session => {
      session.focusChecks.forEach(check => {
        totalFocusChecks++;
        if (check.wasFocused) focusedChecks++;
      });
    });

    const avgFocusScore = totalFocusChecks > 0 
      ? Math.round((focusedChecks / totalFocusChecks) * 100) 
      : 0;

    // Group by subject
    const subjectMap = new Map<string, {
      duration: number;
      focusScore: number;
      sessionsCount: number;
    }>();

    sessions.forEach(session => {
      const current = subjectMap.get(session.subject) || {
        duration: 0,
        focusScore: 0,
        sessionsCount: 0,
      };

      const sessionFocusChecks = session.focusChecks.length;
      const sessionFocusedChecks = session.focusChecks.filter(c => c.wasFocused).length;
      const sessionFocusScore = sessionFocusChecks > 0
        ? (sessionFocusedChecks / sessionFocusChecks) * 100
        : 0;

      subjectMap.set(session.subject, {
        duration: current.duration + (session.duration || 0),
        focusScore: current.focusScore + sessionFocusScore,
        sessionsCount: current.sessionsCount + 1,
      });
    });

    const subjectStats = Array.from(subjectMap.entries()).map(([subject, data]) => ({
      subject,
      duration: data.duration,
      avgFocusScore: Math.round(data.focusScore / data.sessionsCount),
      sessionsCount: data.sessionsCount,
    })).sort((a, b) => b.duration - a.duration);

    // Group by day for chart data
    const dailyData: { [key: string]: number } = {};
    sessions.forEach(session => {
      const date = new Date(session.startTime).toISOString().split('T')[0];
      dailyData[date] = (dailyData[date] || 0) + (session.duration || 0);
    });

    // Calculate best study times
    const hourlyData: { [key: number]: { duration: number; focusScore: number; count: number } } = {};
    
    sessions.forEach(session => {
      const hour = new Date(session.startTime).getHours();
      if (!hourlyData[hour]) {
        hourlyData[hour] = { duration: 0, focusScore: 0, count: 0 };
      }

      const sessionFocusChecks = session.focusChecks.length;
      const sessionFocusedChecks = session.focusChecks.filter(c => c.wasFocused).length;
      const sessionFocusScore = sessionFocusChecks > 0
        ? (sessionFocusedChecks / sessionFocusChecks) * 100
        : 0;

      hourlyData[hour].duration += session.duration || 0;
      hourlyData[hour].focusScore += sessionFocusScore;
      hourlyData[hour].count += 1;
    });

    const bestStudyTimes = Object.entries(hourlyData)
      .map(([hour, data]) => ({
        hour: parseInt(hour),
        avgFocusScore: Math.round(data.focusScore / data.count),
        totalDuration: data.duration,
      }))
      .sort((a, b) => b.avgFocusScore - a.avgFocusScore)
      .slice(0, 3);

    return NextResponse.json({
      totalTime,
      sessionsCount: sessions.length,
      avgFocusScore,
      subjectStats,
      dailyData,
      bestStudyTimes,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
