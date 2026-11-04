export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
        <img
          src="img/icodh.png"
          alt="Dv4Hack logo"
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.3px' }}>
          <span style={{ color: '#a855f7' }}>Dv4Hack!</span>
        </span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
        © 2026{' '}
        <a>Dv4Hack</a>. All rights reserved.
      </p>
    </footer>
  );
}
