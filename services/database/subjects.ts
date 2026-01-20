import prisma from '@/lib/db';
import type { CreateSubjectInput, UpdateSubjectInput } from '@/types/subject';

export const subjectsDb = {
  async getAll(userId: string) {
    return await prisma.subject.findMany({
      where: { userId },
      include: {
        topics: true,
        _count: {
          select: {
            studySessions: true,
            tasks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(id: string, userId: string) {
    return await prisma.subject.findFirst({
      where: { id, userId },
      include: {
        topics: true,
        studySessions: {
          orderBy: { date: 'desc' },
          take: 10,
        },
        tasks: {
          where: { completed: false },
        },
      },
    });
  },

  async create(userId: string, data: CreateSubjectInput) {
    return await prisma.subject.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async update(data: UpdateSubjectInput, userId: string) {
    const { id, ...updateData } = data;
    return await prisma.subject.update({
      where: { id, userId },
      data: updateData,
    });
  },

  async delete(id: string, userId: string) {
    return await prisma.subject.delete({
      where: { id, userId },
    });
  },

  async createTopic(subjectId: string, name: string, userId: string) {
    const subject = await prisma.subject.findFirst({
      where: { id: subjectId, userId },
    });

    if (!subject) throw new Error('Subject not found');

    return await prisma.topic.create({
      data: {
        name,
        subjectId,
      },
    });
  },

  async updateTopicProgress(topicId: string, progress: number, userId: string) {
    const topic = await prisma.topic.findFirst({
      where: {
        id: topicId,
        subject: { userId },
      },
    });

    if (!topic) throw new Error('Topic not found');

    return await prisma.topic.update({
      where: { id: topicId },
      data: { progress },
    });
  },
};