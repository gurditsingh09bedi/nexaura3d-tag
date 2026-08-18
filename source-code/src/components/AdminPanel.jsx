import { useState, useEffect } from "react";
import { isBackendConfigured, saveTagsToGitHub, verifyToken } from "../data/useTags";

const ACCENT_PRESETS = ["#4DFCFF", "#E8ECF1", "#C9CDD3", "#FF6B6B", "#FFC24D", "#7CFF9E"];

export default function AdminPanel({ open, onClose, tags, onTagsChanged }) {
  const [token, setToken] = useState(() => localStorage.getItem("nexaura_gh_token") || "");
  const [remember, setRemember] = useState(true);
  const [checking, setChecking] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    tagline: "",
    description: "",
    accent: ACCENT_PRESETS[0],
    baseColor: "#8a8d92",
    metalness: 0.9,
    roughness: 0.2,
  });

  useEffect(() => {
    if (open && token) {
      handleLogin(token, true);
    }
  }, [open]); // eslint-disable-line

  if (!open) return null;

  async function handleLogin(t, silent) {
    if (!isBackendConfigured()) {
      setMsg({ type: "err", text: "Backend isn't set up yet — fill in GH_OWNER / GH_REPO in src/data/useTags.js first (see README)." });
      return;
    }
    if (!t) { setMsg({ type: "err", text: "Paste your GitHub token first." }); return; }
    setChecking(true);
    const ok = await verifyToken(t);
    setChecking(false);
    if (ok) {
      setAuthed(true);
      if (!silent) setMsg(null);
      if (remember) localStorage.setItem("nexaura_gh_token", t);
    } else {
      setAuthed(false);
      setMsg({ type: "err", text: "Token rejected — check it has Contents: Read & write access to this repo." });
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.name.trim()) { setMsg({ type: "err", text: "Give the tag a name." }); return; }
    const id = form.id.trim() || form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newTag = { ...form, id };
    const updated = [...tags, newTag];
    setSaving(true);
    setMsg({ type: "info", text: "Saving to GitHub..." });
    try {
      await saveTagsToGitHub(updated, token);
      setMsg({ type: "ok", text: "Saved — live on the site within a minute." });
      onTagsChanged(updated);
      setForm({ id: "", name: "", tagline: "", description: "", accent: ACCENT_PRESETS[0], baseColor: "#8a8d92", metalness: 0.9, roughness: 0.2 });
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }
    setSaving(false);
  }

  async function handleRemove(id) {
    const updated = tags.filter((t) => t.id !== id);
    setSaving(true);
    setMsg({ type: "info", text: "Removing..." });
    try {
      await saveTagsToGitHub(updated, token);
      setMsg({ type: "ok", text: "Removed and committed to GitHub." });
      onTagsChanged(updated);
    } catch (err) {
      setMsg({ type: "err", text: err.message });
    }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass-strong w-full max-w-lg rounded-2xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">Admin — Manage Tags</h3>
          <button onClick={onClose} className="text-silver/50 hover:text-white">✕</button>
        </div>

        {!isBackendConfigured() && (
          <div className="mb-4 rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-3 text-xs text-yellow-200">
            Backend not configured yet. Open <code className="text-yellow-100">src/data/useTags.js</code> and set
            <code className="text-yellow-100"> GH_OWNER</code> / <code className="text-yellow-100">GH_REPO</code> to a GitHub repo
            you've created (see README.md, same pattern as the Tesco/Nexaura Tags setup).
          </div>
        )}

        {msg && (
          <div className={`mb-4 rounded-lg p-3 text-xs ${
            msg.type === "err" ? "bg-red-500/15 text-red-300" :
            msg.type === "ok" ? "bg-emerald-500/15 text-emerald-300" :
            "bg-cyan-500/10 text-cyan-200"
          }`}>
            {msg.text}
          </div>
        )}

        {!authed ? (
          <div className="space-y-3">
            <label className="block">
              <div className="mono-label mb-2 text-[10px] text-silver/45">GitHub personal access token</div>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="github_pat_..."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300/50"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-silver/50">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember on this device
            </label>
            <button
              onClick={() => handleLogin(token, false)}
              disabled={checking}
              className="mono-label w-full rounded-xl bg-gradient-to-r from-[#4DFCFF] to-[#7FE9EC] py-3 text-xs font-semibold text-[#031012]"
            >
              {checking ? "Checking..." : "Continue"}
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleAdd} className="space-y-3 border-b border-white/10 pb-5">
              <div className="mono-label text-[10px] text-cyan-200/60">Add a tag</div>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name (e.g. Cobalt)" className="input-sm" />
              <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="Tagline (e.g. Bold by design.)" className="input-sm" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description" rows={2} className="input-sm resize-none" />

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <div className="mono-label mb-1 text-[9px] text-silver/40">Base color</div>
                  <input type="color" value={form.baseColor} onChange={(e) => setForm({ ...form, baseColor: e.target.value })}
                    className="h-9 w-full rounded-lg border border-white/10 bg-transparent" />
                </label>
                <label className="block">
                  <div className="mono-label mb-1 text-[9px] text-silver/40">Glow accent</div>
                  <select value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })} className="input-sm">
                    {ACCENT_PRESETS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <div className="mono-label mb-1 text-[9px] text-silver/40">Metalness ({form.metalness})</div>
                  <input type="range" min="0" max="1" step="0.05" value={form.metalness}
                    onChange={(e) => setForm({ ...form, metalness: Number(e.target.value) })} className="w-full" />
                </label>
                <label className="block">
                  <div className="mono-label mb-1 text-[9px] text-silver/40">Roughness ({form.roughness})</div>
                  <input type="range" min="0" max="1" step="0.05" value={form.roughness}
                    onChange={(e) => setForm({ ...form, roughness: Number(e.target.value) })} className="w-full" />
                </label>
              </div>

              <button type="submit" disabled={saving}
                className="mono-label w-full rounded-xl bg-gradient-to-r from-[#4DFCFF] to-[#7FE9EC] py-3 text-xs font-semibold text-[#031012]">
                {saving ? "Saving..." : "Save tag"}
              </button>
            </form>

            <div className="mt-4">
              <div className="mono-label mb-2 text-[10px] text-silver/45">Current tags ({tags.length})</div>
              <div className="space-y-2">
                {tags.map((t) => (
                  <div key={t.id} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm" style={{ background: t.baseColor }} />
                      <span className="text-sm text-white">{t.name}</span>
                    </div>
                    <button onClick={() => handleRemove(t.id)} disabled={saving}
                      className="text-xs text-red-300/70 hover:text-red-300">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .input-sm {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          color: #E8ECF1;
          font-size: 0.8rem;
          outline: none;
        }
        .input-sm:focus { border-color: rgba(77,252,255,0.5); }
        .input-sm::placeholder { color: rgba(201,205,211,0.35); }
      `}</style>
    </div>
  );
}
