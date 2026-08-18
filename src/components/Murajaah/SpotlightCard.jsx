import React, { useState, useRef } from 'react';
import { MousePointerClick, Maximize, ZoomIn, Settings2, Flashlight, XCircle } from 'lucide-react';

export default function SpotlightCard({ imageUrl, onClose }) {
  const containerRef = useRef(null);
  
  const [isSetupMode, setIsSetupMode] = useState(true);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPos, setLastPanPos] = useState(null);

  const [pointer, setPointer] = useState(null);
  const [spotlightSize, setSpotlightSize] = useState(50);

  const handleSpotlightMove = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setPointer({ x, y });
  };

  const onSpotlightTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleSpotlightMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onSpotlightMouseMove = (e) => {
    if (e.buttons > 0) {
      handleSpotlightMove(e.clientX, e.clientY);
    } else {
      setPointer(null);
    }
  };

  const resetSpotlight = () => setPointer(null);

  const handleSpotlightDown = (clientX, clientY) => {
    handleSpotlightMove(clientX, clientY);
  };

  const handlePointerDown = (e) => {
    if (!isSetupMode) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPanning(true);
    setLastPanPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e) => {
    if (!isSetupMode || !isPanning || !lastPanPos) return;
    
    const deltaX = e.clientX - lastPanPos.x;
    const deltaY = e.clientY - lastPanPos.y;
    
    setTranslate(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastPanPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e) => {
    if (!isSetupMode) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsPanning(false);
    setLastPanPos(null);
  };

  return (
    <div className="murajaah-spotlight-container animate-fade-in">
      <div className="murajaah-header-actions">
        <div className="murajaah-mode-toggle">
          <button
            onClick={() => setIsSetupMode(true)}
            className={`murajaah-toggle-btn ${isSetupMode ? 'active' : ''}`}
          >
            <Settings2 size={16} />
            Laras Gambar
          </button>
          <button
            onClick={() => setIsSetupMode(false)}
            className={`murajaah-toggle-btn ${!isSetupMode ? 'active-spotlight' : ''}`}
          >
            <Flashlight size={16} />
            Mula Muraja'ah
          </button>
        </div>
        
        <button 
          onClick={onClose}
          className="murajaah-close-btn"
        >
          <XCircle size={18} />
          <span className="hide-mobile">Tutup & Baru</span>
        </button>
      </div>

      <div 
        ref={containerRef}
        className="murajaah-interactive-area"
        style={{ minHeight: '60vh', backgroundColor: 'transparent', touchAction: 'none' }}
        {...(isSetupMode 
          ? {
              onPointerDown: handlePointerDown,
              onPointerMove: handlePointerMove,
              onPointerUp: handlePointerUp,
              onPointerCancel: handlePointerUp,
            } 
          : {
              onMouseDown: (e) => handleSpotlightDown(e.clientX, e.clientY),
              onMouseMove: onSpotlightMouseMove,
              onMouseUp: resetSpotlight,
              onMouseLeave: resetSpotlight,
              onTouchStart: (e) => handleSpotlightDown(e.touches[0].clientX, e.touches[0].clientY),
              onTouchMove: onSpotlightTouchMove,
              onTouchEnd: resetSpotlight,
              onTouchCancel: resetSpotlight,
            }
        )}
      >
        <div 
          className="murajaah-transform-wrapper"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transition: isPanning ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <img 
            src={imageUrl} 
            alt="Kad Memori" 
            className="murajaah-spotlight-img"
            draggable={false} 
          />
        </div>
        
        {!isSetupMode && (
          <div 
            className="murajaah-blur-overlay"
            style={{
              maskImage: pointer ? `radial-gradient(circle at ${pointer.x}px ${pointer.y}px, rgba(0,0,0,0) 0px, rgba(0,0,0,0) ${spotlightSize}px, rgba(0,0,0,1) ${spotlightSize + 30}px)` : 'none',
              WebkitMaskImage: pointer ? `radial-gradient(circle at ${pointer.x}px ${pointer.y}px, rgba(0,0,0,0) 0px, rgba(0,0,0,0) ${spotlightSize}px, rgba(0,0,0,1) ${spotlightSize + 30}px)` : 'none',
            }}
          />
        )}
        
        {isSetupMode ? (
          <div className="murajaah-hint-overlay">
             <div className="murajaah-hint-badge">
               Leret untuk mengerakkan gambar
             </div>
          </div>
        ) : (
          !pointer && (
            <div className="murajaah-hint-overlay-center">
              <div className="murajaah-hint-badge-large">
                <MousePointerClick size={28} />
                <span>Tahan & Gerak untuk Papar</span>
              </div>
            </div>
          )
        )}
      </div>

      <div className="murajaah-dynamic-controls">
        {isSetupMode ? (
          <>
            <label>
              <ZoomIn size={14} />
              Zum Gambar
            </label>
            <input 
              type="range" 
              min="0.5" 
              max="4" 
              step="0.1"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="murajaah-range-slider setup"
            />
          </>
        ) : (
          <>
            <label>
              <Maximize size={14} />
              Saiz Suluh
            </label>
            <input 
              type="range" 
              min="10" 
              max="150" 
              value={spotlightSize}
              onChange={(e) => setSpotlightSize(Number(e.target.value))}
              className="murajaah-range-slider spotlight"
            />
          </>
        )}
      </div>
    </div>
  );
}
