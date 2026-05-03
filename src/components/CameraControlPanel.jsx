// components/CameraControlPanel.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const CameraControlPanel = ({
  selectedCamera,
  pixelsPerMeter,
  updateCameraProperty,
}) => {
  const { colors } = useTheme();
  const [aperture, setAperture] = useState(selectedCamera?.aperture || 2.8);
  const [fov, setFov] = useState(selectedCamera?.fov || 110);
  const [depth, setDepth] = useState(selectedCamera?.depth || 100);
  const [is360, setIs360] = useState(selectedCamera?.camera360 || false);
  const [description, setDescription] = useState(selectedCamera?.description || "");
  const [ipAddress, setIpAddress] = useState(selectedCamera?.ipAddress || "");
  const [username, setUsername] = useState(selectedCamera?.username || "");
  const [password, setPassword] = useState(selectedCamera?.password || "");

  useEffect(() => {
    if (selectedCamera) {
      setAperture(selectedCamera.aperture);
      setFov(selectedCamera.fov);
      setDepth(selectedCamera.depth);
      setIs360(selectedCamera.camera360 || false);
      setDescription(selectedCamera.description || "");
      setIpAddress(selectedCamera.ipAddress || "");
      setUsername(selectedCamera.username || "");
      setPassword(selectedCamera.password || "");
    }
  }, [selectedCamera]);

  if (!selectedCamera || !pixelsPerMeter) return null;

  const pixelsToMeters = (pixels) => {
    return (pixels / pixelsPerMeter).toFixed(2);
  };

  const handleApertureClick = (ap) => {
    setAperture(ap);
    updateCameraProperty(selectedCamera.id, "aperture", ap);
    
    const newFov = Math.round(180 - (ap * 25));
    setFov(newFov);
    updateCameraProperty(selectedCamera.id, "fov", newFov);
  };

  const handleFovChange = (e) => {
    const value = parseFloat(e.target.value);
    setFov(value);
    updateCameraProperty(selectedCamera.id, "fov", value);
  };

  const handleDepthChange = (e) => {
    const value = parseFloat(e.target.value);
    setDepth(value);
    updateCameraProperty(selectedCamera.id, "depth", value);
  };

  const handle360Toggle = () => {
    const newIs360 = !is360;
    setIs360(newIs360);
    updateCameraProperty(selectedCamera.id, "camera360", newIs360);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    updateCameraProperty(selectedCamera.id, "description", value);
  };

  const handleIpChange = (e) => {
    const value = e.target.value;
    setIpAddress(value);
    updateCameraProperty(selectedCamera.id, "ipAddress", value);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    updateCameraProperty(selectedCamera.id, "username", value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    updateCameraProperty(selectedCamera.id, "password", value);
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 139, 139, 0.1)",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        border: "1px solid rgba(0, 139, 139, 0.3)",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#008b8b",
          fontSize: "1rem",
        }}
      >
        ⚙️ إعدادات الكاميرا: {selectedCamera.name}
      </div>

      <div style={{ display: "grid", gap: "1.2rem" }}>
        {/* كاميرا 360 */}
        <div>
          <label style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.5rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500"
          }}>
            <input
              type="checkbox"
              checked={is360}
              onChange={handle360Toggle}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: "#008b8b",
              }}
            />
            🔄 كاميرا 360 درجة
          </label>
        </div>

        {/* فتحة العدسة */}
        {!is360 && (
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.75rem", fontWeight: "500" }}>
              📷 فتحة العدسة: f/{aperture}
            </label>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {[1.4, 1.8, 2.8, 4, 5.6, 8].map((ap) => (
                <button
                  key={ap}
                  onClick={() => handleApertureClick(ap)}
                  style={{
                    padding: "0.4rem 0.7rem",
                    borderRadius: "0.375rem",
                    border: aperture === ap ? "2px solid #008b8b" : "1px solid #374151",
                    backgroundColor: aperture === ap ? "#006666" : "#1f2937",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    transition: "all 0.2s ease",
                    fontWeight: aperture === ap ? "600" : "400",
                  }}
                  onMouseEnter={(e) => {
                    if (aperture !== ap) {
                      e.currentTarget.style.backgroundColor = "#2d4a4a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = aperture === ap ? "#006666" : "#1f2937";
                  }}
                >
                  f/{ap}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* زاوية الرؤية */}
        {!is360 && (
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>
              📐 زاوية الرؤية: {Math.round(fov)}°
            </label>
            <input
              type="range"
              min="30"
              max="180"
              value={fov}
              onChange={handleFovChange}
              style={{ 
                width: "100%", 
                cursor: "pointer",
                accentColor: "#008b8b",
                height: "6px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>
              <span>30°</span>
              <span>180°</span>
            </div>
          </div>
        )}

        {/* عمق التغطية */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>
            📏 {is360 ? "نصف قطر التغطية" : "عمق التغطية"}: {pixelsToMeters(depth)} متر
          </label>
          <input
            type="range"
            min="50"
            max="300"
            value={depth}
            onChange={handleDepthChange}
            style={{ 
              width: "100%", 
              cursor: "pointer",
              accentColor: "#008b8b",
              height: "6px",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>
            <span>{pixelsToMeters(50)}م</span>
            <span>{pixelsToMeters(300)}م</span>
          </div>
        </div>

        {/* خط فاصل */}
        <div style={{ 
          height: "1px", 
          backgroundColor: "rgba(0, 139, 139, 0.3)",
          margin: "0.5rem 0"
        }} />

        {/* توصيف سريع */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>
            📝 توصيف سريع
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="مثال: كاميرا مدخل المبنى الرئيسي..."
            style={{
              width: "100%",
              minHeight: "60px",
              padding: "0.5rem",
              backgroundColor: colors.surface || "#1f2937",
              color: colors.text || "white",
              border: `1px solid ${colors.border || "#374151"}`,
              borderRadius: "0.375rem",
              fontSize: "0.75rem",
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* عنوان IP أو Serial */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>
            🌐 عنوان IP / Serial
          </label>
          <input
            type="text"
            value={ipAddress}
            onChange={handleIpChange}
            placeholder="مثال: 192.168.1.100 أو SN123456"
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: colors.surface || "#1f2937",
              color: colors.text || "white",
              border: `1px solid ${colors.border || "#374151"}`,
              borderRadius: "0.375rem",
              fontSize: "0.75rem",
            }}
          />
        </div>

        {/* معلومات الدخول */}
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>
            👤 اسم المستخدم
          </label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="مثال: admin"
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: colors.surface || "#1f2937",
              color: colors.text || "white",
              border: `1px solid ${colors.border || "#374151"}`,
              borderRadius: "0.375rem",
              fontSize: "0.75rem",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", fontWeight: "500" }}>
            🔒 كلمة المرور
          </label>
          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
            placeholder="أدخل كلمة المرور..."
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: colors.surface || "#1f2937",
              color: colors.text || "white",
              border: `1px solid ${colors.border || "#374151"}`,
              borderRadius: "0.375rem",
              fontSize: "0.75rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CameraControlPanel;