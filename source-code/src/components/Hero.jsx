import { motion } from "framer-motion";
import TagScene from "./TagScene";

export default function Hero({ onSelectTag, activeTagId, tags }) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-obsidian">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(77,252,255,0.10),transparent_70%)]" />

      {/* 3D orbital carousel fills the hero */}
      <div className="absolute inset-0">
        <TagScene onSelect={onSelectTag} activeId={activeTagId} tags={tags} />
      </div>

      {/* copy sits above the canvas, pointer-events-none so orbit stays interactive */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between pointer-events-none px-6 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mono-label text-xs text-cyan-200/70"
        >
          Nexaura Consultant · Est. Connectivity
        </motion.div>

        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[0.95] tracking-tight text-[13vw] md:text-[7vw] lg:text-[6.2vw]"
          >
            <span className="block text-white">NEXAURA</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4DFCFF] via-[#B8FBFF] to-[#4DFCFF] text-glow text-[7vw] md:text-[3.2vw]">
              The Future of Connectivity
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto mt-6 max-w-md text-sm md:text-base text-silver/70"
          >
            One tap. Every version of you, shared instantly. Hover a tag to bring it forward.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mono-label flex items-center gap-2 text-[10px] text-silver/50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#4DFCFF] shadow-neon-cyan animate-pulse" />
          Scroll to explore the lineup
        </motion.div>
      </div>
    </section>
  );
}
