export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-obsidian px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="mono-label text-[10px] text-silver/30">
          © {new Date().getFullYear()} Nexaura. All rights reserved.
        </div>

        <div className="flex gap-8 text-xs text-silver/40">
          <a href="#lineup" className="hover:text-cyan-200/70 transition-colors">Lineup</a>
          <a href="#order" className="hover:text-cyan-200/70 transition-colors">Order</a>
          <a href="mailto:hello@nexaura.co" className="hover:text-cyan-200/70 transition-colors">Contact</a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <span
          className="font-display text-[11px] font-light tracking-[0.35em] text-silver/25"
          style={{ fontWeight: 300 }}
        >
          POWERED BY&nbsp;
          <span className="text-cyan-200/40">NEXAURA CONSULTANT</span>
        </span>
      </div>
    </footer>
  );
}
