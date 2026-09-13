import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="loading-content">
        <Plane className="loading-icon" size={32} strokeWidth={1.5} />
        <h2 className="loading-text">Preparing your journey</h2>
        <div className="loading-bar-container">
          <motion.div 
            className="loading-bar-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
