/**
 * Date formatting utilities for the travel dashboard.
 */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Parse a date string "YYYY-MM-DD" into a Date object (local timezone).
 */
export function parseDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Format: "04 OCT" or "04 OCT 2026"
 */
export function formatDate(dateStr, includeYear = false) {
  const date = parseDate(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()].toUpperCase();
  if (includeYear) {
    return `${day} ${month} ${date.getFullYear()}`;
  }
  return `${day} ${month}`;
}

/**
 * Format: "Friday, 04 Oct 2026"
 */
export function formatDateLong(dateStr) {
  const date = parseDate(dateStr);
  const dayName = DAYS[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  return `${dayName}, ${day} ${month} ${date.getFullYear()}`;
}

/**
 * Format: "October 2026"
 */
export function formatMonthYear(dateStr) {
  const date = parseDate(dateStr);
  return `${MONTHS_FULL[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format time "HH:MM" (24h) to "HH:MM AM/PM" (12h)
 */
export function formatTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/**
 * Get short day name: "Wed"
 */
export function getDayShort(dateStr) {
  const date = parseDate(dateStr);
  return DAYS_SHORT[date.getDay()];
}

/**
 * Check if a ticket date is in the future (upcoming).
 */
export function isUpcoming(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ticketDate = parseDate(dateStr);
  return ticketDate >= today;
}

/**
 * Check if a ticket date is today.
 */
export function isToday(dateStr) {
  const today = new Date();
  const ticketDate = parseDate(dateStr);
  return (
    ticketDate.getDate() === today.getDate() &&
    ticketDate.getMonth() === today.getMonth() &&
    ticketDate.getFullYear() === today.getFullYear()
  );
}

/**
 * Get days until departure. Returns negative for past dates.
 */
export function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ticketDate = parseDate(dateStr);
  const diffMs = ticketDate - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Human-readable countdown: "In 3 days", "Tomorrow", "Today", "2 days ago"
 */
export function getCountdown(dateStr) {
  const days = daysUntil(dateStr);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  if (days > 0) return `In ${days} days`;
  return `${Math.abs(days)} days ago`;
}

/**
 * Group ticket dates by month: { "October 2026": [...], ... }
 */
export function groupByMonth(tickets) {
  const groups = {};
  for (const ticket of tickets) {
    const key = formatMonthYear(ticket.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(ticket);
  }
  return groups;
}
