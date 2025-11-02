'use client';

import { useState } from 'react';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { motion } from 'framer-motion';
import { TrendingUp, Trophy, Calendar, Dumbbell, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const exerciseData = [
  { date: 'Oct 15', weight: 70 },
  { date: 'Oct 18', weight: 72.5 },
  { date: 'Oct 22', weight: 75 },
  { date: 'Oct 25', weight: 75 },
  { date: 'Oct 29', weight: 77.5 },
  { date: 'Nov 1', weight: 80 },
];

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState<'Week' | 'Month' | '3M' | 'Year' | 'All'>('Month');
  const [selectedExercise, setSelectedExercise] = useState('Barbell Squat');

  const stats = [
    {
      label: 'Total Volume',
      value: '24,580 kg',
      change: '↑ 12% vs last month',
      trend: 'up',
      sparkline: [100, 120, 115, 130, 125, 140, 150],
    },
    {
      label: 'Workouts Completed',
      value: '42',
      change: 'Your best month! 🎉',
      trend: 'neutral',
      sparkline: [30, 32, 35, 38, 40, 41, 42],
    },
    {
      label: 'Personal Records',
      value: '8',
      change: '3 this month',
      trend: 'up',
      sparkline: [5, 5, 6, 6, 7, 7, 8],
    },
    {
      label: 'Consistency',
      value: '85%',
      change: 'of planned workouts',
      trend: 'neutral',
      sparkline: [70, 75, 80, 82, 83, 84, 85],
    },
  ];

  const exerciseLeaderboard = [
    { name: 'Squat', current: '100kg', change: '+5kg', trend: 'up' },
    { name: 'Bench Press', current: '85kg', change: '+2.5kg', trend: 'up' },
    { name: 'Deadlift', current: '140kg', change: '0kg', trend: 'flat' },
    { name: 'Row', current: '70kg', change: '+5kg', trend: 'up' },
  ];

  const timeframes = ['Week', 'Month', '3M', 'Year', 'All'] as const;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-6">Your Progress</h1>

          {/* Timeframe Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  timeframe === tf
                    ? 'bg-gradient shadow-glow text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="px-6 mb-8"
      >
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          {/* Exercise Selector */}
          <div className="mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="font-semibold">{selectedExercise}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={exerciseData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="url(#gradient)"
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            ⭐ PR: 80kg on Nov 1
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
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              className="bg-gray-900 rounded-2xl p-4 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-3">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : stat.trend === 'neutral' ? (
                  <Trophy className="w-4 h-4 text-purple-500" />
                ) : null}
                {/* Mini Sparkline */}
                <div className="flex items-end gap-0.5 h-6">
                  {stat.sparkline.map((val, idx) => {
                    const maxVal = Math.max(...stat.sparkline);
                    const height = (val / maxVal) * 100;
                    return (
                      <div
                        key={idx}
                        className="w-1 bg-gradient rounded-full"
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400 mb-2">{stat.label}</div>
              <div
                className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Calendar Heatmap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="px-6 mb-8"
      >
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Activity</h3>
            <div className="flex items-center gap-2 text-orange-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold">7 day streak 🔥</span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="space-y-1">
            {[...Array(12)].map((_, weekIdx) => (
              <div key={weekIdx} className="flex gap-1">
                {[...Array(7)].map((_, dayIdx) => {
                  const intensity = Math.floor(Math.random() * 5);
                  const colors = [
                    'bg-gray-800',
                    'bg-purple-900/30',
                    'bg-purple-700/50',
                    'bg-purple-600/70',
                    'bg-purple-500',
                  ];
                  return (
                    <div
                      key={dayIdx}
                      className={`w-3 h-3 rounded-sm ${colors[intensity]} hover:ring-2 ring-purple-500 transition-all cursor-pointer`}
                      title={`${intensity} workouts`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
            <span>12 weeks ago</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${
                    ['bg-gray-800', 'bg-purple-900/30', 'bg-purple-700/50', 'bg-purple-600/70', 'bg-purple-500'][i]
                  }`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Exercise Leaderboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="px-6 mb-8"
      >
        <h3 className="font-bold mb-4">Personal Bests</h3>
        <div className="space-y-3">
          {exerciseLeaderboard.map((exercise, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {i < 3 && (
                  <div className="text-2xl">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                  </div>
                )}
                <div>
                  <div className="font-semibold">{exercise.name}</div>
                  <div className="text-sm text-gray-400">{exercise.current}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${
                    exercise.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  {exercise.change}
                </span>
                {exercise.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

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
