import JourneyCard from './JourneyCard';
import { sortChronologically } from '../utils/ticketUtils';
import { formatMonthYear, isUpcoming } from '../utils/dateUtils';
import './Timeline.css';

export default function Timeline({ tickets, onViewTicket }) {
  if (!tickets || tickets.length === 0) {
    return (
      <section className="timeline" id="timeline">
        <h2 className="timeline-title">Travel Journeys</h2>
        <div className="timeline-empty">
          <span className="timeline-empty-icon">🗺️</span>
          <p className="timeline-empty-text">No journeys found</p>
          <p className="timeline-empty-hint">Try adjusting your filter or search</p>
        </div>
      </section>
    );
  }

  const sorted = sortChronologically(tickets);

  // Group by month
  const groups = {};
  for (const ticket of sorted) {
    const key = formatMonthYear(ticket.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(ticket);
  }

  // Separate upcoming vs past
  const hasUpcoming = sorted.some((t) => isUpcoming(t.date));
  const hasPast = sorted.some((t) => !isUpcoming(t.date));

  let globalIndex = 0;

  return (
    <section className="timeline" id="timeline">
      <h2 className="timeline-title">Travel Journeys</h2>
      <p className="timeline-subtitle">
        {sorted.length} {sorted.length === 1 ? 'journey' : 'journeys'}
      </p>

      <div className="timeline-content">
        {Object.entries(groups).map(([month, monthTickets]) => {
          const sectionUpcoming = monthTickets.some((t) => isUpcoming(t.date));
          return (
            <div className="timeline-month" key={month}>
              <div className={`timeline-month-header ${sectionUpcoming ? '' : 'timeline-month-header--past'}`}>
                <span className="timeline-month-dot" />
                <span className="timeline-month-name">{month}</span>
              </div>
              <div className="timeline-cards">
                {monthTickets.map((ticket) => {
                  const idx = globalIndex++;
                  return (
                    <JourneyCard
                      key={ticket.id}
                      ticket={ticket}
                      onViewTicket={onViewTicket}
                      index={idx}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
