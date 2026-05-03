// components/BottomInfo.jsx
import React, { useState } from "react";

const BottomInfo = ({
  cameras,
  devices,
  pixelsPerMeter,
  isSettingScale,
  selectedCamera,
  cables,
  getTotalCableLength,
  isDrawingCable,
  cableType,
}) => {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <>
      {/* معلومات المقياس */}
      {pixelsPerMeter && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: window.innerWidth <= 768 ? "2rem" : "10rem",
            backgroundColor: "#16a34a",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
            zIndex: 1000,
          }}
        >
          ✓ المقياس: {pixelsPerMeter.toFixed(2)} بكسل/متر
        </div>
      )}

      {/* معلومات الإحصائيات */}
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          zIndex: 1000,
        }}
      >
        {/* عدد الكاميرات */}
        <div
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
          }}
        >
          📷 عدد الكاميرات: {cameras.length}
        </div>

        {/* عدد الأجهزة */}
        {devices && devices.length > 0 && (
          <div
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
            }}
          >
            🖥️ عدد الأجهزة: {devices.length}
          </div>
        )}

        {/* طول الكابلات */}
        {pixelsPerMeter && cables.length > 0 && (
          <div
            style={{
              backgroundColor: "#ec4899",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
            }}
          >
            📏 طول الكابلات: {getTotalCableLength().toFixed(2)} متر
          </div>
        )}
      </div>

      {/* التعليمات العادية */}
      {showInstructions && !isSettingScale && pixelsPerMeter && !selectedCamera && !isDrawingCable && (
        <div
          style={{
            position: "fixed",
            bottom: devices && devices.length > 0 ? (cables.length > 0 ? "12rem" : "11rem") : (cables.length > 0 ? "11rem" : "8rem"),
            left: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "1rem",
            paddingTop: "2rem",
            borderRadius: "0.75rem",
            maxWidth: "18rem",
            fontSize: "0.875rem",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setShowInstructions(false)}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              width: "24px",
              height: "24px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            ×
          </button>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#93c5fd" }}>
            📷 التعليمات:
          </div>
          <div style={{ lineHeight: "1.6" }}>
            <div>• انقر لإضافة كاميرا</div>
            <div>• اسحب الكاميرا للتحريك</div>
            <div>• اسحب 🔴 للتدوير</div>
            <div>• × للحذف</div>
            <div style={{ marginTop: "0.5rem", color: "#fbbf24" }}>
              • استخدم زر "إضافة جهاز" لإضافة DVR/NVR
            </div>
            <div style={{ color: "#a78bfa" }}>
              • استخدم زر 🔌 بجانب الكاميرا لربط كابل
            </div>
          </div>
        </div>
      )}

      {/* تعليمات وضع رسم الكابلات */}
      {showInstructions && isDrawingCable && (
        <div
          style={{
            position: "fixed",
            bottom: devices && devices.length > 0 ? (cables.length > 0 ? "12rem" : "11rem") : (cables.length > 0 ? "11rem" : "8rem"),
            left: "2rem",
            backgroundColor: "rgba(37, 99, 235, 0.95)",
            color: "white",
            padding: "1rem",
            paddingTop: "2rem",
            borderRadius: "0.75rem",
            maxWidth: "20rem",
            fontSize: "0.875rem",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setShowInstructions(false)}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              width: "24px",
              height: "24px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            ×
          </button>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#dbeafe" }}>
            🔌 وضع رسم الكابلات - {cableType === "camera" ? "📹 كاميرا" : cableType === "device" ? "🔌 أجهزة" : "📝 حر"}
          </div>
          <div style={{ lineHeight: "1.8" }}>
            {cableType === "camera" && (
              <>
                <div>• 1️⃣ اضغط زر 🔌 بجانب الكاميرا</div>
                <div>• 2️⃣ اضغط زر 🔌 بجانب DVR/NVR</div>
                <div>• 3️⃣ اختر رقم القناة</div>
              </>
            )}
            {cableType === "device" && (
              <>
                <div>• 1️⃣ اضغط زر 🔌 بجانب الجهاز الأول</div>
                <div>• 2️⃣ اضغط زر 🔌 بجانب الجهاز الثاني</div>
              </>
            )}
            {cableType === "free" && (
              <>
                <div>• 1️⃣ انقر في مكان البداية</div>
                <div>• 2️⃣ انقر في مكان النهاية</div>
              </>
            )}
            <div style={{ marginTop: "0.5rem", color: "#bfdbfe" }}>
              💡 Ctrl+Click لإضافة نقطة انعطاف
            </div>
          </div>
        </div>
      )}

      {/* زر إعادة إظهار التعليمات */}
      {!showInstructions && (
        <button
          onClick={() => setShowInstructions(true)}
          style={{
            position: "fixed",
            bottom: devices && devices.length > 0 ? (cables.length > 0 ? "12rem" : "11rem") : (cables.length > 0 ? "11rem" : "8rem"),
            left: "2rem",
            width: "40px",
            height: "40px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
          title="إظهار التعليمات"
        >
          ℹ️
        </button>
      )}
    </>
  );
};

export default BottomInfo;