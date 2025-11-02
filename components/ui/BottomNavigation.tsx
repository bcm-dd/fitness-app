'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, TrendingUp, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: TrendingUp, label: 'Progress', path: '/progress' },
  { icon: Calendar, label: 'History', path: '/history' },
  { icon: User, label: 'Profile', path: '/settings' },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 safe-area-pb">
      <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-4">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-purple-500' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
