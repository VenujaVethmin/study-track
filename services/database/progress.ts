import prisma from '@/lib/db';
import { studySessionsDb } from './study-sessions';

export const progressDb = {
  async getOrCreateStreak(userId: string) {
    let streak = await prisma.streak.findUnique({
      where: { userId },
    });

    if (!streak) {
      streak = await prisma.streak.create({
        data: { userId },
      });
    }

    return streak;
  },

  async updateStreak(userId: string) {
    const streak = await this.getOrCreateStreak(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastStudy = streak.lastStudyDate ? new Date(streak.lastStudyDate) : null;
    
    if (lastStudy) {
      lastStudy.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor(
        (today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 0) {
        return streak;
      } else if (daysDiff === 1) {
        const newCurrent = streak.currentStreak + 1;
        return await prisma.streak.update({
          where: { userId },
          data: {
            currentStreak: newCurrent,
            longestStreak: Math.max(newCurrent, streak.longestStreak),
            lastStudyDate: new Date(),
          },
        });
      } else {
        return await prisma.streak.update({
          where: { userId },
          data: {
            currentStreak: 1,
            lastStudyDate: new Date(),
          },
        });
      }
    } else {
      return await prisma.streak.update({
        where: { userId },
        data: {
          currentStreak: 1,
          lastStudyDate: new Date(),
        },
      });
    }
  },

  async getWeeklyProgress(userId: string) {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return await studySessionsDb.getStats(userId, weekAgo, today);
  },

  async getMonthlyProgress(userId: string) {
    const today = new Date();
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return await studySessionsDb.getStats(userId, monthAgo, today);
  },
};