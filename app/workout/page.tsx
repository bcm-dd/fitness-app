'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RestTimerModal } from '@/components/workout/RestTimerModal';
import { sampleWorkout } from '@/lib/data';
import { WorkoutSet } from '@/types';
import { triggerHaptic } from '@/lib/utils';

export default function WorkoutPage() {
  const router = useRouter();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sets, setSets] = useState<WorkoutSet[]>(
    sampleWorkout.exercises[0].sets.map(s => ({ ...s }))
  );
  const [weight, setWeight] = useState(sampleWorkout.exercises[0].targetWeight);
  const [reps, setReps] = useState(sampleWorkout.exercises[0].targetReps);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [activeSet, setActiveSet] = useState<number | null>(null);

  const currentExercise = sampleWorkout.exercises[currentExerciseIndex];
  const completedSets = sets.filter(s => s.completed).length;
  const allSetsComplete = completedSets === sets.length;

  const handleSetComplete = (setIndex: number) => {
    triggerHaptic('medium');
    const newSets = [...sets];
    newSets[setIndex] = {
      ...newSets[setIndex],
      completed: true,
      weight,
      reps,
    };
    setSets(newSets);

    // Show rest timer if not last set
    if (setIndex < sets.length - 1) {
      setActiveSet(setIndex + 1);
      setShowRestTimer(true);
    } else if (currentExerciseIndex < sampleWorkout.exercises.length - 1) {
      // Move to next exercise
      setTimeout(() => {
        handleNextExercise();
      }, 1000);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < sampleWorkout.exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      const nextExercise = sampleWorkout.exercises[nextIndex];
      setCurrentExerciseIndex(nextIndex);
      setSets(nextExercise.sets.map(s => ({ ...s })));
      setWeight(nextExercise.targetWeight);
      setReps(nextExercise.targetReps);
      setActiveSet(null);
      triggerHaptic('medium');
    } else {
      // Workout complete
      router.push('/completion');
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      const prevIndex = currentExerciseIndex - 1;
      const prevExercise = sampleWorkout.exercises[prevIndex];
      setCurrentExerciseIndex(prevIndex);
      setSets(prevExercise.sets.map(s => ({ ...s })));
      setWeight(prevExercise.targetWeight);
      setReps(prevExercise.targetReps);
      setActiveSet(null);
      triggerHaptic('light');
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Exercise Navigation */}
      <div className="flex items-center justify-between px-6 mb-6">
        <button
          onClick={handlePreviousExercise}
          disabled={currentExerciseIndex === 0}
          className="p-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center flex-1">
          <div className="text-sm text-gray-400 mb-1">
            Exercise {currentExerciseIndex + 1} of {sampleWorkout.exercises.length}
          </div>
        </div>
        <button
          onClick={handleNextExercise}
          disabled={currentExerciseIndex === sampleWorkout.exercises.length - 1}
          className="p-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Exercise Name */}
      <motion.div
        key={currentExerciseIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">{currentExercise.exercise.name}</h1>
      </motion.div>

      {/* Form Animation Placeholder */}
      <motion.div
        key={`animation-${currentExerciseIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mx-6 mb-6"
      >
        <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800">
          <div className="text-center">
            <div className="text-6xl mb-2">🏋️</div>
            <div className="text-gray-400">Form Animation</div>
          </div>
        </div>
      </motion.div>

      {/* Target Display */}
      <div className="px-6 mb-8">
        <div className="text-center text-gray-400 font-medium">
          SET {completedSets + 1} OF {sets.length} • {reps} REPS @ {weight} KG
        </div>
      </div>

      {/* Set Circles */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-center gap-4">
          {sets.map((set, index) => (
            <motion.button
              key={set.id}
              onClick={() => !set.completed && handleSetComplete(index)}
              disabled={set.completed}
              whileTap={{ scale: 0.95 }}
              className={`relative w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                set.completed
                  ? 'bg-gradient shadow-glow'
                  : activeSet === index
                  ? 'border-4 border-purple-500 animate-pulse-slow'
                  : 'border-2 border-gray-700'
              }`}
            >
              {set.completed ? (
                <Check className="w-8 h-8" />
              ) : (
                <span>{set.setNumber}</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Weight & Rep Controls */}
      <div className="px-6 space-y-6">
        {/* Weight Control */}
        <div>
          <div className="text-sm text-gray-400 mb-2 text-center">WEIGHT</div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setWeight(Math.max(0, weight - 2.5));
                triggerHaptic('light');
              }}
              className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors active:scale-95"
            >
              <span className="text-2xl">−</span>
            </button>
            <div className="min-w-[120px] text-center">
              <div className="text-4xl font-bold">{weight}</div>
              <div className="text-gray-400">kg</div>
            </div>
            <button
              onClick={() => {
                setWeight(weight + 2.5);
                triggerHaptic('light');
              }}
              className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors active:scale-95"
            >
              <span className="text-2xl">+</span>
            </button>
          </div>
        </div>

        {/* Reps Control */}
        <div>
          <div className="text-sm text-gray-400 mb-2 text-center">REPS</div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setReps(Math.max(1, reps - 1));
                triggerHaptic('light');
              }}
              className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors active:scale-95"
            >
              <span className="text-2xl">−</span>
            </button>
            <div className="min-w-[120px] text-center">
              <div className="text-4xl font-bold">{reps}</div>
              <div className="text-gray-400">reps</div>
            </div>
            <button
              onClick={() => {
                setReps(reps + 1);
                triggerHaptic('light');
              }}
              className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors active:scale-95"
            >
              <span className="text-2xl">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Next Exercise Button */}
      {allSetsComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-6 right-6"
        >
          <button
            onClick={handleNextExercise}
            className="w-full bg-gradient py-5 rounded-2xl font-bold text-lg shadow-glow"
          >
            {currentExerciseIndex < sampleWorkout.exercises.length - 1
              ? 'Next Exercise'
              : 'Complete Workout'}
          </button>
        </motion.div>
      )}

      {/* Rest Timer Modal */}
      <RestTimerModal
        isOpen={showRestTimer}
        onClose={() => setShowRestTimer(false)}
        onComplete={() => setShowRestTimer(false)}
        exerciseName={currentExercise.exercise.name}
        nextSet={activeSet || 1}
        totalSets={sets.length}
      />
    </div>
  );
}
