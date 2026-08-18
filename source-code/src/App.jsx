import { useState } from "react";
import Hero from "./components/Hero";
import Lineup from "./components/Lineup";
import LiveActivity from "./components/LiveActivity";
import OrderPortal from "./components/OrderPortal";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { useTags } from "./data/useTags";

export default function App() {
  const [activeTag, setActiveTag] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const { tags, reload } = useTags();

  const handleSelectTag = (tag) => {
    setActiveTag(tag);
  };

  return (
    <div className="bg-obsidian">
      <Hero onSelectTag={handleSelectTag} activeTagId={activeTag?.id} tags={tags} />
      <Lineup onSelectTag={handleSelectTag} activeTagId={activeTag?.id} tags={tags} />
      <OrderPortal />
      <Footer />
      <LiveActivity />

      {/* Small, unobtrusive admin entry point — bottom-right, easy to find if
          you know it's there, invisible clutter if you don't. */}
      <button
        onClick={() => setAdminOpen(true)}
        className="fixed bottom-5 right-5 z-30 h-8 w-8 rounded-full border border-white/10 bg-black/40 text-[10px] text-silver/30 backdrop-blur hover:text-cyan-200/70 hover:border-cyan-200/30"
        title="Manage tags"
      >
        ⚙
      </button>

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        tags={tags}
        onTagsChanged={() => reload()}
      />
    </div>
  );
}
