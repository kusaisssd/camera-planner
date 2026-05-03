import React from 'react';
import { useTheme } from '../context/ThemeContext';

const HowItWorks = () => {
  const { colors } = useTheme();

  const benefits = [
    {
      icon: '🎯',
      title: 'تصور واقعي للتغطية',
      desc: 'شاهد بالضبط أين ستغطي كل كاميرا قبل التركيب مع عرض مرئي للزوايا'
    },
    {
      icon: '💰',
      title: 'توفير التكاليف',
      desc: 'تجنب الأخطاء المكلفة والحاجة لإعادة التركيب من خلال التخطيط المسبق'
    },
    {
      icon: '⏱️',
      title: 'توفير الوقت',
      desc: 'خطط بسهولة وسرعة بدلاً من الرسومات اليدوية مع أدوات ذكية'
    },
    {
      icon: '📊',
      title: 'عروض احترافية',
      desc: 'قدم عروض موثوقة وعالية الجودة لعملائك مع معلومات شاملة'
    },
    {
      icon: '✅',
      title: 'دقة عالية',
      desc: 'حسابات دقيقة لزوايا الرؤية والتغطية وأطوال الكابلات'
    },
    {
      icon: '🤝',
      title: 'رضا العملاء',
      desc: 'زيادة الثقة من خلال التخطيط الشفاف والتوثيق الكامل'
    },
    {
      icon: '🔌',
      title: 'إدارة الكابلات',
      desc: 'حساب أطوال الكابلات المطلوبة وتخطيط المسارات بدقة'
    },
    {
      icon: '📱',
      title: 'سهولة الاستخدام',
      desc: 'واجهة بديهية وسلسة مع تعليمات واضحة في كل خطوة'
    }
  ];

  const features = [
    {
      title: 'رفع وتحميل المخططات',
      description: 'ارفع صور المخططات المعمارية بجميع الأنواع وابدأ العمل فوراً',
      icon: '📐',
      details: ['دعم صيغ متعددة (JPG, PNG)', 'معاينة فورية', 'إمكانية تبديل المخططات']
    },
    {
      title: 'إعداد المقياس الذكي',
      description: 'حدد المقياس بخطوتين بسيطتين مع واجهة تعليمية شاملة',
      icon: '📏',
      details: ['إدخال اسم المشروع', 'تحديد المسافة المعروفة', 'أمثلة عملية للمسافات الشائعة']
    },
    {
      title: 'إضافة وإدارة الكاميرات',
      description: 'ضع الكاميرات على المخطط مع تحكم كامل بالمواصفات',
      icon: '📷',
      details: [
        'اختيار فتحة العدسة (f/1.4 - f/8)',
        'ضبط زاوية الرؤية (30° - 180°)',
        'تحديد عمق التغطية',
        'كاميرات 360 درجة',
        'السحب والإفلات للتحريك',
        'التدوير باستخدام نقطة التحكم'
      ]
    },
    {
      title: 'إضافة الأجهزة',
      description: 'أضف أجهزة DVR/NVR وأجهزة الشبكة الأخرى',
      icon: '🖥️',
      details: [
        'DVR/NVR مع عدد القنوات',
        'Switch وRouter',
        'PoE Switch',
        'تتبع القنوات المستخدمة'
      ]
    },
    {
      title: 'نظام الكابلات المتقدم',
      description: 'ارسم وخطط مسارات الكابلات بثلاثة أنواع مختلفة',
      icon: '🔌',
      details: [
        'كابل كاميرا (من كاميرا إلى DVR)',
        'كابل أجهزة (بين الأجهزة)',
        'كابل حر (مسار مخصص)',
        'نقاط انعطاف (Ctrl+Click)',
        'حساب الطول التلقائي',
        'اختيار القناة للكاميرات'
      ]
    },
    {
      title: 'لوحة تحكم الكاميرا',
      description: 'تحكم كامل بإعدادات كل كاميرا',
      icon: '⚙️',
      details: [
        'توصيف سريع للموقع',
        'عنوان IP أو Serial',
        'اسم المستخدم وكلمة المرور',
        'معلومات تفصيلية لكل كاميرا'
      ]
    },
    {
      title: 'عرض التغطية المرئي',
      description: 'شاهد منطقة التغطية لكل كاميرا بشكل مرئي وواضح',
      icon: '🔷',
      details: [
        'أشكال هندسية للتغطية',
        'تمييز بالألوان',
        'تحديث فوري عند التعديل'
      ]
    },
    {
      title: 'إحصائيات شاملة',
      description: 'عرض معلومات كاملة عن المشروع في الوقت الفعلي',
      icon: '📊',
      details: [
        'عدد الكاميرات والأجهزة',
        'طول الكابلات الإجمالي',
        'معلومات كل عنصر',
        'التاريخ واسم المشروع'
      ]
    },
    {
      title: 'الحفظ والتصدير',
      description: 'احفظ مشاريعك وصدرها بصيغ متعددة',
      icon: '💾',
      details: [
        'حفظ المشروع كملف JSON',
        'فتح المشاريع المحفوظة',
        'تصدير كصورة (قريباً)',
        'حفظ جميع التفاصيل'
      ]
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'إنشاء مشروع جديد',
      description: 'ابدأ برفع صورة المخطط المعماري للمكان المراد تأمينه',
      tips: ['استخدم صور واضحة وعالية الجودة', 'تأكد من وضوح التفاصيل المهمة']
    },
    {
      number: 2,
      title: 'إعداد المشروع والمقياس',
      description: 'أدخل اسم المشروع وحدد المقياس من خلال مسافة معروفة',
      tips: [
        'اختر اسماً واضحاً للمشروع',
        'استخدم مسافة سهلة القياس (باب، جدار، غرفة)',
        'يمكنك تعديل المقياس لاحقاً إذا لزم الأمر'
      ]
    },
    {
      number: 3,
      title: 'إضافة الكاميرات',
      description: 'اضغط على المخطط لإضافة كاميرات في المواقع المطلوبة',
      tips: [
        'ضع الكاميرات في الزوايا الاستراتيجية',
        'احرص على تغطية المداخل والنقاط الحرجة',
        'يمكنك سحب الكاميرات لتغيير موقعها'
      ]
    },
    {
      number: 4,
      title: 'ضبط إعدادات الكاميرات',
      description: 'اختر كل كاميرا لضبط الزاوية والفتحة وإضافة المعلومات',
      tips: [
        'اختر فتحة العدسة المناسبة للإضاءة',
        'عدّل زاوية الرؤية حسب المساحة',
        'أضف التوصيف وعنوان IP',
        'فعّل خيار 360° للكاميرات البانورامية'
      ]
    },
    {
      number: 5,
      title: 'إضافة الأجهزة',
      description: 'أضف أجهزة DVR/NVR والسويتشات في مواقعها',
      tips: [
        'حدد عدد القنوات المطلوبة',
        'ضع الأجهزة في مواقع يسهل الوصول إليها',
        'راعِ المسافات للكابلات'
      ]
    },
    {
      number: 6,
      title: 'رسم الكابلات',
      description: 'اختر نوع الكابل وارسم المسارات بين الكاميرات والأجهزة',
      tips: [
        'استخدم كابل كاميرا للربط بـ DVR',
        'استخدم كابل أجهزة بين السويتشات',
        'اضغط Ctrl أثناء الرسم لإضافة نقاط انعطاف',
        'اختر القناة المناسبة لكل كاميرا'
      ]
    },
    {
      number: 7,
      title: 'مراجعة التغطية',
      description: 'تحقق من التغطية الكاملة وتأكد من عدم وجود نقاط عمياء',
      tips: [
        'انظر للمناطق غير المغطاة',
        'راجع تداخل مناطق التغطية',
        'تحقق من أطوال الكابلات',
        'راجع عدد القنوات المستخدمة'
      ]
    },
    {
      number: 8,
      title: 'الحفظ والتصدير',
      description: 'احفظ المشروع كملف JSON وشاركه مع فريقك أو العميل',
      tips: [
        'احفظ نسخة احتياطية من المشروع',
        'استخدم اسم ملف واضح',
        'يمكنك فتح المشروع لاحقاً للتعديل'
      ]
    }
  ];

  const technologies = [
    {
      name: 'حسابات رياضية دقيقة',
      desc: 'لحساب زوايا الرؤية وأعماق التغطية'
    },
    {
      name: 'خوارزميات هندسية متقدمة',
      desc: 'لرسم مناطق التغطية بشكل دقيق'
    },
    {
      name: 'واجهة React تفاعلية',
      desc: 'لتجربة مستخدم سلسة وسريعة'
    },
    {
      name: 'Context API لإدارة الحالة',
      desc: 'لتنسيق البيانات بين المكونات'
    },
    {
      name: 'Canvas API للرسم',
      desc: 'لرسم الأشكال والكابلات ديناميكياً'
    },
    {
      name: 'localStorage للتخزين',
      desc: 'لحفظ التفضيلات والإعدادات'
    },
    {
      name: 'نظام الثيمات الذكي',
      desc: 'للتبديل بين الوضع الفاتح والداكن'
    },
    {
      name: 'معالجة الصور المتقدمة',
      desc: 'لدعم صيغ مختلفة وتحسين الأداء'
    }
  ];

  const tips = [
    {
      title: '💡 نصائح للتخطيط الأمثل',
      items: [
        'ابدأ بتحديد النقاط الحرجة التي تحتاج تغطية كاملة',
        'استخدم كاميرات 360 درجة في الأماكن المفتوحة',
        'راعِ إضاءة المكان عند اختيار فتحة العدسة',
        'خطط مسارات الكابلات لتقليل التكاليف',
        'احتفظ بنسخة احتياطية من كل مشروع'
      ]
    },
    {
      title: '⚠️ أخطاء شائعة يجب تجنبها',
      items: [
        'عدم ضبط المقياس بدقة في البداية',
        'تجاهل النقاط العمياء بين الكاميرات',
        'عدم حساب أطوال الكابلات المطلوبة',
        'وضع الكاميرات في أماكن يصعب صيانتها',
        'نسيان حفظ المشروع قبل الإغلاق'
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
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 100%)`,
        padding: '80px 20px',
        textAlign: 'center',
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b, #006666)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          كيف يعمل Camera Planner؟ 📹
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
          color: colors.textSecondary, 
          maxWidth: '900px', 
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          أداة متكاملة وقوية تمكن شركات الأمان والمراقبة من تصميم مخططات ديناميكية احترافية،
          إدارة الكابلات، تتبع الأجهزة، وعرض تغطية الكاميرات للعملاء قبل التركيب
        </p>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 'bold',
          marginBottom: '60px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎁 الفوائد الرئيسية
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {benefits.map((benefit, idx) => (
            <div key={idx} style={{
              background: `linear-gradient(135deg, ${colors.tealAlpha} 0%, ${colors.tealAlpha} 100%)`,
              padding: '30px',
              borderRadius: '15px',
              border: `1px solid ${colors.tealAlphaStrong}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = colors.teal;
              e.currentTarget.style.boxShadow = `0 10px 30px ${colors.tealAlpha}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = colors.tealAlphaStrong;
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{benefit.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px', color: colors.text }}>
                {benefit.title}
              </h3>
              <p style={{ color: colors.textSecondary, lineHeight: '1.6' }}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 'bold',
          marginBottom: '60px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #008b8b, #20b2aa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ⚙️ المميزات التقنية الشاملة
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{
              background: colors.cardBg,
              padding: '30px',
              borderRadius: '15px',
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = colors.teal;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = colors.border;
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px', color: colors.text }}>
                {feature.title}
              </h3>
              <p style={{ color: colors.textSecondary, lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '15px' }}>
                {feature.description}
              </p>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {feature.details.map((detail, detailIdx) => (
                  <li key={detailIdx} style={{ 
                    color: colors.textSecondary, 
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ 
                      color: colors.teal, 
                      fontSize: '1rem' 
                    }}>✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 'bold',
          marginBottom: '60px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #20b2aa, #006666)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          📋 خطوات الاستخدام التفصيلية
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {steps.map((step) => (
            <div key={step.number} style={{
              display: 'flex',
              gap: '30px',
              alignItems: 'flex-start',
              padding: '30px',
              background: colors.gradientBg,
              borderRadius: '15px',
              border: `1px solid ${colors.border}`,
              flexDirection: 'row-reverse',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.teal;
              e.currentTarget.style.boxShadow = `0 8px 20px ${colors.tealAlpha}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                minWidth: '70px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                boxShadow: `0 4px 12px ${colors.tealAlphaStrong}`,
                color: 'white'
              }}>
                {step.number}
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '12px', color: colors.text }}>
                  {step.title}
                </h3>
                <p style={{ color: colors.textSecondary, lineHeight: '1.7', marginBottom: '15px' }}>
                  {step.description}
                </p>
                <div style={{
                  background: `${colors.tealAlpha}`,
                  padding: '15px',
                  borderRadius: '10px',
                  border: `1px solid ${colors.tealAlphaStrong}`
                }}>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold', 
                    color: colors.teal,
                    marginBottom: '8px'
                  }}>
                    💡 نصائح:
                  </p>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {step.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} style={{ 
                        color: colors.textSecondary, 
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '8px'
                      }}>
                        <span style={{ color: colors.teal }}>•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        borderTop: `1px solid ${colors.border}`
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '30px'
        }}>
          {tips.map((tipSection, idx) => (
            <div key={idx} style={{
              background: `linear-gradient(135deg, ${colors.tealAlpha}, ${colors.surface})`,
              padding: '30px',
              borderRadius: '15px',
              border: `2px solid ${colors.tealAlphaStrong}`
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: colors.text
              }}>
                {tipSection.title}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {tipSection.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '12px',
                    color: colors.textSecondary,
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    <span style={{
                      color: colors.teal,
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {idx === 0 ? '✓' : '✗'}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies Section */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 'bold',
          marginBottom: '60px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #20b2aa, #008b8b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🔧 التقنيات المستخدمة
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {technologies.map((tech, idx) => (
            <div key={idx} style={{
              padding: '25px',
              background: `linear-gradient(135deg, ${colors.tealAlpha} 0%, ${colors.tealAlpha} 100%)`,
              borderRadius: '12px',
              border: `1px solid ${colors.tealAlphaStrong}`,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = colors.teal;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = colors.tealAlphaStrong;
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '10px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: `linear-gradient(90deg, ${colors.teal}, ${colors.tealLight})`
                }}></div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: colors.text }}>
                  {tech.name}
                </h4>
              </div>
              <p style={{ 
                fontSize: '0.9rem', 
                color: colors.textSecondary,
                paddingRight: '27px',
                lineHeight: '1.5'
              }}>
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        background: `linear-gradient(135deg, ${colors.tealAlpha} 0%, ${colors.tealAlpha} 100%)`,
        borderTop: `1px solid ${colors.border}`
      }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: colors.text
        }}>
          جاهز لتحسين خدماتك؟ 🚀
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.1rem)',
          color: colors.textSecondary,
          marginBottom: '40px',
          maxWidth: '700px',
          margin: '0 auto 40px',
          lineHeight: '1.7'
        }}>
          انضم إلى مئات شركات الأمان والمراقبة التي تستخدم Camera Planner
          لتخطيط أنظمة المراقبة بدقة وزيادة رضا العملاء
        </p>
        <button 
          onClick={() => window.location.href = '/my-plans'}
          style={{
            padding: '18px 50px',
            background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: `0 6px 20px ${colors.tealAlphaStrong}`,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = `0 10px 30px ${colors.tealAlphaStrong}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 6px 20px ${colors.tealAlphaStrong}`;
          }}
        >
          ابدأ التخطيط الآن →
        </button>
      </section>
    </div>
  );
};

export default HowItWorks;