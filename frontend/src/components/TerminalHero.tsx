import { useState, useEffect } from 'react';


const lines = [
  '> Initializing DitHack...',
  '> Loading quiz engine...',
  '> Answer extractor: READY',
  '> Status: UNDETECTED ✓',
];

export default function TerminalHero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) { setDone(true); return; }
    const line = lines[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);

  const typingLine = currentLine < lines.length ? lines[currentLine].slice(0, currentChar) : '';

  return (
    <div style={{
      background: 'rgba(0,0,0,0.6)',
      border: '1px solid rgba(124,58,237,0.3)',
      borderRadius: 16,
      padding: '20px 24px',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.8rem',
      maxWidth: 520,
      margin: '0 auto 40px',
      textAlign: 'left',
      backdropFilter: 'blur(10px)',
    }}>
      {/* Terminal title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>dithack — zsh</span>
      </div>
      {/* Lines */}
      {displayedLines.map((line, i) => (
        <div key={i} style={{ color: i === displayedLines.length - 1 && done ? '#06D6A0' : 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
          {line}
        </div>
      ))}
      {!done && (
        <div style={{ color: '#06D6A0' }}>
          {typingLine}
          <span style={{ animation: 'blink 1s step-end infinite', borderLeft: '2px solid #06D6A0', marginLeft: 1 }}>&nbsp;</span>
        </div>
      )}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
