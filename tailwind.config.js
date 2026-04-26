/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: '#060318',
        primaryLight: '#1e1c2e',
        primaryDark: '#000000',
        
        // Secondary Colors
        secondary: '#f9eed0',
        secondaryLight: '#fdfcfb',
        secondaryDark: '#e8d7b8',
        
        // Accent Colors
        accent: '#FBD28B',
        accentLight: '#fde2b3',
        accentDark: '#e6b96a',
        
        // Neutral Colors
        surface: '#3a3546',
        surfaceLight: '#4a4356',
        surfaceDark: '#2a2236',
        
        // Text Colors
        textPrimary: '#fdfcfb',
        textSecondary: '#cccccc',
        textMuted: '#9e9ea7',
        textOnAccent: '#000000',
        
        // Status Colors
        success: '#4CAF50',
        error: '#e53935',
        warning: '#ffa726',
        info: '#42a5f5',
        
        // Interactive Colors
        cardBackground: '#3a3546',
        cardBorder: '#f9eed0',
        buttonPrimary: '#f9eed0',
        buttonSecondary: '#FBD28B',
      },
      fontFamily: {
        // Define custom font families if needed
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
    },
  },
  plugins: [],
}

