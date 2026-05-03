import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 12px',
        background: colors.cardBg,
        border: `2px solid ${colors.border}`,
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '1.3rem',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 2px 8px ${colors.shadow}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colors.cardBgHover;
        e.currentTarget.style.borderColor = colors.borderHover;
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.cardBg;
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = 'scale(1)';
      }}
      title={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;