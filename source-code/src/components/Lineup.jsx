import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Lineup({ onSelectTag, activeTagId, tags = [] }) {
  return (
    <section id="lineup" className="relative bg-obsidian px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-xl"
        >
          <div className="mono-label mb-4 text-xs text-cyan-200/60">The Lineup</div>
          <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">
            Four finishes.<br />One idea.
          </h2>
          <p className="mt-4 text-silver/60">
            Every Nexaura Tag is machined, not molded. Choose the finish that matches how you move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tags.map((tag, i) => (
            <motion.button
              key={tag.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              onClick={() => onSelectTag(tag)}
              onMouseEnter={() => onSelectTag(tag, true)}
              onMouseLeave={() => onSelectTag(null, true)}
              className={`group relative overflow-hidden rounded-2xl glass p-6 text-left transition-all duration-300 hover:-translate-y-1 ${
                activeTagId === tag.id ? "border-[#4DFCFF]/60 shadow-neon-cyan" : ""
              }`}
            >
              <div
                className="mb-6 h-32 w-full rounded-xl"
                style={{
                  background: `linear-gradient(135deg, #16181b, #0a0a0c)`,
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06)`,
                }}
              >
                <div className="flex h-full items-center justify-center">
                  <div
                    className="h-20 w-12 rounded-md"
                    style={{
                      background: "linear-gradient(160deg, #e9ebee, #9aa0a8)",
                      boxShadow: `0 0 24px ${tag.accent}55`,
                    }}
                  />
                </div>
              </div>

              <div className="mono-label mb-1 text-[10px] text-cyan-200/50">0{i + 1}</div>
              <h3 className="font-display text-xl font-semibold text-white">{tag.name}</h3>
              <p className="mt-1 text-sm text-silver/50">{tag.tagline}</p>
              <p className="mt-3 text-xs leading-relaxed text-silver/40">{tag.description}</p>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#4DFCFF] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View in 3D <span aria-hidden>→</span>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-silver/30">
          More finishes drop quarterly. This grid grows automatically — just add a tag to the roster.
        </p>
      </div>
    </section>
  );
}
