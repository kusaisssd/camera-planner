// src/components/EditionBanner.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

const EditionBanner = ({ compact = false }) => {
  const { colors, isDark } = useTheme();

  return (
    <div
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(0, 139, 139, 0.15) 0%, rgba(32, 178, 170, 0.1) 100%)"
          : "linear-gradient(135deg, rgba(0, 139, 139, 0.08) 0%, rgba(32, 178, 170, 0.05) 100%)",
        border: `2px solid ${colors.tealAlphaStrong}`,
        borderRadius: "16px",
        padding: compact ? "1.5rem" : "2rem",
        margin: compact ? "1rem 0" : "2rem auto",
        maxWidth: compact ? "100%" : "1100px",
        direction: "rtl",
        textAlign: "right",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "0.35rem 0.85rem",
            borderRadius: "999px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          🆓 OPEN SOURCE
        </span>
        <h3
          style={{
            fontSize: compact ? "1.15rem" : "1.4rem",
            fontWeight: "bold",
            color: colors.text,
            margin: 0,
          }}>
          النسخة المجانية مفتوحة المصدر
        </h3>
      </div>

      <p
        style={{
          color: colors.textSecondary,
          fontSize: compact ? "0.9rem" : "1rem",
          lineHeight: "1.8",
          marginBottom: "1.25rem",
        }}
      >
        النسخة التي تستخدمها الآن{" "}
        <strong style={{ color: colors.teal }}>مجانية بالكامل ومتاحة للعموم</strong> —
        تعمل في المتصفح بدون تسجيل، وكل بيانات مشروعك تبقى على جهازك.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
            padding: "1rem",
            borderRadius: "10px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              color: "#10b981",
              fontSize: "0.95rem",
              marginBottom: "0.5rem",
            }}
          >
            ✅ ما يتوفر في النسخة المجانية
          </div>
          <ul
            style={{
              margin: 0,
              paddingRight: "1.2rem",
              color: colors.textSecondary,
              fontSize: "0.85rem",
              lineHeight: "1.9",
            }}
          >
            <li>تخطيط الكاميرات وعرض التغطية</li>
            <li>دعم رفع PDF واختيار الصفحة</li>
            <li>رسم الكابلات وحساب الأطوال</li>
            <li>حفظ المشروع كملف JSON محلي</li>
            <li>دعم الوضع الداكن وواجهة عربية</li>
          </ul>
        </div>

        <div
          style={{
            background: isDark ? "rgba(0,139,139,0.12)" : "rgba(0,139,139,0.06)",
            padding: "1rem",
            borderRadius: "10px",
            border: `1px solid ${colors.tealAlphaStrong}`,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              color: colors.teal,
              fontSize: "0.95rem",
              marginBottom: "0.5rem",
            }}
          >
            ⭐ النسخة الكاملة (للتواصل)
          </div>
          <ul
            style={{
              margin: 0,
              paddingRight: "1.2rem",
              color: colors.textSecondary,
              fontSize: "0.85rem",
              lineHeight: "1.9",
            }}
          >
            <li>قاعدة بيانات سحابية وحسابات مستخدمين</li>
            <li>أرشفة المشاريع ومشاركتها مع العملاء</li>
            <li>تقارير مفصلة وتصدير PDF احترافي</li>
            <li>داشبورد إدارة وإحصائيات</li>
            <li>دعم فني أولوي وتدريب الفريق</li>
          </ul>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <a
          href="mailto:kosayalassaf@gmail.com?subject=Camera%20Planner%20-%20%D8%A7%D9%84%D9%86%D8%B3%D8%AE%D8%A9%20%D8%A7%D9%84%D9%83%D8%A7%D9%85%D9%84%D8%A9"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealLight})`,
            color: "white",
            borderRadius: "10px",
            fontSize: "0.95rem",
            fontWeight: "600",
            textDecoration: "none",
            boxShadow: `0 4px 12px ${colors.tealAlphaStrong}`,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 6px 16px ${colors.tealAlphaStrong}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 4px 12px ${colors.tealAlphaStrong}`;
          }}
        >
          📧 تواصل للنسخة الكاملة
        </a>

        <a
          href="https://github.com/kusaisssd/camera-planner"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "transparent",
            color: colors.text,
            border: `2px solid ${colors.border}`,
            borderRadius: "10px",
            fontSize: "0.95rem",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.teal;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🐙 الكود المصدري على GitHub
        </a>
      </div>
    </div>
  );
};

export default EditionBanner;
