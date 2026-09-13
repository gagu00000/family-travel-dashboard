import './SearchBar.css';

export default function SearchBar({ query, onChange }) {
  return (
    <div className="search-bar" id="search-bar">
      <span className="search-bar-icon">🔍</span>
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search tickets, cities, passengers..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tickets"
        id="search-input"
      />
      {query && (
        <button
          className="search-bar-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
          id="search-clear"
        >
          ✕
        </button>
      )}
    </div>
  );
}
