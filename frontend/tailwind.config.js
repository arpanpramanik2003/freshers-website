/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Updated theme colors - Purple/Blue
        primary: "#9333ea",   // Purple-600
        secondary: "#3b82f6", // Blue-500  
        accent: "#a78bfa",    // Purple-400
        dark: "#0f0f23",      // Dark purple-blue
        light: "#ffffff",     // White
        
        // Stage lighting theme palette
        stage: {
          50: "#faf5ff",
          100: "#f3e8ff", 
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",  // Primary
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        
        // Blue accent colors
        electric: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe", 
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",  // Secondary
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af", 
          900: "#1e3a8a",
          950: "#172554",
        },
        
        // Glassmorphism support
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          medium: "rgba(255, 255, 255, 0.2)",
          heavy: "rgba(255, 255, 255, 0.3)",
          dark: "rgba(0, 0, 0, 0.1)",
          darker: "rgba(0, 0, 0, 0.2)",
          darkest: "rgba(0, 0, 0, 0.3)",
        }
      },
      
      backgroundImage: {
        'stage-gradient': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
        'stage-radial': 'radial-gradient(circle at center, #9333ea 0%, #3b82f6 50%, #1e3a8a 100%)',
        'stage-lights': "url('/stage-background.jpg')",
      },
      
      backdropBlur: {
        'stage': '10px',
      },
      
      boxShadow: {
        'stage': '0 0 20px rgba(147, 51, 234, 0.3)',
        'electric': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow': '0 0 30px rgba(167, 139, 250, 0.4)',
        'stage-lg': '0 10px 30px rgba(147, 51, 234, 0.2)',
        'electric-lg': '0 10px 30px rgba(59, 130, 246, 0.2)',
      },
      
      animation: {
        'stage-pulse': 'stage-pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        'stage-pulse': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.2' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(147, 51, 234, 0.4)' },
        },
      },
      
      fontFamily: {
        'display': ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      
      fontSize: {
        'hero': ['clamp(2rem, 8vw, 6rem)', '1'],
        'stage': ['clamp(1.5rem, 4vw, 3rem)', '1.2'],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
