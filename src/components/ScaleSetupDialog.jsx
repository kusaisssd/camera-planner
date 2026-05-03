// src/components/ScaleSetupDialog.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ScaleSetupDialog = ({
  showScaleSetup,
  setShowScaleSetup,
  scaleDistance,
  setScaleDistance,
  isSettingScale,
  setIsSettingScale,
  scalePoints,
  setScalePoints,
  projectName,
  onSaveProjectName,
}) => {
  const { colors } = useTheme();
  const [step, setStep] = useState(1); // 1: اسم المشروع والمسافة، 2: تحديد النقاط
  const [tempProjectName, setTempProjectName] = useState(projectName || "مشروع جديد");
  const [tempDistance, setTempDistance] = useState(scaleDistance || 5);

  useEffect(() => {
    if (showScaleSetup) {
      setStep(1);
      setTempProjectName(projectName || "مشروع جديد");
      setTempDistance(scaleDistance || 5);
    }
  }, [showScaleSetup, projectName, scaleDistance]);

  const handleNext = () => {
    if (step === 1) {
      // حفظ اسم المشروع والمسافة
      onSaveProjectName(tempProjectName);
      setScaleDistance(tempDistance);
      setStep(2);
    }
  };

  const handleStartScaleSetting = () => {
    setIsSettingScale(true);
    setScalePoints([]);
    setShowScaleSetup(false);
    setStep(1);
  };

  const handleCancel = () => {
    setShowScaleSetup(false);
    setIsSettingScale(false);
    setScalePoints([]);
    setStep(1);
  };

  if (!showScaleSetup) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        padding: "1rem",
      }}
      onClick={handleCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: colors.surface || colors.bg,
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          border: `1px solid ${colors.border}`,
        }}
      >
        {step === 1 ? (
          // الخطوة الأولى: اسم المشروع والمسافة
          <>
            <div style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: colors.text,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}>
              📋 إعداد المشروع والمقياس
            </div>

            {/* اسم المشروع */}
            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: "0.75rem",
                }}
              >
                📝 اسم المشروع:
              </label>
              <input
                type="text"
                value={tempProjectName}
                onChange={(e) => setTempProjectName(e.target.value)}
                placeholder="أدخل اسم المشروع..."
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  fontSize: "1rem",
                  border: `2px solid ${colors.border}`,
                  borderRadius: "0.5rem",
                  backgroundColor: colors.surface || colors.bg,
                  color: colors.text,
                  textAlign: "right",
                  boxSizing: "border-box",
                }}
              />
              <div style={{
                fontSize: "0.75rem",
                color: colors.textSecondary,
                marginTop: "0.5rem",
                textAlign: "right",
              }}>
                💡 يمكنك تعديل اسم المشروع لاحقاً من الزاوية العلوية
              </div>
            </div>

            {/* المسافة المعروفة */}
            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: "0.75rem",
                }}
              >
                📏 المسافة المعروفة على المخطط (بالمتر):
              </label>
              <input
                type="number"
                value={tempDistance}
                onChange={(e) => setTempDistance(parseFloat(e.target.value) || 1)}
                min="0.1"
                step="0.1"
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  fontSize: "1rem",
                  border: `2px solid ${colors.border}`,
                  borderRadius: "0.5rem",
                  backgroundColor: colors.surface || colors.bg,
                  color: colors.text,
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              />
              <div style={{
                fontSize: "0.875rem",
                color: colors.textSecondary,
                marginTop: "0.75rem",
                padding: "1rem",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderRadius: "0.5rem",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                textAlign: "right",
                lineHeight: "1.6",
              }}>
                <strong style={{ color: "#3b82f6" }}>💡 كيفية تحديد المقياس:</strong><br/>
                1️⃣ اختر مسافة تعرفها على المخطط (مثلاً: 5 متر، 1 متر، أو 10 متر)<br/>
                2️⃣ في الخطوة التالية، ستحدد هذه المسافة على المخطط<br/>
                3️⃣ اضغط على نقطة البداية ثم نقطة النهاية للمسافة المعروفة<br/>
                4️⃣ سيتم حساب المقياس تلقائياً بناءً على هذه المسافة
              </div>
            </div>

            {/* أمثلة */}
            <div style={{
              padding: "1rem",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderRadius: "0.5rem",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              marginBottom: "2rem",
            }}>
              <div style={{
                fontSize: "0.875rem",
                color: colors.text,
                textAlign: "right",
                lineHeight: "1.6",
              }}>
                <strong style={{ color: "#10b981" }}>📐 أمثلة شائعة:</strong><br/>
                • عرض باب قياسي = 1 متر<br/>
                • عرض غرفة صغيرة = 3 متر<br/>
                • طول جدار = 5 متر<br/>
                • طول ممر = 10 متر
              </div>
            </div>

            {/* الأزرار */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleCancel}
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4b5563";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#6b7280";
                }}
              >
                ✖️ إلغاء
              </button>
              <button
                onClick={handleNext}
                disabled={!tempProjectName.trim() || tempDistance <= 0}
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  backgroundColor: tempProjectName.trim() && tempDistance > 0 ? "#3b82f6" : "#9ca3af",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: tempProjectName.trim() && tempDistance > 0 ? "pointer" : "not-allowed",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  opacity: tempProjectName.trim() && tempDistance > 0 ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (tempProjectName.trim() && tempDistance > 0) {
                    e.currentTarget.style.backgroundColor = "#2563eb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (tempProjectName.trim() && tempDistance > 0) {
                    e.currentTarget.style.backgroundColor = "#3b82f6";
                  }
                }}
              >
                ⬅️ التالي
              </button>
            </div>
          </>
        ) : (
          // الخطوة الثانية: تحديد النقاط على المخطط
          <>
            <div style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: colors.text,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}>
              🎯 تحديد المسافة على المخطط
            </div>

            <div style={{
              padding: "1.5rem",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderRadius: "0.75rem",
              border: "2px solid rgba(59, 130, 246, 0.3)",
              marginBottom: "2rem",
              textAlign: "right",
            }}>
              <div style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#3b82f6",
                marginBottom: "1rem",
              }}>
                📏 المسافة المطلوبة: {tempDistance} متر
              </div>
              <div style={{
                fontSize: "0.875rem",
                color: colors.text,
                lineHeight: "1.8",
              }}>
                <strong>✅ الخطوات:</strong><br/>
                1️⃣ اضغط على <strong>نقطة البداية</strong> للمسافة المعروفة على المخطط<br/>
                2️⃣ اضغط على <strong>نقطة النهاية</strong> لنفس المسافة<br/>
                3️⃣ سيتم حساب المقياس تلقائياً ✨
              </div>
            </div>

            <div style={{
              padding: "1rem",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              borderRadius: "0.5rem",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              marginBottom: "2rem",
              textAlign: "right",
            }}>
              <div style={{
                fontSize: "0.875rem",
                color: colors.text,
                lineHeight: "1.6",
              }}>
                <strong style={{ color: "#f59e0b" }}>⚠️ ملاحظات مهمة:</strong><br/>
                • اختر مسافة واضحة وسهلة القياس على المخطط<br/>
                • تأكد من دقة النقطتين للحصول على مقياس صحيح<br/>
                • يمكن إعادة ضبط المقياس لاحقاً إذا لزم الأمر
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4b5563";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#6b7280";
                }}
              >
                ⬅️ رجوع
              </button>
              <button
                onClick={handleStartScaleSetting}
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#059669";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#10b981";
                }}
              >
                ✅ ابدأ التحديد على المخطط
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScaleSetupDialog;