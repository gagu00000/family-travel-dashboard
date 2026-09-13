import './Overview.css';

export default function Overview({ stats }) {
  const items = [
    { label: "Travelers", value: stats.travelers, icon: "👥" },
    { label: "Tickets", value: stats.total, icon: "🎫" },
    { label: "Flights", value: stats.flights, icon: "✈️" },
    { label: "Trains", value: stats.trains, icon: "🚆" },
  ];

  return (
    <section className="overview" id="overview" aria-label="Travel overview">
      <div className="overview-grid">
        {items.map((item) => (
          <div className="overview-item" key={item.label}>
            <span className="overview-icon">{item.icon}</span>
            <span className="overview-value">{item.value}</span>
            <span className="overview-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
