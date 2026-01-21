import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const session = await prisma.studySession.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error updating study session:', error);
    return NextResponse.json({ error: 'Failed to update study session' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.studySession.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Study session deleted' });
  } catch (error) {
    console.error('Error deleting study session:', error);
    return NextResponse.json({ error: 'Failed to delete study session' }, { status: 500 });
  }
}
