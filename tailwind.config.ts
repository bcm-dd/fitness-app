import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        purple: {
          500: '#8B5CF6',
        },
        blue: {
          500: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
