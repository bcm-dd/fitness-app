import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fitness App - Your Personal Training Companion',
  description: 'Track your workouts, monitor progress, and achieve your fitness goals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-black text-white">
          {children}
        </div>
      </body>
    </html>
  )
}
