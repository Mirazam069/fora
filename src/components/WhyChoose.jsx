// src/components/common/WhyChoose.jsx
import { motion } from "framer-motion";
import {
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoHammerOutline,
  IoHeadsetOutline,
} from "react-icons/io5";
import "./WhyChoose.css";

const FEATURES = [
  {
    icon: IoFlashOutline,
    title: "TEZ YETKAZIB BERISH",
    desc: "BUYURTMANGIZNI QISQA MUDDATDA YETKAZIB BERAMIZ.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "ISHONCHLI SIFAT",
    desc: "TEKSHIRILGAN USKUNALAR VA BARQAROR NATIJA.",
  },
  {
    icon: IoHammerOutline,
    title: "PROFESSIONAL TEXNIKA",
    desc: "QURILISH VA SANOAT UCHUN MOS YECHIMLAR.",
  },
  {
    icon: IoHeadsetOutline,
    title: "DOIMIY ALOQA",
    desc: "KONSULTATSIYA VA YORDAM — HAR DOIM YONINGIZDAMIZ.",
  },
];

export default function WhyChoose() {
  return (
    <section className="why">
      <div className="why-inner">
        <div className="why-head">
          <motion.h2
            className="why-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            NEGA FORA GROUP?
          </motion.h2>

          <motion.p
            className="why-sub"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            SODDA. TEZ. ISHONCHLI.
          </motion.p>
        </div>

        <div className="why-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
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
                <div className="why-icon">
                  <Icon />
                </div>

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
