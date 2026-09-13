/**
 * Ticket business logic utilities.
 */

import { isUpcoming, parseDate } from "./dateUtils";

/**
 * Sort tickets chronologically by date + departure time.
 */
export function sortChronologically(ticketsList) {
  return [...ticketsList].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    // Same date — sort by departure time
    return a.departureTime.localeCompare(b.departureTime);
  });
}

/**
 * Get the next upcoming journey (first chronological ticket from today).
 */
export function getNextJourney(ticketsList) {
  const sorted = sortChronologically(ticketsList);
  return sorted.find((t) => isUpcoming(t.date)) || null;
}

/**
 * Get all upcoming journeys sorted chronologically.
 */
export function getUpcomingJourneys(ticketsList) {
  return sortChronologically(ticketsList).filter((t) => isUpcoming(t.date));
}

/**
 * Get all past journeys sorted chronologically.
 */
export function getPastJourneys(ticketsList) {
  return sortChronologically(ticketsList).filter((t) => !isUpcoming(t.date));
}

/**
 * Filter tickets by passenger name.
 * "All" or null returns all tickets.
 */
export function filterByPassenger(ticketsList, passenger) {
  if (!passenger || passenger === "All") return ticketsList;
  return ticketsList.filter((t) => t.passenger === passenger);
}

/**
 * Search tickets by query string (matches passenger, from, to, number, operator).
 */
export function searchTickets(ticketsList, query) {
  if (!query || !query.trim()) return ticketsList;
  const q = query.toLowerCase().trim();
  return ticketsList.filter((t) => {
    return (
      t.passenger.toLowerCase().includes(q) ||
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q) ||
      (t.fromCode && t.fromCode.toLowerCase().includes(q)) ||
      (t.toCode && t.toCode.toLowerCase().includes(q)) ||
      t.number.toLowerCase().includes(q) ||
      t.operator.toLowerCase().includes(q) ||
      (t.trainName && t.trainName.toLowerCase().includes(q)) ||
      (t.bookingReference && t.bookingReference.toLowerCase().includes(q))
    );
  });
}

/**
 * Get unique passengers from ticket list.
 */
export function getUniquePassengers(ticketsList) {
  return [...new Set(ticketsList.map((t) => t.passenger))];
}

/**
 * Calculate dashboard statistics.
 */
export function getStats(ticketsList) {
  const travelers = new Set(ticketsList.map((t) => t.passenger)).size;
  const total = ticketsList.length;
  const flights = ticketsList.filter((t) => t.type === "flight").length;
  const trains = ticketsList.filter((t) => t.type === "train").length;
  const upcoming = ticketsList.filter((t) => isUpcoming(t.date)).length;

  return { travelers, total, flights, trains, upcoming };
}

/**
 * Get the type icon for a ticket.
 */
export function getTypeIcon(type) {
  return type === "flight" ? "✈" : "🚆";
}

/**
 * Get the type label.
 */
export function getTypeLabel(type) {
  return type === "flight" ? "FLIGHT" : "TRAIN";
}
