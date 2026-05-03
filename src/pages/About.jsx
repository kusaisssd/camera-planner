import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AboutUs = () => {
  const { colors, isDark } = useTheme();
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.background, 
      color: colors.text, 
      paddingTop: '70px', 
      direction: 'rtl', 
      textAlign: 'right' 
    }}>
      <section style={{
        background: isDark 
          ? 'linear-gradient(135deg, rgba(0, 139, 139, 0.15) 0%, rgba(32, 178, 170, 0.15) 100%)'
          : 'linear-gradient(135deg, rgba(0, 139, 139, 0.05) 0%, rgba(32, 178, 170, 0.08) 100%)',
        padding: '100px 20px',
        textAlign: 'center',
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b, #006666)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🌟 من نحن؟ Pro S;
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: colors.textSecondary,
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          شركة متخصصة في تطوير حلول تقنية مبتكرة
          تحول أفكار العملاء إلى واقع ملموس وقيمة حقيقية
        </p>
      </section>

      <section style={{
        padding: '100px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px'
        }}>
          {[
            {
              icon: '🎯',
              title: 'رؤيتنا',
              description: 'تطوير حلول تقنية مبتكرة تحول أفكار العملاء إلى واقع ملموس وقيمة حقيقية'
            },
            {
              icon: '💼',
              title: 'خبرتنا',
              description: 'فريق متخصص بخبرات متنوعة في تطوير تطبيقات الويب والموبايل والأنظمة الذكية'
            },
            {
              icon: '🚀',
              title: 'التزامنا',
              description: 'نعمل بشغف لتقديم أفضل جودة مع الحرص على تجاوز توقعات عملائنا'
            },
            {
              icon: '🔧',
              title: 'تقنياتنا',
              description: 'نستخدم أحدث التقنيات والأدوات لضمان حلول سريعة وآمنة وقابلة للتطور'
            },
            {
              icon: '🤝',
              title: 'فريقنا',
              description: 'متعاونون ومبدعون نسعى لفهم احتياجاتك بعمق وتقديم حلول مخصصة'
            },
            {
              icon: '📈',
              title: 'نموك',
              description: 'شريكك في النجاح نساعدك على النمو والتطور من خلال التكنولوجيا'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '40px',
              background: colors.cardBg,
              borderRadius: '15px',
              border: `1px solid ${colors.border}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: `0 2px 8px ${colors.shadow}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = colors.tealAlphaStrong;
              e.currentTarget.style.boxShadow = `0 20px 40px ${colors.shadow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.boxShadow = `0 2px 8px ${colors.shadow}`;
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                {item.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '15px', 
                color: colors.tealLight 
              }}>
                {item.title}
              </h3>
              <p style={{ 
                color: colors.textSecondary, 
                lineHeight: '1.7', 
                fontSize: '1rem' 
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '80px 20px',
        background: colors.gradientBg,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '60px',
            textAlign: 'center',
            background: 'linear-gradient(90deg, #20b2aa, #008b8b, #006666)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            خدماتنا المتخصصة
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {[
              { icon: '💻', title: 'تطبيقات الويب', desc: 'تطبيقات ويب حديثة وسريعة وآمنة' },
              { icon: '📱', title: 'تطبيقات الموبايل', desc: 'تطبيقات iOS و Android احترافية' },
              { icon: '🤖', title: 'حلول ذكية', desc: 'تطبيقات AI وتعلم الآلة' },
              { icon: '⚙️', title: 'أنظمة متقدمة', desc: 'أنظمة معقدة وقابلة للتوسع' },
              { icon: '🔐', title: 'الأمان', desc: 'حماية عالية لبيانات عملك' },
              { icon: '🛠️', title: 'الدعم', desc: 'دعم فني متخصص ومستمر' }
            ].map((service, idx) => (
              <div key={idx} style={{
                padding: '30px',
                background: colors.cardBg,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.tealAlphaStrong;
                e.currentTarget.style.boxShadow = `0 10px 30px ${colors.shadow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
                  {service.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  marginBottom: '10px', 
                  color: colors.tealLight 
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  color: colors.textSecondary, 
                  lineHeight: '1.6' 
                }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: '100px 20px',
        textAlign: 'center',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(0, 139, 139, 0.1) 0%, rgba(32, 178, 170, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(0, 139, 139, 0.05) 0%, rgba(32, 178, 170, 0.08) 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: colors.text
          }}>
            جاهزون للتعاون معك
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: colors.textSecondary,
            marginBottom: '40px',
            lineHeight: '1.8'
          }}>
            سواء كنت تحتاج تطبيق مخصص لعملك أو تطوير نظام متقدم أو حل تقني مبتكر، 
            فريق Pro S; جاهز لتحويل رؤيتك إلى واقع
          </p>

          <a
            href="https://pro-sss.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '16px 50px',
              background: 'linear-gradient(135deg, #008b8b, #20b2aa)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(0, 139, 139, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 139, 139, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 139, 139, 0.3)';
            }}
          >
            تواصل معنا الآن
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;