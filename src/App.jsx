import { useState, useMemo } from 'react';
import { tickets } from './data/tickets';
import { getNextJourney, getStats, filterByPassenger, searchTickets, sortChronologically } from './utils/ticketUtils';
import Header from './components/Header';
import Overview from './components/Overview';
import NextJourney from './components/NextJourney';
import Calendar from './components/Calendar';
import TravelerFilter from './components/TravelerFilter';
import SearchBar from './components/SearchBar';
import Timeline from './components/Timeline';
import TicketViewer from './components/TicketViewer';

export default function App() {
  const [selectedPassenger, setSelectedPassenger] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingTicket, setViewingTicket] = useState(null);

  // Compute filtered tickets
  const filteredTickets = useMemo(() => {
    let result = tickets;
    result = filterByPassenger(result, selectedPassenger);
    result = searchTickets(result, searchQuery);
    return sortChronologically(result);
  }, [selectedPassenger, searchQuery]);

  // Stats from all tickets (unfiltered)
  const stats = useMemo(() => getStats(tickets), []);

  // Next journey from filtered tickets
  const nextJourney = useMemo(
    () => getNextJourney(filteredTickets),
    [filteredTickets]
  );

  const handleViewTicket = (ticket) => {
    setViewingTicket(ticket);
  };

  const handleCloseViewer = () => {
    setViewingTicket(null);
  };

  return (
    <div className="app">
      <Header />
      <Overview stats={stats} />
      <NextJourney ticket={nextJourney} onViewTicket={handleViewTicket} />
      <Calendar tickets={filteredTickets} onViewTicket={handleViewTicket} />
      <TravelerFilter selected={selectedPassenger} onSelect={setSelectedPassenger} />
      <SearchBar query={searchQuery} onChange={setSearchQuery} />
      <Timeline tickets={filteredTickets} onViewTicket={handleViewTicket} />

      {viewingTicket && (
        <TicketViewer ticket={viewingTicket} onClose={handleCloseViewer} />
      )}
    </div>
  );
}
