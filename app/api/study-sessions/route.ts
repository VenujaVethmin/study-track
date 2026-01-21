import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Create a new study session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, topic, startTime, endTime, duration, studyMinutes, breakMinutes, focusScore, userId } = body;

    const session = await prisma.studySession.create({
      data: {
        userId: userId || 'temp-user', // Replace with actual user ID from auth
        subject,
        topic: topic || null,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        duration: duration || null,
        studyMinutes: studyMinutes || 25,
        breakMinutes: breakMinutes || 5,
        completed: !!endTime,
      },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error('Error creating study session:', error);
    return NextResponse.json({ error: 'Failed to create study session' }, { status: 500 });
  }
}

// Get all study sessions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'temp-user'; // Replace with actual user ID
    const limit = parseInt(searchParams.get('limit') || '50');

    const sessions = await prisma.studySession.findMany({
      where: { userId },
      orderBy: { startTime: 'desc' },
      take: limit,
      include: {
        focusChecks: true,
      },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching study sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch study sessions' }, { status: 500 });
  }
}
