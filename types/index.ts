export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string[];
  videoUrl?: string;
  thumbnailUrl?: string;
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
  restTime?: number;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  targetSets: number;
  targetReps: number;
  targetWeight: number;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  type: 'PUSH' | 'PULL' | 'LEGS' | 'FULL BODY' | 'CARDIO';
  exercises: WorkoutExercise[];
  duration?: number;
  totalVolume?: number;
  completedAt?: Date;
  scheduledFor?: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  goal: 'Build Muscle' | 'Get Stronger' | 'Lose Fat';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string[];
  streak: number;
  totalWorkouts: number;
  personalRecords: PersonalRecord[];
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  date: Date;
}

export interface WorkoutStats {
  duration: number;
  totalVolume: number;
  setsCompleted: number;
  targetSets: number;
  personalRecords: PersonalRecord[];
  caloriesBurned?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
  target?: number;
}
