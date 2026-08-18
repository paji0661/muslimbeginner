import React, { useState, useEffect } from 'react';
import './Haiyalasollah.css';
import { PrayerData } from './prayerData';

export default function Haiyalasollah({ onBack }) {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [showRecitation, setShowRecitation] = useState(false);
  const [steps, setSteps] = useState([]);

  const navigateTo = (view, prayerKey = null) => {
    if (view === 'home') {
      setCurrentView('home');
      setSelectedPrayer(null);
    } else if (view === 'guide' && prayerKey) {
      if (PrayerData.PRAYER_CONFIGS[prayerKey]) {
        setCurrentView('guide');
        setSelectedPrayer(prayerKey);
        setSteps(PrayerData.generatePrayerSteps(prayerKey));
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && currentView === 'guide') {
        navigateTo('home');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentView]);

  const getTagNumClass = (tag) => {
    if (!tag) return '';
    const t = tag.toUpperCase();
    if (t === 'RUKUN') return 'num-rukun';
    if (t === 'WAJIB') return 'num-wajib';
    if (t.includes('SUNAT')) return 'num-sunat';
    if (t === 'INTIQAL') return 'num-intiqal';
    return 'num-sunat';
  };

  const renderThumb = (step, index) => {
    const isSpecial = step.isSpecial || step.tag === "SUNAT AB'ADH";
    const specialClass = isSpecial ? 'thumb-special' : '';
    const numCls = getTagNumClass(step.tag);
    
    const getAssetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

    if (step.isDualImage && step.dualImages) {
      return (
        <div key={index} className={`thumb thumb-dual ${specialClass}`} title={step.description}>
          <div className="thumb-img thumb-img-half">
            <img src={getAssetUrl(step.dualImages[0].src)} alt={step.dualImages[0].alt} loading="eager" />
            <div className={`thumb-num ${numCls}`}>{step.stepNumber}</div>
            <div className="thumb-overlay">
              <span className="thumb-name">{step.dualImages[0].label}</span>
            </div>
          </div>
          <div className="thumb-separator"><span className="thumb-sep-line"></span></div>
          <div className="thumb-img thumb-img-half">
            <img src={getAssetUrl(step.dualImages[1].src)} alt={step.dualImages[1].alt} loading="eager" />
            <div className="thumb-overlay">
              <span className="thumb-name">{step.dualImages[1].label}</span>
            </div>
          </div>
          <div className={`thumb-rec ${showRecitation ? 'rec-open' : ''}`}>
            <div className="rec-inner">
              <div className="rec-section">
                <span className="rec-badge rec-arab">Arab</span>
                <div className="rec-arabic" dangerouslySetInnerHTML={{__html: step.recitation.arabic}}></div>
              </div>
              <div className="rec-section">
                <span className="rec-badge rec-rumi">Rumi</span>
                <div className="rec-rumi-text" dangerouslySetInnerHTML={{__html: step.recitation.rumi}}></div>
              </div>
              <div className="rec-section">
                <span className="rec-badge rec-terj">Terjemahan</span>
                <div className="rec-terj-text" dangerouslySetInnerHTML={{__html: step.recitation.translation}}></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className={`thumb ${specialClass}`} title={step.description}>
        <div className="thumb-img">
          <img src={getAssetUrl(step.image)} alt={step.label} loading="eager" />
          <div className={`thumb-num ${numCls}`}>{step.stepNumber}</div>
          <div className="thumb-overlay">
            <span className="thumb-name">{step.label}</span>
          </div>
        </div>
        <div className={`thumb-rec ${showRecitation ? 'rec-open' : ''}`}>
          <div className="rec-inner">
            <div className="rec-section">
              <span className="rec-badge rec-arab">Arab</span>
              <div className="rec-arabic" dangerouslySetInnerHTML={{__html: step.recitation.arabic}}></div>
            </div>
            <div className="rec-section">
              <span className="rec-badge rec-rumi">Rumi</span>
              <div className="rec-rumi-text" dangerouslySetInnerHTML={{__html: step.recitation.rumi}}></div>
            </div>
            <div className="rec-section">
              <span className="rec-badge rec-terj">Terjemahan</span>
              <div className="rec-terj-text" dangerouslySetInnerHTML={{__html: step.recitation.translation}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => {
    const prayers = Object.values(PrayerData.PRAYER_CONFIGS);
    return (
      <div className="haiyalasollah-app relative z-10 min-h-screen flex flex-col w-full text-slate-100">
        <div className="bg-pattern"></div>
        <header className="text-center pt-6 pb-4 md:pt-10 md:pb-6 px-4 animate-fade-in relative z-20">
          
          <div className="animate-float mb-4"><span className="text-4xl md:text-5xl">🕌</span></div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2" style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}>
            <span style={{ color: 'var(--text-primary)' }}>Haiyalasollah</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-400 max-w-2xl mx-auto font-medium">حَيَّ عَلَى الصَّلَاةِ</p>
          <p className="text-xs md:text-sm text-slate-500 mt-2">Panduan Solat Fardu — Langkah demi Langkah</p>
          <div className="mt-3"><span className="ornament">✦ ✦ ✦</span></div>
        </header>
        <main className="flex-1 px-4 md:px-8 lg:px-16 pb-10 max-w-6xl mx-auto w-full z-20 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
            {prayers.map((prayer, index) => (
              <div key={prayer.key} onClick={() => navigateTo('guide', prayer.key)} className={`prayer-card glass-card p-4 md:p-5 text-center animate-fade-in-up stagger-${index + 1}`} style={{opacity: 0, animationFillMode: 'forwards'}} role="button" tabIndex="0">
                <div className="text-3xl md:text-4xl mb-3 relative z-10">{prayer.icon}</div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight mb-1 relative z-10 text-white" style={{ fontFamily: "'Space Mono', monospace" }}>{prayer.name}</h2>
                <p className="text-base md:text-lg font-semibold text-slate-400 mb-2 relative z-10" style={{fontFamily: "'Noto Naskh Arabic', 'Amiri', serif", direction: 'rtl'}}>{prayer.arabicName}</p>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full relative z-10" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }} className="text-xs md:text-sm">{prayer.rakaatCount} Rakaat</span>
                </div>
                <p className="text-[0.65rem] md:text-xs text-slate-500 mt-2 relative z-10">{prayer.timeLabel}</p>
              </div>
            ))}
          </div>
        </main>
        <footer className="relative z-20 mt-auto px-4 pb-8 pt-6">
          <div className="footer-divider mb-6"></div>
          <div className="text-center">
            <p className="text-slate-600 text-xs md:text-sm"><span className="text-emerald-600 font-semibold">Haiyalasollah</span> · Panduan Solat Fardu</p>
            <p className="text-slate-700 text-xs mt-1">Semoga Allah menerima ibadah kita. آمين</p>
          </div>
        </footer>
        <div className="floating-nav-left">
          <button className="floating-nav-btn" onClick={onBack} aria-label="Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>
        </div>
      </div>
    );
  };

  const renderGuide = () => {
    const config = PrayerData.PRAYER_CONFIGS[selectedPrayer];
    if (!config) return null;

    const rakaatGroups = [];
    let currentGroup = null;
    steps.forEach(step => {
      if (step.isRakaatMarker) {
        currentGroup = { rakaatNumber: step.rakaatNumber, totalRakaat: step.totalRakaat, steps: [] };
        rakaatGroups.push(currentGroup);
      } else if (currentGroup) {
        currentGroup.steps.push(step);
      }
    });

    return (
      <div className="haiyalasollah-app w-full h-full text-slate-100 bg-[#000000]">
        <div className="bg-pattern"></div>
        <div className={`guide-page ${showRecitation ? 'scrollable' : ''}`}>
          <div className="guide-topbar">
            
            
            <div className="topbar-checks">
              <label className="chk">
                <input type="checkbox" checked={showRecitation} onChange={(e) => setShowRecitation(e.target.checked)} />
                <span className="chk-box"><svg className="chk-tick" viewBox="0 0 12 10"><path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></span>
                <span className="chk-text">Bacaan</span>
              </label>
            </div>
            <div className="topbar-legend">
              <div className="legend-item"><span className="legend-dot num-rukun"></span>Rukun</div>
              <div className="legend-item"><span className="legend-dot num-wajib"></span>Wajib</div>
              <div className="legend-item"><span className="legend-dot num-sunat"></span>Sunat</div>
              <div className="legend-item"><span className="legend-dot num-intiqal"></span>Pergerakan</div>
            </div>
            <div className="topbar-title">
              <span className="topbar-title-name">Solat {config.name}</span>
              <span className="topbar-title-meta">{config.rakaatCount} Rakaat</span>
            </div>
          </div>
          <div className="guide-body">
            {rakaatGroups.map((group, idx) => (
              <div key={idx} className="rakaat-section">
                <div className="rakaat-bar">
                  <span className="rakaat-bar-dot"></span>
                  <span className="rakaat-bar-label">Rakaat {group.rakaatNumber}</span>
                  <span className="rakaat-bar-sub">/ {group.totalRakaat}</span>
                </div>
                <div className="rakaat-strip">
                  {group.steps.map((step, sIdx) => renderThumb(step, sIdx))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="floating-nav-left">
          <button className="floating-nav-btn" onClick={() => navigateTo('home')} aria-label="Back">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        </div>
        <div className="floating-nav-right-group">
          <button className="floating-nav-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Ke Atas Sekali">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 11-5-5-5 5"/><path d="m17 18-5-5-5 5"/></svg>
          </button>
          <button className="floating-nav-btn" onClick={() => window.scrollBy({ top: -300, behavior: 'smooth' })} aria-label="Ke atas">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <button className="floating-nav-btn" onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })} aria-label="Ke bawah">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>

      </div>
    );
  };

  return currentView === 'home' ? renderHome() : renderGuide();
}
