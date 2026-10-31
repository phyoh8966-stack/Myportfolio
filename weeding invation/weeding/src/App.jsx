import { useCallback, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import weddingData from './data/weddingData.js';
import WelcomeCover from './components/WelcomeCover.jsx';
import Hero from './components/Hero.jsx';
import Invitation from './components/Invitation.jsx';
import Countdown from './components/Countdown.jsx';
import WeddingDetails from './components/WeddingDetails.jsx';
import LoveStory from './components/LoveStory.jsx';
import Gallery from './components/Gallery.jsx';
import Schedule from './components/Schedule.jsx';
import Location from './components/Location.jsx';
import RSVP from './components/RSVP.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import ShareInvitation from './components/ShareInvitation.jsx';
import Footer from './components/Footer.jsx';

const navigation = [
  ['Our story', '#story'],
  ['The day', '#details'],
  ['Gallery', '#gallery'],
  ['RSVP', '#rsvp'],
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', !isCoverOpen || activeImage !== null);
    return () => document.body.classList.remove('is-locked');
  }, [isCoverOpen, activeImage]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isLoading, isCoverOpen]);

  const closeCover = useCallback(() => {
    setIsCoverOpen(true);
    window.setTimeout(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  const moveImage = useCallback((direction) => {
    setActiveImage((current) => {
      if (current === null) return current;
      return (current + direction + weddingData.gallery.length) % weddingData.gallery.length;
    });
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  if (isLoading) {
    return (
      <div className="page-loader" role="status" aria-label="Loading invitation">
        <span className="page-loader__monogram">
          {weddingData.bride.name[0]} <i>&amp;</i> {weddingData.groom.name[0]}
        </span>
        <span className="page-loader__line" />
      </div>
    );
  }

  return (
    <>
      <header className="site-header">
        <a className="site-header__brand" href="#home" onClick={closeMenu}>
          <span className="site-header__brand-mark">
            {weddingData.bride.name[0]} <i>&amp;</i> {weddingData.groom.name[0]}
          </span>
          <span>{weddingData.date.short}</span>
        </a>
        <button
          className="site-header__menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`site-nav${isMenuOpen ? ' site-nav--open' : ''}`} aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a href={href} key={href} onClick={closeMenu}>{label}</a>
          ))}
          <ShareInvitation names={weddingData} />
        </nav>
        <MusicPlayer music={weddingData.music} />
      </header>
      <main>
        <Hero data={weddingData} />
        <Invitation data={weddingData} />
        <Countdown date={weddingData.date} />
        <WeddingDetails data={weddingData} />
        <LoveStory story={weddingData.story} />
        <Gallery
          images={weddingData.gallery}
          activeImage={activeImage}
          onSelect={setActiveImage}
          onClose={() => setActiveImage(null)}
          onMove={moveImage}
        />
        <Schedule events={weddingData.schedule} />
        <Location venue={weddingData.venue} />
        <RSVP data={weddingData} />
      </main>
      <Footer data={weddingData} />
      {!isCoverOpen && <WelcomeCover data={weddingData} onOpen={closeCover} />}
    </>
  );
}
