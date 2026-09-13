import { useEffect, useCallback } from 'react';
import { formatDate, formatTime } from '../utils/dateUtils';
import { getTypeIcon } from '../utils/ticketUtils';
import { passengerColors } from '../data/tickets';
import './TicketViewer.css';

export default function TicketViewer({ ticket, onClose }) {
  // Close on escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!ticket) return null;

  const colors = passengerColors[ticket.passenger] || {};
  const isPdf = ticket.fileType === 'pdf' || (ticket.file && ticket.file.endsWith('.pdf'));
  const isImage = ticket.file && (ticket.file.endsWith('.jpeg') || ticket.file.endsWith('.jpg') || ticket.file.endsWith('.png'));

  return (
    <div className="ticket-viewer-overlay" onClick={onClose} id="ticket-viewer">
      <div
        className="ticket-viewer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Ticket for ${ticket.passenger}: ${ticket.from} to ${ticket.to}`}
      >
        {/* Header */}
        <div className="ticket-viewer-header">
          <div className="ticket-viewer-header-left">
            <span
              className="ticket-viewer-avatar"
              style={{ background: colors.bg, color: colors.color }}
            >
              {colors.emoji}
            </span>
            <div>
              <div className="ticket-viewer-passenger">{ticket.passenger}</div>
              <div className="ticket-viewer-route-text">
                {ticket.from} → {ticket.to}
              </div>
            </div>
          </div>
          <button
            className="ticket-viewer-close"
            onClick={onClose}
            aria-label="Close ticket viewer"
            id="ticket-viewer-close"
          >
            ✕
          </button>
        </div>

        {/* Ticket info bar */}
        <div className="ticket-viewer-info">
          <span className={`ticket-viewer-type ticket-viewer-type--${ticket.type}`}>
            {getTypeIcon(ticket.type)} {ticket.type === 'flight' ? 'FLIGHT' : 'TRAIN'}
          </span>
          <span className="ticket-viewer-detail">
            {formatDate(ticket.date, true)} · {formatTime(ticket.departureTime)}
          </span>
          <span className="ticket-viewer-detail">
            {ticket.operator} · {ticket.number}
          </span>
        </div>

        {/* Ticket preview */}
        <div className="ticket-viewer-preview">
          {isPdf && (
            <iframe
              src={ticket.file}
              className="ticket-viewer-iframe"
              title={`Ticket PDF: ${ticket.passenger} ${ticket.from} to ${ticket.to}`}
            />
          )}
          {isImage && (
            <img
              src={ticket.file}
              alt={`Ticket: ${ticket.passenger} ${ticket.from} to ${ticket.to}`}
              className="ticket-viewer-image"
            />
          )}
          {!ticket.file && (
            <div className="ticket-viewer-unavailable">
              <span className="ticket-viewer-unavailable-icon">📄</span>
              <p className="ticket-viewer-unavailable-text">Ticket file not available</p>
              {ticket.fileNote && (
                <p className="ticket-viewer-unavailable-note">{ticket.fileNote}</p>
              )}
              <div className="ticket-viewer-fallback-info">
                <div className="ticket-viewer-fallback-row">
                  <span>PNR / Booking Ref</span>
                  <strong>{ticket.bookingReference}</strong>
                </div>
                <div className="ticket-viewer-fallback-row">
                  <span>Train / Flight</span>
                  <strong>{ticket.trainName || ticket.number}</strong>
                </div>
                <div className="ticket-viewer-fallback-row">
                  <span>Date</span>
                  <strong>{formatDate(ticket.date, true)}</strong>
                </div>
                <div className="ticket-viewer-fallback-row">
                  <span>Departure</span>
                  <strong>{formatTime(ticket.departureTime)}</strong>
                </div>
                <div className="ticket-viewer-fallback-row">
                  <span>Class</span>
                  <strong>{ticket.classType || '—'}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="ticket-viewer-actions">
          {ticket.file && (
            <a
              href={ticket.file}
              target="_blank"
              rel="noopener noreferrer"
              className="ticket-viewer-btn ticket-viewer-btn--primary"
              id="ticket-viewer-download"
              download
            >
              ↓ DOWNLOAD
            </a>
          )}
          <button
            className="ticket-viewer-btn ticket-viewer-btn--secondary"
            onClick={onClose}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
