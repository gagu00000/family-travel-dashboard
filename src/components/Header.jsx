import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import './Header.css';

export default function Header({ stats, tickets = [] }) {
  // Generate dynamic route summary
  const routeCities = [];
  tickets.forEach(t => {
    if (t.from && !routeCities.includes(t.from)) routeCities.push(t.from);
    if (t.to && !routeCities.includes(t.to)) routeCities.push(t.to);
  });
  
  // Show max 3 cities to keep it clean (e.g., Dubai -> Mumbai -> Ahmedabad)
  const displayRoute = routeCities.slice(0, 3).join(' → ') + (routeCities.length > 3 ? ' → ...' : '');

  return (
    <header className="hero" id="hero">
      {/* Animated particle background */}
      <div className="hero-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`hero-particle hero-particle-${i + 1}`} />
        ))}
      </div>

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

        {displayRoute && (
          <div className="hero-route-summary">
            {displayRoute}
          </div>
        )}
        
        <div className="hero-meta">
          <span className="hero-meta-item">{stats.travelers} travelers</span>
          <span className="hero-meta-dot">·</span>
          <span className="hero-meta-item">{stats.total} tickets</span>
        </div>
      </motion.div>
    </header>
  );
}
