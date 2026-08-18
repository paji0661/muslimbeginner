import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, AlertCircle, UploadCloud } from 'lucide-react';

export default function ImageUploadInput({ onParsed, disabled = false }) {
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const processFile = useCallback((file) => {
    if (!file.type.startsWith('image/')) {
      setError('Sila muat naik fail gambar yang sah (JPEG, PNG, dll).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setDataUrl(result);
        setError(null);
      }
    };
    reader.onerror = () => {
      setError('Gagal membaca fail gambar.');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handlePaste = useCallback((e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (const item of items) {
      if (item.type.indexOf('image/') !== -1) {
        const file = item.getAsFile();
        if (file) {
          processFile(file);
          break;
        }
      }
    }
  }, [processFile]);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const handleSubmit = useCallback(() => {
    if (!dataUrl) {
      setError('Sila muat naik gambar.');
      return;
    }

    setError(null);
    onParsed(dataUrl);
  }, [dataUrl, onParsed]);

  return (
    <div className="murajaah-upload-container animate-fade-in">
      <div className="murajaah-upload-header">
         <h2>Muraja'ah</h2>
         <p>Pilih gambar untuk mula hafal</p>
      </div>

      <div className="murajaah-upload-area">
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="murajaah-dropzone glass-card"
        >
          {dataUrl ? (
            <img src={dataUrl} alt="Preview" className="murajaah-preview-img" />
          ) : (
            <>
              <div className="murajaah-upload-icon-wrapper">
                <UploadCloud size={28} className="murajaah-upload-icon" />
              </div>
              <p className="murajaah-upload-text">
                Klik, Seret, atau Tampal (Ctrl+V) gambar di sini
              </p>
            </>
          )}
        </div>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }}
          onChange={handleFileChange} 
        />
      </div>

      {error && (
        <div className="murajaah-error-msg">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={disabled || !dataUrl}
        className="murajaah-btn-start btn-primary"
      >
        <Sparkles size={18} />
        Mula
      </button>

      {/* Guide Section */}
      <div className="murajaah-guide-section">
        <h3 className="murajaah-guide-title">Cara Penggunaan</h3>
        
        <div className="murajaah-guide-steps">
          <div className="guide-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Ambil Gambar/Screenshot</h4>
              <p>Tangkap skrin keratan ayat Al-Quran atau nota yang ingin anda hafal.</p>
            </div>
          </div>
          
          <div className="guide-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Muat Naik</h4>
              <p>Klik, seret, atau <em>paste</em> (Tampal) gambar tersebut ke dalam ruangan di atas.</p>
            </div>
          </div>
          
          <div className="guide-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Mula Menghafal</h4>
              <p>Skrin akan menjadi gelap. Seret jari atau tetikus anda untuk menyuluh (Spotlight) dan semak hafalan anda sedikit demi sedikit!</p>
              
              <div className="murajaah-demo-container">
                <div className="murajaah-demo-box">
                  <span className="demo-label">Sebelum</span>
                  <div className="demo-content">
                    <span style={{color: '#ffffff'}}>بِسْمِ </span>
                    <span style={{color: '#60a5fa'}}>ٱللَّهِ </span>
                    <span style={{color: '#f97316'}}>ٱلرَّحْمَٰنِ </span>
                    <span style={{color: '#38bdf8'}}>ٱلرَّحِيمِ</span>
                  </div>
                </div>
                <div className="murajaah-demo-box spotlight-demo">
                  <span className="demo-label">Semasa Muraja'ah</span>
                  <div className="demo-content">
                    <span style={{color: '#ffffff'}}>بِسْمِ </span>
                    <span style={{color: '#60a5fa'}}>ٱللَّهِ </span>
                    <span style={{color: '#f97316'}}>ٱلرَّحْمَٰنِ </span>
                    <span style={{color: '#38bdf8'}}>ٱلرَّحِيمِ</span>
                  </div>
                  <div className="demo-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
