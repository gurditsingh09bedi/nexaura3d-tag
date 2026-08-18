import { useState } from "react";
import { motion } from "framer-motion";

export default function OrderPortal() {
  const [form, setForm] = useState({ name: "", email: "", interest: "Waitlist", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your backend / form service of choice.
    setSent(true);
  };

  return (
    <section id="order" className="relative bg-obsidian px-6 py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(77,252,255,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <div className="mono-label mb-4 text-xs text-cyan-200/60">Order / Inquiry Portal</div>
          <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">
            Request your Tag.
          </h2>
          <p className="mt-4 text-silver/60">
            Join the waitlist, ask a question, or place a bulk order for your team.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-strong rounded-3xl p-8 shadow-neon-cyan md:p-10"
        >
          {sent ? (
            <div className="py-10 text-center">
              <div className="mb-3 text-3xl">✦</div>
              <p className="text-lg text-white">You're on the list.</p>
              <p className="mt-1 text-sm text-silver/50">We'll reach out from Nexaura shortly.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="input"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="input"
                  />
                </Field>
              </div>

              <Field label="I'm interested in">
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="input"
                >
                  <option>Waitlist</option>
                  <option>Single Tag order</option>
                  <option>Bulk / team order</option>
                  <option>Partnership</option>
                </select>
              </Field>

              <Field label="Message (optional)">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us a bit about what you need"
                  rows={4}
                  className="input resize-none"
                />
              </Field>

              <button
                type="submit"
                className="mono-label w-full rounded-xl bg-gradient-to-r from-[#4DFCFF] to-[#7FE9EC] py-4 text-xs font-semibold text-[#031012] shadow-neon-cyan-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Submit Request
              </button>
            </div>
          )}
        </motion.form>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #E8ECF1;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input:focus {
          border-color: rgba(77,252,255,0.5);
        }
        .input::placeholder { color: rgba(201,205,211,0.35); }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mono-label mb-2 text-[10px] text-silver/45">{label}</div>
      {children}
    </label>
  );
}
