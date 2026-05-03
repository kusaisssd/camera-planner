// src/utils/ProjectManager.js

/**
 * حفظ المشروع كملف JSON
 */
export const saveProject = (projectData) => {
  try {
    const {
      projectName,
      uploadedImage,
      cameras,
      devices,
      pixelsPerMeter,
      scaleDistance,
      scalePoints,
      cables,
    } = projectData;

    // التحقق من البيانات الأساسية
    if (!uploadedImage) {
      return {
        success: false,
        message: "لا يوجد مخطط لحفظه!",
      };
    }

    // إنشاء كائن المشروع مع جميع البيانات بما فيها الحقول الجديدة
    const project = {
      version: "2.0", // تحديث رقم الإصدار
      projectName: projectName || "مشروع جديد",
      savedAt: new Date().toISOString(),
      uploadedImage,
      pixelsPerMeter,
      scaleDistance,
      scalePoints,
      cameras: cameras.map(camera => ({
        id: camera.id,
        x: camera.x,
        y: camera.y,
        angle: camera.angle,
        fov: camera.fov,
        depth: camera.depth,
        name: camera.name,
        camera360: camera.camera360 || false,
        cameraSize: camera.cameraSize,
        aperture: camera.aperture,
        // الحقول الجديدة
        description: camera.description || "",
        ipAddress: camera.ipAddress || "",
        username: camera.username || "",
        password: camera.password || "",
      })),
      devices: devices.map(device => ({
        id: device.id,
        type: device.type,
        name: device.name,
        channels: device.channels,
        x: device.x,
        y: device.y,
        usedChannels: device.usedChannels || {},
      })),
      cables: cables.map(cable => ({
        id: cable.id,
        type: cable.type,
        points: cable.points,
        color: cable.color,
        fromId: cable.fromId,
        fromType: cable.fromType,
        toId: cable.toId,
        toType: cable.toType,
        channelNumber: cable.channelNumber,
      })),
    };

    // تحويل إلى JSON
    const jsonString = JSON.stringify(project, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // إنشاء رابط التحميل
    const link = document.createElement("a");
    link.href = url;
    
    const safeName = projectName
      .replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, "")
      .replace(/\s+/g, "-");
    
    link.download = `${safeName}-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();

    // تنظيف
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: "تم حفظ المشروع بنجاح!",
    };
  } catch (error) {
    console.error("خطأ في حفظ المشروع:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء حفظ المشروع: " + error.message,
    };
  }
};

/**
 * تحميل المشروع من ملف JSON
 */
export const loadProject = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("لم يتم اختيار أي ملف"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target.result);

        // التحقق من صحة البيانات
        if (!project.uploadedImage) {
          reject(new Error("ملف المشروع تالف أو غير صالح"));
          return;
        }

        // التوافق مع الإصدارات القديمة
        const cameras = (project.cameras || []).map(camera => ({
          ...camera,
          camera360: camera.camera360 || false,
          description: camera.description || "",
          ipAddress: camera.ipAddress || "",
          username: camera.username || "",
          password: camera.password || "",
        }));

        const devices = (project.devices || []).map(device => ({
          ...device,
          usedChannels: device.usedChannels || {},
        }));

        const cables = (project.cables || []).map(cable => ({
          ...cable,
          channelNumber: cable.channelNumber,
        }));

        resolve({
          success: true,
          data: {
            projectName: project.projectName || "مشروع محمّل",
            uploadedImage: project.uploadedImage,
            cameras,
            devices,
            pixelsPerMeter: project.pixelsPerMeter,
            scaleDistance: project.scaleDistance,
            scalePoints: project.scalePoints,
            cables,
            version: project.version || "1.0",
            savedAt: project.savedAt,
          },
        });
      } catch (error) {
        console.error("خطأ في قراءة الملف:", error);
        reject(new Error("فشل في قراءة ملف المشروع. تأكد من أن الملف صحيح."));
      }
    };

    reader.onerror = () => {
      reject(new Error("حدث خطأ أثناء قراءة الملف"));
    };

    reader.readAsText(file);
  });
};

/**
 * التحقق من صحة ملف المشروع
 */
export const isValidProjectFile = (file) => {
  if (!file) return false;
  
  // التحقق من نوع الملف
  if (file.type !== "application/json" && !file.name.endsWith(".json")) {
    return false;
  }

  // التحقق من حجم الملف (أقل من 50MB)
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return false;
  }

  return true;
};

/**
 * تصدير بيانات المشروع للطباعة أو المشاركة
 */
export const exportProjectSummary = (projectData) => {
  const {
    projectName,
    cameras,
    devices,
    cables,
    pixelsPerMeter,
  } = projectData;

  let summary = `=== ${projectName} ===\n\n`;
  summary += `التاريخ: ${new Date().toLocaleDateString("ar-EG")}\n\n`;
  
  summary += `📷 الكاميرات (${cameras.length}):\n`;
  cameras.forEach((camera, index) => {
    summary += `  ${index + 1}. ${camera.name}\n`;
    if (camera.description) {
      summary += `     - الوصف: ${camera.description}\n`;
    }
    if (camera.ipAddress) {
      summary += `     - العنوان: ${camera.ipAddress}\n`;
    }
    if (camera.camera360) {
      summary += `     - النوع: كاميرا 360 درجة\n`;
    } else {
      summary += `     - زاوية الرؤية: ${Math.round(camera.fov)}°\n`;
    }
  });
  
  summary += `\n🖥️ الأجهزة (${devices.length}):\n`;
  devices.forEach((device, index) => {
    summary += `  ${index + 1}. ${device.name} (${device.type})\n`;
    if (device.type === 'DVR' || device.type === 'NVR') {
      const usedChannels = Object.keys(device.usedChannels || {}).length;
      summary += `     - القنوات: ${usedChannels}/${device.channels}\n`;
    }
  });
  
  summary += `\n🔌 الكابلات (${cables.length}):\n`;
  let totalLength = 0;
  cables.forEach((cable, index) => {
    const length = calculateCableLength(cable, pixelsPerMeter);
    totalLength += length;
    const typeLabel = cable.type === 'camera' ? 'كاميرا' : cable.type === 'device' ? 'جهاز' : 'حر';
    summary += `  ${index + 1}. كابل ${typeLabel} - الطول: ${length.toFixed(2)} متر\n`;
  });
  summary += `\nإجمالي طول الكابلات: ${totalLength.toFixed(2)} متر\n`;

  return summary;
};

/**
 * حساب طول كابل معين
 */
const calculateCableLength = (cable, pixelsPerMeter) => {
  if (!cable.points || cable.points.length < 2 || !pixelsPerMeter) return 0;
  
  let totalLength = 0;
  for (let i = 0; i < cable.points.length - 1; i++) {
    const point1 = cable.points[i];
    const point2 = cable.points[i + 1];
    
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // تحويل من نسبة مئوية إلى بكسل ثم إلى متر
    // نفترض أن الشاشة عرضها 1000px كقيمة افتراضية
    const pixelDistance = (distance / 100) * 1000;
    totalLength += pixelDistance / pixelsPerMeter;
  }
  
  return totalLength;
};