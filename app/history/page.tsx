'use client';

import { useState } from 'react';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, List, Search, Share2, CheckCircle2, Flame } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

export default function HistoryPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Sample workout data
  const workoutData: Record<string, any> = {
    '2025-11-01': { type: 'LEGS', duration: 42, volume: 3240, exercises: 4 },
    '2025-10-31': { type: 'PUSH', duration: 38, volume: 2950, exercises: 4 },
    '2025-10-29': { type: 'PULL', duration: 40, volume: 3100, exercises: 5 },
    '2025-10-27': { type: 'LEGS', duration: 45, volume: 3400, exercises: 4 },
    '2025-10-25': { type: 'PUSH', duration: 36, volume: 2800, exercises: 4 },
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getWorkoutForDay = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    return workoutData[dateKey];
  };

  const getWorkoutColor = (type: string) => {
    const colors: Record<string, string> = {
      LEGS: 'bg-red-500',
      PUSH: 'bg-blue-500',
      PULL: 'bg-green-500',
      CARDIO: 'bg-orange-500',
    };
    return colors[type] || 'bg-purple-500';
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Calculate month stats
  const monthWorkouts = Object.entries(workoutData).filter(([date]) => {
    const d = new Date(date);
    return d.getMonth() === currentDate.getMonth();
  });

  const monthStats = {
    workouts: monthWorkouts.length,
    totalVolume: monthWorkouts.reduce((sum, [, data]) => sum + data.volume, 0),
    totalTime: monthWorkouts.reduce((sum, [, data]) => sum + data.duration, 0),
  };

  // Get weekday headers
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate padding for first week
  const firstDayOfWeek = monthStart.getDay();
  const paddingDays = Array(firstDayOfWeek).fill(null);

  return (
    <div className="min-h-screen pb-24 bg-black">
      {/* Header */}
      <div className="p-6 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Workout History</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                view === 'calendar' ? 'bg-gradient' : 'bg-gray-800'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                view === 'list' ? 'bg-gradient' : 'bg-gray-800'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Month Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-2xl font-bold">{monthStats.workouts}</div>
            <div className="text-xs text-gray-400">Workouts</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-2xl font-bold">{(monthStats.totalVolume / 1000).toFixed(1)}t</div>
            <div className="text-xs text-gray-400">Volume</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-2xl font-bold">{Math.floor(monthStats.totalTime / 60)}h</div>
            <div className="text-xs text-gray-400">Training</div>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 flex items-center gap-3 mb-6">
          <Flame className="w-8 h-8" />
          <div>
            <div className="text-xl font-bold">7 Day Streak</div>
            <div className="text-sm opacity-90">Keep it up!</div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'calendar' ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6"
          >
            {/* Month Navigator */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePreviousMonth}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 mb-6">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2">
                {paddingDays.map((_, i) => (
                  <div key={`padding-${i}`} className="aspect-square" />
                ))}
                {daysInMonth.map((day) => {
                  const workout = getWorkoutForDay(day);
                  const isSelected = selectedDay && isSameDay(day, selectedDay);
                  const isCurrent = isToday(day);

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDay(day)}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                        isSelected
                          ? 'bg-purple-500 shadow-glow'
                          : workout
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'hover:bg-gray-800/50'
                      } ${isCurrent ? 'ring-2 ring-white' : ''}`}
                    >
                      <span className={`text-sm font-semibold ${isSelected ? 'text-white' : ''}`}>
                        {format(day, 'd')}
                      </span>
                      {workout && !isSelected && (
                        <div className={`w-1.5 h-1.5 rounded-full ${getWorkoutColor(workout.type)} mt-1`} />
                      )}
                      {workout && isSelected && (
                        <CheckCircle2 className="w-3 h-3 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Day Details */}
            <AnimatePresence>
              {selectedDay && getWorkoutForDay(selectedDay) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        {format(selectedDay, 'EEEE, MMMM d')}
                      </div>
                      <div className="text-2xl font-bold">
                        {getWorkoutForDay(selectedDay).type}
                      </div>
                    </div>
                    <div className={`w-16 h-16 rounded-2xl ${getWorkoutColor(getWorkoutForDay(selectedDay).type)}`} />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Duration</div>
                      <div className="font-bold">{getWorkoutForDay(selectedDay).duration} min</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Volume</div>
                      <div className="font-bold">{getWorkoutForDay(selectedDay).volume} kg</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Exercises</div>
                      <div className="font-bold">{getWorkoutForDay(selectedDay).exercises}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient py-3 rounded-xl font-semibold">
                      View Full Workout
                    </button>
                    <button className="px-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-gray-800" />
              <div className="w-3 h-3 rounded-sm bg-red-500/30" />
              <div className="w-3 h-3 rounded-sm bg-red-500/60" />
              <div className="w-3 h-3 rounded-sm bg-red-500" />
              <span>More</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search workouts..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Workout List */}
            <div className="space-y-3">
              {Object.entries(workoutData)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .slice(0, 10)
                .map(([date, workout]) => (
                  <motion.div
                    key={date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl ${getWorkoutColor(workout.type)} flex items-center justify-center font-bold`}>
                      {workout.type.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{workout.type}</div>
                      <div className="text-sm text-gray-400">
                        {format(new Date(date), 'EEE, MMM d')} • {workout.duration} min • {workout.volume} kg
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNavigation />
    </div>
  );
}
