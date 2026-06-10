import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 26, height: 26,
          background: 'linear-gradient(135deg, #7C3AED, #06D6A0)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={14} color="#fff" fill="#fff" />
        </div>
        <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.3px' }}>
          <span style={{ color: '#a855f7' }}>Dit</span>
          <span style={{ color: '#fbbf24' }}>Hack</span>
          <span style={{ color: '#a855f7' }}>!</span>
        </span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
        © 2026{' '}
        <a
          href="https://adithyawijaya.vercel.app/"
          target="_blank" rel="noopener noreferrer"
          style={{ color: '#7C3AED', textDecoration: 'none' }}
        >
          Adithya
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}
