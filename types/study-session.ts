export interface StudySession {
  id: string;
  date: Date;
  duration: number;
  notes?: string;
  subjectId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStudySessionInput {
  duration: number;
  notes?: string;
  subjectId: string;
  date?: Date;
}

export interface StudyStats {
  totalHours: number;
  sessionsCount: number;
  averageSessionDuration: number;
  subjectBreakdown: {
    subjectId: string;
    subjectName: string;
    hours: number;
  }[];
}