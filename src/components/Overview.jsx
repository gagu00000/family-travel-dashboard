import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Users, Ticket, Plane, Train } from 'lucide-react';
import './Overview.css';

// Custom hook to animate numbers counting up
function useCountUp(end, duration = 1.5) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
}

function StatCard({ label, value, icon: Icon, delay }) {
  const count = useCountUp(value, 1.2);
  
  return (
    <motion.div 
      className="overview-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="overview-icon-wrap">
        <Icon className="overview-icon" strokeWidth={1.5} size={20} />
      </div>
      <div className="overview-content">
        <span className="overview-value">{count}</span>
        <span className="overview-label">{label}</span>
      </div>
    </motion.div>
  );
}

export default function Overview({ stats }) {
  return (
    <section className="overview" id="overview" aria-label="Travel overview">
      <div className="overview-grid">
        <StatCard label="Travelers" value={stats.travelers} icon={Users} delay={0.1} />
        <StatCard label="Tickets" value={stats.total} icon={Ticket} delay={0.2} />
        <StatCard label="Flights" value={stats.flights} icon={Plane} delay={0.3} />
        <StatCard label="Trains" value={stats.trains} icon={Train} delay={0.4} />
      </div>
    </section>
  );
}
