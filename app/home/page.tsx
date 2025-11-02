'use client';

import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { sampleWorkout } from '@/lib/data';
import { getGreeting, formatDate } from '@/lib/utils';
import { ArrowRight, Flame, TrendingUp, Trophy, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const greeting = getGreeting();
  const today = formatDate(new Date());

  const stats = [
    { label: 'Total Volume', value: '2,450 kg', subtitle: 'this week', trend: '+12%', Icon: TrendingUp },
    { label: 'Workouts', value: '12', subtitle: 'this month', trend: '+3', Icon: Dumbbell },
    { label: 'Personal Bests', value: '3', subtitle: 'new PRs', Icon: Trophy },
  ];

  const recentActivity = [
    { text: 'Bench Press: +2.5kg', emoji: '💪', time: '2 days ago' },
    { text: 'Completed Push Day', emoji: '✓', time: '38 minutes' },
    { text: 'New PR: Squat 100kg', emoji: '🏆', time: '3 days ago' },
  ];

  const upcomingWorkouts = [
    { day: 'Tomorrow', name: 'PUSH DAY', color: 'from-blue-500 to-cyan-500' },
    { day: 'Tuesday', name: 'PULL DAY', color: 'from-green-500 to-emerald-500' },
    { day: 'Thursday', name: 'LEG DAY', color: 'from-red-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-2">
            {greeting}, <span className="text-gradient">Damien</span>
          </h1>
          <div className="flex items-center gap-3 text-gray-400">
            <span>{today}</span>
            <div className="flex items-center gap-1 text-orange-500">
              <Flame className="w-5 h-5" />
              <span className="font-semibold">7 day streak</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Today's Workout Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mx-6 mb-6"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient p-6 shadow-glow">
          <div className="relative z-10">
            <div className="text-sm font-semibold text-white/80 mb-2">TODAY'S WORKOUT</div>
            <h2 className="text-4xl font-bold mb-3">{sampleWorkout.name}</h2>
            <p className="text-white/90 mb-4">
              {sampleWorkout.exercises.length} exercises • ~35 minutes
            </p>
            <div className="flex gap-2 mb-6">
              {sampleWorkout.exercises.slice(0, 4).map((ex, i) => (
                <div key={i} className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6" />
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/workout')}
              className="w-full bg-white text-purple-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
            >
              START WORKOUT
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-white/70 text-sm mt-3 text-center">Last completed: 3 days ago</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              className="min-w-[160px] bg-gray-900 rounded-2xl p-4 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.Icon className="w-5 h-5 text-purple-500" />
                <span className="text-green-500 text-sm font-semibold">{stat.trend}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.subtitle}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Recent Progress */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Recent Progress</h3>
            <button className="text-purple-500 text-sm font-semibold">See all</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                className="bg-gray-900 rounded-xl p-4 border border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{activity.emoji}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{activity.text}</div>
                    <div className="text-gray-400 text-sm">{activity.time}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Workouts */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-4">Upcoming Workouts</h3>
          <div className="space-y-3">
            {upcomingWorkouts.map((workout, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-gray-400 text-sm mb-1">{workout.day}</div>
                  <div className="font-bold">{workout.name}</div>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${workout.color}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNavigation />

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
