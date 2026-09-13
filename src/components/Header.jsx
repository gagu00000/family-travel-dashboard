import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import './Header.css';

export default function Header({ stats }) {
  return (
    <header className="hero" id="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-icon-wrap">
          <Plane className="hero-icon" strokeWidth={1.5} />
        </div>
        
        <h1 className="hero-title">
          FAMILY JOURNEYS
        </h1>
        
        <p className="hero-subtitle">
          Everything for the trip, in one place.
        </p>
        
        <div className="hero-meta">
          <span className="hero-meta-item">{stats.travelers} travelers</span>
          <span className="hero-meta-dot">·</span>
          <span className="hero-meta-item">{stats.total} tickets</span>
        </div>
      </motion.div>
    </header>
  );
}
