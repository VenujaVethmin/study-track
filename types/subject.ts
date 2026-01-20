export interface Subject {
  id: string;
  name: string;
  color: string;
  icon?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Topic {
  id: string;
  name: string;
  progress: number;
  subjectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubjectInput {
  name: string;
  color?: string;
  icon?: string;
}

export interface UpdateSubjectInput extends Partial<CreateSubjectInput> {
  id: string;
}