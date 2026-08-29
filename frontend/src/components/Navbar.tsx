import { useState, useEffect } from 'react';
interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}
const links = [
  { label: 'Home', page: 'home' },
  { label: 'Install', page: 'install' },
  { label: 'Order', page: 'home', hash: '#pricing' },
  { label: 'Tutorial', page: 'install', hash: '#tutorial'},
  { label: 'Info Penting', page: 'install', hash: '#warnings' },
  { label: 'Problem Fixed', page: 'install', hash: '#qna' },
  { label: 'Discord', page: 'home', hash: '#contact' },
];
export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  const handleClick = (page: string, hash?: string) => {
    onNavigate(page);
    setMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? '10px 0' : '18px 0',
          background: scrolled ? 'rgba(5,5,16,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(124,58,237,0.2)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => handleClick('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <img
              src="img/icodh.png"
              alt="DitHack logo"
              style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', display: 'block' }}
            />
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.5px' }}>
              <span style={{ color: '#a855f7' }}>DitHack!</span>
            </span>
          </button>
          <ul style={{ display: 'flex', listStyle: 'none', gap: 8, alignItems: 'center' }} className="desktop-nav">
            {links.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => handleClick(l.page, l.hash)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: currentPage === l.page ? '#fff' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'Inter', fontWeight: 500, fontSize: '0.875rem',
                    padding: '6px 14px', borderRadius: 8,
                    transition: 'all 0.2s',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = currentPage === l.page ? '#fff' : 'rgba(255,255,255,0.5)'; (e.target as HTMLElement).style.background = 'none'; }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: 36,
              height: 36,
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 0,
              padding: 4,
              borderRadius: 8,
              transition: 'background 0.2s',
              position: 'relative',
            }}
          >
            <span
              className={`burger-bar bar-top ${menuOpen ? 'open' : ''}`}
            />
            <span
              className={`burger-bar bar-mid ${menuOpen ? 'open' : ''}`}
            />
            <span
              className={`burger-bar bar-bot ${menuOpen ? 'open' : ''}`}
            />
          </button>
        </div>
      </nav>
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 98,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(2px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '58%',
          zIndex: 99,
          background: 'linear-gradient(160deg, rgba(18,10,38,0.98) 0%, rgba(5,5,16,0.99) 100%)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(168,85,247,0.2)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(110%)',
          transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '48px 36px',
          gap: 4,
        }}
      > 
        <p style={{
          fontFamily: 'Inter',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          color: 'rgba(168,85,247,0.7)',
          textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          Menu
        </p>
        {links.map((l, i) => (
          <button
            key={l.label}
            onClick={() => handleClick(l.page, l.hash)}
            className="mobile-nav-item"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPage === l.page ? '#fff' : 'rgba(255,255,255,0.55)',
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
              padding: '10px 0',
              letterSpacing: '-0.03em',
              textAlign: 'left',
              width: '100%',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              transition: 'color 0.2s, padding-left 0.2s',
              transitionDelay: menuOpen ? `${i * 45}ms` : '0ms',
              transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        /* Burger bar base */
        .burger-bar {
          display: block;
          width: 22px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          position: absolute;
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
                      opacity 0.25s ease,
                      top 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .bar-top    { top: 9px; }
        .bar-mid    { top: 17px; }
        .bar-bot    { top: 25px; }
        /* Open state → X */
        .bar-top.open {
          top: 17px;
          transform: rotate(45deg);
        }
        .bar-mid.open {
          opacity: 0;
          transform: scaleX(0);
        }
        .bar-bot.open {
          top: 17px;
          transform: rotate(-45deg);
        }
        /* Mobile nav item hover */
        .mobile-nav-item:hover {
          color: #fff !important;
          padding-left: 8px !important;
        }
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .burger-bar, .mobile-nav-item {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}