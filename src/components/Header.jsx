// src/components/common/Hero.jsx
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../components/Header.css";

const CATEGORIES = [
  "Kultivatorlar",
  "Traktorlar",
  "Generatorlar",
  "Armatura bukish",
  "Armatura kesish",
];

function toUpperUz(s) {
  return String(s || "").toUpperCase();
}

export default function Hero() {
  const words = useMemo(() => CATEGORIES.map(toUpperUz), []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % words.length);
    }, 2100);
    return () => clearInterval(t);
  }, [words.length]);

  const current = words[idx];

  return (
    <section className="hero">
      <div className="hero-inner">
        <motion.span
          className="hero-brand"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          FORA GROUP
        </motion.span>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          FORA GROUP DA{" "}
          <span className="hero-roller" aria-label="Rotating category">
            <span className="hero-rollerMask">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={current}
                  className="hero-rollerWord"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {current}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>{" "}
          HAMYONBOB <br/>  NARXLARDA
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          SANOAT VA QURILISH UCHUN PROFESSIONAL USKUNALAR — TEZ YETKAZIB BERISH.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          <motion.a
            href="/catalog"
            className="hero-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            KATALOGNI KO‘RISH
          </motion.a>

          <motion.a
            href="#contact"
            className="hero-btn hero-btn--ghost"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            BOG‘LANISH
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
