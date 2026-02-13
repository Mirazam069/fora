// src/pages/About/About.jsx
import { motion } from "framer-motion";
import "./About.css";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-container">
          <motion.span
            className="about-brand"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            FORA GROUP — MA’LUMOT
          </motion.span>

          <motion.h1
            className="about-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.08}
          >
            SANOAT VA QURILISH UCHUN <span className="about-accent">ISHONCHLI</span>{" "}
            USKUNALAR
          </motion.h1>

          <motion.p
            className="about-sub"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.18}
          >
            FORA GROUP — qurilish va sanoatga kerak bo‘ladigan uskunalarni tanlash, topish
            va yetkazib berishni soddalashtiradigan jamoa. Bizning maqsad: sifatli texnika,
            aniq maslahat, tez servis.
          </motion.p>

          <motion.div
            className="about-heroRow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.28}
          >
            <div className="about-chip">
              <span className="dot" />
              Kafolatli mahsulotlar
            </div>
            <div className="about-chip">
              <span className="dot" />
              Tez yetkazib berish
            </div>
            <div className="about-chip">
              <span className="dot" />
              Professional maslahat
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
