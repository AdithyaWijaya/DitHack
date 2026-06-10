import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, AlertTriangle, ChevronDown, Play } from 'lucide-react';

const SCRIPT = `javascript: (function () {let s = document.createElement("script");s.src = "https://dithack.vercel.app/DitHack.js?v=" + Date.now();document.head.appendChild(s);})();`;

const steps = [
  { title: 'Salin Script', desc: 'Klik tombol "Salin Script" di atas untuk menyalin kode JavaScript.' },
  { title: 'Buat Bookmark', desc: 'Buat bookmark baru di browser, lalu paste kode di kolom URL.' },
  { title: 'Simpan', desc: 'Simpan bookmark dengan nama yang mudah diingat, misal "DitHack".' },
  { title: 'Jalankan', desc: 'Klik bookmark saat memasukkan nama di Wayground / Kahoot.' },
  { title: 'Masukan Token', desc: 'Masukan token yang sudah dibeli lalu klik Login.' },
  { title: 'Wayground', desc: 'Untuk Wayground, masukan kode game yang disediakan guru.' },
  { title: 'Kahoot', desc: 'Khusus Kahoot, masukan quizId yang ada di URL Bar layar guru.' },
  { title: 'Ambil Jawaban', desc: 'Klik tombol "Ambil Jawaban" dan jawaban benar akan muncul.' },
  { title: 'Selesai! 🎉', desc: 'Nikmati semua jawaban yang muncul secara otomatis.' },
];

const warnings = [
  'Jangan sampai ter-refresh. Jika ter-refresh maka DitHack akan hilang dan harus dijalankan ulang.',
  'Jangan sampai bar biru keluar dari frame website. Info selengkapnya ada di video tutorial.',
];

const faqs = [
  {
    q: 'Token sudah digunakan di perangkat lain?',
    a: 'Logout dulu dari Quizizz/Kahoot sebelumnya. Jika masih bermasalah, hubungi admin untuk reset device, lalu coba login kembali.',
  },
  {
    q: 'Gagal ambil jawaban padahal kode game benar?',
    a: 'Coba ganti DNS ke Cloudflare (1.1.1.1) atau Google (8.8.8.8). Cara lengkap ada di video tutorial.',
  },
  {
    q: 'Gagal ambil jawaban bukan karena DNS?',
    a: 'Kemungkinan kode game bersifat privat, sehingga tidak bisa diakses dari luar. Berlaku untuk Wayground dan Kahoot.',
  },
];

const videos = [
  { title: 'Tutorial Pemasangan', id: 'vlC7vEkFFlE' },
  { title: 'Tutorial Pembelian Token', id: 'DV8xgYqj1E0' },
  { title: 'Tutorial Penggunaan', id: 'RdOnwA9ybkU' },
  { title: 'Tutorial Ubah DNS', id: '8QZIhfsbw8A' },
];

export default function InstallPage() {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SCRIPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = SCRIPT;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const sectionHeader = (icon: React.ReactNode, title: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
      {icon}
      <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.5px' }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '120px 24px 80px' }}>

      {/* ── SCRIPT COPY ── */}
      <motion.section
        id="install"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 48 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{
            fontFamily: 'Space Grotesk', fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 2.8rem)', letterSpacing: '-1.5px',
            marginBottom: 10,
          }}>
            Install <span style={{ color: '#a855f7' }}>Dit</span>
          <span style={{ color: '#fbbf24' }}>Hack</span>
          <span style={{ color: '#a855f7' }}>!</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>
            Salin script, buat bookmark, dan mulai gunakan.
          </p>
        </div>

        {/* Script block */}
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 20px',
            background: 'rgba(124,58,237,0.08)',
            borderBottom: '1px solid rgba(124,58,237,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>
                DitHack.js
              </span>
            </div>
            <button
              onClick={copy}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '8px 18px', borderRadius: 8,
                background: copied ? 'rgba(6,214,160,0.15)' : 'rgba(255,255,255,0.07)',
                border: `1px solid ${copied ? 'rgba(6,214,160,0.4)' : 'rgba(255,255,255,0.12)'}`,
                cursor: 'pointer', color: copied ? '#06D6A0' : '#fff',
                fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.82rem',
                transition: 'all 0.2s',
              }}
            >
              <AnimatePresence mode="wait">
                {copied
                  ? <motion.span key="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={13} /> Tersalin!</motion.span>
                  : <motion.span key="copy" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Copy size={13} /> Salin Script</motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
          {/* Code */}
          <pre style={{
            padding: '18px 20px',
            fontFamily: 'JetBrains Mono', fontSize: '0.75rem',
            color: '#9F67FF', lineHeight: 1.7,
            overflowX: 'auto', whiteSpace: 'nowrap',
            margin: 0,
          }}>
            {SCRIPT}
          </pre>
        </div>
      </motion.section>

      {/* ── STEPS ── */}
      <motion.section
        id="usage" style={{ marginBottom: 48 }}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        {sectionHeader(<span style={{ fontSize: '1.1rem' }}>📋</span>, 'Cara Penggunaan')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderLeft: '3px solid #fbbf24',
                borderRadius: '0 12px 12px 0',
                transition: 'all 0.2s',
              }}
            >
              <span style={{
                minWidth: 28, height: 28,
                background: 'rgba(124,58,237,0.2)',
                border: '1px solid rgba(124,58,237,0.4)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.8rem',
                color: '#9F67FF',
                flexShrink: 0,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.9rem', color: '#fff', display: 'block', marginBottom: 2 }}>
                  {step.title}
                </span>
                <span style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)' }}>{step.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── WARNINGS ── */}
      <motion.section
        id="warnings" style={{ marginBottom: 48 }}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        {sectionHeader(<AlertTriangle size={18} color="#F72585" />, 'Info Penting')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {warnings.map((w, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              padding: '16px 20px',
              background: 'rgba(247,37,133,0.06)',
              border: '1px solid rgba(247,37,133,0.3)',
              borderRadius: 12,
            }}>
              <AlertTriangle size={17} color="#F72585" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{w}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── VIDEOS ── */}
      <motion.section
        id="tutorial" style={{ marginBottom: 48 }}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        {sectionHeader(<Play size={18} color="#06D6A0" />, 'Video Tutorial')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          {videos.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>
                {v.title}
              </p>
              <div style={{
                position: 'relative', paddingBottom: '56.25%', height: 0,
                borderRadius: 14, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  loading="lazy"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── FAQ ── */}
      <motion.section
        id="qna"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        {sectionHeader(<span style={{ fontSize: '1.1rem' }}>❗</span>, 'Problem Fixed')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${openFaq === i ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
                  color: '#fff', textAlign: 'left',
                  fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.92rem',
                }}
              >
                {faq.q}
                <ChevronDown
                  size={16}
                  color="rgba(255,255,255,0.4)"
                  style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s', flexShrink: 0, marginLeft: 12 }}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      padding: '0 20px 18px',
                      color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.7,
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      paddingTop: 14,
                    }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
