<div align="center">

# 📹 Camera Planner

### Professional CCTV planning tool with coverage visualization, cable routing & PDF support

**أداة احترافية لتخطيط أنظمة كاميرات المراقبة مع عرض التغطية وإدارة الكابلات ودعم PDF**

[![Live Demo](https://img.shields.io/badge/demo-online-success?style=for-the-badge&logo=vercel)](https://camera-planner.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Made with Love](https://img.shields.io/badge/made%20with-❤-red?style=for-the-badge)](#)

[**🚀 Live Demo**](https://camera-planner.vercel.app) · [**🐛 Report Bug**](https://github.com/kusaisssd/camera-planner/issues) · [**✨ Request Feature**](https://github.com/kusaisssd/camera-planner/issues)

</div>

---

## 🇬🇧 English

### What problem does it solve?

Security installers traditionally plan CCTV systems on paper or generic CAD tools — leading to coverage gaps, miscalculated cable lengths, and costly on-site adjustments. **Camera Planner** lets you upload a floor plan (image or PDF), drop cameras with realistic field-of-view cones, route cables, and hand a polished plan to clients before installation.

### ✨ Key Features

- 📐 **Floor-plan import** — JPG, PNG, and **multi-page PDF** support (page picker included)
- 📷 **Camera placement** — drag-to-position, rotate, FOV cone (30°–180°), aperture-based auto-FOV
- 🔄 **360° cameras** with full radial coverage rendering
- 📏 **Real-world scale** — calibrate from any known distance, get accurate metric measurements
- 🔌 **Three cable types** — camera-to-DVR, device-to-device, free-form with `Ctrl+Click` waypoints
- 🖥️ **Device management** — DVR/NVR with channel tracking, switches, routers
- 💾 **Project save/load** — export as JSON, reopen exactly where you left off
- 🌙 **Dark mode** — fully themed
- 🌐 **Arabic-first UI** with native RTL layout

### 🆓 Free vs Full Edition

| Capability | 🆓 Open Source (this repo) | ⭐ Full Edition (contact) |
|---|:---:|:---:|
| Floor-plan editor (image + PDF) | ✅ | ✅ |
| Camera placement & coverage cones | ✅ | ✅ |
| Cable routing & length calculation | ✅ | ✅ |
| Save project as local JSON file | ✅ | ✅ |
| Cloud database & user accounts | ❌ | ✅ |
| Project archive & client sharing | ❌ | ✅ |
| Polished PDF report export | ❌ | ✅ |
| Admin dashboard & analytics | ❌ | ✅ |
| Priority support & team training | ❌ | ✅ |

> 📩 The full edition (with database, multi-user accounts, reporting, and dashboards) is available on request — contact [kosayalassaf@gmail.com](mailto:kosayalassaf@gmail.com) or via [pro-sss.com](https://pro-sss.com/).

### 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Styling | Inline styles + Tailwind utilities |
| State | Context API |
| Rendering | SVG (coverage cones), Canvas (PDF) |
| PDF | pdf.js (CDN-loaded, no bundle bloat) |
| Storage | localStorage + sessionStorage |
| Deploy | Vercel |

### 🚀 Quick Start

```bash
git clone https://github.com/kusaisssd/camera-planner.git
cd camera-planner
npm install
npm start
```

App opens at [http://localhost:3000](http://localhost:3000).

### 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── PlanContainer.jsx       # Main canvas with cameras/devices/cables
│   ├── CameraElement.jsx       # Camera marker + rotation handle
│   ├── DeviceElement.jsx       # DVR/NVR/switch markers
│   ├── ScaleSetupDialog.jsx    # Two-step scale calibration
│   ├── PDFPageSelector.jsx     # PDF page picker (pdf.js)
│   ├── CameraControlPanel.jsx  # FOV / aperture / IP / credentials
│   └── ...
├── pages/             # Top-level routes
│   ├── MyPlans.jsx             # Main editor
│   ├── HowItWorks.jsx          # Feature walkthrough
│   └── ...
├── context/           # Theme provider
└── utils/             # Project save/load helpers
```

### 🤝 Contributing

Contributions welcome! Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.

### 📜 License

[MIT](LICENSE) © 2026 Kosay Alassaf

---

## 🇸🇦 العربية

### ما المشكلة التي يحلّها؟

شركات تركيب أنظمة المراقبة تخطّط عادةً على الورق أو ببرامج CAD عامة — مما يسبّب ثغرات في التغطية، أخطاء في حساب أطوال الكابلات، وتعديلات مكلفة في الموقع. **Camera Planner** يتيح لك رفع المخطط (صورة أو PDF)، وضع الكاميرات بمخاريط رؤية واقعية، رسم الكابلات، وتقديم خطة احترافية للعميل **قبل** التركيب.

### ✨ المميزات الرئيسية

- 📐 **رفع المخططات** — دعم JPG و PNG و **PDF متعدد الصفحات** مع نافذة اختيار الصفحة
- 📷 **وضع الكاميرات** — سحب وإفلات، تدوير، مخروط رؤية (30°–180°)، حساب FOV تلقائي حسب فتحة العدسة
- 🔄 **كاميرات 360°** بتغطية دائرية كاملة
- 📏 **مقياس واقعي** — معايرة من أي مسافة معروفة للحصول على قياسات دقيقة بالمتر
- 🔌 **ثلاثة أنواع كابلات** — كاميرا→DVR، جهاز→جهاز، كابل حر مع نقاط انعطاف بـ `Ctrl+Click`
- 🖥️ **إدارة الأجهزة** — DVR/NVR مع تتبع القنوات، Switches، Routers
- 💾 **حفظ/فتح المشاريع** — تصدير JSON واستعادة العمل بالكامل
- 🌙 **وضع داكن** متكامل
- 🌐 **واجهة عربية** بدعم RTL أصيل

### 🆓 النسخة المجانية مقابل النسخة الكاملة

| الميزة | 🆓 مفتوحة المصدر (هذا المستودع) | ⭐ النسخة الكاملة (للتواصل) |
|---|:---:|:---:|
| محرر المخططات (صور + PDF) | ✅ | ✅ |
| وضع الكاميرات وعرض التغطية | ✅ | ✅ |
| رسم الكابلات وحساب الأطوال | ✅ | ✅ |
| حفظ المشروع كملف JSON محلي | ✅ | ✅ |
| قاعدة بيانات سحابية وحسابات مستخدمين | ❌ | ✅ |
| أرشفة المشاريع ومشاركتها مع العملاء | ❌ | ✅ |
| تصدير تقارير PDF احترافية | ❌ | ✅ |
| لوحة تحكم وإحصائيات | ❌ | ✅ |
| دعم فني أولوي وتدريب الفريق | ❌ | ✅ |

> 📩 **النسخة الكاملة** (مع قاعدة البيانات، الحسابات متعددة المستخدمين، التقارير، ولوحات التحكم) متاحة عند الطلب — تواصل عبر [kosayalassaf@gmail.com](mailto:kosayalassaf@gmail.com) أو [pro-sss.com](https://pro-sss.com/).

### 🚀 البدء السريع

```bash
git clone https://github.com/kusaisssd/camera-planner.git
cd camera-planner
npm install
npm start
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

### 📜 الترخيص

[MIT](LICENSE) © 2026 Kosay Alassaf

---

## 👤 Author / المطوّر

**Kosay Alassaf** — Senior .NET Developer · Full-Stack & IT Infrastructure
📍 Gießen, Germany

[![GitHub](https://img.shields.io/badge/GitHub-kusaisssd-181717?style=flat&logo=github)](https://github.com/kusaisssd)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kosay_Assaf-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/kosay-assaf-58a91690)
[![Portfolio](https://img.shields.io/badge/Portfolio-kosayalassaf.github.io-008b8b?style=flat&logo=googlechrome&logoColor=white)](https://kosayalassaf.github.io/)
[![Pro S;](https://img.shields.io/badge/Company-Pro_S%3B-1a5f7a?style=flat)](https://pro-sss.com/)
[![Email](https://img.shields.io/badge/Email-kosayalassaf%40gmail.com-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:kosayalassaf@gmail.com)

> 15+ years building enterprise systems for NGOs, ministries, and educational institutions. Specializing in ASP.NET Core, C#, React, Azure, and applied machine learning.

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star!**

**⭐ إذا أعجبك المشروع، لا تنسَ وضع نجمة!**

</div>
