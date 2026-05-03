# Contributing to Camera Planner

Thank you for your interest in contributing! / شكراً لاهتمامك بالمساهمة!

## 🚀 Getting Started

```bash
git clone https://github.com/kusaisssd/camera-planner.git
cd camera-planner
npm install
npm start
```

## 🌿 Branch Naming

- `feat/short-description` — new features
- `fix/short-description` — bug fixes
- `docs/short-description` — documentation only
- `refactor/short-description` — code improvements without behavior change

## 📝 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add PDF page selector
fix: prevent navigation with unsaved work
docs: update README with screenshots
refactor: extract cable rendering to separate component
```

## 🔁 Pull Request Process

1. Fork the repo and create your branch from `main`
2. Make your changes — keep PRs focused (one feature/fix per PR)
3. Test manually in the browser — ensure no console errors
4. Run `npm run build` to confirm production build succeeds
5. Update `README.md` if you change user-facing behavior
6. Open a PR using the template — fill in the checklist

## 🎨 Code Style

- **Components**: PascalCase (`CameraElement.jsx`)
- **Functions/variables**: camelCase
- **Inline styles** are the project convention — keep them readable
- **Comments**: Arabic or English, both are fine. Explain *why*, not *what*
- **No emoji-only commits** — be descriptive

## 🐛 Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md). Include browser, OS, and steps to reproduce.

## 💡 Suggesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md). Explain the problem first, then your proposed solution.

---

## 🤝 المساهمة بالعربية

نرحّب بأي مساهمة! اتبع نفس الخطوات أعلاه:

1. **Fork** المستودع وأنشئ branch جديدة
2. اكتب رسائل commit واضحة بصيغة Conventional Commits
3. اختبر تغييراتك يدوياً قبل فتح PR
4. تأكد من نجاح `npm run build`
5. افتح PR واملأ القالب

شكراً لجعل Camera Planner أفضل! 🙏
