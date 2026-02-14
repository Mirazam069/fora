import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import "./Header.css";

function toUpperText(s) {
  return String(s || "").toUpperCase();
}

export default function Header() {
  const { t } = useLang();
  const words = useMemo(() => {
    const list = t("header.rotatingWords", []);
    return list.length ? list.map((x) => toUpperText(x)) : ["TEZ", "SIFAT", "NARX"];
  }, [t]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((p) => (p + 1) % words.length);
    }, 2100);
    return () => clearInterval(timer);
  }, [words.length]);

  const current = words[idx];

  return (
    <section className="hero">
      <div className="hero-inner">
        <motion.span className="hero-brand" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          FORA GROUP
        </motion.span>

        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
          {toUpperText(t("header.titlePrefix"))}{" "}
          <span className="hero-roller" aria-label="Rotating category">
            <span className="hero-rollerMask">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={current}
                  className="hero-rollerWord"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>{" "}
          {toUpperText(t("header.titleSuffixTop"))}
          <br />
          {toUpperText(t("header.titleSuffixBottom"))}
        </motion.h1>

        <motion.p className="hero-sub" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>
          {toUpperText(t("header.sub"))}
        </motion.p>

        <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}>
          <motion.a href="/catalog" className="hero-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            {toUpperText(t("header.ctaCatalog"))}
          </motion.a>
          <motion.a href="#contact" className="hero-btn hero-btn--ghost" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            {toUpperText(t("header.ctaContact"))}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
