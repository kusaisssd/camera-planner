// components/CameraElement.jsx
import React, { useState } from "react";

const CameraElement = ({
  camera,
  isSelected,
  percentageToPixels,
  setSelectedId,
  setIsDragging,
  setIsRotating,
  setHasInteracted,
  deleteCamera,
  updateCameraProperty,
  isExporting,
  isDrawingCable,
  cableType,
  currentCablePoints,
  setCurrentCablePoints,
  mousePosition,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(camera.name || "");

  const pixelX = percentageToPixels(camera.x, "x");
  const pixelY = percentageToPixels(camera.y, "y");

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (updateCameraProperty && nameValue !== camera.name) {
      updateCameraProperty(camera.id, "name", nameValue);
    }
  };

  const handleNameClick = (e) => {
    e.stopPropagation();
    if (!isDrawingCable) {
      setIsEditing(true);
      setSelectedId(camera.id);
      setNameValue(camera.name || "");
    }
  };

  const handleStartCable = (e) => {
    e.stopPropagation();
    
    if (cableType === 'camera') {
      setCurrentCablePoints([{ 
        x: camera.x, 
        y: camera.y,
        fromId: camera.id,
        fromType: 'camera'
      }]);
    }
  };

  const isCameraCableActive = isDrawingCable && cableType === 'camera' && 
                              currentCablePoints.length > 0 && 
                              currentCablePoints[0].fromId === camera.id;

  return (
    <>
      {/* الخط الشبحي للكابل */}
      {isCameraCableActive && mousePosition && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          {currentCablePoints.map((point, index) => {
            const pointX = percentageToPixels(point.x, "x");
            const pointY = percentageToPixels(point.y, "y");
            const nextX = index === currentCablePoints.length - 1 
              ? mousePosition.x 
              : percentageToPixels(currentCablePoints[index + 1].x, "x");
            const nextY = index === currentCablePoints.length - 1 
              ? mousePosition.y 
              : percentageToPixels(currentCablePoints[index + 1].y, "y");
            
            return (
              <line
                key={index}
                x1={pointX}
                y1={pointY}
                x2={nextX}
                y2={nextY}
                stroke="#2563eb"
                strokeWidth="3"
                strokeDasharray="8,4"
                opacity="0.6"
              />
            );
          })}
        </svg>
      )}

      <div
        className="camera-point"
        data-camera-id={camera.id}
        onClick={(e) => {
          e.stopPropagation();
          if (!isDrawingCable) {
            setSelectedId(camera.id);
          }
        }}
        onMouseDown={(e) => {
          if (!isDrawingCable) {
            e.stopPropagation();
            setIsDragging(true);
          }
        }}
        onTouchStart={(e) => {
          if (!isDrawingCable) {
            e.stopPropagation();
            setIsDragging(true);
          }
        }}
        style={{
          position: "absolute",
          left: `${pixelX}px`,
          top: `${pixelY}px`,
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          userSelect: "none",
          zIndex: isSelected ? 105 : 100,
        }}
      >
        <div
          style={{
            width: `${camera.cameraSize || 36}px`,
            height: `${camera.cameraSize || 36}px`,
            backgroundColor: "#008b8b",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            border: isSelected ? "3px solid white" : "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: isSelected
              ? "0 0 0 3px #008b8b, 0 8px 16px rgba(0,0,0,0.3)"
              : "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.2s",
          }}
        >
          📷
        </div>

        {isEditing ? (
          <input
            type="text"
            value={nameValue}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNameBlur();
            }}
            autoFocus
            style={{
              position: "absolute",
              top: `${(camera.cameraSize || 36) / 2 + 8}px`,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0.25rem 0.75rem",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.5)",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: "600",
              whiteSpace: "nowrap",
              maxWidth: "150px",
              textAlign: "center",
              outline: "none",
            }}
            placeholder="اسم الكاميرا..."
          />
        ) : (
          <div
            onClick={handleNameClick}
            style={{
              position: "absolute",
              top: `${(camera.cameraSize || 36) / 2 + 8}px`,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0.25rem 0.75rem",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              fontSize: "0.75rem",
              borderRadius: "6px",
              fontWeight: "600",
              whiteSpace: "nowrap",
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: isDrawingCable ? "default" : "pointer",
            }}
          >
            {nameValue || camera.name}
          </div>
        )}

        {isSelected && !isExporting && !isDrawingCable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`هل تريد حذف الكاميرا "${camera.name}"؟`)) {
                deleteCamera(camera.id);
              }
            }}
            style={{
              position: "absolute",
              top: "-12px",
              right: "-12px",
              width: "26px",
              height: "26px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "2px solid white",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              zIndex: 106,
            }}
          >
            ×
          </button>
        )}

        {isSelected && !isExporting && !camera.camera360 && !isDrawingCable && (
          <>
            {/* خط واصل من الكاميرا إلى زر التدوير */}
            <svg
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100px",
                height: "100px",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 104,
              }}
            >
              <line
                x1="50"
                y1="50"
                x2={50 + 35 * Math.cos(camera.angle * (Math.PI / 180))}
                y2={50 + 35 * Math.sin(camera.angle * (Math.PI / 180))}
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="4,2"
                opacity="0.6"
              />
            </svg>
            
            {/* زر التدوير */}
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsRotating(true);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                setIsRotating(true);
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate(${35 * Math.cos(camera.angle * (Math.PI / 180))}px, ${35 * Math.sin(camera.angle * (Math.PI / 180))}px)`,
                width: "28px",
                height: "28px",
                backgroundColor: "#ffffff",
                color: "#3b82f6",
                border: "2px solid #3b82f6",
                borderRadius: "50%",
                cursor: "grab",
                fontSize: "16px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                zIndex: 106,
              }}
            >
              ↻
            </div>
          </>
        )}

        {!isExporting && cableType === 'camera' && isDrawingCable && (
          <button
            onClick={handleStartCable}
            style={{
              position: "absolute",
              bottom: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "28px",
              height: "28px",
              backgroundColor: isCameraCableActive ? "#2563eb" : "#ec4899",
              color: "white",
              border: "2px solid white",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              boxShadow: isCameraCableActive
                ? "0 0 12px rgba(37, 99, 235, 0.8)"
                : "0 2px 8px rgba(0,0,0,0.3)",
              zIndex: 106,
              animation: isCameraCableActive ? "pulse 1.5s infinite" : "none",
            }}
            title="ربط كابل"
          >
            🔌
          </button>
        )}
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: translateX(-50%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateX(-50%) scale(1.1);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </>
  );
};

export default CameraElement;