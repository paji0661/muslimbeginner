import React from 'react';
import { useState } from 'react';

export default function WiridCard({ data, doaType }) {
  const [selectedDoaIndex, setSelectedDoaIndex] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [count, setCount] = useState(0);

  if (data.type === 'tasbih') {
    const handleTasbihClick = () => {
      if (count < data.target) {
        setCount(count + 1);
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(50);
        }
      }
    };

    return (
      <div className="glass-panel wirid-card">
        <h3 className="wirid-title">{data.title}</h3>
        <div className="arabic-text">{data.arabic}</div>
        <div className="rumi-text">{data.rumi}</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '28px', marginBottom: '16px' }}>
          <button 
            onClick={handleTasbihClick}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: count === data.target ? 'var(--surface)' : 'var(--accent-color)',
              color: 'white',
              border: '4px solid rgba(255,255,255,0.1)',
              cursor: count === data.target ? 'default' : 'pointer',
              marginBottom: '12px',
              transition: 'transform 0.1s',
              boxShadow: 'none'
            }}
          >
            {count === data.target ? '✓' : count}
          </button>
          
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {count} / {data.target} Ulangan
          </div>
          
          <button 
            onClick={() => setCount(0)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Mula Semula
          </button>
        </div>
        
        {data.translation && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px', marginBottom: '8px' }}>
            <button 
              onClick={() => setShowTranslation(!showTranslation)}
              style={{
                padding: '4px 16px',
                fontSize: '0.75rem',
                borderRadius: '20px',
                background: showTranslation ? 'var(--accent-color)' : 'transparent',
                border: '1px solid var(--accent-color)',
                color: showTranslation ? 'white' : 'var(--accent-color)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {showTranslation ? 'Tutup Terjemahan' : 'Terjemahan'}
            </button>
          </div>
        )}
        
        {showTranslation && data.translation && <div className="translation-text">{data.translation}</div>}
        {data.nota && <div className="nota-text" style={{textAlign: 'center'}}>{data.nota}</div>}
      </div>
    );
  }

  if (data.type === 'doa-selector') {
    const activeDoa = selectedDoaIndex !== null ? data.options[selectedDoaIndex] : null;

    const getDisplayText = (item, field) => {
      if (!item) return null;
      return (doaType === 'sendiri' && item[`${field}_sendiri`]) ? item[`${field}_sendiri`] : item[field];
    };

    return (
      <div className="glass-panel wirid-card">
        <h3 className="wirid-title">{data.title}</h3>
        <p className="doa-selector-prompt">Sila pilih doa untuk dibaca:</p>
        
        <div className="doa-buttons-container">
          {data.options.map((doa, idx) => (
            <button 
              key={doa.id} 
              className={`doa-btn ${selectedDoaIndex === idx ? 'doa-btn-active' : ''}`}
              onClick={() => setSelectedDoaIndex(selectedDoaIndex === idx ? null : idx)}
            >
              {doa.btnLabel}
            </button>
          ))}
        </div>

        {activeDoa && (
          <div className="active-doa-content">
            <h4 style={{ color: "var(--accent-color)", marginBottom: "16px" }}>{activeDoa.btnLabel}</h4>
            {activeDoa.images && (
              <div style={{ marginBottom: "20px" }}>
                {activeDoa.images.map((imgSrc, idx) => (
                  <img key={idx} src={imgSrc.startsWith('/') ? `${import.meta.env.BASE_URL}${imgSrc.slice(1)}` : imgSrc} alt={`Teks Arab ${activeDoa.btnLabel} bahagian ${idx + 1}`} className="doa-image" style={{ marginBottom: "8px" }} />
                ))}
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textAlign: "center", fontStyle: "italic" }}>
                  *Sumber imej teks Arab dari <a href="https://akuislam.com/blog/ibadah/wirid-doa-selepas-solat/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-color)", textDecoration: "none" }}>akuislam.com</a>
                </div>
              </div>
            )}
            {!activeDoa.images && getDisplayText(activeDoa, 'arabic') && <div className="arabic-text">{getDisplayText(activeDoa, 'arabic')}</div>}
            <div className="rumi-text">{getDisplayText(activeDoa, 'rumi')}</div>
            
            {getDisplayText(activeDoa, 'translation') && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px', marginBottom: '8px' }}>
                <button 
                  onClick={() => setShowTranslation(!showTranslation)}
                  style={{
                    padding: '4px 16px',
                    fontSize: '0.75rem',
                    borderRadius: '20px',
                    background: showTranslation ? 'var(--accent-color)' : 'transparent',
                    border: '1px solid var(--accent-color)',
                    color: showTranslation ? 'white' : 'var(--accent-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {showTranslation ? 'Tutup Terjemahan' : 'Terjemahan'}
                </button>
              </div>
            )}

            {showTranslation && <div className="translation-text">{getDisplayText(activeDoa, 'translation')}</div>}
            
            {activeDoa.info && <div className="nota-text">{activeDoa.info}</div>}
            {activeDoa.hadis && <div className="nota-text"><strong>Hadis Nabi:</strong><br />{activeDoa.hadis}</div>}
            {activeDoa.nota && (
              <div className="nota-text">
                <strong>Nota:</strong>
                {Array.isArray(activeDoa.nota) ? (
                  <ul className="nota-list">
                    {activeDoa.nota.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                ) : (
                  <div>{activeDoa.nota}</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="glass-panel wirid-card">
      <h3 className="wirid-title">{data.title}</h3>
      <div className="arabic-text">
        {(doaType === 'sendiri' && data.arabic_sendiri) ? data.arabic_sendiri : data.arabic}
      </div>
      <div className="rumi-text">
        {(doaType === 'sendiri' && data.rumi_sendiri) ? data.rumi_sendiri : data.rumi}
      </div>

      {((doaType === 'sendiri' && data.translation_sendiri) || data.translation) && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px', marginBottom: '8px' }}>
          <button 
            onClick={() => setShowTranslation(!showTranslation)}
            style={{
              padding: '4px 16px',
              fontSize: '0.75rem',
              borderRadius: '20px',
              background: showTranslation ? 'var(--accent-color)' : 'transparent',
              border: '1px solid var(--accent-color)',
              color: showTranslation ? 'white' : 'var(--accent-color)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {showTranslation ? 'Tutup Terjemahan' : 'Terjemahan'}
          </button>
        </div>
      )}

      {showTranslation && (
        <div className="translation-text">
          {(doaType === 'sendiri' && data.translation_sendiri) ? data.translation_sendiri : data.translation}
        </div>
      )}
      
      {data.info && (
        <div className="nota-text">
          {data.info}
        </div>
      )}

      {data.hadis && (
        <div className="nota-text">
          <strong>Hadis Nabi:</strong><br />
          {data.hadis}
        </div>
      )}

      {data.nota && (
        <div className="nota-text">
          <strong>Nota:</strong>
          {Array.isArray(data.nota) ? (
            <ul className="nota-list">
              {data.nota.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <div>{data.nota}</div>
          )}
        </div>
      )}
    </div>
  );
}
