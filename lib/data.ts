import { Exercise, Workout, WorkoutExercise, Achievement } from '@/types';

export const sampleExercises: Exercise[] = [
  {
    id: 'squat',
    name: 'Barbell Back Squat',
    muscleGroups: ['Quads', 'Glutes', 'Core'],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Rack'],
    thumbnailUrl: '/animations/squat.gif'
  },
  {
    id: 'bench',
    name: 'Barbell Bench Press',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Bench'],
    thumbnailUrl: '/animations/bench.gif'
  },
  {
    id: 'deadlift',
    name: 'Romanian Deadlift',
    muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back'],
    difficulty: 'Intermediate',
    equipment: ['Barbell'],
    thumbnailUrl: '/animations/rdl.gif'
  },
  {
    id: 'row',
    name: 'Barbell Row',
    muscleGroups: ['Back', 'Biceps'],
    difficulty: 'Intermediate',
    equipment: ['Barbell'],
    thumbnailUrl: '/animations/row.gif'
  }
];

export const sampleWorkout: Workout = {
  id: 'leg-day-1',
  name: 'LEG DAY',
  type: 'LEGS',
  exercises: [
    {
      exercise: sampleExercises[0],
      sets: [
        { id: '1', setNumber: 1, reps: 8, weight: 80, completed: false },
        { id: '2', setNumber: 2, reps: 8, weight: 80, completed: false },
        { id: '3', setNumber: 3, reps: 8, weight: 80, completed: false },
        { id: '4', setNumber: 4, reps: 8, weight: 80, completed: false },
      ],
      targetSets: 4,
      targetReps: 8,
      targetWeight: 80,
    },
    {
      exercise: sampleExercises[2],
      sets: [
        { id: '5', setNumber: 1, reps: 10, weight: 60, completed: false },
        { id: '6', setNumber: 2, reps: 10, weight: 60, completed: false },
        { id: '7', setNumber: 3, reps: 10, weight: 60, completed: false },
      ],
      targetSets: 3,
      targetReps: 10,
      targetWeight: 60,
    }
  ],
};

export const achievements: Achievement[] = [
  {
    id: 'first-workout',
    name: 'First Workout',
    description: 'Complete your first workout',
    icon: '🎯',
  },
  {
    id: '7-day-streak',
    name: '7 Day Streak',
    description: 'Train for 7 days in a row',
    icon: '🔥',
  },
  {
    id: '100-workouts',
    name: 'Century Club',
    description: 'Complete 100 workouts',
    icon: '💯',
  },
  {
    id: 'squat-specialist',
    name: 'Squat Specialist',
    description: 'Reach 100kg on squat',
    icon: '🏋️',
  },
];
