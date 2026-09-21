import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane } from 'lucide-react';
import { parseDate } from '../utils/dateUtils';
import JourneyCard from './JourneyCard';
import './Timeline.css';

export default function Timeline({ tickets, onViewTicket, onResetFilters }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!tickets || tickets.length === 0) {
    return (
      <section className="timeline-empty">
        <Plane className="timeline-empty-icon" strokeWidth={1} />
        <h3 className="timeline-empty-text">No journeys found</h3>
        <p className="timeline-empty-hint">Try adjusting your traveler filter or search query.</p>
        {onResetFilters && (
          <button className="timeline-empty-reset" onClick={onResetFilters}>
            Reset Filters
          </button>
        )}
      </section>
    );
  }

  // Group by month — use parseDate to avoid timezone bugs
  const grouped = tickets.reduce((acc, ticket) => {
    const d = parseDate(ticket.date);
    const month = d.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(ticket);
    return acc;
  }, {});

  return (
    <section className="timeline" id="timeline" ref={containerRef}>
      <motion.h2 
        className="timeline-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Upcoming Journeys
      </motion.h2>

      <div className="timeline-content">
        {/* Animated glowing vertical line */}
        <div className="timeline-track">
          <motion.div 
            className="timeline-track-fill" 
            style={{ height: lineHeight }}
          />
        </div>

        {Object.entries(grouped).map(([month, monthTickets], mIdx) => (
          <div key={month} className="timeline-month-group">
            
            <motion.div 
              className="timeline-month-header"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="timeline-month-dot" />
              <h3 className="timeline-month-name">{month}</h3>
            </motion.div>

            <div className="timeline-cards">
              {monthTickets.map((ticket, tIdx) => (
                <JourneyCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onViewTicket={onViewTicket} 
                  delay={(tIdx % 3) * 0.1}
                />
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
