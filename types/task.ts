export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  subjectId?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  subjectId?: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
  completed?: boolean;
}