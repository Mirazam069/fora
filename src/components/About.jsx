import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
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
  const { t } = useLang();
  const chips = t("about.chips", []);

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <motion.span className="about-brand" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            {t("about.brand")}
          </motion.span>

          <motion.h1 className="about-title" variants={fadeUp} initial="hidden" animate="visible" custom={0.08}>
            {t("about.titlePrefix")} <span className="about-accent">{t("about.titleAccent")}</span> {t("about.titleSuffix")}
          </motion.h1>

          <motion.p className="about-sub" variants={fadeUp} initial="hidden" animate="visible" custom={0.18}>
            {t("about.sub")}
          </motion.p>

          <motion.div className="about-heroRow" variants={fadeUp} initial="hidden" animate="visible" custom={0.28}>
            {chips.map((chip) => (
              <div className="about-chip" key={chip}>
                <span className="dot" />
                {chip}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
