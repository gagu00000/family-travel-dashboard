import { passengers } from '../data/tickets';
import './TravelerFilter.css';

export default function TravelerFilter({ selected, onSelect }) {
  const options = ["All", ...passengers];

  return (
    <div className="traveler-filter" id="traveler-filter" role="tablist" aria-label="Filter by traveler">
      {options.map((name) => (
        <button
          key={name}
          className={`traveler-chip ${selected === name ? 'traveler-chip--active' : ''}`}
          onClick={() => onSelect(name)}
          role="tab"
          aria-selected={selected === name}
          id={`filter-${name.toLowerCase()}`}
        >
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}
