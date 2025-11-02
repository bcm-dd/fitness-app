'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home screen on mount
    router.push('/home');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-6xl mb-4">💪</div>
        <div className="text-2xl font-bold text-gradient">Loading...</div>
      </div>
    </div>
  );
}
