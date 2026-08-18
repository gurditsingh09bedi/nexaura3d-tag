import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EVENTS = [
  { icon: "📡", text: "Someone in Dubai just scanned a Tag" },
  { icon: "📦", text: "New order — 12 units to London" },
  { icon: "📡", text: "Someone in Singapore just scanned a Tag" },
  { icon: "🔗", text: "A Tag was linked in New York" },
  { icon: "📦", text: "New order — 4 units to Toronto" },
  { icon: "📡", text: "Someone in Berlin just scanned a Tag" },
  { icon: "🌍", text: "Nexaura Tags are now active in 14 cities" },
  { icon: "📦", text: "New order — 30 units to Sydney" },
];

export default function LiveActivity() {
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout;
    const cycle = () => {
      const next = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      setCurrent(next);
      setVisible(true);
      timeout = setTimeout(() => {
        setVisible(false);
        timeout = setTimeout(cycle, 1800);
      }, 4200);
    };
    timeout = setTimeout(cycle, 2200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 max-w-[280px] md:bottom-8 md:left-8">
      <AnimatePresence>
        {visible && current && (
          <motion.div
            initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong flex items-center gap-3 rounded-xl px-4 py-3 shadow-neon-cyan"
          >
            <span className="text-lg">{current.icon}</span>
            <div>
              <div className="mono-label text-[9px] text-cyan-200/60">Live activity</div>
              <div className="text-xs text-silver/90">{current.text}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
