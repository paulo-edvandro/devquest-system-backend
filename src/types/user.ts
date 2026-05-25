export interface UserResponse {
  id: string;
  email: string;
  displayName: string;
  xp: number;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileDto {
  displayName?: string;
}

export interface UserProgressResponse {
  totalXP: number;
  level: number;
  xpInCurrentLevel: number;
  xpForNextLevel: number;
  completedModules: number;
  totalModules: number;
  moduleProgress: Array<{
    moduleId: string;
    moduleTitle: string;
    moduleSlug: string;
    completed: boolean;
    score: number;
    gainedXP: number;
    attempts: number;
  }>;
}

export interface XPHistoryResponse {
  transactions: Array<{
    id: string;
    amount: number;
    reason: string;
    moduleTitle?: string;
    createdAt: Date;
  }>;
}