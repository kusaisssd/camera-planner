import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import SEOHelmet from './components/SEOHelmet';
import Home from './pages/Home';
import MyPlans from './pages/MyPlans';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import About from './pages/About';

// مكون نافذة التنبيه
const WarningDialog = ({ onConfirm, onCancel }) => {
  const { colors } = useTheme();
  
  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '1rem',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onCancel}
      >
        <div 
          style={{
            backgroundColor: colors.isDark ? '#1e293b' : '#ffffff',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '450px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(0, 139, 139, 0.3)',
            animation: 'slideIn 0.3s ease'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            fontSize: '3rem',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            ⚠️
          </div>
          
          <h2 style={{
            color: '#f59e0b',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            تنبيه: عمل غير محفوظ
          </h2>
          
          <p style={{
            color: colors.textSecondary,
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            لديك مخطط قيد العمل. إذا غادرت هذه الصفحة، سيتم فقدان جميع التغييرات غير المحفوظة.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <button
              onClick={onCancel}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#008b8b',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#20b2aa';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#008b8b';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ✓ البقاء هنا
            </button>

            <button
              onClick={onConfirm}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ✕ مغادرة
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingPage, setPendingPage] = useState(null);

  // دالة للتحقق قبل تغيير الصفحة
  const handlePageChange = (newPage) => {
    // إذا كنا في صفحة المخططات وهناك عمل غير محفوظ
    if (currentPage === 'مخططاتي' && newPage !== 'مخططاتي') {
      const hasWork = sessionStorage.getItem('hasUnsavedWork') === 'true';
      
      if (hasWork) {
        setPendingPage(newPage);
        setShowWarningDialog(true);
        return;
      }
    }
    
    // الانتقال مباشرة
    setCurrentPage(newPage);
  };

  // تأكيد الانتقال
  const confirmNavigation = () => {
    sessionStorage.removeItem('hasUnsavedWork');
    setShowWarningDialog(false);
    if (pendingPage) {
      setCurrentPage(pendingPage);
      setPendingPage(null);
    }
  };

  // إلغاء الانتقال
  const cancelNavigation = () => {
    setShowWarningDialog(false);
    setPendingPage(null);
  };

  // SEO data for each page
  const getSEOData = () => {
    switch(currentPage) {
      case 'Home':
        return {
          title: 'Camera Planner - مخطط الكاميرات الأمني | Pro S;',
          description: 'أداة احترافية لتخطيط وتصميم أنظمة الكاميرات الأمنية بدقة وسهولة. خطط مشروعك بثوانٍ واحصل على تغطية مثالية',
          keywords: 'مخطط كاميرات, تصميم نظام أمني, CCTV planner, تخطيط كاميرات المراقبة',
          url: '/'
        };
      case 'مخططاتي':
        return {
          title: 'مخططاتي - Camera Planner | Pro S;',
          description: 'ابدأ بإنشاء مخطط كاميرات احترافي. حمّل مخطط البناء وأضف الكاميرات بسهولة مع حساب دقيق للتغطية والمسافات',
          keywords: 'إنشاء مخطط كاميرات, تصميم نظام مراقبة, أداة تخطيط CCTV',
          url: '/my-plans'
        };
      case 'How it works':
        return {
          title: 'كيف يعمل - Camera Planner | Pro S;',
          description: 'تعلم كيفية استخدام Camera Planner لتصميم أنظمة المراقبة. شرح مفصل بالخطوات والأمثلة العملية',
          keywords: 'شرح Camera Planner, كيفية استخدام مخطط الكاميرات, دليل المستخدم',
          url: '/how-it-works'
        };
      case 'Pricing':
        return {
          title: 'الأسعار والخطط - Camera Planner | Pro S;',
          description: 'اختر الخطة المناسبة لك. خطط مجانية ومدفوعة لجميع احتياجاتك من تخطيط أنظمة الكاميرات الأمنية',
          keywords: 'أسعار Camera Planner, خطط الاشتراك, تسعير مخطط الكاميرات',
          url: '/pricing'
        };
      case 'About':
        return {
          title: 'من نحن - Pro S; | Camera Planner',
          description: 'Pro S; - شركة متخصصة في تطوير حلول تقنية مبتكرة. نحول أفكار العملاء إلى واقع ملموس وقيمة حقيقية',
          keywords: 'Pro S;, من نحن, شركة تطوير برمجيات, حلول تقنية',
          url: '/about'
        };
      default:
        return {
          title: 'Camera Planner - مخطط الكاميرات الأمني | Pro S;',
          description: 'أداة احترافية لتخطيط وتصميم أنظمة الكاميرات الأمنية',
          keywords: 'مخطط كاميرات, CCTV planner',
          url: '/'
        };
    }
  };

  const seoData = getSEOData();

  return (
    <>
      <SEOHelmet {...seoData} />
      <Navbar setCurrentPage={handlePageChange} currentPage={currentPage} />
      
      {currentPage === 'Home' && <Home setCurrentPage={handlePageChange} />}
      {currentPage === 'مخططاتي' && <MyPlans />}
      {currentPage === 'How it works' && <HowItWorks />}
      {currentPage === 'Pricing' && <Pricing />}
      {currentPage === 'About' && <About />}

      {/* نافذة التنبيه */}
      {showWarningDialog && <WarningDialog onConfirm={confirmNavigation} onCancel={cancelNavigation} />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;