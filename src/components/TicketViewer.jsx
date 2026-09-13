import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Train } from 'lucide-react';
import { passengerColors } from '../data/tickets';
import { formatDate } from '../utils/dateUtils';
import './TicketViewer.css';

export default function TicketViewer({ ticket, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (ticket) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [ticket]);

  return (
    <AnimatePresence>
      {ticket && (
        <>
          <motion.div 
            className="ticket-viewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          <div className="ticket-viewer-wrapper" pointerEvents="none">
            <motion.div 
              className="ticket-viewer"
              initial={{ opacity: 0, y: "100%", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Drag Indicator */}
              <div className="ticket-viewer-drag-handle" />

              <div className="ticket-viewer-header">
                <div className="ticket-viewer-header-info">
                  <span className="ticket-viewer-passenger">
                    {ticket.passenger}
                  </span>
                  <span className="ticket-viewer-route-text">
                    {ticket.from} → {ticket.to} · {formatDate(ticket.date)}
                  </span>
                </div>
                <button className="ticket-viewer-close" onClick={onClose} aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              <div className="ticket-viewer-content">
                {ticket.file ? (
                  ticket.file.endsWith('.pdf') ? (
                    <iframe 
                      src={`${ticket.file}#toolbar=0`} 
                      className="ticket-viewer-iframe" 
                      title="Ticket PDF"
                    />
                  ) : (
                    <img 
                      src={ticket.file} 
                      alt="Ticket" 
                      className="ticket-viewer-image"
                    />
                  )
                ) : (
                  <div className="ticket-viewer-unavailable">
                    <p className="ticket-viewer-unavailable-text">Image missing</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
