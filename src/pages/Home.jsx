import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Home = ({ setCurrentPage }) => {
  const { colors } = useTheme();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, color: colors.text, paddingTop: '70px', direction: 'rtl', textAlign: 'right' }}>
      <section style={{
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.tealAlpha} 100%)`,
        padding: '100px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.tealAlpha} 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>

        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '30px',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b, #006666)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          zIndex: 1
        }}>
          مخططات أمنية ذكية وديناميكية
        </h1>

        <p style={{
          fontSize: '1.4rem',
          color: colors.textSecondary,
          maxWidth: '800px',
          margin: '0 auto 40px',
          lineHeight: '1.8',
          position: 'relative',
          zIndex: 1
        }}>
          تطبيق متخصص يمكّن شركات الأمان والمراقبة من بناء مخططات احترافية
          وعرض تغطية الكاميرات للعملاء قبل التركيب
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}>
          <button
            onClick={() => setCurrentPage('مخططاتي')}
            style={{
              padding: '18px 50px',
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: `0 8px 20px ${colors.tealAlphaStrong}`,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 10px 25px ${colors.tealAlphaStrong}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 8px 20px ${colors.tealAlphaStrong}`;
            }}
          >
            ابدأ الآن
          </button>

          <button
            onClick={() => setCurrentPage('How it works')}
            style={{
              padding: '18px 50px',
              background: 'transparent',
              color: colors.tealLight,
              border: `2px solid ${colors.tealAlphaStrong}`,
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.tealAlpha;
              e.currentTarget.style.borderColor = colors.teal;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = colors.tealAlphaStrong;
            }}
          >
            كيف يعمل التطبيق
          </button>
        </div>
      </section>

      <section style={{
        padding: '80px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '60px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b, #006666)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ✨ المميزات الرئيسية
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {[
            {
              icon: '📏',
              title: 'قياس ديناميكي',
              description: 'قس المسافات بدقة على المخطط وحدد المقياس المناسب'
            },
            {
              icon: '📷',
              title: 'مكتبة كاميرات',
              description: 'اختر من مئات أنواع الكاميرات بمواصفات دقيقة'
            },
            {
              icon: '📐',
              title: 'عرض التغطية',
              description: 'شاهد مناطق التغطية بشكل مرئي واضح'
            },
            {
              icon: '💾',
              title: 'حفظ وتصدير',
              description: 'احفظ مشاريعك وصدرها بصيغ متعددة'
            },
            {
              icon: '📊',
              title: 'تقارير مفصلة',
              description: 'احصل على دراسة شاملة للمشروع'
            },
            {
              icon: '🔒',
              title: 'أمان عالي',
              description: 'حماية كاملة لبيانات مشاريعك'
            }
          ].map((feature, idx) => (
            <div key={idx} style={{
              padding: '40px',
              background: `linear-gradient(135deg, ${colors.tealAlpha} 0%, ${colors.tealAlpha} 100%)`,
              borderRadius: '15px',
              border: `1px solid ${colors.tealAlphaStrong}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = colors.teal;
              e.currentTarget.style.boxShadow = `0 20px 40px ${colors.tealAlpha}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = colors.tealAlphaStrong;
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '10px', color: colors.text }}>
                {feature.title}
              </h3>
              <p style={{ color: colors.textSecondary, lineHeight: '1.6' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '60px 20px',
        background: colors.gradientBg,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          textAlign: 'center'
        }}>
          {[
            { number: '2025', label: 'سنة التطوير' },
            { number: '100%', label: 'تكريس للجودة' },
            { number: '⚡', label: 'إمكانيات قوية' },
            { number: '✔', label: 'جاهزية للمستقبل' }
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #20b2aa, #008b8b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                {stat.number}
              </div>
              <div style={{ color: colors.textSecondary, fontSize: '1.1rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        background: `linear-gradient(135deg, ${colors.tealAlpha} 0%, ${colors.tealAlpha} 100%)`,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: colors.text
        }}>
          جاهز لتطوير أعمالك؟ 🚀
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: colors.textSecondary,
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          اطّلع على خططنا السعرية المختلفة واختر ما يناسب احتياجات عملك
        </p>
        <button
          onClick={() => setCurrentPage('Pricing')}
          style={{
            padding: '16px 45px',
            background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: `0 8px 20px ${colors.tealAlphaStrong}`,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = `0 10px 25px ${colors.tealAlphaStrong}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 20px ${colors.tealAlphaStrong}`;
          }}
        >
          اطّلع على الشرائح السعرية
        </button>
      </section>

      <section style={{
        padding: '100px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${colors.tealAlpha} 0%, ${colors.tealAlpha} 100%)`,
          border: `2px solid ${colors.tealAlphaStrong}`,
          borderRadius: '20px',
          padding: '60px 40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${colors.tealAlpha} 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none'
          }}></div>

          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #20b2aa, #008b8b, #006666)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            zIndex: 1
          }}>
            هل ترغب بتطوير تطبيقات أخرى؟
          </h2>

          <p style={{
            fontSize: '1.3rem',
            color: colors.textSecondary,
            marginBottom: '30px',
            maxWidth: '800px',
            margin: '0 auto 30px',
            lineHeight: '1.8',
            position: 'relative',
            zIndex: 1
          }}>
            فريق <span style={{
              background: 'linear-gradient(90deg, #20b2aa, #008b8b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>Pro S;</span> متخصص في تطوير حلول تقنية مخصصة لعملك
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
            position: 'relative',
            zIndex: 1
          }}>
            {[
              { icon: '💻', title: 'تطبيقات ويب' },
              { icon: '📱', title: 'تطبيقات موبايل' },
              { icon: '🤖', title: 'حلول ذكية' },
              { icon: '⚙️', title: 'أنظمة متقدمة' }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '20px',
                background: colors.cardBg,
                borderRadius: '12px',
                border: `1px solid ${colors.tealAlphaStrong}`
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                  {item.icon}
                </div>
                <div style={{ color: colors.text, fontWeight: '600' }}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '1.1rem',
            color: colors.tealLight,
            marginBottom: '35px',
            fontWeight: '500',
            position: 'relative',
            zIndex: 1
          }}>
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك
          </p>

          <button
            onClick={() => setCurrentPage('About')}
            style={{
              display: 'inline-block',
              padding: '18px 50px',
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: `0 10px 30px ${colors.tealAlphaStrong}`,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 12px 35px ${colors.tealAlphaStrong}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${colors.tealAlphaStrong}`;
            }}
          >
            تعرف على فريق Pro S;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;