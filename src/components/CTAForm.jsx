import { useState } from "react";
import { motion } from "framer-motion";
import { IoSendOutline, IoPersonOutline, IoCallOutline } from "react-icons/io5";
import { useLang } from "../context/LanguageContext";
import "./CTAForm.css";

function onlyDigits(s) {
  return String(s || "").replace(/\D/g, "");
}

export default function CTAForm() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  function formatPhone(raw) {
    let d = onlyDigits(raw);
    if (d.startsWith("998")) d = d.slice(3);
    d = d.slice(0, 9);
    const p1 = d.slice(0, 2);
    const p2 = d.slice(2, 5);
    const p3 = d.slice(5, 7);
    const p4 = d.slice(7, 9);
    let out = "+998";
    if (p1) out += ` ${p1}`;
    if (p2) out += ` ${p2}`;
    if (p3) out += ` ${p3}`;
    if (p4) out += ` ${p4}`;
    return out;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const cleanName = name.trim();
    const digits = onlyDigits(phone);
    if (!cleanName) return alert(t("cta.alertName"));
    if (digits.length < 9) return alert(t("cta.alertPhone"));

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      alert(`${t("cta.alertSent")} ✅\n${t("cta.alertNameLabel")}: ${cleanName}\n${t("cta.alertPhoneLabel")}: ${formatPhone(digits)}`);
      setName("");
      setPhone("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="cta" id="contact">
      <div className="cta-inner">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div className="cta-left">
            <motion.span className="cta-kicker" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }}>
              FORA GROUP
            </motion.span>
            <motion.h3 className="cta-title" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.12 }}>
              {String(t("cta.title")).toUpperCase()}
            </motion.h3>
            <motion.p className="cta-sub" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.18 }}>
              {String(t("cta.sub")).toUpperCase()}
            </motion.p>
          </div>

          <div className="cta-right">
            <form className="cta-form" onSubmit={onSubmit}>
              <label className="cta-field">
                <span className="cta-ico" aria-hidden="true"><IoPersonOutline /></span>
                <input className="cta-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("cta.namePlaceholder")} autoComplete="name" />
              </label>
              <label className="cta-field">
                <span className="cta-ico" aria-hidden="true"><IoCallOutline /></span>
                <input className="cta-input" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="+998 90 123 45 67" inputMode="tel" autoComplete="tel" />
              </label>
              <motion.button
                className="cta-btn cta-btn--primary"
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
              >
                <IoSendOutline />
                <span>{loading ? t("cta.sending") : t("cta.submit")}</span>
              </motion.button>
            </form>
          </div>

          <div className="cta-glow" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
