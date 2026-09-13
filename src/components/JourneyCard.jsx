import { motion } from 'framer-motion';
import { Plane, Train, ArrowRight } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateUtils';
import { passengerColors } from '../data/tickets';
import './JourneyCard.css';

export default function JourneyCard({ ticket, onViewTicket, delay = 0 }) {
  const isFlight = ticket.type === "flight";
  const ModeIcon = isFlight ? Plane : Train;
  const colors = passengerColors[ticket.passenger] || {};

  // Parse date into parts: "04", "OCT", "Sunday"
  const d = new Date(ticket.date);
  const dayNum = String(d.getDate()).padStart(2, '0');
  const monthStr = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayName = d.toLocaleString('en-US', { weekday: 'long' });

  return (
    <motion.div 
      className={`journey-card journey-card--${ticket.type}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      <div className={`journey-card-accent journey-card-accent--${ticket.type}`} />
      
      <div className="journey-card-content">
        
        {/* Top: Date & Type */}
        <div className="journey-card-top">
          <div className="journey-card-date-block">
            <span className="journey-card-date-num">{dayNum}</span>
            <div className="journey-card-date-meta">
              <span className="journey-card-date-month">{monthStr}</span>
              <span className="journey-card-date-day">{dayName}</span>
            </div>
          </div>
          
          <div className="journey-card-type-badge">
            <ModeIcon size={14} />
            <span>{ticket.type}</span>
          </div>
        </div>

        {/* Passenger */}
        <div className="journey-card-passenger">
          <div className="journey-card-avatar" style={{ background: colors.bg, color: colors.color, borderColor: colors.color }}>
            {colors.emoji}
          </div>
          <span className="journey-card-passenger-name">{ticket.passenger}</span>
        </div>

        {/* Route */}
        <div className="journey-card-route">
          <div className="journey-card-from">
            <span className="journey-card-route-code">{ticket.fromCode}</span>
            <span className="journey-card-route-city">{ticket.from}</span>
          </div>
          
          <div className="journey-card-route-arrow">
            <div className="journey-card-route-line" />
            <ModeIcon size={16} className="journey-card-route-icon" />
          </div>
          
          <div className="journey-card-to">
            <span className="journey-card-route-code">{ticket.toCode}</span>
            <span className="journey-card-route-city">{ticket.to}</span>
          </div>
        </div>

        {/* Meta Grid */}
        <div className="journey-card-meta">
          <div>
            <span className="journey-card-meta-label">Departs</span>
            <span className="journey-card-meta-value">{formatTime(ticket.departureTime)}</span>
          </div>
          <div>
            <span className="journey-card-meta-label">Arrives</span>
            <span className="journey-card-meta-value">{formatTime(ticket.arrivalTime)}</span>
          </div>
          <div>
            <span className="journey-card-meta-label">Operator</span>
            <span className="journey-card-meta-value">{ticket.operator}</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="journey-card-bottom">
          <span className="journey-card-number">{ticket.trainName || ticket.number}</span>
          {ticket.bookingReference && (
            <span className="journey-card-ref">
              PNR <strong>{ticket.bookingReference}</strong>
            </span>
          )}
        </div>

        <button 
          className="journey-card-btn group"
          onClick={() => onViewTicket(ticket)}
          disabled={!ticket.file}
        >
          <span>{ticket.file ? "VIEW TICKET" : "UNAVAILABLE"}</span>
          <ArrowRight size={14} className="journey-card-btn-icon" />
        </button>

      </div>
    </motion.div>
  );
}
