import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Clients({ clients = [] }) {
  return (
    <section id="clients" className="relative bg-obsidian2 px-6 py-28 md:py-36 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-xl"
        >
          <div className="mono-label mb-4 text-xs text-cyan-200/60">Our Clients</div>
          <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">
            Real tags.<br />Real businesses.
          </h2>
          <p className="mt-4 text-silver/60">
            A look at the digital business cards Nexaura has built and deployed for real clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c, i) => (
            <motion.a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-cyan"
            >
              <div className="aspect-[16/11] w-full overflow-hidden bg-black/40">
                {c.photo ? (
                  <img src={c.photo} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl font-display font-semibold text-silver/30">
                    {c.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="mono-label text-[10px] text-cyan-200/50">{c.category}</span>
                  {c.price && (
                    <span className="mono-label rounded-full bg-[#4DFCFF]/10 px-2.5 py-1 text-[10px] font-semibold text-[#4DFCFF]">
                      {c.price}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{c.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-silver/45">{c.description}</p>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#4DFCFF] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View Tag <span aria-hidden>→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-silver/30">
          Want a tag like one of these? Reach out through the Order portal below.
        </p>
      </div>
    </section>
  );
}
