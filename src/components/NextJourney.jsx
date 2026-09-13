import { formatDate, formatTime, getCountdown, daysUntil } from '../utils/dateUtils';
import { getTypeIcon } from '../utils/ticketUtils';
import { passengerColors } from '../data/tickets';
import './NextJourney.css';

export default function NextJourney({ ticket, onViewTicket }) {
  if (!ticket) {
    return (
      <section className="next-journey next-journey--empty" id="next-journey">
        <div className="next-journey-label">NEXT JOURNEY</div>
        <p className="next-journey-empty-text">No upcoming journeys</p>
      </section>
    );
  }

  const colors = passengerColors[ticket.passenger] || {};
  const countdown = getCountdown(ticket.date);
  const days = daysUntil(ticket.date);
  const isFlight = ticket.type === "flight";

  return (
    <section
      className={`next-journey next-journey--${ticket.type}`}
      id="next-journey"
      aria-label="Next journey"
    >
      <div className="next-journey-header">
        <div className="next-journey-label">NEXT JOURNEY</div>
        <span className={`next-journey-countdown ${days <= 3 ? 'next-journey-countdown--soon' : ''}`}>
          {countdown}
        </span>
      </div>

      <div className="next-journey-passenger">
        <span
          className="next-journey-avatar"
          style={{ background: colors.bg, color: colors.color }}
        >
          {colors.emoji}
        </span>
        <span className="next-journey-name">{ticket.passenger}</span>
      </div>

      <div className="next-journey-route">
        <div className="next-journey-city">
          <span className="next-journey-code">{ticket.fromCode}</span>
          <span className="next-journey-city-name">{ticket.from}</span>
        </div>
        <div className="next-journey-arrow">
          <div className="next-journey-arrow-line" />
          <span className="next-journey-arrow-icon">{getTypeIcon(ticket.type)}</span>
          <div className="next-journey-arrow-line" />
        </div>
        <div className="next-journey-city next-journey-city--end">
          <span className="next-journey-code">{ticket.toCode}</span>
          <span className="next-journey-city-name">{ticket.to}</span>
        </div>
      </div>

      <div className="next-journey-details">
        <div className="next-journey-detail">
          <span className="next-journey-detail-label">Date</span>
          <span className="next-journey-detail-value">{formatDate(ticket.date, true)}</span>
        </div>
        <div className="next-journey-detail">
          <span className="next-journey-detail-label">Departure</span>
          <span className="next-journey-detail-value">{formatTime(ticket.departureTime)}</span>
        </div>
        <div className="next-journey-detail">
          <span className="next-journey-detail-label">Arrival</span>
          <span className="next-journey-detail-value">{formatTime(ticket.arrivalTime)}</span>
        </div>
      </div>

      <div className="next-journey-info">
        <span className={`next-journey-type-badge next-journey-type-badge--${ticket.type}`}>
          {getTypeIcon(ticket.type)} {isFlight ? "FLIGHT" : "TRAIN"}
        </span>
        <span className="next-journey-operator">
          {ticket.operator} · {ticket.number}
        </span>
      </div>

      {ticket.bookingReference && (
        <div className="next-journey-ref">
          Booking: <strong>{ticket.bookingReference}</strong>
        </div>
      )}

      <button
        className="next-journey-btn"
        onClick={() => onViewTicket(ticket)}
        id="next-journey-view-ticket"
        disabled={!ticket.file}
        title={!ticket.file ? 'Ticket file not available' : 'View ticket'}
      >
        {ticket.file ? "VIEW TICKET" : "TICKET UNAVAILABLE"}
      </button>
    </section>
  );
}
