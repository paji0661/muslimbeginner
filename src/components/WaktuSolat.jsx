import React, { useState, useEffect } from 'react';
import axios from 'axios';

const hijriMonthsMs = {
  1: 'Muharram', 2: 'Safar', 3: 'Rabiul Awal', 4: 'Rabiul Akhir',
  5: 'Jamadil Awal', 6: 'Jamadil Akhir', 7: 'Rejab', 8: 'Syaaban',
  9: 'Ramadan', 10: 'Syawal', 11: 'Zulkaedah', 12: 'Zulhijjah'
};

const format12H = (time24) => {
  if (!time24) return '';
  const cleanTime = time24.split(' ')[0];
  const [hourStr, min] = cleanTime.split(':');
  let h = parseInt(hourStr, 10);
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${h}:${min}${ampm}`;
};

const WaktuSolat = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timings, setTimings] = useState(null);
  const [locationName, setLocationName] = useState('Lokasi Semasa');
  const [dateStr, setDateStr] = useState('');
  const [hijriStr, setHijriStr] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [nextPrayer, setNextPrayer] = useState('');
  const [nextPrayerName, setNextPrayerName] = useState('');

  const calculateNextPrayer = (timingsObj) => {
    if (!timingsObj) return;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: 'Subuh', time: timingsObj.Subuh },
      { name: 'Zohor', time: timingsObj.Zohor },
      { name: 'Asar', time: timingsObj.Asar },
      { name: 'Maghrib', time: timingsObj.Maghrib },
      { name: 'Isyak', time: timingsObj.Isyak }
    ];

    for (let p of prayers) {
      const [h, m] = p.time.split(' ')[0].split(':').map(Number);
      const prayerMinutes = h * 60 + m;
      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const diffHrs = Math.floor(diff / 60);
        const diffMins = diff % 60;
        let countdown = '';
        if (diffHrs > 0) countdown += `${diffHrs} jam `;
        if (diffMins > 0) countdown += `${diffMins} minit`;
        if (countdown === '') countdown = 'sekarang';
        
        setNextPrayer(`Waktu solat seterusnya ${p.name} dalam ${countdown.trim()}`);
        setNextPrayerName(p.name);
        return;
      }
    }
    setNextPrayer(`Waktu solat seterusnya Subuh esok`);
    setNextPrayerName('Subuh');
  };

  const fetchPrayerTimes = async (lat, lng) => {
    try {
      setLoading(true);
      setError('');
      
      // 1. Fetch Location Name (Reverse Geocoding)
      let locName = 'Lokasi Semasa';
      try {
        const geoResponse = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=ms`);
        if (geoResponse.data && (geoResponse.data.city || geoResponse.data.locality)) {
          locName = geoResponse.data.city || geoResponse.data.locality;
        }
      } catch (geoErr) {
        console.warn('Gagal mendapatkan nama lokasi, menggunakan default.', geoErr);
      }
      setLocationName(locName);

      // 2. Fetch from MPT (Malaysia Prayer Time API) for accurate JAKIM timings
      const mptResponse = await axios.get(`https://mpt.i906.my/api/prayer/${lat},${lng}`);
      
      if (mptResponse.data && mptResponse.data.data) {
        const mptData = mptResponse.data.data;
        
        // MPT times array format: [Subuh, Syuruk, Zohor, Asar, Maghrib, Isyak] (Unix seconds)
        // Find today's index based on current date
        const now = new Date();
        const todayIndex = now.getDate() - 1; 
        const todayTimesUnix = mptData.times[todayIndex];
        
        const formatMptTime = (unixSec) => {
          const d = new Date(unixSec * 1000);
          const h = d.getHours().toString().padStart(2, '0');
          const m = d.getMinutes().toString().padStart(2, '0');
          return `${h}:${m}`;
        };

        const timingsObj = {
          Subuh: formatMptTime(todayTimesUnix[0]),
          Syuruk: formatMptTime(todayTimesUnix[1]),
          Zohor: formatMptTime(todayTimesUnix[2]),
          Asar: formatMptTime(todayTimesUnix[3]),
          Maghrib: formatMptTime(todayTimesUnix[4]),
          Isyak: formatMptTime(todayTimesUnix[5])
        };
        
        setTimings(timingsObj);
        calculateNextPrayer(timingsObj);
        
        // Determine target date for Hijri calendar (update after Maghrib)
        const maghribUnix = todayTimesUnix[4];
        const currentUnix = Math.floor(now.getTime() / 1000);
        
        let targetDate = new Date(now);
        if (currentUnix < maghribUnix) {
          targetDate.setDate(targetDate.getDate() - 1);
        }
        
        const dd = String(targetDate.getDate()).padStart(2, '0');
        const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
        const yyyy = targetDate.getFullYear();
        const formattedTargetDate = `${dd}-${mm}-${yyyy}`;

        // 3. Fetch from Aladhan for Date and Hijri info using targetDate
        const aladhanResponse = await axios.get(`https://api.aladhan.com/v1/timings/${formattedTargetDate}?latitude=${lat}&longitude=${lng}&method=17`);
        
        if (aladhanResponse.data && aladhanResponse.data.code === 200) {
          const aladhanData = aladhanResponse.data.data;
          
          const todayDateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
          setDateStr(todayDateStr);
          
          // Use Malay mapping for Hijri month
          const monthMs = hijriMonthsMs[aladhanData.date.hijri.month.number] || aladhanData.date.hijri.month.en;
          const newHijriStr = `${aladhanData.date.hijri.day} ${monthMs} ${aladhanData.date.hijri.year}H`;
          setHijriStr(newHijriStr);
          
          const updatedTime = now.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' });
          setLastUpdated(updatedTime);
          
          // Cache the successful result for offline use
          localStorage.setItem('cachedWaktuSolat', JSON.stringify({
            timings: timingsObj,
            dateStr: todayDateStr,
            hijriStr: newHijriStr,
            locationName: locName,
            lastUpdated: updatedTime
          }));
        } else {
          throw new Error('Gagal mendapatkan tarikh Hijri.');
        }
      } else {
        throw new Error('Gagal memuat turun jadual waktu solat.');
      }
    } catch (err) {
      console.error(err);
      setError('Terdapat masalah semasa mendapatkan jadual waktu solat. Sila periksa capaian internet anda.');
      
      // Load from cache if available
      const cached = localStorage.getItem('cachedWaktuSolat');
      if (cached) {
        const parsed = JSON.parse(cached);
        setTimings(parsed.timings);
        calculateNextPrayer(parsed.timings);
        setDateStr(parsed.dateStr);
        setHijriStr(parsed.hijriStr);
        setLocationName(parsed.locationName || 'Lokasi Semasa (Luar Talian)');
        setLastUpdated(parsed.lastUpdated);
        setError('Menggunakan data luar talian (cache).');
      }
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    setLoading(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Sistem GPS tidak disokong pada peranti/pelayar ini.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchPrayerTimes(latitude, longitude);
      },
      (error) => {
        console.error("GPS Error:", error);
        setError('Sila benarkan akses lokasi (GPS) untuk mendapatkan waktu solat yang tepat bagi kawasan anda.');
        setLoading(false);
        
        // Load from cache if available and location denied
        const cached = localStorage.getItem('cachedWaktuSolat');
        if (cached) {
          const parsed = JSON.parse(cached);
          setTimings(parsed.timings);
          calculateNextPrayer(parsed.timings);
          setDateStr(parsed.dateStr);
          setHijriStr(parsed.hijriStr);
          setLocationName(parsed.locationName);
          setLastUpdated(parsed.lastUpdated);
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []); // Run once on mount

  useEffect(() => {
    // Update next prayer every minute if timings exist
    if (!timings) return;
    
    const interval = setInterval(() => {
      calculateNextPrayer(timings);
    }, 60000);
    return () => clearInterval(interval);
  }, [timings]);

  const PrayerCol = ({ name, time, isNext }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 8px',
      flex: 1,
      minWidth: '60px',
      background: isNext ? 'var(--accent-color)' : 'transparent',
      borderRight: name !== 'Isyak' ? '1px solid var(--border)' : 'none',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <span style={{ fontSize: '0.75rem', color: isNext ? '#000000' : 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: isNext ? '700' : '500' }}>{name}</span>
      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: isNext ? '#000000' : '#e2e8f0' }}>{format12H(time)}</span>
    </div>
  );

  return (
    <div style={{ marginBottom: '32px', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>📍</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {loading ? 'Mengesan Lokasi...' : locationName}
            </div>
            {!loading && dateStr && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {hijriStr} • {dateStr}
              </div>
            )}
            {!loading && nextPrayer && (
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', marginTop: '2px', fontWeight: '500' }}>
                {nextPrayer}
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={requestLocation}
          disabled={loading}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-color)',
            cursor: loading ? 'not-allowed' : 'pointer',
            padding: '4px',
            opacity: loading ? 0.5 : 1,
            transition: 'transform 0.3s',
            transform: loading ? 'rotate(180deg)' : 'none'
          }}
          title="Kemaskini Lokasi"
        >
          🔄
        </button>
      </div>

      {error && (
        <div style={{ fontSize: '0.75rem', color: '#fb7185', marginBottom: '12px', padding: '0 4px' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="glass-panel" style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.03)',
        boxShadow: 'none',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        <style>{`
          .glass-panel::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {loading && !timings ? (
          <div style={{ width: '100%', padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <div className="loading-spinner" style={{ width: '20px', height: '20px', margin: '0 auto 8px auto', borderTopColor: 'var(--accent-color)' }}></div>
            Mendapatkan jadual solat...
          </div>
        ) : timings ? (
          <>
            <PrayerCol name="Subuh" time={timings.Subuh} isNext={nextPrayerName === 'Subuh'} />
            <PrayerCol name="Syuruk" time={timings.Syuruk} isNext={nextPrayerName === 'Syuruk'} />
            <PrayerCol name="Zohor" time={timings.Zohor} isNext={nextPrayerName === 'Zohor'} />
            <PrayerCol name="Asar" time={timings.Asar} isNext={nextPrayerName === 'Asar'} />
            <PrayerCol name="Maghrib" time={timings.Maghrib} isNext={nextPrayerName === 'Maghrib'} />
            <PrayerCol name="Isyak" time={timings.Isyak} isNext={nextPrayerName === 'Isyak'} />
          </>
        ) : null}
      </div>

      <style>{`
        .loading-spinner {
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WaktuSolat;
