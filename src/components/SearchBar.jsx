import { Search, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search className="search-bar-icon" size={18} />
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search cities, flights, trains..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-bar-clear" onClick={() => onChange("")} aria-label="Clear search">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
