// components/DeviceDialog.jsx
import React, { useState } from "react";

const DeviceDialog = ({ isOpen, onClose, onAdd }) => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("DVR");
  const [channels, setChannels] = useState(8);

  const handleSubmit = () => {
    if (!deviceName.trim()) {
      alert("⚠️ يرجى إدخال اسم الجهاز");
      return;
    }

    onAdd({
      name: deviceName,
      type: deviceType,
      channels: deviceType === "DVR" || deviceType === "NVR" ? channels : 0,
      usedChannels: {},
    });

    setDeviceName("");
    setDeviceType("DVR");
    setChannels(8);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#1f2937",
            textAlign: "center",
          }}
        >
          🖥️ إضافة جهاز جديد
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* اسم الجهاز */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#374151",
              }}
            >
              📝 اسم الجهاز
            </label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="مثال: DVR الطابق الأول"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          {/* نوع الجهاز */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#374151",
              }}
            >
              🔧 نوع الجهاز
            </label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "#f9fafb",
                color: "#111827",
              }}
            >
              <option value="DVR" style={{backgroundColor: "white", color: "#111827"}}>📹 DVR - مسجل فيديو رقمي</option>
              <option value="NVR" style={{backgroundColor: "white", color: "#111827"}}>🌐 NVR - مسجل شبكة</option>
              <option value="Switch" style={{backgroundColor: "white", color: "#111827"}}>🔀 Switch - محول شبكة</option>
              <option value="Router" style={{backgroundColor: "white", color: "#111827"}}>📡 Router - موجه</option>
            </select>
          </div>

          {/* عدد القنوات */}
          {(deviceType === "DVR" || deviceType === "NVR") && (
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#374151",
                }}
              >
                📊 عدد القنوات
              </label>
              <select
                value={channels}
                onChange={(e) => setChannels(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: "#f9fafb",
                  color: "#111827",
                }}
              >
                <option value={4} style={{backgroundColor: "white", color: "#111827"}}>4 قنوات</option>
                <option value={8} style={{backgroundColor: "white", color: "#111827"}}>8 قنوات</option>
                <option value={16} style={{backgroundColor: "white", color: "#111827"}}>16 قناة</option>
                <option value={24} style={{backgroundColor: "white", color: "#111827"}}>24 قناة</option>
                <option value={32} style={{backgroundColor: "white", color: "#111827"}}>32 قناة</option>
                <option value={36} style={{backgroundColor: "white", color: "#111827"}}>36 قناة</option>
                <option value={48} style={{backgroundColor: "white", color: "#111827"}}>48 قناة</option>
                <option value={64} style={{backgroundColor: "white", color: "#111827"}}>64 قناة</option>
              </select>
            </div>
          )}

          {/* الأزرار */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#4b5563";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#6b7280";
                e.target.style.transform = "translateY(0)";
              }}
            >
              ❌ إلغاء
            </button>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#059669";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#10b981";
                e.target.style.transform = "translateY(0)";
              }}
            >
              ✅ إضافة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDialog;