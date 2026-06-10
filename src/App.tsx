import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InstallPage from './pages/InstallPage';
import './index.css';

// Ambient blobs
const AmbientBlobs = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
    <div style={{
      position: 'absolute', top: '-20%', left: '-10%',
      width: '60vw', height: '60vw', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
      filter: 'blur(40px)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-10%', right: '-10%',
      width: '50vw', height: '50vw', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(6,214,160,0.08) 0%, transparent 70%)',
      filter: 'blur(40px)',
    }} />
  </div>
);

export default function App() {
  const [page, setPage] = useState<'home' | 'install'>('home');

  return (
    <>
      <AmbientBlobs />
      <Navbar currentPage={page} onNavigate={(p) => setPage(p as 'home' | 'install')} />
      {page === 'home' ? (
        <HomePage onNavigate={(p) => setPage(p as 'home' | 'install')} />
      ) : (
        <InstallPage />
      )}
      <Footer />
    </>
  );
}
