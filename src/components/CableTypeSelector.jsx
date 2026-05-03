// components/CableTypeSelector.jsx
import React, { useState, useEffect } from "react";

const CableTypeSelector = ({ cableType, onSelectType }) => {
  const [showFirstTimeMessage, setShowFirstTimeMessage] = useState(false);

  useEffect(() => {
    // التحقق من عرض الرسالة لأول مرة
    const hasSeenCableMessage = localStorage.getItem('hasSeenCableMessage');
    if (!hasSeenCableMessage) {
      setShowFirstTimeMessage(true);
    }
  }, []);

  const handleCloseMessage = () => {
    setShowFirstTimeMessage(false);
    localStorage.setItem('hasSeenCableMessage', 'true');
  };

  const types = [
    {
      id: "camera",
      name: "كابل كاميرا",
      icon: "📹",
      color: "#2563eb",
      description: "انقر على كاميرا ثم DVR/NVR",
    },
    {
      id: "device",
      name: "كابل أجهزة",
      icon: "🔌",
      color: "#10b981",
      description: "انقر على جهاز ثم جهاز آخر",
    },
    {
      id: "free",
      name: "كابل حر",
      icon: "📏",
      color: "#8b5cf6",
      description: "انقر في أي مكان مرتين",
    },
  ];

  return (
    <>
      {/* رسالة المرة الأولى */}
      {showFirstTimeMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10001,
            padding: "1rem",
          }}
          onClick={handleCloseMessage}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "2.5rem",
              maxWidth: "600px",
              width: "100%",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              🔌⚡
            </div>

            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: "#1f2937",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              مرحباً في وضع رسم الكابلات!
            </div>

            <div
              style={{
                fontSize: "1rem",
                color: "#374151",
                lineHeight: "1.8",
                marginBottom: "2rem",
                textAlign: "right",
              }}
            >
              <div style={{ 
                padding: "1.25rem", 
                backgroundColor: "#eff6ff", 
                borderRadius: "12px",
                border: "2px solid #2563eb",
                marginBottom: "1rem",
              }}>
                <strong style={{ color: "#2563eb", fontSize: "1.125rem" }}>
                  📌 أنواع الكابلات المتاحة:
                </strong>
                
                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>📹</span>
                    <div>
                      <strong>كابل كاميرا:</strong><br/>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        لربط الكاميرا بجهاز DVR/NVR
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>🔌</span>
                    <div>
                      <strong>كابل أجهزة:</strong><br/>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        لربط جهاز بجهاز آخر (Switch, Router, إلخ)
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>📏</span>
                    <div>
                      <strong>كابل حر:</strong><br/>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        لرسم مسار كابل بين نقطتين على المخطط
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: "1.25rem", 
                backgroundColor: "#fef3c7", 
                borderRadius: "12px",
                border: "2px solid #f59e0b",
              }}>
                <strong style={{ color: "#d97706", fontSize: "1.125rem" }}>
                  💡 نصيحة مهمة:
                </strong>
                <div style={{ marginTop: "0.75rem", fontSize: "0.95rem", color: "#78350f" }}>
                  <strong>للإضافة نقاط انعطاف</strong> (لرسم كابل غير مستقيم):<br/>
                  اضغط مع الاستمرار على <strong style={{ 
                    backgroundColor: "#fbbf24", 
                    padding: "0.25rem 0.5rem", 
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                  }}>Ctrl</strong> أثناء النقر على المخطط
                </div>
              </div>
            </div>

            <button
              onClick={handleCloseMessage}
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.125rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ✅  لنبدأ!
            </button>

            <div style={{ 
              textAlign: "center", 
              marginTop: "1rem", 
              fontSize: "0.75rem", 
              color: "#9ca3af" 
            }}>
              لن تظهر هذه الرسالة مرة أخرى
            </div>
          </div>
        </div>
      )}

      {/* محدد نوع الكابل */}
      <div
        style={{
          position: "absolute",
          top: "6rem",
          right: "2rem",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          borderRadius: "10px",
          padding: "0.75rem",
          zIndex: 1000,
          minWidth: "220px",
          maxWidth: "240px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          style={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "#93c5fd",
            marginBottom: "0.6rem",
            textAlign: "center",
          }}
        >
          🔌 اختر نوع الكابل
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.6rem",
                backgroundColor: cableType === type.id ? type.color : "rgba(255, 255, 255, 0.1)",
                border: `2px solid ${cableType === type.id ? type.color : "transparent"}`,
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "right",
              }}
              onMouseEnter={(e) => {
                if (cableType !== type.id) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.target.style.borderColor = type.color;
                }
              }}
              onMouseLeave={(e) => {
                if (cableType !== type.id) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.borderColor = "transparent";
                }
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>{type.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600", fontSize: "0.8rem" }}>{type.name}</div>
                <div style={{ fontSize: "0.65rem", opacity: 0.8 }}>{type.description}</div>
              </div>
              {cableType === type.id && (
                <span style={{ fontSize: "1.1rem" }}>✓</span>
              )}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: "0.6rem",
            padding: "0.6rem",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderRadius: "5px",
            fontSize: "0.65rem",
            color: "#93c5fd",
            lineHeight: "1.3",
          }}
        >
          💡 <strong>Ctrl+Click</strong> لنقاط انعطاف
        </div>
      </div>
    </>
  );
};

export default CableTypeSelector;