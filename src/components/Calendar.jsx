import { useMemo } from 'react';
import { Plane, Train } from 'lucide-react';
import { parseDate, formatDate, getDayShort } from '../utils/dateUtils';
import { passengerColors } from '../data/tickets';
import './Calendar.css';

export default function Calendar({ tickets, onViewTicket }) {
  // Group tickets by date
  const dateGroups = useMemo(() => {
    const groups = {};
    for (const ticket of tickets) {
      if (!groups[ticket.date]) groups[ticket.date] = [];
      groups[ticket.date].push(ticket);
    }
    // Sort by date
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [tickets]);

  if (dateGroups.length === 0) return null;

  return (
    <section className="calendar" id="calendar" aria-label="Travel calendar">
      <h2 className="calendar-title">Travel Calendar</h2>
      <div className="calendar-scroll">
        <div className="calendar-dates">
          {dateGroups.map(([date, dateTickets]) => {
            const d = parseDate(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPast = d < today;
            const isToday =
              d.getDate() === today.getDate() &&
              d.getMonth() === today.getMonth() &&
              d.getFullYear() === today.getFullYear();

            return (
              <div
                className={`calendar-date ${isPast ? 'calendar-date--past' : ''} ${isToday ? 'calendar-date--today' : ''}`}
                key={date}
              >
                <div className="calendar-date-header">
                  <span className="calendar-date-day">{getDayShort(date)}</span>
                  <span className="calendar-date-num">{d.getDate()}</span>
                  <span className="calendar-date-month">
                    {formatDate(date).split(' ')[1]}
                  </span>
                </div>
                <div className="calendar-date-tickets">
                  {dateTickets.map((ticket) => {
                    const ModeIcon = ticket.type === 'flight' ? Plane : Train;
                    return (
                      <button
                        className={`calendar-ticket calendar-ticket--${ticket.type}`}
                        key={ticket.id}
                        onClick={() => onViewTicket(ticket)}
                        title={`${ticket.passenger}: ${ticket.from} → ${ticket.to}`}
                      >
                        <ModeIcon size={12} />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

