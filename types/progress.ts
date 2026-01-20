import { StudyStats } from "./study-session";


export interface Streak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressData {
  streak: Streak;
  weeklyStats: StudyStats;
  monthlyStats: StudyStats;
}