import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, CheckCircle2, Crown, ExternalLink } from 'lucide-react';
import TerminalHero from '../components/TerminalHero';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const features = [
  'Tidak terdeteksi oleh sistem',
  'Jawaban pasti benar & akurat',
  'Sistem Pop Up yang elegan',
  'Bisa search soal',
  'Bisa di Hide & Minimize',
  'Nilai auto 100!',
];

const plans = [
  {
    badge: 'BASIC',
    icon: '📝',
    name: 'Paket Harian',
    price: 'Rp 5.000',
    features: ['Durasi 24 Jam', 'Server Lokal', 'Akses Standar'],
    accent: '#7C3AED',
    wa: 'PAKET%20HARIAN',
    popular: false,
  },
  {
    badge: 'BEST VALUE',
    icon: '🔥',
    name: 'Paket Mingguan',
    price: 'Rp 15.000',
    features: ['Durasi 7 Hari', 'Server Premium', 'Lebih Worth it!'],
    accent: '#FFB703',
    wa: 'PAKET%20MINGGUAN',
    popular: true,
  },
  {
    badge: 'MYTHICAL',
    icon: '👑',
    name: 'Paket Lifetime',
    price: 'Rp 10.000.000',
    features: ['Akses Selamanya', 'Prioritas Server', 'Up To Date!'],
    accent: '#F72585',
    wa: 'PAKET%20LIFETIME',
    popular: false,
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main>
      {/* ── HERO ── */}
      <section style={{ textAlign: 'center', padding: '140px 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <motion.div {...fadeUp(0)}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px',
            background: 'rgba(6,214,160,0.08)',
            border: '1px solid rgba(6,214,160,0.25)',
            borderRadius: 100,
            fontSize: '0.78rem',
            fontFamily: 'JetBrains Mono',
            color: '#06D6A0',
            letterSpacing: '0.08em',
            marginBottom: 28,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#06D6A0', boxShadow: '0 0 8px #06D6A0', display: 'inline-block' }} />
            #1 OkepTools
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          style={{
            fontFamily: 'Space Grotesk',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: 20,
          }}
        >
          <span style={{ color: '#a855f7' }}>Dit</span>
          <span style={{ color: '#fbbf24' }}>Hack</span>
          <span style={{ color: '#a855f7' }}>!</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.14)}
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.55)', marginBottom: 40, maxWidth: 540, margin: '0 auto 40px' }}
        >
          Shows answers directly in the Wayground & Kahoot tabs. Undetected. Always accurate.
        </motion.p>

        <motion.div {...fadeUp(0.2)} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <button
            onClick={() => { onNavigate('install'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 10,
              background: '#fbbf24',
              border: 'none', cursor: 'pointer',
              color: '#000', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem',
              letterSpacing: '-0.2px',
              boxShadow: '0 4px 24px rgba(251,191,36,0.35)',
              transform: 'translateY(0px) scale(1)',
              transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.02)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 44px rgba(251,191,36,0.45), 0 0 24px rgba(251,191,36,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0px) scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(251,191,36,0.35)';
            }}
          >
            Install <ArrowRight size={16} />
          </button>
          <button
            onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 10,
              background: '#a855f7',
              border: '1px solid #a855f7',
              cursor: 'pointer',
              color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem',
              boxShadow: '0 4px 24px rgba(168,85,247,0.25)',
              transform: 'translateY(0px) scale(1)',
              transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#9333ea';
              (e.currentTarget as HTMLElement).style.borderColor = '#9333ea';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.02)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 44px rgba(168,85,247,0.45), 0 0 24px rgba(168,85,247,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#a855f7';
              (e.currentTarget as HTMLElement).style.borderColor = '#a855f7';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0px) scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(168,85,247,0.25)';
            }}
          >
            Order <ShoppingCart size={16} />
          </button>
        </motion.div>

        <motion.div {...fadeUp(0.26)}>
          <TerminalHero />
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Crown size={20} color="#FFB703" fill="#FFB703" />
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
              Fitur Unggulan
            </h2>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 12,
          }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06, type: 'spring', stiffness: 520, damping: 32, mass: 0.6 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  transition: 'transform 0.14s ease, border-color 0.14s ease, background 0.14s ease, box-shadow 0.14s ease',
                  willChange: 'transform',
                  transformOrigin: 'center',
                }}
                whileHover={{
                  y: -4,
                  borderColor: '#ca8a04',
                  background: 'rgba(255, 215, 0, 0.05)',
                  boxShadow: '0 12px 32px rgba(251,191,36,0.1)',
                  transition: { type: 'spring', stiffness: 650, damping: 28, mass: 0.45 },
                }}
              >
                <CheckCircle2 size={18} color="#fbbf24" />
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <span style={{ fontSize: '1.1rem' }}>💳</span>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
              Pilih Paket
            </h2>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, type: 'spring', stiffness: 460, damping: 30, mass: 0.65 }}
                style={{
                  position: 'relative',
                  padding: '28px 24px',
                  background: plan.popular
                    ? `linear-gradient(135deg, rgba(255,183,3,0.06), rgba(124,58,237,0.04))`
                    : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${plan.popular ? 'rgba(255,183,3,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease, background 0.16s ease',
                  cursor: 'default',
                  textAlign: 'center',
                  willChange: 'transform',
                  transformOrigin: 'center',
                }}
                whileHover={{
                  y: -7,
                  borderColor: plan.accent + '80',
                  boxShadow: `0 26px 68px ${plan.accent}2a`,
                  transition: { type: 'spring', stiffness: 600, damping: 26, mass: 0.5 },
                }}
                whileTap={{ y: -4 }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${plan.accent}, transparent)`,
                }} />

                {/* Badge */}
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  background: plan.accent + '22',
                  border: `1px solid ${plan.accent}55`,
                  borderRadius: 100,
                  fontSize: '0.65rem',
                  fontFamily: 'JetBrains Mono',
                  color: plan.accent,
                  letterSpacing: '0.1em',
                  marginBottom: 16,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                  {plan.badge}
                </span>

                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem', marginBottom: 10 }}>
                  {plan.icon}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, letterSpacing: '-0.3px' }}>
                  {plan.name}
                </h3>
                <div style={{
                  fontFamily: 'Space Grotesk', fontWeight: 700,
                  fontSize: '1.7rem', letterSpacing: '-1px',
                  color: plan.accent, marginBottom: 20,
                }}>
                  {plan.price}
                </div>

                <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)',
                    }}>
                      <CheckCircle2 size={14} color={plan.accent} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/6281770067335?text=*${plan.wa}*%0ANama%3A+(nama+anda)%0AStatus%3A+Pending%0AToken%3A+-`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: '100%', padding: '12px',
                    background: `linear-gradient(135deg, ${plan.accent}, ${plan.accent}bb)`,
                    border: 'none', borderRadius: 10,
                    color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'transform 0.14s ease, box-shadow 0.14s ease, filter 0.14s ease',
                    boxShadow: `0 4px 16px ${plan.accent}30`,
                  }}
                >
                  Beli Sekarang <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── DISCORD ── */}
      <section id="contact" style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px 100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-1px', marginBottom: 10 }}>
            Ada pertanyaan?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 32, fontSize: '0.95rem' }}>
            Join server Discord untuk support langsung.
          </p>
          <a
            href="https://discord.gg/uewY5Jph2b"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '16px 36px',
              background: 'rgba(88,101,242,0.15)',
              border: '1px solid rgba(88,101,242,0.4)',
              borderRadius: 14,
              color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '1rem',
              textDecoration: 'none',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(88,101,242,0.25)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88,101,242,0.7)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(88,101,242,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(88,101,242,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88,101,242,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            <svg width="22" height="22" viewBox="0 0 71 55" fill="none">
              <path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.4a.2.2 0 0 0-.2.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.5 37.5 0 0 0 25.5.5a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.7 4.9a.2.2 0 0 0-.1.1C1.5 18.1-.9 31 .3 43.7a.2.2 0 0 0 .1.2 58.8 58.8 0 0 0 17.7 9 .2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4c.4-.3.7-.6 1.1-.9a.2.2 0 0 1 .2 0c11.5 5.3 24 5.3 35.4 0a.2.2 0 0 1 .2 0c.4.3.7.6 1.1.9a.2.2 0 0 1 0 .4 36 36 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .2.1 58.6 58.6 0 0 0 17.8-9 .2.2 0 0 0 .1-.2c1.4-14.8-2.3-27.6-10.5-39-.1 0-.1-.1-.2-.1ZM23.7 36c-3.5 0-6.4-3.2-6.4-7.2 0-4 2.8-7.2 6.4-7.2 3.6 0 6.4 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2 0-4 2.8-7.2 6.4-7.2 3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Z" fill="#5865F2"/>
            </svg>
            Join Server Discord
          </a>
        </motion.div>
      </section>
    </main>
  );
}
