import prisma from '@/lib/db';
import type { CreateTaskInput, UpdateTaskInput } from '@/types/task';

export const tasksDb = {
  async getAll(userId: string) {
    return await prisma.task.findMany({
      where: { userId },
      include: {
        subject: true,
      },
      orderBy: [
        { completed: 'asc' },
        { dueDate: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  },

  async getBySubject(subjectId: string, userId: string) {
    return await prisma.task.findMany({
      where: { subjectId, userId },
      include: {
        subject: true,
      },
      orderBy: [
        { completed: 'asc' },
        { dueDate: 'asc' },
      ],
    });
  },

  async getUpcoming(userId: string) {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return await prisma.task.findMany({
      where: {
        userId,
        completed: false,
        dueDate: {
          gte: today,
          lte: nextWeek,
        },
      },
      include: {
        subject: true,
      },
      orderBy: { dueDate: 'asc' },
    });
  },

  async create(userId: string, data: CreateTaskInput) {
    return await prisma.task.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async update(data: UpdateTaskInput, userId: string) {
    const { id, ...updateData } = data;
    return await prisma.task.update({
      where: { id, userId },
      data: updateData,
    });
  },

  async toggleComplete(id: string, userId: string) {
    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) throw new Error('Task not found');

    return await prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });
  },

  async delete(id: string, userId: string) {
    return await prisma.task.delete({
      where: { id, userId },
    });
  },
};