import React, { useState, useRef, useCallback, useEffect } from 'react';
import WiridCard from './components/WiridCard';
import QuranTadabbur from './components/QuranTadabbur';
import WaktuSolat from './components/WaktuSolat';
import Haiyalasollah from './components/Haiyalasollah/Haiyalasollah';
import Tajweed from './components/Tajweed/Tajweed';
import { wiridData, musafirData } from './data/placeholderData';

const themes = [
  // Dark Charcoal / Premium Black
  { bgStart: '#0f0f0f', bgEnd: '#000000', accent: '#a1a1aa', accentHover: '#d4d4d8', h1Start: '#d4d4d8', h1End: '#a1a1aa' }
];

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const TopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 11-5-5-5 5"/><path d="m17 18-5-5-5 5"/></svg>
);

const UpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
);

const DownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

function App() {
  const [activeModule, setActiveModule] = useState('home'); // 'home', 'wirid', 'musafir', 'qunut'
  const [isSingkat, setIsSingkat] = useState(false);
  const [doaType, setDoaType] = useState('sendiri');
  const [jamakType, setJamakType] = useState('taqdim'); // 'taqdim', 'takhir'
  const [selectedPairId, setSelectedPairId] = useState(null); // null, 'zuhur_asar', 'maghrib_isyak'
  const [showMusafirTrans1, setShowMusafirTrans1] = useState(false);
  const [showMusafirTrans2, setShowMusafirTrans2] = useState(false);
  const cardRefs = useRef([]);

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [swRegistration, setSwRegistration] = useState(null);

  useEffect(() => {
    const handleUpdate = (e) => {
      setSwRegistration(e.detail);
      setShowUpdatePrompt(true);
    };
    window.addEventListener('pwa-update-available', handleUpdate);
    return () => window.removeEventListener('pwa-update-available', handleUpdate);
  }, []);

  const handleUpdateConfirm = () => {
    if (swRegistration && swRegistration.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdatePrompt(false);
    }
  };

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const isReadyStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(isReadyStandalone);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-gradient-start', '#0a0a0a');
    root.style.setProperty('--bg-gradient-end', '#000000');
    root.style.setProperty('--accent-color', '#4ade80');
    root.style.setProperty('--accent-hover', '#52525b');
    root.style.setProperty('--h1-gradient-start', '#ffffff');
    root.style.setProperty('--h1-gradient-end', '#d4d4d8');
    root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.03)');
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowInstallModal(true);
      return;
    }
    
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  const resetToHome = () => {
    setActiveModule('home');
    setDoaType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const baseData = wiridData.doa3;
  const hiddenIds = ['d3_9', 'd3_10', 'd3_11', 'd3_12', 'd3_13', 'd3_14', 'd3_15'];
  const currentData = isSingkat ? baseData.filter(item => !hiddenIds.includes(item.id)) : baseData;

  const scrollToCard = useCallback((direction) => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const currentScrollY = window.scrollY;
    let targetIdx = -1;

    if (direction === 'down') {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].offsetTop > currentScrollY + 10) {
          targetIdx = i;
          break;
        }
      }
    } else {
      for (let i = cards.length - 1; i >= 0; i--) {
        if (cards[i].offsetTop < currentScrollY - 10) {
          targetIdx = i;
          break;
        }
      }
    }

    if (targetIdx >= 0 && cards[targetIdx]) {
      cards[targetIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (direction === 'down') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Landing Page (Home)
  if (activeModule === 'home') {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh', justifyContent: 'center' }}>
        <div className="header" style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Muslim Beginner</h1>
          <p>Himpunan panduan ibadah harian anda</p>
        </div>

        <WaktuSolat />

        <div className="menu-grid">

          <div className="menu-card" onClick={() => { setActiveModule('wirid'); setDoaType('sendiri'); }}>
            <span className="menu-icon">📿</span>
            <div className="menu-title">Wirid & Doa</div>
            <div className="menu-subtitle">Wirid & Doa Selepas Solat</div>
          </div>

          <div className="menu-card" onClick={() => { setActiveModule('doa-dan-niat'); }}>
            <span className="menu-icon">🤲</span>
            <div className="menu-title">Doa & Niat</div>
            <div className="menu-subtitle">Senarai Doa & Niat</div>
          </div>

          <div className="menu-card" onClick={() => { setActiveModule('tadabbur'); }}>
            <span className="menu-icon">📖</span>
            <div className="menu-title">Tadabbur & Terjemahan</div>
            <div className="menu-subtitle">Refleksi & Terjemahan Ayat</div>
          </div>

          <div className="menu-card" onClick={() => { setActiveModule('haiyalasollah'); }}>
            <span className="menu-icon">🕌</span>
            <div className="menu-title">Panduan Solat</div>
            <div className="menu-subtitle">Langkah demi Langkah</div>
          </div>

          <div className="menu-card" onClick={() => { setActiveModule('tajweed'); }}>
            <span className="menu-icon">📗</span>
            <div className="menu-title">Asas Tajwid</div>
            <div className="menu-subtitle">Panduan Ringkas Tajwid</div>
          </div>

          <a href="https://www.quran.com" target="_blank" rel="noopener noreferrer" className="menu-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="menu-icon">🌍</span>
            <div className="menu-title">Quran.com</div>
            <div className="menu-subtitle">Baca Al-Quran Online</div>
          </a>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
           <button 
             onClick={() => setShowSourceModal(true)} 
             style={{ 
               width: '100%',
               maxWidth: '300px',
               padding: '12px',
               background: 'rgba(255, 255, 255, 0.05)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               borderRadius: '12px',
               color: 'rgba(255, 255, 255, 0.9)',
               fontSize: '0.9rem',
               cursor: 'pointer',
               backdropFilter: 'blur(10px)',
               transition: 'all 0.3s ease'
             }}
             onMouseEnter={(e) => {
               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
             }}
             onMouseLeave={(e) => {
               e.target.style.background = 'rgba(255, 255, 255, 0.05)';
             }}
           >
             Info Aplikasi & Sumber
           </button>
           
           {!isStandalone && (
              <button 
                onClick={handleInstallClick} 
                style={{ 
                  width: '100%',
                  maxWidth: '300px',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                Simpan Shortcut Aplikasi
              </button>
           )}
        </div>

        {/* Source Reference Modal */}
        {showSourceModal && (
          <div className="modal-overlay" onClick={() => setShowSourceModal(false)}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{textAlign: 'left'}}>
              <h3 style={{ color: 'var(--accent-color)', marginBottom: '16px', fontSize: '1.2rem', textAlign: 'center' }}>Info Aplikasi & Sumber</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '16px', textAlign: 'center' }}>
                Aplikasi <strong>Muslim Beginner</strong> merupakan panduan ibadah harian yang ringkas dan moden. Ia direka untuk menepati kelaziman amalan masyarakat Islam di Malaysia, serta boleh diakses secara luar talian (Offline PWA).
              </p>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '24px' }}>
                <strong style={{ color: 'white' }}>Pautan Sumber & Integrasi:</strong>
                <ul style={{ paddingLeft: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Wirid & Doa:</strong> Susunan bacaan dipetik secara teliti daripada buku <em>Wirid & Doa Selepas Solat (Nassehat)</em>.</li>
                  <li><strong>Waktu Solat:</strong> Data disegerakkan secara langsung menggunakan <em>Malaysia Prayer Time API (mpt.i906.my)</em> yang merujuk jadual rasmi e-Solat JAKIM untuk ketepatan 100%.</li>
                  <li><strong>Tarikh Hijrah & Lokasi:</strong> Disokong oleh <em>Aladhan API</em> dan <em>BigDataCloud</em>.</li>
                  <li><strong>Tadabbur & Terjemahan:</strong> Olahan refleksi dan pengajaran dijana secara pintar menggunakan teknologi <em>Google Gemini AI</em>.</li>
                </ul>
              </div>
              <button 
                onClick={() => setShowSourceModal(false)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Install Instruction Modal */}
        {showInstallModal && (
          <div className="modal-overlay" onClick={() => setShowInstallModal(false)}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
              <h3 style={{color: 'var(--accent-color)', marginBottom: '16px', fontSize: '1.2rem'}}>Cara Simpan Shortcut</h3>
              {isIOS ? (
                <ol className="install-steps" style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                  <li>Buka ikon <strong style={{color: 'var(--text-primary)'}}>Share</strong> di paparan <em>browser</em> telefon anda.</li>
                  <li>Pilih <strong style={{color: 'var(--text-primary)'}}>Add to Home Screen</strong>.</li>
                  <li>Tekan <strong style={{color: 'var(--text-primary)'}}>Add</strong>.</li>
                </ol>
              ) : (
                <div className="install-steps" style={{paddingLeft: '0'}}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tekan butang menu (tiga titik) pada browser anda dan pilih <strong>"Add to Home screen"</strong> atau <strong>"Install app"</strong>.</p>
                </div>
              )}
              <button className="install-pwa-btn" style={{marginTop: '24px', width: '100%'}} onClick={() => setShowInstallModal(false)}>Tutup</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Doa dan Niat Module
  if (activeModule === 'doa-dan-niat') {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
        <div className="header" style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>Doa & Niat</h1>
          <p>Himpunan panduan doa dan niat pilihan</p>
        </div>

        <div className="menu-grid">
          <div className="menu-card" onClick={() => { setActiveModule('qunut'); setDoaType('sendiri'); }}>
            <span className="menu-icon">🤲</span>
            <div className="menu-title">Doa Qunut</div>
            <div className="menu-subtitle">Panduan & Bacaan</div>
          </div>

          <div className="menu-card" onClick={() => { setActiveModule('musafir'); setJamakType('taqdim'); setSelectedPairId(null); }}>
            <span className="menu-icon">🕋</span>
            <div className="menu-title">Musafir</div>
            <div className="menu-subtitle">Jamak & Qasar</div>
          </div>
        </div>

        <div className="floating-nav-left">
          <button className="floating-nav-btn" onClick={resetToHome} aria-label="Home"><HomeIcon /></button>
        </div>
      </div>
    );
  }

  // Musafir Module
  if (activeModule === 'musafir') {
    const activeData = musafirData[jamakType];
    const selectedPair = activeData.pairs.find(p => p.id.includes(selectedPairId));
    
    return (
      <div className="app-container">
        <div className="header">
          <h1>Panduan Musafir</h1>
          <p>Jamak & Qasar</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            <button 
              onClick={() => { setJamakType('taqdim'); setSelectedPairId(null); }} 
              className="install-pwa-btn"
              style={{ 
                padding: '10px 16px', 
                fontSize: '0.85rem',
                background: jamakType === 'taqdim' ? 'var(--accent-color)' : 'transparent',
                border: jamakType === 'taqdim' ? '1px solid var(--accent-color)' : '1px solid var(--border)',
                color: jamakType === 'taqdim' ? 'white' : 'var(--text-secondary)',
                flex: 1
              }}
            >
              Jamak Taqdim
            </button>
            <button 
              onClick={() => { setJamakType('takhir'); setSelectedPairId(null); }} 
              className="install-pwa-btn"
              style={{ 
                padding: '10px 16px', 
                fontSize: '0.85rem',
                background: jamakType === 'takhir' ? 'var(--accent-color)' : 'transparent',
                border: jamakType === 'takhir' ? '1px solid var(--accent-color)' : '1px solid var(--border)',
                color: jamakType === 'takhir' ? 'white' : 'var(--text-secondary)',
                flex: 1
              }}
            >
              Jamak Takhir
            </button>
          </div>
        </div>

        <div className="wirid-list">
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '16px', borderLeft: '4px solid var(--accent-color)' }}>
            <h2 style={{ color: 'var(--accent-color)', fontSize: '1.2rem', marginBottom: '8px' }}>{activeData.title}</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{activeData.description}</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <button 
              onClick={() => { setSelectedPairId(selectedPairId === 'zuhur_asar' ? null : 'zuhur_asar'); setShowMusafirTrans1(false); setShowMusafirTrans2(false); }}
              className="install-pwa-btn"
              style={{ 
                flex: 1, 
                fontSize: '0.8rem',
                background: selectedPairId === 'zuhur_asar' ? 'rgba(255,255,255,0.15)' : 'var(--glass-bg)',
                border: selectedPairId === 'zuhur_asar' ? '1px solid var(--accent-color)' : '1px solid var(--border)',
                color: selectedPairId === 'zuhur_asar' ? 'white' : 'var(--text-secondary)'
              }}
            >
              ☀️ Zuhur + Asar
            </button>
            <button 
              onClick={() => { setSelectedPairId(selectedPairId === 'maghrib_isyak' ? null : 'maghrib_isyak'); setShowMusafirTrans1(false); setShowMusafirTrans2(false); }}
              className="install-pwa-btn"
              style={{ 
                flex: 1, 
                fontSize: '0.8rem',
                background: selectedPairId === 'maghrib_isyak' ? 'rgba(255,255,255,0.15)' : 'var(--glass-bg)',
                border: selectedPairId === 'maghrib_isyak' ? '1px solid var(--accent-color)' : '1px solid var(--border)',
                color: selectedPairId === 'maghrib_isyak' ? 'white' : 'var(--text-secondary)'
              }}
            >
              🌙 Maghrib + Isyak
            </button>
          </div>

          {jamakType === 'takhir' && !selectedPairId && (
             <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--accent-color)', border: '1px dashed var(--accent-color)', textAlign: 'center', marginBottom: '24px' }}>
               <strong>Peringatan Wajib:</strong> {activeData.note}
             </div>
          )}

          {selectedPair && (
            <div className="glass-panel wirid-card animate-fade-in" style={{ marginBottom: '24px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <h3 style={{ margin: 0, color: 'var(--accent-color)', fontSize: '1.1rem' }}>{selectedPair.name}</h3>
                <span style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{selectedPair.time}</span>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-color)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Langkah 1: {selectedPair.solat1.name}</h4>
                <div className="arabic-text" style={{ fontSize: '1.4rem', marginBottom: '12px', lineHeight: '2' }}>{selectedPair.solat1.arabic}</div>
                <div className="rumi-text" style={{ marginBottom: '12px' }}>{selectedPair.solat1.rumi}</div>
                
                <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 12px' }}>
                  <button 
                    onClick={() => setShowMusafirTrans1(!showMusafirTrans1)}
                    style={{
                      padding: '4px 16px',
                      fontSize: '0.75rem',
                      borderRadius: '20px',
                      background: showMusafirTrans1 ? 'var(--accent-color)' : 'transparent',
                      border: '1px solid var(--accent-color)',
                      color: showMusafirTrans1 ? 'white' : 'var(--accent-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {showMusafirTrans1 ? 'Tutup Terjemahan' : 'Terjemahan'}
                  </button>
                </div>

                {showMusafirTrans1 && (
                  <div className="translation-text animate-fade-in" style={{ marginTop: '12px', marginBottom: '12px' }}>
                    {selectedPair.solat1.niat}
                  </div>
                )}
                
                {selectedPair.solat1.note && <div className="nota-text" style={{ marginTop: '12px', color: '#fb7185' }}>{selectedPair.solat1.note}</div>}
              </div>

              <div style={{ paddingTop: '20px', borderTop: '1px dashed rgba(255,255,255,0.1)', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-color)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Langkah 2: {selectedPair.solat2.name}</h4>
                <div className="arabic-text" style={{ fontSize: '1.4rem', marginBottom: '12px', lineHeight: '2' }}>{selectedPair.solat2.arabic}</div>
                <div className="rumi-text" style={{ marginBottom: '12px' }}>{selectedPair.solat2.rumi}</div>
                
                <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 12px' }}>
                  <button 
                    onClick={() => setShowMusafirTrans2(!showMusafirTrans2)}
                    style={{
                      padding: '4px 16px',
                      fontSize: '0.75rem',
                      borderRadius: '20px',
                      background: showMusafirTrans2 ? 'var(--accent-color)' : 'transparent',
                      border: '1px solid var(--accent-color)',
                      color: showMusafirTrans2 ? 'white' : 'var(--accent-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {showMusafirTrans2 ? 'Tutup Terjemahan' : 'Terjemahan'}
                  </button>
                </div>

                {showMusafirTrans2 && (
                  <div className="translation-text animate-fade-in" style={{ marginTop: '12px' }}>
                    {selectedPair.solat2.niat}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>



        <div className="floating-nav-left">
          <button className="floating-nav-btn" onClick={() => { setActiveModule('doa-dan-niat'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Back">🔙</button>
        </div>

        <div className="floating-nav-right-group">
          <button className="floating-nav-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Ke Atas Sekali">
            🔝
          </button>
          <button className="floating-nav-btn" onClick={() => window.scrollBy({ top: -300, behavior: 'smooth' })} aria-label="Ke atas">
            ▲
          </button>
          <button className="floating-nav-btn" onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })} aria-label="Ke bawah">
            ▼
          </button>
        </div>
      </div>
    );
  }

  // Doa Qunut Module
  if (activeModule === 'qunut') {
    return (
      <div className="app-container">
        <div className="header">
          <h1>Doa Qunut</h1>
          
          <div style={{ margin: '16px 0', padding: '12px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {doaType === 'sendiri' ? 'Panduan bacaan doa untuk solat secara bersendirian' : 'Panduan bacaan doa khusus buat Imam bagi solat berjemaah'}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '12px', marginBottom: '8px' }}>
            <button 
              onClick={() => setDoaType('sendiri')} 
              className="install-pwa-btn"
              style={{ 
                padding: '10px 16px', 
                fontSize: '0.85rem',
                background: doaType === 'sendiri' ? 'var(--accent-color)' : 'transparent',
                border: doaType === 'sendiri' ? '1px solid var(--accent-color)' : '1px solid var(--border)',
                color: doaType === 'sendiri' ? '#09090b' : 'var(--text-secondary)',
                fontWeight: doaType === 'sendiri' ? '600' : '400',
                flex: 1,
                maxWidth: '160px',
                margin: 0
              }}
            >
              Solat Sendiri
            </button>
            
            <button 
              onClick={() => setDoaType('jemaah')} 
              className="install-pwa-btn"
              style={{ 
                padding: '10px 16px', 
                fontSize: '0.85rem',
                background: doaType === 'jemaah' ? 'var(--accent-color)' : 'transparent',
                border: doaType === 'jemaah' ? '1px solid var(--accent-color)' : '1px solid var(--border)',
                color: doaType === 'jemaah' ? '#09090b' : 'var(--text-secondary)',
                fontWeight: doaType === 'jemaah' ? '600' : '400',
                flex: 1,
                maxWidth: '160px',
                margin: 0
              }}
            >
              Solat Berjemaah
            </button>
          </div>
        </div>

        <div className="wirid-list">
          {wiridData.doaQunut.map((qunut) => (
            <WiridCard key={qunut.id} data={qunut} doaType={doaType} />
          ))}
        </div>



        <div className="floating-nav-left">
          <button className="floating-nav-btn" onClick={() => { setActiveModule('doa-dan-niat'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Back">🔙</button>
        </div>

        <div className="floating-nav-right-group">
          <button className="floating-nav-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Ke Atas Sekali">
            🔝
          </button>
          <button className="floating-nav-btn" onClick={() => window.scrollBy({ top: -300, behavior: 'smooth' })} aria-label="Ke atas">
            ▲
          </button>
          <button className="floating-nav-btn" onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })} aria-label="Ke bawah">
            ▼
          </button>
        </div>
      </div>
    );
  }
  
  // Quran Tadabbur Module
  if (activeModule === 'tadabbur') {
    return (
      <div className="app-container">
        <div className="header" style={{ marginBottom: '30px' }}>
          <h1 style={{ background: 'var(--accent-color)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Tadabbur & Terjemahan
          </h1>
          <p>Refleksi & Terjemahan Ayat</p>

        </div>
        
        <QuranTadabbur />

        <div className="floating-nav-left">
          <button className="floating-nav-btn" onClick={resetToHome} aria-label="Utama"><HomeIcon /></button>
        </div>

        <div className="floating-nav-right-group">
          <button className="floating-nav-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Ke Atas Sekali">
            <TopIcon />
          </button>
          <button className="floating-nav-btn" onClick={() => window.scrollBy({ top: -300, behavior: 'smooth' })} aria-label="Ke atas">
            <UpIcon />
          </button>
          <button className="floating-nav-btn" onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })} aria-label="Ke bawah">
            <DownIcon />
          </button>
        </div>
      </div>
    );
  }

  // Tajweed Module
  if (activeModule === 'tajweed') {
    return <Tajweed onHome={resetToHome} />;
  }

  // Haiyalasollah Module
  if (activeModule === 'haiyalasollah') {
    return <Haiyalasollah onBack={resetToHome} />;
  }

  // Wirid & Doa Module Content
  return (
    <div className="app-container">
      <div className="header">
        <h1>Wirid & Doa Selepas Solat</h1>
        
        <div style={{ margin: '16px 0', padding: '12px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {doaType === 'sendiri' ? 'Panduan bacaan doa untuk solat secara bersendirian' : 'Panduan bacaan doa khusus buat Imam bagi solat berjemaah'}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          <button 
            onClick={() => setDoaType('sendiri')} 
            className="install-pwa-btn"
            style={{ 
              padding: '10px 16px', 
              fontSize: '0.85rem',
              background: doaType === 'sendiri' ? 'var(--accent-color)' : 'transparent',
              border: doaType === 'sendiri' ? '1px solid var(--accent-color)' : '1px solid var(--border)',
              color: doaType === 'sendiri' ? '#09090b' : 'var(--text-secondary)',
              fontWeight: doaType === 'sendiri' ? '600' : '400',
              flex: 1,
              maxWidth: '160px',
              margin: 0
            }}
          >
            Solat Sendiri
          </button>
          
          <button 
            onClick={() => setDoaType('jemaah')} 
            className="install-pwa-btn"
            style={{ 
              padding: '10px 16px', 
              fontSize: '0.85rem',
              background: doaType === 'jemaah' ? 'var(--accent-color)' : 'transparent',
              border: doaType === 'jemaah' ? '1px solid var(--accent-color)' : '1px solid var(--border)',
              color: doaType === 'jemaah' ? '#09090b' : 'var(--text-secondary)',
              fontWeight: doaType === 'jemaah' ? '600' : '400',
              flex: 1,
              maxWidth: '160px',
              margin: 0
            }}
          >
            Solat Berjemaah
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <button 
            onClick={() => setIsSingkat(!isSingkat)}
            style={{ 
              padding: '4px 12px', 
              fontSize: '0.7rem',
              background: isSingkat ? 'var(--accent-color)' : 'transparent',
              border: '1px solid var(--accent-color)',
              color: isSingkat ? 'white' : 'var(--accent-color)',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease'
            }}
          >
            {isSingkat ? 'Mod Ringkas: ON' : 'Mod Ringkas: OFF'}
          </button>
        </div>
      </div>

      <div className="wirid-list">
        {currentData.map((wirid, idx) => (
          <div key={wirid.id} ref={el => cardRefs.current[idx] = el}>
            <WiridCard data={wirid} doaType={doaType} />
          </div>
        ))}
      </div>



      {/* Floating Navigation Group */}
      <div className="floating-nav-left">
        <button className="floating-nav-btn" onClick={resetToHome} aria-label="Utama"><HomeIcon /></button>
      </div>

      <div className="floating-nav-right-group">
        <button className="floating-nav-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Ke Atas Sekali">
          <TopIcon />
        </button>
        <button className="floating-nav-btn" onClick={() => scrollToCard('up')} aria-label="Ke atas">
          <UpIcon />
        </button>
        <button className="floating-nav-btn" onClick={() => scrollToCard('down')} aria-label="Ke bawah">
          <DownIcon />
        </button>
      </div>

      {/* Source Reference Modal */}
      {showSourceModal && (
        <div className="modal-overlay" onClick={() => setShowSourceModal(false)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{textAlign: 'left'}}>
            <h3 style={{ color: 'var(--accent-color)', marginBottom: '16px', fontSize: '1.2rem', textAlign: 'center' }}>Info Aplikasi & Sumber</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '16px', textAlign: 'center' }}>
              Aplikasi <strong>Muslim Beginner</strong> merupakan panduan ibadah harian yang ringkas dan moden. Ia direka untuk menepati kelaziman amalan masyarakat Islam di Malaysia, serta boleh diakses secara luar talian (Offline PWA).
            </p>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '24px' }}>
              <strong style={{ color: 'white' }}>Pautan Sumber & Integrasi:</strong>
              <ul style={{ paddingLeft: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Wirid & Doa:</strong> Susunan bacaan dipetik secara teliti daripada buku <em>Wirid & Doa Selepas Solat (Nassehat)</em>.</li>
                <li><strong>Waktu Solat:</strong> Data disegerakkan secara langsung menggunakan <em>Malaysia Prayer Time API (mpt.i906.my)</em> yang merujuk jadual rasmi e-Solat JAKIM untuk ketepatan 100%.</li>
                <li><strong>Tarikh Hijrah & Lokasi:</strong> Disokong oleh <em>Aladhan API</em> dan <em>BigDataCloud</em>.</li>
                <li><strong>Tadabbur & Terjemahan:</strong> Olahan refleksi dan pengajaran dijana secara pintar menggunakan teknologi <em>Google Gemini AI</em>.</li>
              </ul>
            </div>
            <button 
              onClick={() => setShowSourceModal(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* PWA Update Prompt */}
      {showUpdatePrompt && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20, 20, 20, 0.95)',
          border: '1px solid var(--accent-color)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 9999,
          width: '90%',
          maxWidth: '400px',
          boxShadow: 'none',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>🚀</span>
            <div>
              <h4 style={{ margin: '0 0 4px', color: 'white', fontSize: '0.95rem' }}>Update Baru Tersedia!</h4>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Versi terkini aplikasi sedia untuk digunakan.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setShowUpdatePrompt(false)}
              style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Nanti
            </button>
            <button 
              onClick={handleUpdateConfirm}
              style={{ flex: 1, padding: '10px', background: 'var(--accent-color)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Update Sekarang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
