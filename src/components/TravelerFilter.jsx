import { motion } from 'framer-motion';
import { passengers } from '../data/tickets';
import './TravelerFilter.css';

export default function TravelerFilter({ selected, onSelect }) {
  const options = ["All", ...passengers];

  return (
    <motion.div 
      className="traveler-filter-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="traveler-filter" role="tablist" aria-label="Filter by traveler">
        {options.map((name) => {
          const isActive = selected === name;
          return (
            <button
              key={name}
              className={`traveler-chip ${isActive ? 'traveler-chip--active' : ''}`}
              onClick={() => onSelect(name)}
              role="tab"
              aria-selected={isActive}
              id={`filter-${name.toLowerCase()}`}
            >
              {isActive && (
                <motion.div
                  layoutId="filter-highlight"
                  className="traveler-chip-highlight"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="traveler-chip-text">{name}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
