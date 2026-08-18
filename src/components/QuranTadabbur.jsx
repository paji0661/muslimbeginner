import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { surahData } from '../data/surahData';

const stripMarkdownAndHtml = (text) => {
  if (!text) return '';
  return text
    .replace(/<[^>]*>?/gm, '') 
    .replace(/(\*\*|__)(.*?)\1/g, '$2') 
    .replace(/(\*|_)(.*?)\1/g, '$2') 
    .replace(/~~(.*?)~~/g, '$1') 
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1') 
    .replace(/#+\s+(.*)/g, '$1') 
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') 
    .replace(/^\s*[-*+]\s+/gm, '') 
    .replace(/^\s*\d+\.\s+/gm, '') 
    .replace(/>\s+(.*)/g, '$1') 
    .trim();
};

const Combobox = ({ value, options, onChange, label, placeholder, renderOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      const selected = options.find(o => o.value === value);
      setInputValue(selected ? selected.text : '');
    }
  }, [value, isOpen, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen((prevIsOpen) => {
          if (prevIsOpen) {
            setInputValue((prevInput) => {
              const matched = options.find(o => o.text.toLowerCase() === prevInput.trim().toLowerCase() || String(o.value) === prevInput.trim());
              if (matched) {
                onChange(matched.value);
                return matched.text;
              }
              if (prevInput.trim() === '') {
                onChange('');
                return '';
              }
              const selected = options.find(o => o.value === value);
              return selected ? selected.text : '';
            });
          }
          return false;
        });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [options, value, onChange]);

  const filteredOptions = isOpen && inputValue.trim() !== '' && !options.find(o => o.text === inputValue)
    ? options.filter(o => o.searchKey.toLowerCase().includes(inputValue.toLowerCase()))
    : options;

  return (
    <div style={{ position: 'relative', flex: 1 }} ref={dropdownRef}>
      {label && <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-color)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{label}</label>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: label ? '14px 16px' : '10px 14px',
            paddingRight: '35px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid var(--border)',
            borderRadius: label ? '12px' : '8px',
            color: 'var(--text-primary)',
            fontSize: label ? '1rem' : '1rem',
            outline: 'none',
            textAlign: label ? 'left' : 'center',
            cursor: 'text'
          }}
        />
        <div style={{ position: 'absolute', right: '12px', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: '12px' }}>▼</div>
        {value && label && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
              setInputValue('');
              setIsOpen(true);
            }}
            style={{
              position: 'absolute',
              right: '35px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            ✕
          </button>
        )}
      </div>
      
      {isOpen && filteredOptions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: '#121212',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          zIndex: 100,
          maxHeight: '250px',
          overflowY: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.15) transparent'
        }}>
          {filteredOptions.map(opt => (
            <div 
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                color: value === opt.value ? 'var(--accent-color)' : 'white',
                background: value === opt.value ? 'rgba(255,255,255,0.05)' : 'transparent',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.9rem',
                display: 'flex',
                justifyContent: label ? 'space-between' : 'center',
                alignItems: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = value === opt.value ? 'rgba(255,255,255,0.05)' : 'transparent'}
            >
              {renderOption ? renderOption(opt) : opt.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const QuranTadabbur = () => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [startVerse, setStartVerse] = useState('');
  const [endVerse, setEndVerse] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  
  // New states for Audio Mode
  const [viewMode, setViewMode] = useState('tadabbur'); // 'tadabbur' or 'audio'
  const [audioAyah, setAudioAyah] = useState(1);
  const [audioData, setAudioData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const utteranceRef = useRef(null);

  // Audio Functions
  const stopAudio = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const playText = (textToRead, onEndCallback) => {
    stopAudio();
    if (!textToRead) return;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    let voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => (v.lang.includes('ms-MY') || v.lang.includes('ms-')) && v.name.includes('Google'));
    if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('id-ID') && v.name.includes('Google'));
    if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('ms-MY') || v.lang.includes('ms-'));

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.lang = 'ms-MY';
    utterance.rate = audioSpeed;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      if (onEndCallback) onEndCallback();
    };
    utterance.onerror = (e) => {
      console.error("Speech Synthesis Error:", e);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const loadAudioAyah = async (surahNum, surahName, ayahNum, targetEndVerse, autoPlay = false) => {
    setLoadingAudio(true);
    setError('');
    stopAudio();
    
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/editions/quran-uthmani`);
      const data = await res.json();
      
      if (data.code === 200) {
        const arabicText = data.data[0].text;
        
        const apiUrl = import.meta.env.VITE_API_URL || 'https://panduansolat-api.onrender.com';
        const aiRes = await axios.post(`${apiUrl}/api/audio-translation`, {
          surahNum,
          surahName,
          ayahNum,
          arabicText
        });
        
        if (aiRes.data && aiRes.data.translation) {
          setAudioData({
            arabic: arabicText,
            translation: aiRes.data.translation
          });
          
          if (autoPlay) {
            playText(aiRes.data.translation, () => {
               if (ayahNum < targetEndVerse) {
                 const next = ayahNum + 1;
                 setAudioAyah(next);
                 loadAudioAyah(surahNum, surahName, next, targetEndVerse, true);
               }
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError('Gagal memuatkan audio. Sila cuba lagi.');
    } finally {
      setLoadingAudio(false);
    }
  };

  const handleToggleMode = (mode) => {
    setViewMode(mode);
    stopAudio();
    if (mode === 'audio' && result && selectedSurah) {
       const sV = parseInt(startVerse);
       setAudioAyah(sV);
       loadAudioAyah(selectedSurah.id, selectedSurah.name, sV, parseInt(endVerse), false);
    }
  };

  // Load latest result from cache on mount
  useEffect(() => {
    const cached = localStorage.getItem('last_tadabbur_result');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setResult(parsed);
      } catch (e) {
        console.error('Failed to parse cached result');
      }
    }
  }, []);

  // Save result to cache when it changes
  useEffect(() => {
    if (result) {
      localStorage.setItem('last_tadabbur_result', JSON.stringify(result));
    }
  }, [result]);

  const handleReset = () => {
    stopAudio();
    setResult(null);
    localStorage.removeItem('last_tadabbur_result');
  };

  const handleGenerate = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!selectedSurah) {
      setError('Sila pilih surah terlebih dahulu.');
      return;
    }

    let sV = parseInt(startVerse);
    let eV = parseInt(endVerse);

    if (isNaN(sV) && !isNaN(eV)) {
      sV = eV;
      setStartVerse(eV.toString());
    } else if (!isNaN(sV) && isNaN(eV)) {
      eV = sV;
      setEndVerse(sV.toString());
    }

    if (isNaN(sV) || isNaN(eV) || sV < 1 || eV < 1 || sV > selectedSurah.verses || eV > selectedSurah.verses) {
      setError(`Ayat tidak sah. Surah ini mempunyai ${selectedSurah.verses} ayat.`);
      return;
    }

    if (sV > eV) {
      setError('Ayat mula tidak boleh lebih besar daripada ayat akhir.');
      return;
    }

    if (!window.navigator.onLine) {
      setError('Tiada sambungan internet. Sila pastikan anda mempunyai akses internet untuk menjana tadabbur baru.');
      return;
    }

    const rangeString = `${selectedSurah.id}:${sV}${sV !== eV ? '-' + eV : ''}`;

    setLoading(true);
    setError('');
    
    // Reset audio state for new search
    setViewMode('tadabbur');
    setAudioAyah(sV);
    setAudioData(null);
    stopAudio();

    try {
      console.log('Generating tadabbur for:', rangeString);
      const apiUrl = import.meta.env.VITE_API_URL || 'https://panduansolat-api.onrender.com';
      const response = await axios.post(`${apiUrl}/api/tadabbur`, { verseRange: rangeString });
      
      if (response.data && response.data.reflection) {
        const displayRange = `${selectedSurah.name} ${sV}${sV !== eV ? '-' + eV : ''}`;
        
        let cleanReflection = response.data.reflection;
        // Strip conversational preamble from Gemini (anything before the first heading or '1. ')
        cleanReflection = cleanReflection.replace(/^[\s\S]*?(?=(?:^|\n)(?:#|\d+\.\s|\*\*1\.\*\*))/i, '').trim();
        if (!cleanReflection) cleanReflection = response.data.reflection;
        
        const newResult = { ...response.data, reflection: cleanReflection, displayRange, timestamp: Date.now() };
        
        console.log('Tadabbur generated successfully');
        setResult(newResult);
        
        // Ensure result is visible with a slight delay
        setTimeout(() => {
          const resultEl = document.getElementById('tadabbur-result');
          if (resultEl) {
            console.log('Scrolling to result');
            resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            console.warn('Result element not found in DOM');
          }
        }, 500);
      } else {
        throw new Error('Data tadabbur tidak lengkap diterima dari server.');
      }
    } catch (err) {
      console.error('Tadabbur Error:', err);
      let detail = err.response?.data?.details || err.message;
      setError(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <form onSubmit={handleGenerate} className="glass-panel" style={{ padding: '24px', animation: 'fadeIn 0.5s ease-out', position: 'relative', zIndex: 50 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          {/* Surah Search */}
          <Combobox 
            label="Cari Surah"
            placeholder="Cth: Al-Fatihah, Kahf, atau 18"
            value={selectedSurah ? selectedSurah.id : ''}
            options={surahData.map(s => ({
              value: s.id,
              text: `${s.id}. ${s.name}`,
              searchKey: `${s.id} ${s.name}`,
              verses: s.verses
            }))}
            onChange={(val) => {
              if (!val) {
                setSelectedSurah(null);
              } else {
                if (!selectedSurah || selectedSurah.id !== val) {
                  const surah = surahData.find(s => s.id === val);
                  setSelectedSurah(surah);
                  setStartVerse('');
                  setEndVerse('');
                }
              }
            }}
            renderOption={(opt) => (
              <>
                <span style={{ fontWeight: '500' }}>{opt.text}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px' }}>{opt.verses} Ayat</span>
              </>
            )}
          />

          {/* Verse Selection Row */}
          {selectedSurah && (
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              alignItems: 'center',
              background: 'rgba(74, 222, 128, 0.05)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--accent-color)',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <Combobox 
                label="Ayat Mula"
                value={startVerse}
                options={Array.from({ length: selectedSurah.verses }, (_, i) => ({ value: (i+1).toString(), text: (i+1).toString(), searchKey: (i+1).toString() }))}
                onChange={setStartVerse}
              />
              <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '20px' }}>-</div>
              <Combobox 
                label="Ayat Akhir"
                value={endVerse}
                options={Array.from({ length: selectedSurah.verses }, (_, i) => ({ value: (i+1).toString(), text: (i+1).toString(), searchKey: (i+1).toString() }))}
                onChange={setEndVerse}
              />
            </div>
          )}
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(251, 113, 133, 0.1)', 
            border: '1px solid rgba(251, 113, 133, 0.3)', 
            borderRadius: '8px', 
            padding: '10px 16px',
            marginBottom: '16px',
            color: '#fb7185',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <button
          id="submitTadabburBtn"
          type="submit"
          disabled={loading || !selectedSurah}
          className="install-pwa-btn"
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '1rem',
            fontWeight: '600',
            background: (loading || !selectedSurah) ? 'transparent' : 'var(--accent-color)',
            color: (loading || !selectedSurah) ? 'var(--text-secondary)' : '#000000',
            cursor: (loading || !selectedSurah) ? 'not-allowed' : 'pointer',
            opacity: (loading || !selectedSurah) ? 0.6 : 1,
            border: (loading || !selectedSurah) ? '1px solid var(--border)' : '1px solid var(--accent-color)',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span className="loading-spinner"></span> Menjana Tadabbur...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              Hasilkan Tadabbur
            </span>
          )}
        </button>
      </form>

      {result && result.reflection && (
        <div id="tadabbur-result" className="glass-panel" style={{ border: '1px solid var(--accent-color)', overflow: 'hidden', animation: 'fadeIn 0.5s ease-out' }}>
          
          {/* Toggle Switch */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '24px 16px 16px', background: 'rgba(74, 222, 128, 0.05)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'inline-flex', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '9999px', padding: '4px', position: 'relative', boxShadow: 'none' }}>
              <button 
                type="button"
                onClick={() => handleToggleMode('audio')}
                style={{
                  position: 'relative', padding: '10px 24px', fontSize: '0.85rem', fontWeight: viewMode === 'audio' ? '600' : '500', 
                  borderRadius: '9999px', color: viewMode === 'audio' ? '#0f1115' : '#94a3b8', 
                  background: viewMode === 'audio' ? '#f1f5f9' : 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Terjemahan Audio
              </button>
              <button 
                type="button"
                onClick={() => handleToggleMode('tadabbur')}
                style={{
                  position: 'relative', padding: '10px 24px', fontSize: '0.85rem', fontWeight: viewMode === 'tadabbur' ? '600' : '500', 
                  borderRadius: '9999px', color: viewMode === 'tadabbur' ? '#0f1115' : '#94a3b8', 
                  background: viewMode === 'tadabbur' ? '#f1f5f9' : 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Bacaan Tadabbur
              </button>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'rgba(74, 222, 128, 0.02)', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ margin: 0, color: 'var(--accent-color)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {viewMode === 'audio' ? `Terjemahan ${result.displayRange}` : `Tadabbur ${result.displayRange}`}
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                type="button"
                onClick={() => {
                  const textToCopy = `Tadabbur ${result.displayRange}\n\n${result.reflection}\n\nTerjemahan:\n${result.translation}\n\nDijana melalui Muslim Beginner`;
                  navigator.clipboard.writeText(textToCopy);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }} 
                style={{ background: 'rgba(74, 222, 128, 0.2)', border: '1px solid var(--accent-color)', color: 'white', cursor: 'pointer', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}
              >
                Salin
              </button>
              <button 
                type="button"
                onClick={handleReset} 
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem' }}
              >
                Set Semula
              </button>
            </div>
          </div>

          <div style={{ padding: '20px' }}>
            {viewMode === 'tadabbur' ? (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--accent-color)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700' }}>Refleksi Tadabbur</h4>
                <div 
                  className="prose prose-invert lg:prose-lg max-w-none"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    padding: '24px', 
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    boxShadow: 'none'
                  }}
                >
                  <ReactMarkdown>{result.reflection}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', minHeight: '300px', justifyContent: 'center' }}>
                 {loadingAudio ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                      <span className="loading-spinner" style={{ display: 'inline-block', marginBottom: '16px' }}></span>
                      <p style={{ color: 'var(--text-secondary)' }}>Mendapatkan ayat dan menjana terjemahan AI...</p>
                    </div>
                 ) : (
                   <>
                     {audioData && (
                       <div style={{ width: '100%', animation: 'fadeIn 0.5s ease-out' }}>
                         <div style={{ marginBottom: '24px', padding: '12px 16px', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                           <span style={{ fontSize: '1.2rem' }}>💡</span>
                           <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: '1.5' }}>
                             <strong style={{ color: '#fbbf24', fontWeight: '600' }}>Makluman:</strong> Audio ini dijana menggunakan suara AI (loghat Indonesia). Sila rujuk teks terjemahan Bahasa Melayu di bawah sekiranya terdapat sebutan audio yang kurang tepat atau berbeza bunyinya.
                           </p>
                         </div>
                         <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                           <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid var(--accent-color)', borderRadius: '9999px', fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '600' }}>
                             Ayat {audioAyah}
                           </span>
                         </div>
                         <div style={{ position: 'relative', marginTop: '16px', padding: '0 16px' }}>
                           <div style={{ position: 'absolute', left: '-8px', top: '-8px', color: 'rgba(74, 222, 128, 0.3)' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M11.22 8.97a3 3 0 0 0-2.48-2.92C7.39 5.86 6.32 5 5 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h1c1.32 0 2.39-.86 2.74-2.05a3 3 0 0 0 2.48-2.92l.06-2.06c.02-.71-.24-1.39-.73-1.92L11.22 8.97zM22 7c0-1.1-.9-2-2-2h-1c-1.32 0-2.39.86-2.74 2.05a3 3 0 0 0-2.48 2.92l-.06 2.06c-.02.71.24 1.39.73 1.92l-1.67 1.08a3 3 0 0 0 2.48 2.92C16.61 18.14 17.68 19 19 19h1c1.1 0 2-.9 2-2V7z"/></svg>
                           </div>
                           <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#e2e8f0', textAlign: 'center', fontWeight: '300' }}>
                             {audioData.translation}
                           </p>
                         </div>
                       </div>
                     )}
                   </>
                 )}
              </div>
            )}

            {/* Audio Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px' }}>
              <button 
                onClick={() => {
                  if (viewMode === 'audio' && audioAyah > parseInt(startVerse)) {
                     const prev = audioAyah - 1;
                     setAudioAyah(prev);
                     loadAudioAyah(selectedSurah.id, selectedSurah.name, prev, parseInt(endVerse), false);
                  }
                }}
                disabled={viewMode === 'tadabbur' || audioAyah <= parseInt(startVerse)}
                style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(30, 41, 59, 0.8)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', opacity: (viewMode === 'tadabbur' || audioAyah <= parseInt(startVerse)) ? 0.3 : 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5l-7 7 7 7M19 5l-7 7 7 7" />
                </svg>
              </button>
              
              {!isPlaying ? (
                <button 
                  onClick={() => {
                    if (viewMode === 'tadabbur') {
                      playText(stripMarkdownAndHtml(result.reflection));
                    } else if (audioData) {
                      playText(audioData.translation, () => {
                         if (audioAyah < parseInt(endVerse)) {
                           const next = audioAyah + 1;
                           setAudioAyah(next);
                           loadAudioAyah(selectedSurah.id, selectedSurah.name, next, parseInt(endVerse), true);
                         }
                      });
                    }
                  }}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-color)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'none' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              ) : (
                <button 
                  onClick={stopAudio}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(30, 41, 59, 0.8)', border: 'none', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h12v12H6z" />
                  </svg>
                </button>
              )}

              <button 
                onClick={() => {
                  if (viewMode === 'audio' && audioAyah < parseInt(endVerse)) {
                     const next = audioAyah + 1;
                     setAudioAyah(next);
                     loadAudioAyah(selectedSurah.id, selectedSurah.name, next, parseInt(endVerse), false);
                  }
                }}
                disabled={viewMode === 'tadabbur' || audioAyah >= parseInt(endVerse)}
                style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(30, 41, 59, 0.8)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', opacity: (viewMode === 'tadabbur' || audioAyah >= parseInt(endVerse)) ? 0.3 : 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Audio Speed Control */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px', width: '100%', maxWidth: '280px', marginLeft: 'auto', marginRight: 'auto', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '16px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
                {audioSpeed.toFixed(2)}x
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px', marginBottom: '16px' }}>
                <button 
                  onClick={() => setAudioSpeed(prev => Math.max(0.85, prev - 0.05))}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#e2e8f0', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0, padding: 0 }}
                >
                  -
                </button>
                <input 
                  type="range" 
                  min="0.85" 
                  max="1.25" 
                  step="0.05" 
                  value={audioSpeed} 
                  onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
                  style={{ flex: 1, cursor: 'pointer', accentColor: 'var(--accent-color)', height: '4px' }}
                />
                <button 
                  onClick={() => setAudioSpeed(prev => Math.min(1.25, prev + 0.05))}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#e2e8f0', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0, padding: 0 }}
                >
                  +
                </button>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap', justifyContent: 'center', width: '100%' }}>
                {[0.85, 0.9, 1.0, 1.1, 1.25].map((speed) => (
                  <div key={speed} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <button
                      onClick={() => setAudioSpeed(speed)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        background: audioSpeed === speed ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: '#e2e8f0',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '0.7rem',
                        transition: 'all 0.2s',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {speed === 1.0 || speed === 1.1 || speed === 0.9 ? speed.toFixed(1) : speed.toString()}
                    </button>
                    {speed === 1.0 && <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)' }}>Normal</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Tadabbur mode extras (Translation & Link) */}
            {viewMode === 'tadabbur' && (
              <>
                {result.translation && (
                  <details style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.1)', borderRadius: '12px', padding: '4px', marginTop: '24px' }}>
                    <summary style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '12px', fontWeight: '500', outline: 'none' }}>Lihat Terjemahan Melayu (Basmeih)</summary>
                    <div 
                      className="tv-scrollable"
                      tabIndex={0}
                      style={{ 
                        fontSize: '0.9rem', 
                        color: 'rgba(255,255,255,0.8)', 
                        padding: '16px', 
                        borderTop: '1px solid rgba(255,255,255,0.05)', 
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.6',
                        maxHeight: '350px',
                        overflowY: 'auto'
                      }}>
                      {result.translation}
                    </div>
                  </details>
                )}

                {result.quranReflectLink && (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a 
                      href={result.quranReflectLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        fontSize: '0.85rem', 
                        color: 'var(--accent-color)', 
                        textDecoration: 'none', 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px', 
                        background: 'rgba(74, 222, 128, 0.05)',
                        borderRadius: '20px',
                        border: '1px solid var(--accent-color)'
                      }}
                    >
                      Lihat Tadabbur Lain di QuranReflect ↗
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {copied && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(74, 222, 128, 0.9)',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600',
          boxShadow: 'none',
          zIndex: 1000,
          animation: 'fadeInOut 2s ease-in-out forwards'
        }}>
          Tadabbur disalin!
        </div>
      )}

      <style>{`
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          20% { opacity: 1; transform: translate(-50%, 0); }
          80% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -20px); }
        }
        .custom-dropdown::-webkit-scrollbar {
          width: 6px;
        }
        .custom-dropdown::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-dropdown::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .tv-scrollable:focus {
          outline: 2px solid var(--accent-color);
          background: rgba(255,255,255,0.02);
        }
        .tv-scrollable::-webkit-scrollbar {
          width: 8px;
        }
        .tv-scrollable::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
        }
        .tv-scrollable::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 10px;
        }
        .tv-scrollable::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
};

export default QuranTadabbur;
