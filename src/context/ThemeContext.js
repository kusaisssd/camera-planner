import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // قراءة الثيم المحفوظ من localStorage أو استخدام dark كقيمة افتراضية
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  
  // حفظ الثيم في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      // Dark Mode Colors
      background: '#0f172a',
      surface: '#1e293b',
      surfaceHover: '#334155',
      text: '#ffffff',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      border: 'rgba(100, 116, 139, 0.2)',
      borderHover: 'rgba(100, 116, 139, 0.4)',
      cardBg: 'rgba(30, 41, 59, 0.5)',
      cardBgHover: 'rgba(30, 41, 59, 0.8)',
      gradientBg: 'rgba(0, 139, 139, 0.1)',
      gradientBgStrong: 'rgba(0, 139, 139, 0.15)',
      shadow: 'rgba(0, 0, 0, 0.3)',
      // Teal colors remain the same
      teal: '#008b8b',
      tealLight: '#20b2aa',
      tealDark: '#006666',
      tealAlpha: 'rgba(0, 139, 139, 0.1)',
      tealAlphaStrong: 'rgba(0, 139, 139, 0.3)',
    } : {
      // Light Mode Colors
      background: '#ffffff',
      surface: '#f8fafc',
      surfaceHover: '#e2e8f0',
      text: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      border: 'rgba(203, 213, 225, 0.8)',
      borderHover: 'rgba(148, 163, 184, 0.8)',
      cardBg: '#ffffff',
      cardBgHover: '#f1f5f9',
      gradientBg: 'rgba(0, 139, 139, 0.05)',
      gradientBgStrong: 'rgba(0, 139, 139, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.1)',
      // Teal colors remain the same
      teal: '#008b8b',
      tealLight: '#20b2aa',
      tealDark: '#006666',
      tealAlpha: 'rgba(0, 139, 139, 0.1)',
      tealAlphaStrong: 'rgba(0, 139, 139, 0.3)',
    }
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};