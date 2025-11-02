'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { triggerHaptic } from '@/lib/utils';

type Goal = 'Build Muscle' | 'Get Stronger' | 'Lose Fat';
type Experience = 'Beginner' | 'Intermediate' | 'Advanced';

const equipmentOptions = [
  { id: 'barbell', name: 'Barbell', icon: '🏋️' },
  { id: 'dumbbells', name: 'Dumbbells', icon: '💪' },
  { id: 'machines', name: 'Machines', icon: '⚙️' },
  { id: 'cables', name: 'Cables', icon: '🔗' },
  { id: 'kettlebells', name: 'Kettlebells', icon: '⚖️' },
  { id: 'bands', name: 'Resistance Bands', icon: '🎀' },
  { id: 'pullup', name: 'Pull-up Bar', icon: '🚪' },
  { id: 'bodyweight', name: 'Bodyweight Only', icon: '🧘' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [experience, setExperience] = useState<Experience>('Intermediate');
  const [equipment, setEquipment] = useState<string[]>(['barbell', 'dumbbells', 'pullup']);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    triggerHaptic('medium');
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    triggerHaptic('light');
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    triggerHaptic('heavy');

    // Simulate profile creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    router.push('/home');
  };

  const toggleEquipment = (id: string) => {
    triggerHaptic('light');
    setEquipment(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const goals: { value: Goal; emoji: string; subtitle: string; description: string }[] = [
    {
      value: 'Build Muscle',
      emoji: '💪',
      subtitle: 'Hypertrophy-focused training',
      description: '8-12 reps, moderate intensity',
    },
    {
      value: 'Get Stronger',
      emoji: '🏋️',
      subtitle: 'Strength training programs',
      description: '3-6 reps, high intensity',
    },
    {
      value: 'Lose Fat',
      emoji: '🔥',
      subtitle: 'Circuit training & conditioning',
      description: '12-15 reps, shorter rest times',
    },
  ];

  const experiences: { value: Experience; description: string }[] = [
    { value: 'Beginner', description: 'New to lifting or returning after break' },
    { value: 'Intermediate', description: '6+ months consistent training' },
    { value: 'Advanced', description: '2+ years, comfortable with all lifts' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 py-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === step
                ? 'w-8 bg-gradient'
                : i < step
                ? 'w-2 bg-purple-500'
                : 'w-2 bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Skip Button */}
      {!isLoading && (
        <div className="absolute top-6 right-6">
          <button
            onClick={() => router.push('/home')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Skip for now
          </button>
        </div>
      )}

      {/* Back Button */}
      {step > 1 && !isLoading && (
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pb-32">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-6 animate-pulse">💪</div>
              <div className="space-y-2 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0 }}
                  className="text-gray-400"
                >
                  Analyzing your profile...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400"
                >
                  Generating your first workout...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-gray-400"
                >
                  Personalizing exercises...
                </motion.div>
              </div>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-center mb-12">
                <div className="text-6xl mb-4">🎯</div>
                <h1 className="text-3xl font-bold mb-3">What brings you here?</h1>
                <p className="text-gray-400">This helps us personalize your workouts</p>
              </div>

              <div className="space-y-4 flex-1">
                {goals.map((g) => (
                  <motion.button
                    key={g.value}
                    onClick={() => {
                      setGoal(g.value);
                      triggerHaptic('medium');
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-2xl border-2 transition-all ${
                      goal === g.value
                        ? 'border-purple-500 bg-purple-500/10 shadow-glow'
                        : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{g.emoji}</div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-lg mb-1">{g.value}</div>
                        <div className="text-gray-400 text-sm mb-1">{g.subtitle}</div>
                        <div className="text-gray-500 text-sm">{g.description}</div>
                      </div>
                      {goal === g.value && (
                        <Check className="w-6 h-6 text-purple-500" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-center mb-12">
                <div className="text-6xl mb-4">📊</div>
                <h1 className="text-3xl font-bold mb-3">How experienced are you?</h1>
                <p className="text-gray-400">We'll adjust starting weights accordingly</p>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                {/* Slider */}
                <div className="mb-12">
                  <div className="flex justify-between mb-8">
                    {experiences.map((exp) => (
                      <button
                        key={exp.value}
                        onClick={() => {
                          setExperience(exp.value);
                          triggerHaptic('medium');
                        }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                            experience === exp.value
                              ? 'bg-gradient shadow-glow scale-110'
                              : 'bg-gray-800'
                          }`}
                        >
                          <span className="text-2xl">
                            {exp.value === 'Beginner'
                              ? '🌱'
                              : exp.value === 'Intermediate'
                              ? '💪'
                              : '🏆'}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            experience === exp.value ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {exp.value}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="bg-gray-900 rounded-2xl p-6 text-center border border-gray-800">
                    <p className="text-gray-300">
                      {experiences.find(e => e.value === experience)?.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏋️</div>
                <h1 className="text-3xl font-bold mb-3">What equipment do you have?</h1>
                <p className="text-gray-400">Select all that apply</p>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1 content-start">
                {equipmentOptions.map((eq) => (
                  <motion.button
                    key={eq.id}
                    onClick={() => toggleEquipment(eq.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      equipment.includes(eq.id)
                        ? 'border-purple-500 bg-gradient shadow-glow'
                        : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                    }`}
                  >
                    <div className="text-4xl mb-2">{eq.icon}</div>
                    <div className="font-semibold text-sm">{eq.name}</div>
                    {equipment.includes(eq.id) && (
                      <Check className="w-5 h-5 text-white mt-2 mx-auto" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      {!isLoading && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 p-6">
          <button
            onClick={handleNext}
            disabled={step === 1 && !goal}
            className={`w-full py-4 rounded-2xl font-bold transition-all ${
              step === 1 && !goal
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : step === 3
                ? 'bg-gradient shadow-glow'
                : 'bg-gradient'
            }`}
          >
            {step === 3 ? "Let's Get Started! 🎉" : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
