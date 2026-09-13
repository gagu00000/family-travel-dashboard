# Family Travel Dashboard ✈️🚆

A premium, mobile-first travel companion dashboard for family members. View all journeys, tickets, and travel details in one beautiful interface.

## Travelers

- **Gagandeep Singh**
- **Palakdeep Kaur**
- **Rajwant Kaur**

## Features

- 📊 **Dashboard Overview** — At-a-glance travel statistics
- 🎯 **Next Journey** — Automatically highlights the nearest upcoming trip
- 📅 **Timeline** — Chronological view of all journeys grouped by month
- 👤 **Passenger Filter** — Filter by traveler with one click
- 🔍 **Search** — Find tickets by city, name, flight/train number
- 🎫 **Ticket Viewer** — Open PDFs and images directly in the app
- ✈️🚆 **Flight/Train Distinction** — Clear visual difference between modes
- 📱 **Mobile-First** — Optimized for phones, works great on desktop

## Tech Stack

- **React 19** + **Vite** — Fast dev and build
- **Vanilla CSS** with CSS custom properties — No utility framework
- **Plus Jakarta Sans** — Premium typography via Google Fonts
- Zero additional dependencies

## Getting Started

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

### Deploy to Vercel

1. Push this repo to GitHub
2. Import it in [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — just click Deploy
4. Done! 🎉

Or use the Vercel CLI:

```bash
npx vercel
```

## Ticket Files

All ticket files live in `public/tickets/`:

| File | Journey |
|------|---------|
| `palak-ccu-dxb.pdf` | Palakdeep: Kolkata → Dubai |
| `rajwant-dxb-amritsar.pdf` | Rajwant: Dubai → Amritsar |
| `gagan-dxb-mum.pdf` | Gagandeep: Dubai → Mumbai |
| `palak-dxb-mum.pdf` | Palakdeep: Dubai → Mumbai |
| `gagan-csmt-tata.pdf` | Gagandeep: Mumbai → Tatanagar |
| `all-tata-csmt.pdf` | All 3: Tatanagar → Mumbai |
| `gagan-mum-rkt.pdf` | Gagandeep: Mumbai → Ras Al Khaimah |

## How to Edit Ticket Data

All ticket data lives in `src/data/tickets.js`. Each ticket follows this structure:

```js
{
  id: "ticket-01",
  passenger: "Palakdeep",
  type: "flight",       // "flight" or "train"
  from: "Kolkata",
  fromCode: "CCU",
  to: "Dubai",
  toCode: "DXB",
  date: "2026-09-18",   // YYYY-MM-DD format
  departureTime: "16:55", // 24h format
  arrivalTime: "00:05",
  operator: "Emirates",
  number: "EK573",
  bookingReference: "KE7YJ2",
  file: "/tickets/palak-ccu-dxb.pdf",
}
```

To add a new ticket:
1. Place the PDF/image file in `public/tickets/`
2. Add a new entry to the `tickets` array in `src/data/tickets.js`
3. The dashboard updates automatically

## License

Private family use.
