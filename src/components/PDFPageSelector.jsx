// components/PDFPageSelector.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const PDFPageSelector = ({ pdfFile, onSelectPage, onCancel }) => {
  const { colors } = useTheme();
  const [numPages, setNumPages] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [thumbnails, setThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pdfFile) {
      loadPDF();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfFile]);

  const loadPDF = async () => {
    setIsLoading(true);
    try {
      // تحميل مكتبة PDF.js من CDN
      if (!window.pdfjsLib) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        document.head.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });

        // تعيين workerSrc
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }

      // قراءة الملف
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      setNumPages(pdf.numPages);

      // إنشاء thumbnails لجميع الصفحات (حتى 20)
      const thumbs = [];
      for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        thumbs.push({
          pageNum: i,
          dataUrl: canvas.toDataURL()
        });
      }

      setThumbnails(thumbs);
      setIsLoading(false);
    } catch (error) {
      console.error('خطأ في تحميل PDF:', error);
      alert('حدث خطأ في تحميل ملف PDF');
      setIsLoading(false);
    }
  };

  const handleSelectPage = async () => {
    try {
      // تحميل الصفحة المختارة بدقة عالية
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(selectedPage);

      // استخدام scale أعلى للحصول على صورة عالية الجودة
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      // تحويل Canvas إلى Blob ثم إلى File
      canvas.toBlob((blob) => {
        const file = new File([blob], `page-${selectedPage}.png`, { type: 'image/png' });
        onSelectPage(file);
      }, 'image/png');

    } catch (error) {
      console.error('خطأ في تحويل الصفحة:', error);
      alert('حدث خطأ في تحويل الصفحة');
    }
  };

  if (!pdfFile) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '2rem',
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: colors.surface || colors.bg,
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          border: `1px solid ${colors.border}`,
        }}
      >
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          📄 اختر صفحة من PDF
        </h2>

        {isLoading ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: colors.textSecondary,
            fontSize: '1.1rem',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            جاري تحميل الصفحات...
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1rem', color: colors.text, marginBottom: '0.5rem' }}>
                📊 عدد الصفحات: <strong>{numPages}</strong>
              </div>
              <div style={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                الصفحة المختارة: <strong style={{ color: '#2563eb' }}>{selectedPage}</strong>
              </div>
            </div>

            {/* شبكة الصفحات */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
                maxHeight: '500px',
                overflowY: 'auto',
                padding: '0.5rem',
              }}
            >
              {thumbnails.map((thumb) => (
                <div
                  key={thumb.pageNum}
                  onClick={() => setSelectedPage(thumb.pageNum)}
                  style={{
                    border: `3px solid ${selectedPage === thumb.pageNum ? '#2563eb' : colors.border}`,
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    backgroundColor: selectedPage === thumb.pageNum ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPage !== thumb.pageNum) {
                      e.currentTarget.style.borderColor = '#60a5fa';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPage !== thumb.pageNum) {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <img
                    src={thumb.dataUrl}
                    alt={`صفحة ${thumb.pageNum}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '4px',
                    }}
                  />
                  <div
                    style={{
                      textAlign: 'center',
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: selectedPage === thumb.pageNum ? 'bold' : 'normal',
                      color: selectedPage === thumb.pageNum ? '#2563eb' : colors.text,
                    }}
                  >
                    صفحة {thumb.pageNum}
                  </div>
                </div>
              ))}
            </div>

            {numPages > 20 && (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: colors.text,
              }}>
                💡 يتم عرض أول 20 صفحة فقط. اختر رقم الصفحة مباشرة:
                <input
                  type="number"
                  min="1"
                  max={numPages}
                  value={selectedPage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= numPages) {
                      setSelectedPage(val);
                    }
                  }}
                  style={{
                    marginRight: '0.5rem',
                    padding: '0.5rem',
                    width: '80px',
                    textAlign: 'center',
                    border: `2px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    backgroundColor: colors.surface || colors.bg,
                    color: colors.text,
                  }}
                />
              </div>
            )}

            {/* الأزرار */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={onCancel}
                style={{
                  flex: 1,
                  padding: '1rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4b5563';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b7280';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ❌ إلغاء
              </button>
              <button
                onClick={handleSelectPage}
                style={{
                  flex: 1,
                  padding: '1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ✅ استخدام الصفحة {selectedPage}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFPageSelector;
