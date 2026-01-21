import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Create a focus check
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId, wasFocused, timestamp } = body;

    const focusCheck = await prisma.focusCheck.create({
      data: {
        session: {
          connect: { id: sessionId }
        },
        user: {
          connect: { id: userId || 'temp-user' }
        },
        wasFocused,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
    });

    return NextResponse.json(focusCheck, { status: 201 });
  } catch (error) {
    console.error('Error creating focus check:', error);
    return NextResponse.json({ error: 'Failed to create focus check' }, { status: 500 });
  }
}

// Get focus checks for a session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const focusChecks = await prisma.focusCheck.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    });

    return NextResponse.json(focusChecks);
  } catch (error) {
    console.error('Error fetching focus checks:', error);
    return NextResponse.json({ error: 'Failed to fetch focus checks' }, { status: 500 });
  }
}
