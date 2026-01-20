import prisma from '@/lib/db';
import { CreateStudySessionInput } from '@/types/study-session';


export const studySessionsDb = {
  async getAll(userId: string, limit?: number) {
    return await prisma.studySession.findMany({
      where: { userId },
      include: {
        subject: true,
      },
      orderBy: { date: 'desc' },
      take: limit,
    });
  },

  async getByDateRange(userId: string, startDate: Date, endDate: Date) {
    return await prisma.studySession.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        subject: true,
      },
      orderBy: { date: 'desc' },
    });
  },

  async create(userId: string, data: CreateStudySessionInput) {
    return await prisma.studySession.create({
      data: {
        ...data,
        userId,
        date: data.date || new Date(),
      },
    });
  },

  async delete(id: string, userId: string) {
    return await prisma.studySession.delete({
      where: { id, userId },
    });
  },

  async getStats(userId: string, startDate: Date, endDate: Date) {
    const sessions = await this.getByDateRange(userId, startDate, endDate);

    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

    const subjectMap = new Map<string, number>();
    sessions.forEach((session) => {
      const existing = subjectMap.get(session.subjectId) || 0;
      subjectMap.set(session.subjectId, existing + session.duration);
    });

    const subjectBreakdown = Array.from(subjectMap.entries()).map(
      ([subjectId, minutes]) => ({
        subjectId,
        subjectName: sessions.find((s) => s.subjectId === subjectId)?.subject
          .name || '',
        hours: Math.round((minutes / 60) * 10) / 10,
      })
    );

    return {
      totalHours,
      sessionsCount: sessions.length,
      averageSessionDuration: sessions.length
        ? Math.round(totalMinutes / sessions.length)
        : 0,
      subjectBreakdown,
    };
  },
};