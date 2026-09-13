import './Header.css';

export default function Header() {
  return (
    <header className="header" id="header">
      {/* Floating decorative elements */}
      <div className="header-bg-orbs">
        <div className="header-orb header-orb--1" />
        <div className="header-orb header-orb--2" />
        <div className="header-orb header-orb--3" />
      </div>

      <div className="header-content">
        <div className="header-icon-wrap">
          <div className="header-icon">
            <span className="header-icon-plane">✈</span>
          </div>
          <div className="header-icon-ring" />
        </div>
        <div className="header-text">
          <h1 className="header-title">
            <span className="header-title-line">Family</span>
            <span className="header-title-line header-title-line--accent">Travel</span>
          </h1>
          <p className="header-subtitle">
            All journeys, tickets &amp; travel details in one place
          </p>
        </div>
      </div>
    </header>
  );
}
