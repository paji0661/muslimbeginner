import React, { useState } from 'react';
import ImageUploadInput from './ImageUploadInput';
import SpotlightCard from './SpotlightCard';
import { ArrowLeft } from 'lucide-react';

export default function Murajaah({ onHome }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className="murajaah-page animate-fade-in">
      <div className="header-nav" style={{ padding: '20px 16px', maxWidth: '600px', margin: '0 auto', width: '100%', display: 'flex' }}>
        <button onClick={onHome} className="back-btn" style={{
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'rgba(255, 255, 255, 0.1)', border: 'none', 
            color: 'white', padding: '8px 16px', borderRadius: '12px',
            cursor: 'pointer', backdropFilter: 'blur(10px)',
            fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: '500'
        }}>
          <ArrowLeft size={18} />
          <span>Kembali ke Utama</span>
        </button>
      </div>
      
      <div className="murajaah-content">
        {!activeImage ? (
          <ImageUploadInput onParsed={(dataUrl) => setActiveImage(dataUrl)} />
        ) : (
          <SpotlightCard 
            imageUrl={activeImage} 
            onClose={() => setActiveImage(null)} 
          />
        )}
      </div>
    </div>
  );
}
