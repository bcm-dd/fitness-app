'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Share2,
  TrendingUp,
  CheckCircle2,
  Trophy,
  Flame,
  Star,
} from 'lucide-react';
import { Confetti } from '@/components/ui/Confetti';
import { triggerHaptic } from '@/lib/utils';

export default function WorkoutCompletionPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    triggerHaptic('heavy');
    setTimeout(() => triggerHaptic('heavy'), 100);
    setTimeout(() => triggerHaptic('heavy'), 200);
  }, []);

  const stats = [
    { label: 'Volume Lifted', value: '3,240 kg', change: '↑185kg vs last time', trend: 'up' },
    { label: 'Sets Completed', value: '16/16', change: 'Perfect completion! 🎯', trend: 'neutral' },
    { label: 'Personal Records', value: '2', change: 'Squat, Leg Press', trend: 'up' },
    { label: 'Calories Burned', value: '~380', change: 'Based on estimate', trend: 'neutral' },
  ];

  const exercises = [
    { name: 'Barbell Squat', sets: 4, reps: [8, 8, 8, 8], weight: 80 },
    { name: 'Romanian Deadlift', sets: 3, reps: [10, 10, 10], weight: 60 },
    { name: 'Leg Press', sets: 3, reps: [10, 10, 9], weight: 140 },
    { name: 'Calf Raises', sets: 3, reps: [12, 12, 12], weight: 25 },
  ];

  const insights = [
    { icon: '💡', text: 'Your squat is up 15kg in 4 weeks!' },
    { icon: '🎯', text: "You're 85% consistent this month" },
  ];

  const achievements = [
    { icon: '🔥', name: '7 Day Streak', new: true },
    { icon: '🏋️', name: 'Squat Specialist', new: false },
  ];

  return (
    <div className="min-h-screen pb-24">
      {showConfetti && <Confetti duration={3000} />}

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-16 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-8xl mb-4"
        >
          💪
        </motion.div>
        <h1 className="text-4xl font-bold mb-2">Workout Complete!</h1>
        <p className="text-2xl text-gradient font-semibold">LEG DAY</p>
      </motion.div>

      {/* Duration Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-6 my-8"
      >
        <div className="bg-gradient rounded-3xl p-8 text-center shadow-glow">
          <div className="relative inline-block">
            <svg className="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeDasharray="364"
                strokeDashoffset="0"
                strokeLinecap="round"
                className="transform -rotate-90 origin-center"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="text-4xl font-bold">42:38</div>
                <div className="text-sm opacity-90">Total Time</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-gray-900 rounded-2xl p-4 border border-gray-800"
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {stat.trend === 'neutral' && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400 mb-2">{stat.label}</div>
              <div className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-gray-400'}`}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {achievements.some(a => a.new) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="px-6 mb-8"
        >
          <h3 className="text-lg font-bold mb-4">New Achievements! 🎉</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {achievements.filter(a => a.new).map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1, type: 'spring' }}
                className="min-w-[140px] bg-gradient rounded-2xl p-4 text-center"
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <div className="font-semibold text-sm">{achievement.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="px-6 mb-8"
      >
        <h3 className="text-lg font-bold mb-4">Progress Highlights</h3>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <p className="flex-1 pt-1">{insight.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Exercise Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="px-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Exercises</h3>
          <button className="text-purple-500 text-sm font-semibold">View Details</button>
        </div>
        <div className="space-y-3">
          {exercises.slice(0, 2).map((exercise, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold mb-1">✓ {exercise.name}</div>
                  <div className="text-sm text-gray-400">
                    {exercise.sets} sets • {exercise.reps.join(',')} reps • {exercise.weight}kg
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          ))}
          <button className="w-full text-gray-400 text-sm py-2">+2 more exercises</button>
        </div>
      </motion.div>

      {/* Rate Workout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="px-6 mb-8"
      >
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="font-semibold mb-4 text-center">How did this workout feel?</h3>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  setRating(star);
                  triggerHaptic('light');
                }}
                className="transition-transform active:scale-90"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {['Too Easy', 'Just Right', 'Challenging', 'Too Hard'].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Streak */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="px-6 mb-8"
      >
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-center">
          <Flame className="w-12 h-12 mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">7 days in a row!</div>
          <div className="text-white/90">3 more days to reach 10-day streak</div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 p-6"
      >
        <div className="max-w-lg mx-auto space-y-3">
          <button
            onClick={() => router.push('/home')}
            className="w-full bg-gradient py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-glow"
          >
            Done
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
              View Details
            </button>
            <button className="flex-1 bg-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
