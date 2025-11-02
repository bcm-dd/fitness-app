'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Play, Pause, Maximize2, AlertTriangle, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const exerciseHistory = [
  { date: 'Oct 15', weight: 70 },
  { date: 'Oct 18', weight: 72.5 },
  { date: 'Oct 22', weight: 75 },
  { date: 'Oct 25', weight: 75 },
  { date: 'Oct 29', weight: 77.5 },
  { date: 'Nov 1', weight: 80 },
];

export default function ExerciseDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Setup' | 'Execution' | 'Mistakes'>('Setup');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [notes, setNotes] = useState('');

  const setupSteps = [
    'Position barbell at upper chest height on rack',
    'Step under bar, place on upper traps (not neck)',
    'Grip bar slightly wider than shoulder width',
    'Unrack and step back 2-3 steps',
  ];

  const executionSteps = [
    { step: 'Unrack & step back 2-3 steps', breathing: null },
    { step: 'Feet shoulder width, toes slightly out', breathing: null },
    { step: 'Breathe in, brace core', breathing: '↓' },
    { step: 'Descend: hips back, knees track over toes', breathing: null },
    { step: 'Depth: hip crease below knee', breathing: null },
    { step: 'Drive through heels to stand', breathing: '↑' },
  ];

  const commonMistakes = [
    {
      mistake: 'Knees caving inward',
      fix: 'Push knees out, align with toes',
      severity: 'high',
    },
    {
      mistake: 'Forward lean / back rounding',
      fix: 'Keep chest up, core tight',
      severity: 'high',
    },
    {
      mistake: 'Not reaching depth',
      fix: 'Hip crease must pass knee',
      severity: 'medium',
    },
  ];

  const alternatives = [
    { name: 'Front Squat', difficulty: 'Advanced', reason: 'More quad emphasis' },
    { name: 'Goblet Squat', difficulty: 'Beginner', reason: 'Learn movement pattern' },
    { name: 'Leg Press', difficulty: 'Beginner', reason: 'Joint-friendly alternative' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 sticky top-0 bg-black/95 backdrop-blur-xl z-10 border-b border-gray-800">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 hover:bg-gray-800 rounded-full"
        >
          <Star className={`w-6 h-6 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
        </button>
      </div>

      {/* Exercise Name */}
      <div className="px-6 mb-6">
        <h1 className="text-3xl font-bold mb-3">Barbell Back Squat</h1>
        <div className="flex flex-wrap gap-2">
          {['Quads', 'Glutes', 'Core'].map((muscle) => (
            <span key={muscle} className="px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-sm font-semibold">
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="px-6 mb-6">
        <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🏋️</div>
              <div className="text-gray-400 mb-4">Form Video</div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          {/* Page Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {['Front', 'Side', 'Detail'].map((angle, i) => (
              <div
                key={i}
                className={`px-3 py-1 rounded-full text-xs ${
                  i === 0 ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {angle}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-xs text-gray-400 mb-1">Difficulty</div>
            <div className="font-semibold text-sm">Intermediate</div>
          </div>
          <div className="flex-1 bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-xs text-gray-400 mb-1">Equipment</div>
            <div className="font-semibold text-sm">Barbell, Rack</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-4 border-b border-gray-800">
          {(['Setup', 'Execution', 'Mistakes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 relative font-semibold transition-colors ${
                activeTab === tab ? 'text-white' : 'text-gray-400'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 mb-8">
        <AnimatePresence mode="wait">
          {activeTab === 'Setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {setupSteps.map((step, i) => (
                <div key={i} className="flex gap-4 bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p>{step}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'Execution' && (
            <motion.div
              key="execution"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {executionSteps.map((item, i) => (
                <div key={i} className="flex gap-4 bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p>{item.step}</p>
                  </div>
                  {item.breathing && (
                    <div className="flex-shrink-0 text-2xl">{item.breathing}</div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'Mistakes' && (
            <motion.div
              key="mistakes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {commonMistakes.map((item, i) => (
                <div
                  key={i}
                  className={`bg-gray-900 rounded-xl p-4 border-2 ${
                    item.severity === 'high' ? 'border-red-500/30' : 'border-yellow-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle
                      className={`w-5 h-5 ${
                        item.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{item.mistake}</div>
                    </div>
                  </div>
                  <div className="pl-8">
                    <div className="text-sm text-gray-400">
                      <span className="text-green-500 font-semibold">→</span> {item.fix}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* History Chart */}
      <div className="px-6 mb-8">
        <h3 className="font-bold mb-4">Your History with This Exercise</h3>
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-xs text-gray-400 mb-1">Working Weight</div>
              <div className="font-bold text-lg">80kg</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Estimated 1RM</div>
              <div className="font-bold text-lg">105kg</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Total Volume</div>
              <div className="font-bold text-lg">12.4t</div>
            </div>
          </div>

          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={exerciseHistory}>
                <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="url(#gradient)"
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
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
        </div>
      </div>

      {/* Alternative Exercises */}
      <div className="px-6 mb-8">
        <h3 className="font-bold mb-4">Alternative Exercises</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {alternatives.map((alt, i) => (
            <div key={i} className="min-w-[200px] bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="w-full aspect-video bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                <div className="text-3xl">🏋️</div>
              </div>
              <div className="font-semibold mb-1">{alt.name}</div>
              <div className="text-xs text-gray-400 mb-2">{alt.difficulty}</div>
              <div className="text-xs text-gray-500">{alt.reason}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="px-6 mb-8">
        <h3 className="font-bold mb-4">Personal Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your form cues, tips, or reminders..."
          className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 min-h-[100px] resize-none focus:outline-none focus:border-purple-500 transition-colors"
        />
        {notes && (
          <div className="mt-3 bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-xs text-gray-400 mb-1">3 sessions ago:</div>
            <div className="text-sm">Remember to keep elbows down</div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 p-6">
        <div className="space-y-3">
          <button className="w-full bg-gradient py-4 rounded-2xl font-bold shadow-glow">
            Add to Next Workout
          </button>
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
              Watch Tutorial
            </button>
            <button className="flex-1 bg-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
