'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { triggerHaptic, formatDuration } from '@/lib/utils';

interface RestTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  defaultDuration?: number;
  exerciseName: string;
  nextSet: number;
  totalSets: number;
}

export function RestTimerModal({
  isOpen,
  onClose,
  onComplete,
  defaultDuration = 90,
  exerciseName,
  nextSet,
  totalSets,
}: RestTimerModalProps) {
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration);

  useEffect(() => {
    setTimeLeft(defaultDuration);
    setSelectedDuration(defaultDuration);
  }, [defaultDuration, isOpen]);

  useEffect(() => {
    if (!isRunning || !isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          triggerHaptic('heavy');
          setIsRunning(false);
          return 0;
        }

        // Haptic feedback at key intervals
        if (prev === 30 || prev === 10) {
          triggerHaptic('medium');
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isOpen]);

  const progress = ((selectedDuration - timeLeft) / selectedDuration) * 100;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const adjustTime = (seconds: number) => {
    setTimeLeft((prev) => Math.max(0, prev + seconds));
    setSelectedDuration((prev) => Math.max(30, prev + seconds));
    triggerHaptic('light');
  };

  const setQuickTime = (seconds: number) => {
    setTimeLeft(seconds);
    setSelectedDuration(seconds);
    setIsRunning(true);
    triggerHaptic('medium');
  };

  const handleStartNext = () => {
    triggerHaptic('medium');
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    triggerHaptic('light');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto"
          >
            <div className="bg-gray-900 rounded-t-3xl p-6 pb-10">
              {/* Pull Handle */}
              <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-6" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-400">Rest Period</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Circular Timer */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <svg className="w-52 h-52 transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="104"
                      cy="104"
                      r="90"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-800"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="104"
                      cy="104"
                      r="90"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold">{formatDuration(timeLeft)}</div>
                    <div className="text-gray-400 text-sm mt-1">recommended rest</div>
                  </div>
                </div>
              </div>

              {/* Quick Time Adjustments */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <button
                  onClick={() => adjustTime(-30)}
                  className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                {[60, 90, 120, 150].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setQuickTime(duration)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedDuration === duration
                        ? 'bg-gradient text-white shadow-glow'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {duration / 60}:{duration % 60 === 0 ? '00' : duration % 60}
                  </button>
                ))}
                <button
                  onClick={() => adjustTime(30)}
                  className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Context Info */}
              <div className="text-center mb-6">
                <div className="text-gray-400 text-sm">Next: Set {nextSet} of {totalSets}</div>
                <div className="font-semibold">{exerciseName}</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={handleStartNext}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-2xl font-bold transition-all ${
                    timeLeft === 0
                      ? 'bg-gradient shadow-glow animate-pulse-slow'
                      : 'bg-gray-800 border-2 border-gray-700'
                  }`}
                >
                  {timeLeft === 0 ? '✓ Start Next Set' : 'Start Next Set'}
                </motion.button>
                <button
                  onClick={handleSkip}
                  className="w-full py-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Skip Rest
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
