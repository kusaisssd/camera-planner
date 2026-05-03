// src/components/TopButtons.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

const TopButtons = ({
  fileInputRef,
  projectFileInputRef,
  setShowScaleSetup,
  pixelsPerMeter,
  planContainerRef,
  isExporting,
  setIsExporting,
  imageLoaded,
  projectName,
  setShowProjectNameDialog,
  onSaveProject,
  cameras,
  devices,
  cables,
  getTotalCableLength,
}) => {
  const { colors } = useTheme();

  const exportAsImage = () => {
    // رسالة أن الميزة غير متاحة في النسخة التجريبية
    const message = `
╔════════════════════════════════════╗
║                                    ║
║        🚧 ميزة غير متاحة 🚧        ║
║                                    ║
╚════════════════════════════════════╝

📸 حفظ المخطط كصورة غير متاح حالياً 
   في النسخة التجريبية.

✨ ستتوفر هذه الميزة قريباً في 
   التحديثات القادمة!

💡 في الوقت الحالي، يمكنك:
   • حفظ المشروع كملف JSON
   • التقاط لقطة شاشة يدوياً
   • انتظار التحديث القادم

شكراً لتفهمكم! 🙏
    `.trim();

    alert(message);
  };

  const buttonStyle = (bgColor, disabled = false) => ({
    padding: "0.75rem 1.5rem",
    backgroundColor: disabled ? "#9ca3af" : bgColor,
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "0.875rem",
    fontWeight: "600",
    transition: "all 0.2s",
    opacity: disabled ? 0.6 : 1,
    whiteSpace: "nowrap",
  });

  return (
    <>
      {/* شريط الأدوات العلوي */}
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: 0,
          right: 0,
          backgroundColor: colors.surface || colors.bg,
          borderBottom: `1px solid ${colors.border}`,
          zIndex: 9999,
          padding: "1rem 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          {/* اسم المشروع */}
          <div
            onClick={() => setShowProjectNameDialog(true)}
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: colors.text,
              cursor: "pointer",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.border;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            📋 {projectName}
          </div>

          {/* الأزرار الرئيسية */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {/* فتح مشروع */}
            <button
              onClick={() => projectFileInputRef.current.click()}
              style={buttonStyle("#8b5cf6")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#7c3aed";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#8b5cf6";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              📂 فتح مشروع
            </button>

            {/* حفظ المشروع */}
            <button
              onClick={onSaveProject}
              disabled={!imageLoaded}
              style={buttonStyle("#ec4899", !imageLoaded)}
              onMouseEnter={(e) => {
                if (imageLoaded) {
                  e.currentTarget.style.backgroundColor = "#db2777";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (imageLoaded) {
                  e.currentTarget.style.backgroundColor = "#ec4899";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              💾 حفظ المشروع
            </button>

            {/* تحميل مخطط */}
            <button
              onClick={() => fileInputRef.current.click()}
              style={buttonStyle("#3b82f6")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              📐 رفع مخطط
            </button>

            {/* تحديد المقياس */}
            <button
              onClick={() => setShowScaleSetup(true)}
              style={buttonStyle("#f59e0b")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d97706";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f59e0b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              📏 {pixelsPerMeter ? "تعديل المقياس" : "تحديد المقياس"}
            </button>

            {/* حفظ كصورة */}
            <button
              onClick={exportAsImage}
              disabled={isExporting || !imageLoaded}
              style={buttonStyle("#10b981", isExporting || !imageLoaded)}
              onMouseEnter={(e) => {
                if (!isExporting && imageLoaded) {
                  e.currentTarget.style.backgroundColor = "#059669";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isExporting && imageLoaded) {
                  e.currentTarget.style.backgroundColor = "#10b981";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {isExporting ? "⏳ جاري..." : "🖼️ حفظ كصورة"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopButtons;