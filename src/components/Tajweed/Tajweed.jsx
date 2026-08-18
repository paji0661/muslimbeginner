import React, { useState } from 'react';
import { tajweedData } from '../../data/tajweedData';

const TopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 11-5-5-5 5"/><path d="m17 18-5-5-5 5"/></svg>
);

const UpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
);

const DownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export default function Tajweed({ onHome }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      <div className="header" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Asas Tajwid</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Panduan ringkas tajwid untuk rujukan pantas dan mudah difahami.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
        {tajweedData.map((item) => (
          <div 
            key={item.id} 
            className="card"
            style={{ 
              padding: '24px',
              borderRadius: '16px',
              background: 'var(--surface)',
              border: expandedId === item.id ? '1px solid var(--accent-color)' : '1px solid var(--border)',
              transition: 'all 0.3s ease',
              boxShadow: expandedId === item.id ? '0 8px 30px rgba(0,0,0,0.3)' : 'none'
            }}
          >
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => toggleExpand(item.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                <h2 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--text-primary)' }}>{item.title}</h2>
              </div>
              <div style={{ color: 'var(--accent-color)', transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                <DownIcon />
              </div>
            </div>

            {expandedId === item.id && (
              <div style={{ marginTop: '20px', animation: 'fadeIn 0.3s ease' }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>{item.content}</p>
                
                {item.subtopics && item.subtopics.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {item.subtopics.map((sub, idx) => (
                      <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '3px solid var(--accent-color)' }}>
                        <h3 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>{sub.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0 0 12px 0', lineHeight: '1.5' }}>{sub.desc}</p>
                        
                        {sub.example && (
                          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', border: '1px dashed var(--border)' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Contoh:</span>
                            <span style={{ fontSize: '1.5rem', fontFamily: "'Noto Naskh Arabic', 'Amiri', serif", color: 'var(--text-primary)', direction: 'rtl', display: 'block' }}>{sub.example.split(' (')[0]}</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>{sub.example.includes('(') ? '(' + sub.example.split('(')[1] : ''}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="floating-nav-left">
        <button className="floating-nav-btn" onClick={onHome} aria-label="Home">
          <HomeIcon />
        </button>
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
