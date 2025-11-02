'use client';

import { useState } from 'react';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Smartphone,
  Dumbbell,
  Settings,
  Bell,
  Moon,
  Globe,
  HelpCircle,
  MessageCircle,
  FileText,
  Star,
  LogOut,
  ChevronRight,
  Camera,
} from 'lucide-react';

export default function SettingsPage() {
  const [units, setUnits] = useState<'kg' | 'lbs'>('kg');
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('dark');
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    restDayCheckin: true,
    progressUpdates: true,
    achievements: true,
  });

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-6">
        {title}
      </h3>
      <div className="bg-gray-900 border-y border-gray-800">
        {children}
      </div>
    </div>
  );

  const SettingRow = ({
    icon: Icon,
    label,
    value,
    onClick,
    showArrow = true,
  }: {
    icon: any;
    label: string;
    value?: string;
    onClick?: () => void;
    showArrow?: boolean;
  }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-800/50 transition-colors border-b border-gray-800 last:border-b-0"
    >
      <Icon className="w-5 h-5 text-gray-400" />
      <span className="flex-1 text-left">{label}</span>
      {value && <span className="text-gray-400">{value}</span>}
      {showArrow && <ChevronRight className="w-5 h-5 text-gray-500" />}
    </button>
  );

  const ToggleRow = ({
    icon: Icon,
    label,
    value,
    onChange,
  }: {
    icon: any;
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-800 last:border-b-0">
      <Icon className="w-5 h-5 text-gray-400" />
      <span className="flex-1">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-14 h-8 rounded-full transition-colors ${
          value ? 'bg-gradient' : 'bg-gray-700'
        }`}
      >
        <motion.div
          animate={{ x: value ? 24 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pb-24 bg-black">
      {/* Profile Header */}
      <div className="p-6 pt-12 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center text-3xl">
              💪
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center border-2 border-black">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Damien</h1>
            <p className="text-gray-400">damien@example.com</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800 text-center">
            <div className="text-2xl font-bold">42</div>
            <div className="text-xs text-gray-400">Workouts</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800 text-center">
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-gray-400">Day Streak</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800 text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-gray-400">PRs</div>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <Section title="Account">
        <SettingRow icon={Mail} label="Email" value="damien@example.com" onClick={() => {}} />
        <SettingRow icon={Lock} label="Password" value="••••••••" onClick={() => {}} />
        <SettingRow icon={Smartphone} label="Apple Health" value="Connected" onClick={() => {}} />
        <SettingRow icon={User} label="Subscription" value="Pro Plan" onClick={() => {}} />
      </Section>

      {/* Workout Preferences */}
      <Section title="Workout Preferences">
        <SettingRow icon={Dumbbell} label="Goal" value="Build Muscle" onClick={() => {}} />
        <SettingRow icon={Settings} label="Experience Level" value="Intermediate" onClick={() => {}} />
        <SettingRow icon={Dumbbell} label="Training Days per Week" value="4 days" onClick={() => {}} />
        <SettingRow icon={Settings} label="Available Equipment" onClick={() => {}} />
      </Section>

      {/* Units & Display */}
      <Section title="Units & Display">
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-4 mb-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <span className="flex-1">Weight Unit</span>
          </div>
          <div className="flex gap-2 ml-9">
            {(['kg', 'lbs'] as const).map((unit) => (
              <button
                key={unit}
                onClick={() => setUnits(unit)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  units === unit ? 'bg-gradient' : 'bg-gray-800'
                }`}
              >
                {unit.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-4 mb-3">
            <Moon className="w-5 h-5 text-gray-400" />
            <span className="flex-1">Theme</span>
          </div>
          <div className="flex gap-2 ml-9">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                  theme === t ? 'bg-gradient' : 'bg-gray-800'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <SettingRow icon={Settings} label="Week Starts On" value="Sunday" onClick={() => {}} />
      </Section>

      {/* Notifications */}
      <Section title="Notifications">
        <ToggleRow
          icon={Bell}
          label="Workout Reminders"
          value={notifications.workoutReminders}
          onChange={(v) => setNotifications({ ...notifications, workoutReminders: v })}
        />
        <ToggleRow
          icon={Bell}
          label="Rest Day Check-in"
          value={notifications.restDayCheckin}
          onChange={(v) => setNotifications({ ...notifications, restDayCheckin: v })}
        />
        <ToggleRow
          icon={Bell}
          label="Progress Updates"
          value={notifications.progressUpdates}
          onChange={(v) => setNotifications({ ...notifications, progressUpdates: v })}
        />
        <ToggleRow
          icon={Bell}
          label="Achievement Celebrations"
          value={notifications.achievements}
          onChange={(v) => setNotifications({ ...notifications, achievements: v })}
        />
      </Section>

      {/* Support & About */}
      <Section title="Support & About">
        <SettingRow icon={HelpCircle} label="FAQ / Help Center" onClick={() => {}} />
        <SettingRow icon={MessageCircle} label="Contact Support" onClick={() => {}} />
        <SettingRow icon={FileText} label="Privacy Policy" onClick={() => {}} />
        <SettingRow icon={FileText} label="Terms of Service" onClick={() => {}} />
        <SettingRow icon={Star} label="Rate App" onClick={() => {}} />
        <div className="px-6 py-4 flex items-center gap-4">
          <Settings className="w-5 h-5 text-gray-400" />
          <span className="flex-1 text-gray-500">Version</span>
          <span className="text-gray-500 text-sm">v1.0.2</span>
        </div>
      </Section>

      {/* Danger Zone */}
      <Section title="Danger Zone">
        <button className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-500/10 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
        <button className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-500/10 transition-colors">
          <FileText className="w-5 h-5" />
          <span>Delete Account</span>
        </button>
      </Section>

      <BottomNavigation />
    </div>
  );
}
