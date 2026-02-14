import { motion } from "framer-motion";
import {
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoHammerOutline,
  IoHeadsetOutline,
} from "react-icons/io5";
import { useLang } from "../context/LanguageContext";
import "./WhyChoose.css";

const ICONS = [IoFlashOutline, IoShieldCheckmarkOutline, IoHammerOutline, IoHeadsetOutline];

export default function WhyChoose() {
  const { t } = useLang();
  const features = t("why.features", []);

  return (
    <section className="why">
      <div className="why-inner">
        <div className="why-head">
          <motion.h2 className="why-title" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5 }}>
            {t("why.title")}
          </motion.h2>
          <motion.p className="why-sub" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: 0.08 }}>
            {t("why.sub")}
          </motion.p>
        </div>

        <div className="why-grid">
          {features.map((f, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.article
                key={f.title}
                className="why-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="why-icon"><Icon /></div>
                <h3 className="why-cardTitle">{f.title}</h3>
                <p className="why-cardDesc">{f.desc}</p>
                <div className="why-line" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
