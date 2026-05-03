import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
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

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <div 
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        style={{
          padding: '0.75rem 1.5rem',
          background: 'transparent',
          border: `1px solid ${colors.tealAlphaStrong}`,
          color: colors.tealLight,
          borderRadius: '10px',
          fontSize: '0.95rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        🏢 شركة التطوير
        <span style={{ 
          fontSize: '0.8rem',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          ▼
        </span>
      </button>

      <div
        style={{
          position: 'absolute',
          top: 'calc(100% - 0.25rem)',
          right: '0',
          paddingTop: '0.5rem',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 1000
        }}
      >
        <div
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: '10px',
            boxShadow: `0 8px 24px ${colors.shadow}`,
            minWidth: '200px',
            overflow: 'hidden'
          }}
        >
          <a
            href="https://pro-sss.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              color: colors.text,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              borderBottom: `1px solid ${colors.border}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.tealAlpha;
              e.currentTarget.style.paddingRight = '1.5rem';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.paddingRight = '1.25rem';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🏢</span>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                شركة Pro S;
              </div>
              <div style={{ fontSize: '0.75rem', color: colors.textTertiary }}>
                موقع الشركة
              </div>
            </div>
          </a>

          <a
            href="https://kosayalassaf.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              color: colors.text,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.tealAlpha;
              e.currentTarget.style.paddingRight = '1.5rem';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.paddingRight = '1.25rem';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>👨‍💻</span>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                مطور التطبيق
              </div>
              <div style={{ fontSize: '0.75rem', color: colors.textTertiary }}>
                معلومات المطور
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ setCurrentPage, currentPage }) => {
  const [activeLink, setActiveLink] = useState(currentPage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { colors, isDark } = useTheme();

  useEffect(() => {
    setActiveLink(currentPage);
  }, [currentPage]);

  const navLinks = [
    { name: 'Home', label: 'الرئيسية', icon: '🏠' },
    { name: 'مخططاتي', label: 'مخططاتي', icon: '📋' },
    { name: 'How it works', label: 'كيف يعمل', icon: '⚙️' },
    { name: 'Pricing', label: 'الأسعار', icon: '💎' },
    { name: 'About', label: 'من نحن', icon: 'ℹ️' }
  ];

  const handleNavClick = (linkName) => {
    setActiveLink(linkName);
    setCurrentPage(linkName);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-button {
              display: flex !important;
            }
          }

          @media (min-width: 769px) {
            .desktop-nav {
              display: flex !important;
            }
            .mobile-menu-button {
              display: none !important;
            }
            .mobile-menu {
              display: none !important;
            }
          }
        `}
      </style>
      
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border}`,
        boxShadow: `0 4px 6px -1px ${colors.shadow}`,
        zIndex: 10000,
        padding: '0 1rem',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          gap: '1rem'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: window.innerWidth <= 768 ? '0.5rem' : '0.75rem' }}>
            <a
              href="https://pro-sss.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="زيارة موقع Pro S; الرسمي"
              style={{
                textDecoration: 'none',
                display: 'block',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{
                width: window.innerWidth <= 768 ? '70px' : '90px',
                height: window.innerWidth <= 768 ? '50px' : '60px',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 16px rgba(0, 139, 139, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                letterSpacing: '1px',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <span style={{
                  fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem',
                  fontWeight: 'bold',
                  lineHeight: '1',
                  whiteSpace: 'nowrap',
                  letterSpacing: '2px',
                  display: 'block',
                  minWidth: window.innerWidth <= 768 ? '60px' : '80px',
                  textAlign: 'center'
                }}>
                  <span style={{ color: '#1a5f7a' }}>Pro S</span>
                  <span style={{ color: '#008b8b' }}>;</span>
                </span>
              </div>
            </a>
            
            <div 
              onClick={() => handleNavClick('Home')}
              title="العودة للصفحة الرئيسية"
              style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{
                fontSize: window.innerWidth <= 768 ? '1rem' : '1.3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #00d9d9, #00e6e6, #20b2aa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}>
                Camera Planner
              </div>
              <div style={{ 
                fontSize: window.innerWidth <= 768 ? '0.6rem' : '0.7rem', 
                color: colors.textTertiary, 
                marginTop: '-2px',
                display: window.innerWidth <= 480 ? 'none' : 'block'
              }}>
                مخطط الكاميرات الاحترافي
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            alignItems: 'center',
            flex: '1',
            justifyContent: 'center'
          }}>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: activeLink === link.name ? colors.tealAlpha : 'transparent',
                  color: activeLink === link.name ? colors.tealLight : colors.textSecondary,
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: activeLink === link.name ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.tealAlpha;
                }}
                onMouseLeave={(e) => {
                  if (activeLink !== link.name) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{link.icon}</span>
                {link.label}
                {activeLink === link.name && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '70%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #008b8b, #00a9a9)',
                    borderRadius: '2px'
                  }}></div>
                )}
              </button>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="desktop-nav" style={{ 
            display: 'flex', 
            gap: '1rem', 
            alignItems: 'center'
          }}>
            <DropdownMenu />
            <ThemeToggleButton />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div className="mobile-menu-button" style={{ display: 'none' }}>
              <ThemeToggleButton />
            </div>
            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                padding: '10px 12px',
                background: colors.cardBg,
                border: `2px solid ${colors.border}`,
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.5rem',
                transition: 'all 0.3s ease',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            maxHeight: isMobileMenuOpen ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
            boxShadow: isMobileMenuOpen ? `0 8px 16px ${colors.shadow}` : 'none',
            borderBottom: isMobileMenuOpen ? `1px solid ${colors.border}` : 'none'
          }}
        >
          <div style={{ padding: '1rem' }}>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: activeLink === link.name ? colors.tealAlpha : 'transparent',
                  color: activeLink === link.name ? colors.tealLight : colors.text,
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: activeLink === link.name ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                  textAlign: 'right'
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{link.icon}</span>
                {link.label}
              </button>
            ))}
            
            {/* Mobile Links Section */}
            <div style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: `1px solid ${colors.border}`
            }}>
              <div style={{
                fontSize: '0.85rem',
                color: colors.textTertiary,
                marginBottom: '0.75rem',
                fontWeight: '600'
              }}>
                🔗 روابط سريعة
              </div>
              
              {/* زرين جنباً إلى جنب - الشركة والمطور */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <a
                  href="https://pro-sss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    color: colors.text,
                    textDecoration: 'none',
                    borderRadius: '10px',
                    transition: 'background 0.3s ease',
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    textAlign: 'center'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</span>
                  <div style={{ 
                    fontWeight: '600', 
                    fontSize: '0.85rem',
                    lineHeight: '1.3'
                  }}>
                    شركة Pro S;
                  </div>
                  <div style={{ 
                    fontSize: '0.7rem', 
                    color: colors.textTertiary,
                    marginTop: '0.25rem'
                  }}>
                    الموقع الرسمي
                  </div>
                </a>

                <a
                  href="https://kosayalassaf.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    color: colors.text,
                    textDecoration: 'none',
                    borderRadius: '10px',
                    transition: 'background 0.3s ease',
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    textAlign: 'center'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍💻</span>
                  <div style={{ 
                    fontWeight: '600', 
                    fontSize: '0.85rem',
                    lineHeight: '1.3'
                  }}>
                    المطور
                  </div>
                  <div style={{ 
                    fontSize: '0.7rem', 
                    color: colors.textTertiary,
                    marginTop: '0.25rem'
                  }}>
                    Portfolio
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;