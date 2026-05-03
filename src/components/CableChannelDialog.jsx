// components/CableChannelDialog.jsx
import React, { useState } from "react";

const CableChannelDialog = ({ isOpen, onClose, device, onSelectChannel }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  if (!isOpen || !device) return null;

  const handleSubmit = () => {
    if (selectedChannel === null) {
      alert("⚠️ يرجى اختيار قناة");
      return;
    }

    onSelectChannel(selectedChannel);
    setSelectedChannel(null);
    onClose();
  };

  // إنشاء قائمة القنوات المتاحة
  const availableChannels = [];
  for (let i = 1; i <= device.channels; i++) {
    availableChannels.push({
      number: i,
      isUsed: device.usedChannels && device.usedChannels[i],
      cameraName: device.usedChannels && device.usedChannels[i] ? device.usedChannels[i].cameraName : null,
    });
  }

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
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#1f2937",
            textAlign: "center",
          }}
        >
          📺 اختيار قناة
        </h2>

        <div
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          {device.name} ({device.type} - {device.channels} قناة)
        </div>

        {/* شبكة القنوات */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          {availableChannels.map((channel) => (
            <button
              key={channel.number}
              onClick={() => !channel.isUsed && setSelectedChannel(channel.number)}
              disabled={channel.isUsed}
              style={{
                padding: "1rem",
                border: `2px solid ${
                  selectedChannel === channel.number
                    ? "#10b981"
                    : channel.isUsed
                    ? "#e5e7eb"
                    : "#d1d5db"
                }`,
                borderRadius: "8px",
                backgroundColor: channel.isUsed
                  ? "#f3f4f6"
                  : selectedChannel === channel.number
                  ? "#d1fae5"
                  : "white",
                cursor: channel.isUsed ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                opacity: channel.isUsed ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!channel.isUsed && selectedChannel !== channel.number) {
                  e.target.style.backgroundColor = "#f0fdf4";
                  e.target.style.borderColor = "#10b981";
                }
              }}
              onMouseLeave={(e) => {
                if (!channel.isUsed && selectedChannel !== channel.number) {
                  e.target.style.backgroundColor = "white";
                  e.target.style.borderColor = "#d1d5db";
                }
              }}
            >
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: channel.isUsed ? "#9ca3af" : "#1f2937",
                }}
              >
                {channel.number}
              </div>
              {channel.isUsed && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#dc2626",
                    marginTop: "0.25rem",
                  }}
                  title={channel.cameraName}
                >
                  مستخدم
                </div>
              )}
            </button>
          ))}
        </div>

        {/* معلومات الاستخدام */}
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              color: "#374151",
            }}
          >
            <span>✅ القنوات المتاحة:</span>
            <span style={{ fontWeight: "bold" }}>
              {availableChannels.filter((ch) => !ch.isUsed).length} من {device.channels}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              color: "#374151",
              marginTop: "0.5rem",
            }}
          >
            <span>🔴 القنوات المستخدمة:</span>
            <span style={{ fontWeight: "bold" }}>
              {availableChannels.filter((ch) => ch.isUsed).length}
            </span>
          </div>
        </div>

        {/* الأزرار */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
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
            disabled={selectedChannel === null}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor: selectedChannel !== null ? "#10b981" : "#d1d5db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: selectedChannel !== null ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (selectedChannel !== null) {
                e.target.style.backgroundColor = "#059669";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedChannel !== null) {
                e.target.style.backgroundColor = "#10b981";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            ✅ تأكيد
          </button>
        </div>
      </div>
    </div>
  );
};

export default CableChannelDialog;