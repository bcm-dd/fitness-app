'use client';

export function SkeletonCard() {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 animate-pulse">
      <div className="h-6 bg-gray-800 rounded w-3/4 mb-4 skeleton" />
      <div className="h-4 bg-gray-800 rounded w-1/2 mb-2 skeleton" />
      <div className="h-4 bg-gray-800 rounded w-2/3 skeleton" />
    </div>
  );
}

export function SkeletonWorkoutCard() {
  return (
    <div className="bg-gradient rounded-3xl p-6 animate-pulse">
      <div className="h-4 bg-white/20 rounded w-1/3 mb-3 skeleton" />
      <div className="h-8 bg-white/30 rounded w-2/3 mb-3 skeleton" />
      <div className="h-4 bg-white/20 rounded w-1/2 mb-6 skeleton" />
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-12 h-12 bg-white/20 rounded-lg skeleton" />
        ))}
      </div>
      <div className="h-12 bg-white/30 rounded-2xl skeleton" />
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="min-w-[160px] bg-gray-900 rounded-2xl p-4 border border-gray-800 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="w-5 h-5 bg-gray-800 rounded skeleton" />
        <div className="w-12 h-5 bg-gray-800 rounded skeleton" />
      </div>
      <div className="h-7 bg-gray-800 rounded w-20 mb-2 skeleton" />
      <div className="h-4 bg-gray-800 rounded w-24 skeleton" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 animate-pulse">
      <div className="h-6 bg-gray-800 rounded w-1/3 mb-6 skeleton" />
      <div className="h-64 bg-gray-800 rounded skeleton" />
    </div>
  );
}

export function SkeletonExerciseRow() {
  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 bg-gray-800 rounded-lg skeleton" />
      <div className="flex-1">
        <div className="h-5 bg-gray-800 rounded w-2/3 mb-2 skeleton" />
        <div className="h-4 bg-gray-800 rounded w-1/2 skeleton" />
      </div>
      <div className="w-6 h-6 bg-gray-800 rounded-full skeleton" />
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonExerciseRow key={i} />
      ))}
    </div>
  );
}

export function SkeletonCalendar() {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 animate-pulse">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="h-8 flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-800 rounded skeleton" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-800 rounded-xl skeleton" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="flex items-center gap-4 p-6 animate-pulse">
      <div className="w-20 h-20 bg-gray-800 rounded-full skeleton" />
      <div className="flex-1">
        <div className="h-6 bg-gray-800 rounded w-1/3 mb-2 skeleton" />
        <div className="h-4 bg-gray-800 rounded w-1/2 skeleton" />
      </div>
    </div>
  );
}

export function SkeletonHeatmap() {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 animate-pulse">
      <div className="h-5 bg-gray-800 rounded w-1/4 mb-4 skeleton" />
      <div className="space-y-1">
        {Array.from({ length: 12 }).map((_, weekIdx) => (
          <div key={weekIdx} className="flex gap-1">
            {Array.from({ length: 7 }).map((_, dayIdx) => (
              <div key={dayIdx} className="w-3 h-3 bg-gray-800 rounded-sm skeleton" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin`} />
  );
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-6xl mb-4 animate-pulse">💪</div>
      <LoadingSpinner size="lg" />
      <div className="mt-4 text-gray-400">Loading...</div>
    </div>
  );
}

// Loading state for specific screens
export function HomeScreenSkeleton() {
  return (
    <div className="min-h-screen pb-24">
      <div className="p-6 pt-12">
        <SkeletonProfile />
      </div>
      <div className="px-6 mb-6">
        <SkeletonWorkoutCard />
      </div>
      <div className="px-6 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      </div>
      <div className="px-6">
        <div className="h-5 bg-gray-800 rounded w-1/3 mb-4 skeleton" />
        <SkeletonList count={3} />
      </div>
    </div>
  );
}

export function ProgressScreenSkeleton() {
  return (
    <div className="min-h-screen pb-24">
      <div className="p-6 pt-12">
        <div className="h-8 bg-gray-800 rounded w-1/3 mb-6 skeleton" />
      </div>
      <div className="px-6 mb-8">
        <SkeletonChart />
      </div>
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      </div>
      <div className="px-6">
        <SkeletonHeatmap />
      </div>
    </div>
  );
}

export function HistoryScreenSkeleton() {
  return (
    <div className="min-h-screen pb-24">
      <div className="p-6 pt-12">
        <div className="h-8 bg-gray-800 rounded w-1/2 mb-6 skeleton" />
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      </div>
      <div className="px-6">
        <SkeletonCalendar />
      </div>
    </div>
  );
}
