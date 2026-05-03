// src/pages/MyPlans.jsx
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import PlanContainer from "../components/PlanContainer";
import BottomInfo from "../components/BottomInfo";
import CameraControlPanel from "../components/CameraControlPanel";
import TopButtons from "../components/TopButtons";
import ScaleSetupDialog from "../components/ScaleSetupDialog";
import ProjectNameDialog from "../components/ProjectNameDialog";
import DeviceDialog from "../components/DeviceDialog";
import CableChannelDialog from "../components/CableChannelDialog";
import PDFPageSelector from "../components/PDFPageSelector";
import { saveProject, loadProject, isValidProjectFile } from "../utils/ProjectManager";

export default function MyPlans() {
  const { colors } = useTheme();
  const [cameras, setCameras] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showScaleSetup, setShowScaleSetup] = useState(false);
  const [scalePoints, setScalePoints] = useState([]);
  const [scaleDistance, setScaleDistance] = useState(5);
  const [pixelsPerMeter, setPixelsPerMeter] = useState(null);
  const [isSettingScale, setIsSettingScale] = useState(false);
  const [hasUnsavedWork, setHasUnsavedWork] = useState(false);
  
  const [projectName, setProjectName] = useState("مشروع جديد");
  const [showProjectNameDialog, setShowProjectNameDialog] = useState(false);

  const [cables, setCables] = useState([]);
  const [isDrawingCable, setIsDrawingCable] = useState(false);
  const [currentCablePoints, setCurrentCablePoints] = useState([]);

  const [devices, setDevices] = useState([]);
  const [showDeviceDialog, setShowDeviceDialog] = useState(false);

  const [cableType, setCableType] = useState('camera');
  const [showChannelDialog, setShowChannelDialog] = useState(false);
  const [pendingCable, setPendingCable] = useState(null);
  const [selectedDeviceForChannel, setSelectedDeviceForChannel] = useState(null);
  const [hasSeenCableMessage, setHasSeenCableMessage] = useState(false);
  const [showPDFSelector, setShowPDFSelector] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const planContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const projectFileInputRef = useRef(null);

  useEffect(() => {
    if (cameras.length > 0 || uploadedImage || cables.length > 0 || devices.length > 0) {
      setHasUnsavedWork(true);
    } else {
      setHasUnsavedWork(false);
    }
  }, [cameras, uploadedImage, cables, devices]);

  useEffect(() => {
    if (hasUnsavedWork) {
      sessionStorage.setItem('hasUnsavedWork', 'true');
    } else {
      sessionStorage.removeItem('hasUnsavedWork');
    }
    return () => {
      sessionStorage.removeItem('hasUnsavedWork');
    };
  }, [hasUnsavedWork]);

  useEffect(() => {
    console.log('🔌 تحديث الكابلات - العدد:', cables.length, cables);
  }, [cables]);

  useEffect(() => {
    if (imageLoaded && cables.length > 0) {
      console.log('✅ الصورة محملة - إعادة رسم الكابلات:', cables.length);
      setCables(prev => [...prev]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageLoaded]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedWork) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedWork]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setShowPDFSelector(true);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedImage(event.target.result);
          setImageLoaded(false);
          setCameras([]);
          setDevices([]);
          setSelectedId(null);
          setPixelsPerMeter(null);
          setScalePoints([]);
          setCables([]);
          setShowScaleSetup(true);
        };
        reader.readAsDataURL(file);
      }
    }
    e.target.value = '';
  };

  const handlePDFPageSelected = (imageFile) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setImageLoaded(false);
      setCameras([]);
      setDevices([]);
      setSelectedId(null);
      setPixelsPerMeter(null);
      setScalePoints([]);
      setCables([]);
      setShowPDFSelector(false);
      setPdfFile(null);
      setShowScaleSetup(true);
    };
    reader.readAsDataURL(imageFile);
  };

  const getTotalCableLength = () => {
    if (!pixelsPerMeter || !planContainerRef.current) return 0;
    
    const rect = planContainerRef.current.getBoundingClientRect();
    
    return cables.reduce((total, cable) => {
      if (!cable.points || cable.points.length < 2) return total;
      
      let cableLength = 0;
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
        cableLength += pixelDistance / pixelsPerMeter;
      }
      return total + cableLength;
    }, 0);
  };

  const handleSaveProject = () => {
    if (!uploadedImage) {
      alert("⚠️ لا يوجد مخطط لحفظه!");
      return;
    }

    console.log('💾 حفظ المشروع - عدد الكابلات:', cables.length);
    console.log('💾 حفظ المشروع - عدد الأجهزة:', devices.length);

    const result = saveProject({
      projectName,
      uploadedImage,
      cameras,
      devices,
      pixelsPerMeter,
      scaleDistance,
      scalePoints,
      cables,
    });

    if (result.success) {
      alert("✅ " + result.message);
      setHasUnsavedWork(false);
    } else {
      alert("❌ " + result.message);
    }
  };

  const handleLoadProject = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isValidProjectFile(file)) {
      alert("❌ يرجى اختيار ملف مشروع صالح (.json)");
      return;
    }

    try {
      const result = await loadProject(file);
      
      if (result.success) {
        console.log('📂 فتح المشروع - الكابلات المحملة:', result.data.cables);
        console.log('📂 فتح المشروع - الأجهزة المحملة:', result.data.devices);
        
        setProjectName(result.data.projectName);
        setPixelsPerMeter(result.data.pixelsPerMeter);
        setScaleDistance(result.data.scaleDistance);
        setScalePoints(result.data.scalePoints);
        setSelectedId(null);
        setHasUnsavedWork(false);
        
        setUploadedImage(result.data.uploadedImage);
        
        setTimeout(() => {
          setImageLoaded(true);
          setTimeout(() => {
            setCameras(result.data.cameras || []);
            setDevices(result.data.devices || []);
            setCables(result.data.cables || []);
            console.log('✅ تم تحميل البيانات بنجاح');
          }, 100);
        }, 200);
        
        alert("✅ تم فتح المشروع بنجاح!");
      }
    } catch (error) {
      console.error('❌ خطأ في فتح المشروع:', error);
      alert("❌ " + error.message);
    }
  };

  const handleSaveProjectName = (newName) => {
    setProjectName(newName);
  };

  const updateCameraProperty = (cameraId, property, value) => {
    setCameras(prevCameras =>
      prevCameras.map(cam =>
        cam.id === cameraId ? { ...cam, [property]: value } : cam
      )
    );
  };

  const updateDeviceProperty = (deviceId, property, value) => {
    setDevices(prevDevices =>
      prevDevices.map(dev =>
        dev.id === deviceId ? { ...dev, [property]: value } : dev
      )
    );
  };

  const deleteCamera = (id) => {
    setCameras((prev) => prev.filter((cam) => cam.id !== id));
    setCables((prev) => prev.filter((cable) => 
      !(cable.fromType === 'camera' && cable.fromId === id)
    ));
    setSelectedId(null);
  };

  const deleteDevice = (id) => {
    const device = devices.find(d => d.id === id);
    
    if (device && device.usedChannels) {
      const connectedCameras = Object.keys(device.usedChannels);
      
      if (connectedCameras.length > 0) {
        const confirmDelete = window.confirm(
          `⚠️ هذا الجهاز متصل بـ ${connectedCameras.length} كاميرا.\nسيتم حذف جميع الكابلات المرتبطة. هل تريد المتابعة؟`
        );
        
        if (!confirmDelete) return;
      }
    }
    
    setDevices((prev) => prev.filter((dev) => dev.id !== id));
    setCables((prev) => prev.filter((cable) => 
      !((cable.fromType === 'device' && cable.fromId === id) ||
        (cable.toType === 'device' && cable.toId === id))
    ));
    setSelectedId(null);
  };

  const deleteCable = (cableId) => {
    const cable = cables.find(c => c.id === cableId);
    
    if (cable && cable.toType === 'device' && cable.channelNumber) {
      const device = devices.find(d => d.id === cable.toId);
      if (device && device.usedChannels && device.usedChannels[cable.channelNumber]) {
        const updatedDevices = devices.map(d => {
          if (d.id === cable.toId) {
            const newUsedChannels = { ...d.usedChannels };
            delete newUsedChannels[cable.channelNumber];
            return { ...d, usedChannels: newUsedChannels };
          }
          return d;
        });
        setDevices(updatedDevices);
      }
    }
    
    setCables(prev => prev.filter(c => c.id !== cableId));
  };

  const handleAddDevice = (deviceData) => {
    if (!imageLoaded || !pixelsPerMeter) {
      alert("⚠️ يرجى تحديد المقياس أولاً!");
      return;
    }

    const rect = planContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = 50;
    const centerY = 50;

    const newDevice = {
      id: Date.now(),
      type: deviceData.type,
      name: deviceData.name,
      channels: deviceData.channels,
      x: centerX,
      y: centerY,
      usedChannels: {},
    };

    setDevices((prev) => [...prev, newDevice]);
    setSelectedId(newDevice.id);
    setShowDeviceDialog(false);
  };

  const handleSelectChannel = (channelNumber) => {
    if (!pendingCable || !selectedDeviceForChannel) return;

    const isChannelUsed = selectedDeviceForChannel.usedChannels && 
                         selectedDeviceForChannel.usedChannels[channelNumber];
    
    if (isChannelUsed) {
      alert(`⚠️ القناة ${channelNumber} مستخدمة بالفعل!`);
      return;
    }

    const finalCable = {
      ...pendingCable,
      channelNumber: channelNumber,
    };

    setCables(prev => [...prev, finalCable]);

    const updatedDevices = devices.map(device => {
      if (device.id === selectedDeviceForChannel.id) {
        return {
          ...device,
          usedChannels: {
            ...device.usedChannels,
            [channelNumber]: pendingCable.fromId,
          },
        };
      }
      return device;
    });

    setDevices(updatedDevices);
    
    setShowChannelDialog(false);
    setPendingCable(null);
    setSelectedDeviceForChannel(null);
  };

  const selectedCamera = cameras.find((cam) => cam.id === selectedId);
  const selectedDevice = devices.find((dev) => dev.id === selectedId);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.bg,
        position: "relative",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      
      <input
        ref={projectFileInputRef}
        type="file"
        accept=".json"
        onChange={handleLoadProject}
        style={{ display: "none" }}
      />

      <TopButtons
        fileInputRef={fileInputRef}
        projectFileInputRef={projectFileInputRef}
        setShowScaleSetup={setShowScaleSetup}
        pixelsPerMeter={pixelsPerMeter}
        planContainerRef={planContainerRef}
        isExporting={isExporting}
        setIsExporting={setIsExporting}
        imageLoaded={imageLoaded}
        projectName={projectName}
        setShowProjectNameDialog={setShowProjectNameDialog}
        onSaveProject={handleSaveProject}
        cameras={cameras}
        devices={devices}
        cables={cables}
        getTotalCableLength={getTotalCableLength}
      />

      {!uploadedImage ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              backgroundColor: colors.surface || colors.bg,
              borderRadius: "1rem",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              maxWidth: "500px",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: colors.text }}>
              📷 مخطط الكاميرات
            </h1>
            <p style={{ fontSize: "1.125rem", color: colors.textSecondary, marginBottom: "2rem" }}>
              ارفع مخطط البناء لتبدأ في تخطيط الكاميرات
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button
                onClick={() => fileInputRef.current.click()}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.125rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563eb";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3b82f6";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                📁 اختر صورة المخطط
              </button>
              <button
                onClick={() => projectFileInputRef.current.click()}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.125rem",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#059669";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#10b981";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                📂 فتح مشروع محفوظ
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", paddingTop: "140px" }}>
          <div
            style={{
              display: "flex",
              flex: "1 1 auto",
              minHeight: "0",
              flexDirection: "row",
            }}
          >
            {/* القائمة الجانبية */}
            <div
              style={{
                width: "350px",
                backgroundColor: colors.surface || colors.bg,
                borderRight: `1px solid ${colors.border}`,
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                position: "relative",
                zIndex: 5,
                height: "100%",
                overflow: "hidden",
              }}
            >
              {/* القسم الثابت - العنوان والأزرار */}
              <div style={{ 
                padding: "1.5rem", 
                borderBottom: `1px solid ${colors.border}`,
                backgroundColor: colors.surface || colors.bg,
                flexShrink: 0,
              }}>
                <h2 style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: "bold", 
                  color: colors.text,
                  margin: 0,
                  marginBottom: "1rem",
                }}>
                  ⚙️ الإعدادات والخصائص
                </h2>

                {/* أزرار إضافة جهاز ورسم كابلات */}
                {imageLoaded && pixelsPerMeter && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <button
                      onClick={() => {
                        if (!imageLoaded || !pixelsPerMeter) {
                          alert("⚠️ يرجى تحديد المقياس أولاً!");
                          return;
                        }
                        setShowDeviceDialog(true);
                      }}
                      style={{
                        padding: "0.75rem 1rem",
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#059669";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#10b981";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <span>🖥️</span>
                      <span>إضافة جهاز</span>
                    </button>

                    <button
                      onClick={() => {
                        if (!imageLoaded || !pixelsPerMeter) {
                          alert("⚠️ يرجى تحديد المقياس أولاً!");
                          return;
                        }
                        
                        if (isDrawingCable) {
                          setIsDrawingCable(false);
                          setCurrentCablePoints([]);
                        } else {
                          setIsDrawingCable(true);
                        }
                      }}
                      style={{
                        padding: "0.75rem 1rem",
                        backgroundColor: isDrawingCable ? "#dc2626" : "#ec4899",
                        color: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDrawingCable ? "#b91c1c" : "#db2777";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDrawingCable ? "#dc2626" : "#ec4899";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <span>{isDrawingCable ? "✓" : "🔌"}</span>
                      <span>{isDrawingCable ? "إنهاء رسم الكابلات" : "رسم كابلات"}</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* القسم القابل للتمرير - المحتوى الديناميكي */}
              <div style={{ 
                flex: "1 1 auto", 
                overflowY: "auto", 
                padding: "1rem",
              }}>
              {isDrawingCable ? (
                <div style={{
                  backgroundColor: "rgba(37, 99, 235, 0.1)",
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(37, 99, 235, 0.3)",
                }}>
                  <div style={{
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    color: "#2563eb",
                    fontSize: "1rem",
                  }}>
                    🔌 وضع رسم الكابلات
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.875rem", color: colors.text, marginBottom: "0.75rem", fontWeight: "500" }}>
                      اختر نوع الكابل:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <button
                        onClick={() => setCableType('camera')}
                        style={{
                          padding: "0.75rem",
                          backgroundColor: cableType === 'camera' ? "#2563eb" : colors.surface || colors.bg,
                          color: cableType === 'camera' ? "white" : colors.text,
                          border: `2px solid ${cableType === 'camera' ? "#2563eb" : colors.border}`,
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          transition: "all 0.2s",
                          textAlign: "right",
                        }}
                      >
                        📷 كابل كاميرا → DVR/NVR
                      </button>
                      
                      <button
                        onClick={() => setCableType('device')}
                        style={{
                          padding: "0.75rem",
                          backgroundColor: cableType === 'device' ? "#10b981" : colors.surface || colors.bg,
                          color: cableType === 'device' ? "white" : colors.text,
                          border: `2px solid ${cableType === 'device' ? "#10b981" : colors.border}`,
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          transition: "all 0.2s",
                          textAlign: "right",
                        }}
                      >
                        🔀 كابل جهاز → جهاز
                      </button>
                      
                      <button
                        onClick={() => setCableType('free')}
                        style={{
                          padding: "0.75rem",
                          backgroundColor: cableType === 'free' ? "#f59e0b" : colors.surface || colors.bg,
                          color: cableType === 'free' ? "white" : colors.text,
                          border: `2px solid ${cableType === 'free' ? "#f59e0b" : colors.border}`,
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          transition: "all 0.2s",
                          textAlign: "right",
                        }}
                      >
                        ✏️ كابل حر (رسم يدوي)
                      </button>
                    </div>
                  </div>

                  <div style={{ 
                    padding: "1rem", 
                    backgroundColor: "rgba(59, 130, 246, 0.1)", 
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                  }}>
                    <div style={{ fontSize: "0.75rem", color: colors.text, lineHeight: "1.6" }}>
                      <strong>💡 تعليمات:</strong><br/>
                      • <strong>كابل كاميرا:</strong> اضغط زر 🔌 بجانب الكاميرا ثم اضغط زر 🔌 بجانب DVR/NVR<br/>
                      • <strong>كابل جهاز:</strong> اضغط زر 🔌 بجانب جهاز ثم اضغط زر 🔌 بجانب جهاز آخر<br/>
                      • <strong>كابل حر:</strong> اضغط في أي مكان، Ctrl+Click لنقطة وسطية
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsDrawingCable(false);
                      setCurrentCablePoints([]);
                    }}
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginTop: "0.5rem",
                      width: "100%",
                    }}
                  >
                    ✖️ إلغاء وضع الكابلات
                  </button>
                </div>
              ) : selectedCamera ? (
                <CameraControlPanel
                  selectedCamera={selectedCamera}
                  pixelsPerMeter={pixelsPerMeter}
                  updateCameraProperty={updateCameraProperty}
                />
              ) : selectedDevice ? (
                <div style={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}>
                  <div style={{
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    color: "#10b981",
                    fontSize: "1rem",
                  }}>
                    🖥️ معلومات الجهاز: {selectedDevice.name}
                  </div>
                  
                  <div style={{ display: "grid", gap: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", color: colors.text, marginBottom: "0.5rem" }}>
                        النوع:
                      </div>
                      <div style={{ 
                        padding: "0.75rem", 
                        backgroundColor: "rgba(16, 185, 129, 0.2)", 
                        borderRadius: "0.5rem",
                        fontWeight: "600",
                      }}>
                        {selectedDevice.type}
                      </div>
                    </div>
                    
                    {(selectedDevice.type === 'DVR' || selectedDevice.type === 'NVR') && (
                      <div>
                        <div style={{ fontSize: "0.875rem", color: colors.text, marginBottom: "0.5rem" }}>
                          عدد القنوات:
                        </div>
                        <div style={{ 
                          padding: "0.75rem", 
                          backgroundColor: "rgba(16, 185, 129, 0.2)", 
                          borderRadius: "0.5rem",
                          fontWeight: "600",
                        }}>
                          {Object.keys(selectedDevice.usedChannels || {}).length} / {selectedDevice.channels}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  height: "100%",
                  minHeight: "300px",
                  color: colors.textSecondary,
                  textAlign: "center",
                  gap: "1rem"
                }}>
                  <div style={{ fontSize: "3rem", opacity: 0.5 }}>📋</div>
                  <div style={{ fontSize: "0.875rem" }}>
                    اختر كاميرا أو جهاز<br/>
                    لعرض الخصائص والإعدادات
                  </div>
                </div>
              )}
              </div>
            </div>

            {/* المخطط */}
            <div
              style={{
                flex: "1 1 auto",
                minWidth: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: "2rem",
              }}
            >
              <PlanContainer
                ref={planContainerRef}
                uploadedImage={uploadedImage}
                imageLoaded={imageLoaded}
                setImageLoaded={setImageLoaded}
                cameras={cameras}
                setCameras={setCameras}
                devices={devices}
                setDevices={setDevices}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                isRotating={isRotating}
                setIsRotating={setIsRotating}
                hasInteracted={hasInteracted}
                setHasInteracted={setHasInteracted}
                pixelsPerMeter={pixelsPerMeter}
                setPixelsPerMeter={setPixelsPerMeter}
                scalePoints={scalePoints}
                setScalePoints={setScalePoints}
                scaleDistance={scaleDistance}
                isSettingScale={isSettingScale}
                setIsSettingScale={setIsSettingScale}
                setShowScaleSetup={setShowScaleSetup}
                deleteCamera={deleteCamera}
                deleteDevice={deleteDevice}
                cables={cables}
                setCables={setCables}
                isDrawingCable={isDrawingCable}
                currentCablePoints={currentCablePoints}
                setCurrentCablePoints={setCurrentCablePoints}
                deleteCable={deleteCable}
                isExporting={isExporting}
                cableType={cableType}
                setShowChannelDialog={setShowChannelDialog}
                setPendingCable={setPendingCable}
                setSelectedDeviceForChannel={setSelectedDeviceForChannel}
                updateCameraProperty={updateCameraProperty}
                updateDeviceProperty={updateDeviceProperty}
              />
            </div>

            <BottomInfo
              cameras={cameras}
              devices={devices}
              pixelsPerMeter={pixelsPerMeter}
              isSettingScale={isSettingScale}
              selectedCamera={selectedCamera}
              cables={cables}
              getTotalCableLength={getTotalCableLength}
              isDrawingCable={isDrawingCable}
              cableType={cableType}
            />

            <ScaleSetupDialog
              showScaleSetup={showScaleSetup}
              setShowScaleSetup={setShowScaleSetup}
              scaleDistance={scaleDistance}
              setScaleDistance={setScaleDistance}
              isSettingScale={isSettingScale}
              setIsSettingScale={setIsSettingScale}
              scalePoints={scalePoints}
              setScalePoints={setScalePoints}
              projectName={projectName}
              onSaveProjectName={handleSaveProjectName}
            />

            <ProjectNameDialog
              isOpen={showProjectNameDialog}
              onClose={() => setShowProjectNameDialog(false)}
              currentName={projectName}
              onSave={handleSaveProjectName}
            />

            <DeviceDialog
              isOpen={showDeviceDialog}
              onClose={() => setShowDeviceDialog(false)}
              onAdd={handleAddDevice}
            />

            <CableChannelDialog
              isOpen={showChannelDialog}
              onClose={() => {
                setShowChannelDialog(false);
                setPendingCable(null);
                setSelectedDeviceForChannel(null);
              }}
              device={selectedDeviceForChannel}
              onSelectChannel={handleSelectChannel}
            />
          </div>
        </div>
      )}

      {/* رسالة الترحيب لرسم الكابلات (نافذة منبثقة) */}
      {isDrawingCable && !hasSeenCableMessage && (
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
          onClick={() => setHasSeenCableMessage(true)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.surface || colors.bg,
              borderRadius: "16px",
              padding: "2.5rem",
              maxWidth: "600px",
              width: "100%",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ fontSize: "2rem", textAlign: "center", marginBottom: "1rem" }}>
              🔌⚡
            </div>

            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: colors.text,
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              مرحباً في وضع رسم الكابلات!
            </div>

            <div
              style={{
                fontSize: "1rem",
                color: colors.text,
                lineHeight: "1.8",
                marginBottom: "2rem",
                textAlign: "right",
              }}
            >
              <div
                style={{
                  padding: "1.25rem",
                  backgroundColor: "rgba(37, 99, 235, 0.1)",
                  borderRadius: "12px",
                  border: "2px solid rgba(37, 99, 235, 0.4)",
                  marginBottom: "1rem",
                }}
              >
                <strong style={{ color: "#2563eb", fontSize: "1.125rem" }}>
                  📌 أنواع الكابلات المتاحة:
                </strong>

                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>📹</span>
                    <div>
                      <strong>كابل كاميرا:</strong><br />
                      <span style={{ fontSize: "0.875rem", color: colors.textSecondary }}>
                        لربط الكاميرا بجهاز DVR/NVR
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>🔌</span>
                    <div>
                      <strong>كابل أجهزة:</strong><br />
                      <span style={{ fontSize: "0.875rem", color: colors.textSecondary }}>
                        لربط جهاز بجهاز آخر (Switch, Router, إلخ)
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>📏</span>
                    <div>
                      <strong>كابل حر:</strong><br />
                      <span style={{ fontSize: "0.875rem", color: colors.textSecondary }}>
                        لرسم مسار كابل بين نقطتين على المخطط
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "1.25rem",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  borderRadius: "12px",
                  border: "2px solid rgba(245, 158, 11, 0.4)",
                }}
              >
                <strong style={{ color: "#d97706", fontSize: "1.125rem" }}>
                  💡 نصيحة مهمة:
                </strong>
                <div style={{ marginTop: "0.75rem", fontSize: "0.95rem", color: colors.text }}>
                  <strong>لإضافة نقاط انعطاف</strong> (لرسم كابل غير مستقيم):<br />
                  اضغط مع الاستمرار على{" "}
                  <strong
                    style={{
                      backgroundColor: "#fbbf24",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.875rem",
                      color: "#78350f",
                    }}
                  >
                    Ctrl
                  </strong>{" "}
                  أثناء النقر على المخطط
                </div>
              </div>
            </div>

            <button
              onClick={() => setHasSeenCableMessage(true)}
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
              ✅ فهمت، لنبدأ!
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: colors.textSecondary,
              }}
            >
              لن تظهر هذه الرسالة مرة أخرى
            </div>
          </div>
        </div>
      )}

      {/* محدد صفحة PDF */}
      {showPDFSelector && pdfFile && (
        <PDFPageSelector
          pdfFile={pdfFile}
          onSelectPage={handlePDFPageSelected}
          onCancel={() => {
            setShowPDFSelector(false);
            setPdfFile(null);
          }}
        />
      )}
    </div>
  );
}