import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, priority, dueDate, userId } = body;

    const task = await prisma.task.create({
      data: {
        userId: userId || 'temp-user', // Replace with actual user ID from auth
        title,
        description: description || null,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

// Get all tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'temp-user'; // Replace with actual user ID
    const completed = searchParams.get('completed');

    const where: any = { userId };
    if (completed !== null) {
      where.completed = completed === 'true';
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
