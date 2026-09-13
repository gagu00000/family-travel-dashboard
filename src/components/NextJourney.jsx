import { motion } from 'framer-motion';
import { Plane, Train, ArrowRight } from 'lucide-react';
import { formatDate, formatTime, daysUntil } from '../utils/dateUtils';
import { passengerColors } from '../data/tickets';
import './NextJourney.css';

export default function NextJourney({ ticket, onViewTicket }) {
  if (!ticket) {
    return (
      <motion.section 
        className="next-journey next-journey--empty"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="next-journey-label">NEXT JOURNEY</div>
        <p className="next-journey-empty-text">No upcoming journeys</p>
      </motion.section>
    );
  }

  const colors = passengerColors[ticket.passenger] || {};
  const days = daysUntil(ticket.date);
  const isFlight = ticket.type === "flight";
  const ModeIcon = isFlight ? Plane : Train;

  // Split date for hierarchy (e.g. "04 OCT")
  const dateParts = formatDate(ticket.date).split(' ');
  const day = dateParts[0];
  const month = dateParts[1];

  return (
    <motion.section
      className={`next-journey next-journey--${ticket.type}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative top strip */}
      <div className="next-journey-strip" />
      
      <div className="next-journey-content">
        <div className="next-journey-header">
          <div className="next-journey-label">NEXT JOURNEY</div>
          {days <= 7 && (
            <div className={`next-journey-status ${days <= 3 ? 'next-journey-status--urgent' : ''}`}>
              {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`}
            </div>
          )}
        </div>

        <div className="next-journey-main">
          {/* Passenger Info */}
          <div className="next-journey-passenger">
            <span
              className="next-journey-avatar"
              style={{ background: colors.bg, color: colors.color, borderColor: colors.color }}
            >
              {colors.emoji}
            </span>
            <div className="next-journey-passenger-info">
              <span className="next-journey-name">{ticket.passenger}</span>
              <span className="next-journey-operator">{ticket.operator} · {ticket.trainName || ticket.number}</span>
            </div>
          </div>

          {/* Route Map */}
          <div className="next-journey-route">
            <div className="next-journey-point">
              <span className="next-journey-code">{ticket.fromCode}</span>
              <span className="next-journey-city-name">{ticket.from}</span>
            </div>
            
            <div className="next-journey-track">
              <div className="next-journey-track-line" />
              <motion.div 
                className="next-journey-track-icon-wrap"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: isFlight ? 15 : 25, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <ModeIcon className="next-journey-track-icon" size={20} />
              </motion.div>
            </div>
            
            <div className="next-journey-point next-journey-point--end">
              <span className="next-journey-code">{ticket.toCode}</span>
              <span className="next-journey-city-name">{ticket.to}</span>
            </div>
          </div>

          {/* Date & Time Grid */}
          <div className="next-journey-datetime">
            <div className="next-journey-date">
              <span className="next-journey-date-day">{day}</span>
              <span className="next-journey-date-month">{month}</span>
            </div>
            <div className="next-journey-time-col">
              <span className="next-journey-time-label">Departs</span>
              <span className="next-journey-time-value">{formatTime(ticket.departureTime)}</span>
            </div>
            <div className="next-journey-time-col">
              <span className="next-journey-time-label">Arrives</span>
              <span className="next-journey-time-value">{formatTime(ticket.arrivalTime)}</span>
            </div>
          </div>

          {ticket.bookingReference && (
            <div className="next-journey-ref">
              PNR / Ref <span className="next-journey-ref-code">{ticket.bookingReference}</span>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <button
          className="next-journey-btn group"
          onClick={() => onViewTicket(ticket)}
          disabled={!ticket.file}
        >
          <span>{ticket.file ? "VIEW TICKET" : "TICKET UNAVAILABLE"}</span>
          <ArrowRight className="next-journey-btn-icon" size={16} />
        </button>
      </div>
    </motion.section>
  );
}
