// components/DeviceElement.jsx
import React, { useState } from "react";

const DeviceElement = ({
  device,
  isSelected,
  percentageToPixels,
  setSelectedId,
  setIsDragging,
  deleteDevice,
  isExporting,
  isDrawingCable,
  cableType,
  currentCablePoints,
  setCurrentCablePoints,
  setShowChannelDialog,
  setPendingCable,
  setSelectedDeviceForChannel,
  cameras,
  updateDeviceProperty,
  mousePosition,
  setCables,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(device.name || "");

  const pixelX = percentageToPixels(device.x, "x");
  const pixelY = percentageToPixels(device.y, "y");

  const deviceIcons = {
    DVR: "📹",
    NVR: "🌐",
    Switch: "🔀",
    Router: "📡",
  };

  const deviceColors = {
    DVR: "#2563eb",
    NVR: "#10b981",
    Switch: "#f59e0b",
    Router: "#8b5cf6",
  };

  const deviceColor = deviceColors[device.type] || "#6b7280";

  const usedChannelsCount = device.usedChannels
    ? Object.keys(device.usedChannels).length
    : 0;

  const handleStartCable = (e) => {
    e.stopPropagation();
    
    if (cableType === 'device') {
      setCurrentCablePoints([{ 
        x: device.x, 
        y: device.y,
        fromId: device.id,
        fromType: 'device'
      }]);
    }
  };

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (updateDeviceProperty && nameValue !== device.name) {
      updateDeviceProperty(device.id, "name", nameValue);
    }
  };

  const handleNameClick = (e) => {
    e.stopPropagation();
    if (!isDrawingCable) {
      setIsEditing(true);
      setSelectedId(device.id);
      setNameValue(device.name || "");
    }
  };

  const isDeviceCableActive = isDrawingCable && cableType === 'device' && 
                              currentCablePoints.length > 0 && 
                              currentCablePoints[0].fromId === device.id;

  return (
    <>
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
        {isDeviceCableActive && mousePosition && (
          <>
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
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  opacity="0.6"
                />
              );
            })}
          </>
        )}
      </svg>

      <div
        className="device-point"
        data-device-id={device.id}
        onClick={(e) => {
          e.stopPropagation();
          
          if (isDrawingCable) {
            if (cableType === 'camera' && currentCablePoints.length > 0) {
              if (device.type === 'DVR' || device.type === 'NVR') {
                const usedCount = Object.keys(device.usedChannels || {}).length;
                
                if (usedCount >= device.channels) {
                  alert("⚠️ جميع قنوات هذا الجهاز مستخدمة!");
                  setCurrentCablePoints([]);
                  return;
                }

                const points = [...currentCablePoints, { 
                  x: device.x, 
                  y: device.y 
                }];

                const tempCable = {
                  id: Date.now(),
                  type: 'camera',
                  points: points,
                  color: '#2563eb',
                  fromId: currentCablePoints[0].fromId,
                  fromType: 'camera',
                  toId: device.id,
                  toType: 'device',
                };

                setPendingCable(tempCable);
                setSelectedDeviceForChannel(device);
                setShowChannelDialog(true);
                setCurrentCablePoints([]);
              } else {
                alert("⚠️ هذا الجهاز ليس DVR أو NVR. اختر جهاز DVR أو NVR.");
              }
              return;
            }
            
            if (cableType === 'device') {
              if (currentCablePoints.length === 0) {
                setCurrentCablePoints([{ 
                  x: device.x, 
                  y: device.y,
                  fromId: device.id,
                  fromType: 'device'
                }]);
              } else {
                if (currentCablePoints[0].fromId === device.id) {
                  alert("⚠️ لا يمكن ربط الجهاز بنفسه!");
                  return;
                }
                
                const newCable = {
                  id: Date.now(),
                  type: 'device',
                  points: [...currentCablePoints, { 
                    x: device.x, 
                    y: device.y 
                  }],
                  color: '#10b981',
                  fromId: currentCablePoints[0].fromId,
                  fromType: 'device',
                  toId: device.id,
                  toType: 'device',
                };
                
                setCables(prev => [...prev, newCable]);
                setCurrentCablePoints([]);
              }
              return;
            }
          }
          
          setSelectedId(device.id);
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
          flexDirection: "column",
          alignItems: "center",
          cursor: "grab",
          userSelect: "none",
          zIndex: isSelected ? 105 : 100,
        }}
      >
        <div
          style={{
            width: "70px",
            height: "50px",
            backgroundColor: deviceColor,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.75rem",
            border: isSelected ? "3px solid white" : "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: isSelected
              ? `0 0 0 3px ${deviceColor}, 0 8px 16px rgba(0,0,0,0.3)`
              : "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.2s",
          }}
        >
          {deviceIcons[device.type] || "🖥️"}
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
              marginTop: "0.5rem",
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
            placeholder="اسم الجهاز..."
          />
        ) : (
          <div
            onClick={handleNameClick}
            style={{
              marginTop: "0.5rem",
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
            {nameValue || device.name}
          </div>
        )}

        {(device.type === "DVR" || device.type === "NVR") && (
          <div
            style={{
              marginTop: "0.25rem",
              padding: "0.25rem 0.5rem",
              backgroundColor:
                usedChannelsCount >= device.channels
                  ? "rgba(239, 68, 68, 0.9)"
                  : "rgba(16, 185, 129, 0.9)",
              color: "white",
              fontSize: "0.7rem",
              borderRadius: "4px",
              fontWeight: "600",
            }}
          >
            📊 {usedChannelsCount}/{device.channels}
          </div>
        )}

        {isSelected && !isExporting && !isDrawingCable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`هل تريد حذف الجهاز "${device.name}"؟`)) {
                deleteDevice(device.id);
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

        {!isExporting && cableType === 'device' && isDrawingCable && (
          <button
            onClick={handleStartCable}
            style={{
              position: "absolute",
              top: "-12px",
              left: "-12px",
              width: "28px",
              height: "28px",
              backgroundColor: isDeviceCableActive ? "#10b981" : "#2563eb",
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
              boxShadow: isDeviceCableActive
                ? "0 0 12px rgba(16, 185, 129, 0.8)"
                : "0 2px 8px rgba(0,0,0,0.3)",
              zIndex: 106,
              animation: isDeviceCableActive ? "pulse 1.5s infinite" : "none",
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
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </>
  );
};

export default DeviceElement;