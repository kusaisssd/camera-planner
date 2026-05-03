// components/PlanContainer.jsx
import React, { forwardRef, useEffect, useRef, useState } from "react";
import CameraElement from "./CameraElement";
import DeviceElement from "./DeviceElement";

const PlanContainer = forwardRef((props, outerRef) => {
  const {
    uploadedImage,
    imageLoaded,
    setImageLoaded,
    cameras,
    setCameras,
    devices,
    setDevices,
    selectedId,
    setSelectedId,
    isDragging,
    setIsDragging,
    isRotating,
    setIsRotating,
    hasInteracted,
    setHasInteracted,
    pixelsPerMeter,
    setPixelsPerMeter,
    scalePoints,
    setScalePoints,
    scaleDistance,
    isSettingScale,
    setIsSettingScale,
    setShowScaleSetup,
    deleteCamera,
    deleteDevice,
    cables,
    setCables,
    isDrawingCable,
    currentCablePoints,
    setCurrentCablePoints,
    deleteCable,
    isExporting,
    cableType,
    setShowChannelDialog,
    setPendingCable,
    setSelectedDeviceForChannel,
  } = props;

  const innerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState(null);

  const percentageToPixels = (percentage, dimension) => {
    if (!innerRef.current) return percentage;
    const rect = innerRef.current.getBoundingClientRect();
    
    return dimension === "x"
      ? (percentage / 100) * rect.width
      : (percentage / 100) * rect.height;
  };

  const getCableLength = (cable) => {
    if (!cable.points || cable.points.length < 2 || !pixelsPerMeter || !innerRef.current) return 0;
    
    const rect = innerRef.current.getBoundingClientRect();
    let totalLength = 0;
    
    for (let i = 0; i < cable.points.length - 1; i++) {
      const point1 = cable.points[i];
      const point2 = cable.points[i + 1];
      
      const x1 = (point1.x / 100) * rect.width;
      const y1 = (point1.y / 100) * rect.height;
      const x2 = (point2.x / 100) * rect.width;
      const y2 = (point2.y / 100) * rect.height;
      
      const dx = x2 - x1;
      const dy = y2 - y1;
      const pixelDistance = Math.sqrt(dx * dx + dy * dy);
      totalLength += pixelDistance / pixelsPerMeter;
    }
    
    return totalLength;
  };

  useEffect(() => {
    const container = innerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      setCameras((prev) => [...prev]);
      setDevices((prev) => [...prev]);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const getEventPosition = (e) => {
    if (!innerRef.current) return { x: 0, y: 0, rect: { width: 0, height: 0 } };
    
    const rect = innerRef.current.getBoundingClientRect();
    let clientX, clientY;
    
    if (e.type.startsWith('touch')) {
      const touch = e.touches[0] || e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    return { x, y, rect };
  };

  const handleMouseMove = (e) => {
    if (isDrawingCable && currentCablePoints.length > 0) {
      const { x, y } = getEventPosition(e);
      setMousePosition({ x, y });
    }
  };

  const handleScaleClick = (e) => {
    if (!isSettingScale || scalePoints.length >= 2) return;

    const { x, y } = getEventPosition(e);
    const newPoints = [...scalePoints, { x, y }];
    setScalePoints(newPoints);

    if (newPoints.length === 2) {
      const dx = newPoints[1].x - newPoints[0].x;
      const dy = newPoints[1].y - newPoints[0].y;
      const pixelDistance = Math.sqrt(dx * dx + dy * dy);
      const ppm = pixelDistance / scaleDistance;
      setPixelsPerMeter(ppm);
      setIsSettingScale(false);
      setShowScaleSetup(false);
    }
  };

  const handlePlanClick = (e) => {
    if (isSettingScale) {
      handleScaleClick(e);
      return;
    }

    if (isDrawingCable) {
      const { x, y, rect } = getEventPosition(e);
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      if (cableType === 'free') {
        if (currentCablePoints.length === 0) {
          setCurrentCablePoints([{ x: percentX, y: percentY }]);
        } else if (e.ctrlKey) {
          setCurrentCablePoints(prev => [...prev, { x: percentX, y: percentY }]);
        } else {
          const finalPoints = [...currentCablePoints, { x: percentX, y: percentY }];
          const newCable = {
            id: Date.now(),
            type: 'free',
            points: finalPoints,
            color: '#f59e0b',
          };
          setCables(prev => [...prev, newCable]);
          setCurrentCablePoints([]);
        }
        return;
      }

      if (e.ctrlKey && currentCablePoints.length > 0) {
        setCurrentCablePoints(prev => [...prev, { x: percentX, y: percentY }]);
        return;
      }

      return;
    }

    if (!selectedId && !isSettingScale && imageLoaded && !isDrawingCable && pixelsPerMeter) {
      const { x, y, rect } = getEventPosition(e);
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      const newCamera = {
        id: Date.now(),
        x: percentX,
        y: percentY,
        angle: 0,
        fov: 90,
        depth: 100,
        name: `كاميرا ${cameras.length + 1}`,
        camera360: false,
        cameraSize: 36,
        aperture: 2.8,
      };
      setCameras((prev) => [...prev, newCamera]);
      setSelectedId(newCamera.id);
    } else {
      setSelectedId(null);
    }
  };

  useEffect(() => {
    if (!isDragging && !isRotating) return;

    const handleMove = (e) => {
      if (!innerRef.current) return;

      const { x, y, rect } = getEventPosition(e);

      if (isDragging) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        const selectedCamera = cameras.find((cam) => cam.id === selectedId);
        if (selectedCamera) {
          setCameras((prev) =>
            prev.map((cam) =>
              cam.id === selectedId
                ? { ...cam, x: percentX, y: percentY }
                : cam
            )
          );

          setCables((prev) =>
            prev.map((cable) => {
              if (cable.fromType === 'camera' && cable.fromId === selectedId) {
                const newPoints = [...cable.points];
                newPoints[0] = { ...newPoints[0], x: percentX, y: percentY };
                return { ...cable, points: newPoints };
              }
              return cable;
            })
          );
        }

        const selectedDevice = devices.find((dev) => dev.id === selectedId);
        if (selectedDevice) {
          setDevices((prev) =>
            prev.map((dev) =>
              dev.id === selectedId
                ? { ...dev, x: percentX, y: percentY }
                : dev
            )
          );

          setCables((prev) =>
            prev.map((cable) => {
              let updated = false;
              const newPoints = [...cable.points];

              if (cable.fromType === 'device' && cable.fromId === selectedId) {
                newPoints[0] = { ...newPoints[0], x: percentX, y: percentY };
                updated = true;
              }

              if (cable.toType === 'device' && cable.toId === selectedId) {
                newPoints[newPoints.length - 1] = { 
                  ...newPoints[newPoints.length - 1], 
                  x: percentX, 
                  y: percentY 
                };
                updated = true;
              }

              return updated ? { ...cable, points: newPoints } : cable;
            })
          );
        }
      }

      if (isRotating) {
        const selectedCamera = cameras.find((cam) => cam.id === selectedId);
        if (selectedCamera) {
          const camPixelX = percentageToPixels(selectedCamera.x, "x");
          const camPixelY = percentageToPixels(selectedCamera.y, "y");

          const dx = x - camPixelX;
          const dy = y - camPixelY;
          let angle = (Math.atan2(dy, dx) * 180) / Math.PI;

          setCameras((prev) =>
            prev.map((cam) =>
              cam.id === selectedId ? { ...cam, angle } : cam
            )
          );
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setIsRotating(false);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, isRotating, selectedId, cameras, devices]);

  return (
    <div
      ref={outerRef}
      onClick={handlePlanClick}
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: "relative",
          width: "95%",
          height: "95%",
          backgroundColor: "#f8f9fa",
          borderRadius: "0.5rem",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          cursor: isSettingScale || isDrawingCable ? "crosshair" : "default",
        }}
      >
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="المخطط"
            onLoad={() => setImageLoaded(true)}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              pointerEvents: "none",
            }}
          />
        )}

        {isSettingScale && scalePoints.length === 1 && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <circle
              cx={scalePoints[0].x}
              cy={scalePoints[0].y}
              r="8"
              fill="#f59e0b"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        )}

        {cables.length > 0 && imageLoaded && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 40,
            }}
          >
            {cables.map((cable) => {
              if (!cable.points || cable.points.length < 2) return null;

              const cableLength = getCableLength(cable);
              const midIdx = Math.floor(cable.points.length / 2);
              const midPoint = cable.points[midIdx];
              const midX = percentageToPixels(midPoint.x, "x");
              const midY = percentageToPixels(midPoint.y, "y");

              const cableColor = cable.color || '#2563eb';

              return (
                <g key={cable.id}>
                  {cable.points.map((point, index) => {
                    if (index === cable.points.length - 1) return null;

                    const startX = percentageToPixels(point.x, "x");
                    const startY = percentageToPixels(point.y, "y");
                    const endX = percentageToPixels(cable.points[index + 1].x, "x");
                    const endY = percentageToPixels(cable.points[index + 1].y, "y");

                    return (
                      <line
                        key={`${cable.id}-${index}`}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke={cableColor}
                        strokeWidth="3"
                        opacity="0.8"
                      />
                    );
                  })}
                </g>
              );
            })}
            
            {isDrawingCable && cableType === 'free' && currentCablePoints.length > 0 && mousePosition && (
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
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      opacity="0.6"
                    />
                  );
                })}
              </>
            )}
          </svg>
        )}

        {imageLoaded && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <defs>
              {cameras.map((camera) => {
                const gradientId = `gradient-${camera.id}`;
                return (
                  <radialGradient
                    key={gradientId}
                    id={gradientId}
                    cx={percentageToPixels(camera.x, "x")}
                    cy={percentageToPixels(camera.y, "y")}
                    r={camera.depth || 100}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" style={{ stopColor: "#008b8b", stopOpacity: 0.8 }} />
                    <stop offset="40%" style={{ stopColor: "#008b8b", stopOpacity: 0.7 }} />
                    <stop offset="60%" style={{ stopColor: "#00a9a9", stopOpacity: 0.4 }} />
                    <stop offset="90%" style={{ stopColor: "#20b2aa", stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: "#00d9d9", stopOpacity: 0.05 }} />
                  </radialGradient>
                );
              })}
            </defs>
            {cameras.map((camera) => {
              const pixelX = percentageToPixels(camera.x, "x");
              const pixelY = percentageToPixels(camera.y, "y");
              const radius = camera.depth || 100;

              if (camera.camera360) {
                return (
                  <circle
                    key={`sector-${camera.id}`}
                    cx={pixelX}
                    cy={pixelY}
                    r={radius}
                    fill={`url(#gradient-${camera.id})`}
                    stroke="#008b8b"
                    strokeWidth="2"
                    opacity="0.9"
                  />
                );
              }

              const angleRad = camera.angle * (Math.PI / 180);
              const fovRad = camera.fov * (Math.PI / 180);

              const startAngle = angleRad - fovRad / 2;
              const endAngle = angleRad + fovRad / 2;

              const startX = pixelX + radius * Math.cos(startAngle);
              const startY = pixelY + radius * Math.sin(startAngle);

              const endX = pixelX + radius * Math.cos(endAngle);
              const endY = pixelY + radius * Math.sin(endAngle);

              const largeArcFlag = fovRad > Math.PI ? 1 : 0;
              const pathData = `M ${pixelX},${pixelY} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`;

              return (
                <path
                  key={`sector-${camera.id}`}
                  d={pathData}
                  fill={`url(#gradient-${camera.id})`}
                  stroke="#008b8b"
                  strokeWidth="2"
                  opacity="0.9"
                />
              );
            })}
          </svg>
        )}

        <svg
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <defs>
            <style>
              {`
                .watermark-text {
                  font-size: 120px;
                  font-weight: bold;
                  opacity: 0.15;
                  text-anchor: middle;
                  font-family: Arial, sans-serif;
                }
                @media (max-width: 768px) {
                  .watermark-text {
                    font-size: 60px;
                  }
                }
              `}
            </style>
          </defs>
          <text x="50%" y="50%" className="watermark-text" fill="#008b8b">
            Pro S;
          </text>
        </svg>

        {!isSettingScale &&
          cameras.map((camera) => (
            <CameraElement
              key={camera.id}
              camera={camera}
              isSelected={selectedId === camera.id}
              percentageToPixels={percentageToPixels}
              setSelectedId={setSelectedId}
              setIsDragging={setIsDragging}
              setIsRotating={setIsRotating}
              setHasInteracted={setHasInteracted}
              deleteCamera={deleteCamera}
              updateCameraProperty={props.updateCameraProperty}
              isExporting={isExporting}
              isDrawingCable={isDrawingCable}
              cableType={cableType}
              currentCablePoints={currentCablePoints}
              setCurrentCablePoints={setCurrentCablePoints}
              mousePosition={mousePosition}
            />
          ))}

        {!isSettingScale &&
          devices.map((device) => (
            <DeviceElement
              key={device.id}
              device={device}
              isSelected={selectedId === device.id}
              percentageToPixels={percentageToPixels}
              setSelectedId={setSelectedId}
              setIsDragging={setIsDragging}
              deleteDevice={deleteDevice}
              isExporting={isExporting}
              isDrawingCable={isDrawingCable}
              cableType={cableType}
              currentCablePoints={currentCablePoints}
              setCurrentCablePoints={setCurrentCablePoints}
              setShowChannelDialog={setShowChannelDialog}
              setPendingCable={setPendingCable}
              setSelectedDeviceForChannel={setSelectedDeviceForChannel}
              cameras={cameras}
              updateDeviceProperty={props.updateDeviceProperty}
              mousePosition={mousePosition}
              setCables={setCables}
            />
          ))}

        {!isSettingScale && !isDrawingCable && !isExporting && pixelsPerMeter && cables.map((cable) => {
          if (!cable.points || cable.points.length < 2) return null;
          
          const cableLength = getCableLength(cable);
          const midIdx = Math.floor(cable.points.length / 2);
          const midX = percentageToPixels(cable.points[midIdx].x, "x");
          const midY = percentageToPixels(cable.points[midIdx].y, "y");
          
          const cableColor = cable.color || '#2563eb';
          
          return (
            <div
              key={`cable-info-${cable.id}`}
              style={{
                position: "absolute",
                left: `${midX}px`,
                top: `${midY - 25}px`,
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                zIndex: 999,
                pointerEvents: "auto",
              }}
            >
              {/* بادج طول الكابل */}
              <div
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: cableColor,
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  border: `2px solid ${cableColor}`,
                  backdropFilter: "blur(4px)",
                }}
              >
                📏 {cableLength.toFixed(2)} م
              </div>
              
              {/* زر الحذف */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`هل تريد حذف هذا الكابل؟ (${cableLength.toFixed(2)} م)`)) {
                    deleteCable(cable.id);
                  }
                }}
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "2px solid white",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.5)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#991b1b";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#dc2626";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                title="حذف الكابل"
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

PlanContainer.displayName = "PlanContainer";
export default PlanContainer;