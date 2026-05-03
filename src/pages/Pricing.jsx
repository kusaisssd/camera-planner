import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Pricing = () => {
  const { colors, isDark } = useTheme();

  const pricingPlans = [
    {
      name: 'الخطة المجانية الأساسية',
      price: 'مجاني',
      duration: 'للأبد',
      description: 'ابدأ التخطيط الآن بدون تكاليف',
      color: isDark ? '#64748b' : '#475569',
      bgColor: isDark ? 'rgba(100, 116, 139, 0.1)' : 'rgba(100, 116, 139, 0.05)',
      borderColor: isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(100, 116, 139, 0.2)',
      cta: 'ابدأ الآن',
      popular: false,
      features: [
        { text: 'تحميل وتحرير مخطط واحد', included: true },
        { text: 'إضافة حتى 5 كاميرات فقط', included: true },
        { text: 'عرض أساسي لمناطق التغطية', included: true },
        { text: 'قياس يدوي للمسافات', included: true },
        { text: 'حفظ وتصدير', included: false },
        { text: 'دعم فني', included: false },
        { text: 'مشاريع غير محدودة', included: false },
        { text: 'داشبورد خاص', included: false }
      ]
    },
    {
      name: 'خطة الأفراد',
      price: 'مجاني',
      duration: 'مع التسجيل',
      description: 'للمخططين الأفراد والشركات الصغيرة',
      color: colors.teal,
      bgColor: colors.tealAlpha,
      borderColor: colors.tealAlphaStrong,
      cta: 'ابدأ الآن',
      popular: false,
      features: [
        { text: 'مشاريع غير محدودة (بدون حفظ على المنصة)', included: true },
        { text: 'إضافة حتى 15 كاميرا لكل مشروع', included: true },
        { text: 'تصدير إلى صورة (PNG)', included: true },
        { text: 'تصدير إلى PDF', included: true },
        { text: 'حفظ المشاريع في الموقع', included: false },
        { text: 'أرشفة المشاريع', included: false },
        { text: 'مشاركة الملفات مع العملاء', included: false },
        { text: 'أدوات قياس المسافات', included: false }
      ]
    },
    {
      name: 'خطة الشركات',
      price: 'تواصل معنا',
      duration: 'حسب الاحتياجات',
      description: 'حل شامل لشركات الأمان الكبرى',
      color: colors.tealLight,
      bgColor: isDark ? 'rgba(32, 178, 170, 0.1)' : 'rgba(32, 178, 170, 0.05)',
      borderColor: isDark ? 'rgba(32, 178, 170, 0.5)' : 'rgba(32, 178, 170, 0.3)',
      cta: 'تواصل معنا',
      popular: false,
      features: [
        { text: 'جميع ميزات الخطة السابقة', included: true },
        { text: 'مشاريع غير محدودة', included: true },
        { text: 'إضافة عدد غير محدود من الكاميرات', included: true },
        { text: 'أدوات حساب المسافات المتقدمة', included: true },
        { text: 'حساب الكبلات والمسافات التقنية', included: true },
        { text: 'دراسة كاملة للمشروع', included: true },
        { text: 'داشبورد خاص بالعميل', included: true },
        { text: 'أرشفة المشاريع والعودة إليها', included: true },
        { text: 'معلومات الكاميرات (عنوان، حساب الدخول، المواصفات)', included: true },
        { text: 'إضافة تجهيزات أخرى (DVR, NVR, إلخ)', included: true },
        { text: 'حفظ بيانات التجهيزات والمعدات', included: true },
        { text: 'تقارير مفصلة لكل مشروع', included: true },
        { text: 'دعم فني أولوي 24/7', included: true }
      ]
    }
  ];

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
          ? 'linear-gradient(135deg, rgba(0, 139, 139, 0.1) 0%, rgba(32, 178, 170, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(0, 139, 139, 0.05) 0%, rgba(32, 178, 170, 0.08) 100%)',
        padding: '80px 20px',
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
          خطط تسعيرية لكل احتياجاتك
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          color: colors.textSecondary, 
          maxWidth: '700px', 
          margin: '20px auto 0', 
          lineHeight: '1.8' 
        }}>
          من المخططين الأفراد إلى الشركات الكبرى، لدينا الخطة المناسبة لك.
          ابدأ مجاناً وارقِ إلى الخطط المتقدمة عندما تحتاج إلى أدوات أقوى
        </p>
      </section>

      <section style={{
        padding: '60px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '50px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🌟 لماذا تختار Camera Planner؟
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {[
            { icon: '💡', title: 'سهولة الاستخدام', desc: 'واجهة بديهية لا تحتاج خبرة تقنية' },
            { icon: '⚡', title: 'دقة عالية', desc: 'حسابات هندسية متقدمة للنتائج الأمثل' },
            { icon: '🔒', title: 'أمان البيانات', desc: 'تشفير عسكري لحماية مشاريعك' },
            { icon: '🚀', title: 'تحديثات مستمرة', desc: 'ميزات جديدة وتحسينات شهرية' },
            { icon: '🌍', title: 'دعم عربي', desc: 'واجهة كاملة بالعربية مع دعم محلي' },
            { icon: '📞', title: 'دعم فني', desc: 'فريق متخصص لمساعدتك في أي وقت' }
          ].map((item, idx) => (
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
              e.currentTarget.style.boxShadow = `0 8px 20px ${colors.shadow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', color: colors.text }}>
                {item.title}
              </h3>
              <p style={{ color: colors.textSecondary, lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '60px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #20b2aa, #006666)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎯 اختر الخطة المناسبة لك
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          alignItems: 'stretch'
        }}>
          {pricingPlans.map((plan, idx) => (
            <div key={idx} style={{
              background: plan.bgColor,
              border: `2px solid ${plan.borderColor}`,
              borderRadius: '20px',
              padding: '40px 30px',
              position: 'relative',
              transition: 'all 0.3s ease',
              transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: plan.popular ? `0 20px 40px ${plan.color}40` : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = plan.color;
              e.currentTarget.style.boxShadow = `0 20px 40px ${plan.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = plan.borderColor;
              if (!plan.popular) {
                e.currentTarget.style.boxShadow = 'none';
              }
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '20px',
                  background: 'linear-gradient(90deg, #008b8b, #20b2aa)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  ⭐ الأكثر شعبية
                </div>
              )}

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: plan.color
              }}>
                {plan.name}
              </h3>

              <p style={{
                color: colors.textSecondary,
                marginBottom: '20px',
                fontSize: '0.95rem',
                minHeight: '40px'
              }}>
                {plan.description}
              </p>

              <div style={{ marginBottom: '30px' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: plan.color,
                  marginBottom: '5px'
                }}>
                  {plan.price}
                </div>
                <div style={{ color: colors.textTertiary, fontSize: '0.9rem' }}>
                  {plan.duration}
                </div>
              </div>

              <button style={{
                padding: '12px 24px',
                background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                border: 'none',
                color: 'white',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '30px',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 10px 25px ${plan.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {plan.cta}
              </button>

              <div style={{
                borderTop: `1px solid ${plan.borderColor}`,
                paddingTop: '20px',
                flex: 1
              }}>
                <div style={{ 
                  marginBottom: '15px', 
                  fontSize: '0.85rem', 
                  color: colors.textTertiary, 
                  fontWeight: 'bold' 
                }}>
                  المميزات المتضمنة:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.9rem',
                      color: feature.included ? colors.text : colors.textTertiary,
                      opacity: feature.included ? 1 : 0.5
                    }}>
                      <span style={{
                        fontSize: '1.2rem',
                        color: feature.included ? plan.color : colors.textTertiary
                      }}>
                        {feature.included ? '✓' : '✗'}
                      </span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '60px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '40px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          📊 مقارنة مفصلة
        </h2>
        <div style={{
          overflowX: 'auto',
          background: colors.cardBg,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            direction: 'rtl'
          }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                <th style={{ padding: '20px', textAlign: 'right', fontWeight: 'bold', color: colors.tealLight }}>المميزة</th>
                <th style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', color: colors.textSecondary }}>الأساسية</th>
                <th style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', color: colors.teal }}>الأفراد</th>
                <th style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', color: colors.tealLight }}>الشركات</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'عدد المشاريع', basic: 'مشروع واحد', advanced: 'غير محدود', pro: 'غير محدود' },
                { feature: 'عدد الكاميرات', basic: 'حتى 5', advanced: 'حتى 15', pro: 'غير محدود' },
                { feature: 'حفظ المشاريع', basic: '✗', advanced: '✓', pro: '✓' },
                { feature: 'تصدير PDF', basic: '✗', advanced: '✓', pro: '✓' },
                { feature: 'حساب المسافات المتقدم', basic: '✗', advanced: '✗', pro: '✓' },
                { feature: 'حساب الكبلات', basic: '✗', advanced: '✗', pro: '✓' },
                { feature: 'دراسة المشروع الكاملة', basic: '✗', advanced: '✗', pro: '✓' },
                { feature: 'داشبورد العميل', basic: '✗', advanced: '✗', pro: '✓' },
                { feature: 'أرشفة المشاريع', basic: '✗', advanced: '✗', pro: '✓' },
                { feature: 'معلومات الكاميرات المفصلة', basic: '✗', advanced: '✗', pro: '✓' },
                { feature: 'تتبع التركيب والصيانة', basic: '✗', advanced: '✗', pro: '✓' },
                { feature: 'التقارير المفصلة', basic: '✗', advanced: '✗', pro: '✓' },
                { feature: 'الدعم الفني', basic: '✗', advanced: 'الإيميل', pro: '24/7 أولوي' }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <td style={{ padding: '15px 20px', textAlign: 'right', color: colors.text, fontWeight: '500' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'center', color: colors.textSecondary }}>
                    {row.basic}
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'center', color: colors.textSecondary, background: colors.tealAlpha }}>
                    {row.advanced}
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'center', color: colors.textSecondary }}>
                    {row.pro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '50px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b, #006666)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ❓ أسئلة متكررة
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {[
            { q: 'هل يمكنني تغيير الخطة لاحقاً؟', a: 'نعم، يمكنك التبديل بين الخطط في أي وقت. الترقية فورية والخفض سيكون في دورتك التالية.' },
            { q: 'هل هناك نسخة تجريبية مجانية للخطة الاحترافية؟', a: 'نعم، نوفر 14 يوم نسخة تجريبية مجانية بدون الحاجة لبطاقة ائتمان.' },
            { q: 'كيف يتم حساب الفواتير؟', a: 'يتم الخصم تلقائياً من بطاقتك الائتمانية في بداية كل دورة فواتير.' },
            { q: 'هل تدعمون الدفع بطرق أخرى؟', a: 'نعم، نوفر عدة خيارات دفع تشمل بطاقات الائتمان والتحويل البنكي.' },
            { q: 'ما سياسة الاسترجاع؟', a: 'نوفر استرجاع 100% في أول 30 يوم بدون شروط إذا لم تكن راضياً.' },
            { q: 'هل يمكنني إلغاء الاشتراك في أي وقت؟', a: 'نعم، بدون أي التزامات طويلة الأجل. يمكنك الإلغاء في أي لحظة.' }
          ].map((faq, idx) => (
            <div key={idx} style={{
              padding: '20px',
              background: colors.cardBg,
              borderRadius: '10px',
              border: `1px solid ${colors.border}`,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.tealAlphaStrong;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border;
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px', color: colors.tealLight }}>
                {faq.q}
              </h3>
              <p style={{ color: colors.textSecondary, lineHeight: '1.6' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(0, 139, 139, 0.1) 0%, rgba(32, 178, 170, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(0, 139, 139, 0.05) 0%, rgba(32, 178, 170, 0.08) 100%)',
        borderTop: `1px solid ${colors.border}`
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: colors.text
        }}>
          جاهز للانتقال للمستوى الاحترافي؟ 🚀
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: colors.textSecondary,
          marginBottom: '30px',
          maxWidth: '600px',
          margin: '0 auto 30px'
        }}>
          تواصل معنا اليوم وسنساعدك على اختيار الخطة المناسبة لاحتياجات عملك
        </p>
        <a
          href="https://pro-sss.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '15px 40px',
            background: 'linear-gradient(135deg, #008b8b, #20b2aa)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0, 139, 139, 0.4)',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 139, 139, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 139, 139, 0.4)';
          }}
        >
          تواصل معنا
        </a>
      </section>
    </div>
  );
};

export default Pricing;