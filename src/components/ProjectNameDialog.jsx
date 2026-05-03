// src/components/ProjectNameDialog.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ProjectNameDialog = ({ isOpen, onClose, currentName, onSave }) => {
  const { colors } = useTheme();
  const [projectName, setProjectName] = useState(currentName);

  useEffect(() => {
    setProjectName(currentName);
  }, [currentName, isOpen]);

  const handleSave = () => {
    if (projectName.trim()) {
      onSave(projectName.trim());
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onClose();
    }
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
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: colors.cardBg,
          borderRadius: "1rem",
          padding: "2rem",
          width: "90%",
          maxWidth: "450px",
          boxShadow: `0 25px 50px ${colors.shadow}`,
          border: `1px solid ${colors.tealAlphaStrong}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontSize: "1.75rem",
            }}
          >
            📝
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            اسم المشروع
          </h2>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: colors.textSecondary,
              fontWeight: "500",
            }}
          >
            أدخل اسماً مميزاً لمشروعك
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="مثال: منزل أحمد، مكتب الشركة..."
            autoFocus
            maxLength={50}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: `2px solid ${colors.border}`,
              backgroundColor: colors.surface,
              color: colors.text,
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.2s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.teal;
              e.target.style.boxShadow = `0 0 0 3px ${colors.tealAlpha}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border;
              e.target.style.boxShadow = "none";
            }}
          />
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.75rem",
              color: colors.textTertiary,
              textAlign: "right",
            }}
          >
            {projectName.length}/50 حرف
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "0.625rem 1.5rem",
              borderRadius: "0.5rem",
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.surface,
              color: colors.text,
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.surface;
            }}
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            disabled={!projectName.trim()}
            style={{
              padding: "0.625rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: projectName.trim() ? colors.teal : colors.border,
              color: "white",
              cursor: projectName.trim() ? "pointer" : "not-allowed",
              fontWeight: "600",
              fontSize: "0.95rem",
              transition: "all 0.2s ease",
              opacity: projectName.trim() ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (projectName.trim()) {
                e.currentTarget.style.backgroundColor = colors.tealLight;
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = projectName.trim()
                ? colors.teal
                : colors.border;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ✓ حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectNameDialog;