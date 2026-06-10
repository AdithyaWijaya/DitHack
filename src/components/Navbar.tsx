import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const links = [
  { label: 'Home', page: 'home' },
  { label: 'Install', page: 'install' },
  { label: 'Order', page: 'home', hash: '#pricing' },
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
          {/* Logo */}
          <button
            onClick={() => handleClick('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, #7C3AED, #06D6A0)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.5px' }}>
              Dit<span style={{ color: '#06D6A0' }}>Hack</span>
              <span style={{ color: '#7C3AED' }}>!</span>
            </span>
          </button>

          {/* Desktop links */}
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

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'none' }}
            className="mobile-toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(5,5,16,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12,
        }}>
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleClick(l.page, l.hash)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 600,
                fontSize: '1.5rem', padding: '12px 32px', letterSpacing: '-0.5px',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
