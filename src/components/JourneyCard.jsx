import { formatDate, formatTime, getCountdown, isUpcoming, daysUntil } from '../utils/dateUtils';
import { getTypeIcon } from '../utils/ticketUtils';
import { passengerColors } from '../data/tickets';
import './JourneyCard.css';

export default function JourneyCard({ ticket, onViewTicket, index = 0 }) {
  const colors = passengerColors[ticket.passenger] || {};
  const upcoming = isUpcoming(ticket.date);
  const isFlight = ticket.type === "flight";
  const days = daysUntil(ticket.date);

  return (
    <article
      className={`journey-card ${upcoming ? '' : 'journey-card--past'} journey-card--${ticket.type}`}
      id={`journey-card-${ticket.id}`}
      style={{ animationDelay: `${0.4 + index * 0.06}s` }}
    >
      {/* Top accent */}
      <div className={`journey-card-accent journey-card-accent--${ticket.type}`} />

      <div className="journey-card-content">
        {/* Header row: type badge + date */}
        <div className="journey-card-top">
          <span className={`journey-card-type journey-card-type--${ticket.type}`}>
            {getTypeIcon(ticket.type)} {isFlight ? "FLIGHT" : "TRAIN"}
          </span>
          <span className="journey-card-date">
            {formatDate(ticket.date, true)}
          </span>
        </div>

        {/* Passenger */}
        <div className="journey-card-passenger">
          <span
            className="journey-card-avatar"
            style={{ background: colors.bg, color: colors.color }}
          >
            {colors.emoji}
          </span>
          <span className="journey-card-passenger-name">{ticket.passenger}</span>
          {upcoming && days <= 7 && (
            <span className="journey-card-countdown">{getCountdown(ticket.date)}</span>
          )}
        </div>

        {/* Route */}
        <div className="journey-card-route">
          <div className="journey-card-from">
            <span className="journey-card-route-code">{ticket.fromCode}</span>
            <span className="journey-card-route-city">{ticket.from}</span>
          </div>
          <div className="journey-card-route-arrow">
            <span className="journey-card-route-line" />
            <span className="journey-card-route-icon">{getTypeIcon(ticket.type)}</span>
            <span className="journey-card-route-line" />
          </div>
          <div className="journey-card-to">
            <span className="journey-card-route-code">{ticket.toCode}</span>
            <span className="journey-card-route-city">{ticket.to}</span>
          </div>
        </div>

        {/* Time & Info */}
        <div className="journey-card-meta">
          <div className="journey-card-time">
            <span className="journey-card-meta-label">Dep</span>
            <span className="journey-card-meta-value">{formatTime(ticket.departureTime)}</span>
          </div>
          <div className="journey-card-time">
            <span className="journey-card-meta-label">Arr</span>
            <span className="journey-card-meta-value">{formatTime(ticket.arrivalTime)}</span>
          </div>
          <div className="journey-card-operator-info">
            <span className="journey-card-meta-label">Operator</span>
            <span className="journey-card-meta-value">
              {ticket.operator}
            </span>
          </div>
        </div>

        {/* Flight/Train number + Booking ref */}
        <div className="journey-card-bottom">
          <span className="journey-card-number">{ticket.trainName || ticket.number}</span>
          {ticket.bookingReference && (
            <span className="journey-card-ref">
              PNR <strong>{ticket.bookingReference}</strong>
            </span>
          )}
        </div>

        {/* View Ticket Button */}
        <button
          className={`journey-card-btn journey-card-btn--${ticket.type}`}
          onClick={() => onViewTicket(ticket)}
          disabled={!ticket.file}
          id={`view-ticket-${ticket.id}`}
          title={!ticket.file ? (ticket.fileNote || 'Ticket file not available') : 'View ticket'}
        >
          {ticket.file ? "VIEW TICKET" : "UNAVAILABLE"}
        </button>
      </div>
    </article>
  );
}
