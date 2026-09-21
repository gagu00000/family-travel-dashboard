import { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Ticket as TicketIcon } from 'lucide-react';
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
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [selectedPassenger, setSelectedPassenger] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingTicket, setViewingTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleResetFilters = () => {
    setSelectedPassenger("All");
    setSearchQuery("");
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <div className="app">
          <Header stats={stats} tickets={filteredTickets} />
          <Overview stats={stats} />
          <NextJourney ticket={nextJourney} onViewTicket={handleViewTicket} />
          
          <div className="controls-toolbar" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', margin: 'var(--space-xl) 0 var(--space-lg)' }}>
            <TravelerFilter selected={selectedPassenger} onSelect={setSelectedPassenger} />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <Calendar tickets={filteredTickets} onViewTicket={handleViewTicket} />
          <Timeline tickets={filteredTickets} onViewTicket={handleViewTicket} onResetFilters={handleResetFilters} />

          <TicketViewer ticket={viewingTicket} onClose={handleCloseViewer} />

          {/* Mobile Sticky Ticket Access */}
          {!viewingTicket && nextJourney && nextJourney.file && (
            <button 
              className="mobile-sticky-ticket"
              onClick={() => handleViewTicket(nextJourney)}
            >
              <TicketIcon size={20} />
              <span>View Next Ticket</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
