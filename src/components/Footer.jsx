// src/components/common/Footer.jsx
import { motion } from "framer-motion";
import {
  IoLogoInstagram,
  IoPaperPlaneOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
} from "react-icons/io5";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-col footer-brand">
            <motion.div
              className="footer-name"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
            >
              FORA GROUP
            </motion.div>

            <p className="footer-desc">
              QURILISH VA SANOAT UCHUN PROFESSIONAL USKUNALAR. TEZ YETKAZIB BERISH
              VA ISHONCHLI XIZMAT.
            </p>

            <div className="footer-social">
              <a className="footer-socialBtn" href="https://www.instagram.com/foragroup.uz/" aria-label="Instagram">
                <IoLogoInstagram />
              </a>
              <a className="footer-socialBtn" href="https://t.me/RatoForauz" aria-label="Telegram">
                <IoPaperPlaneOutline />
              </a>
            </div>
          </div>

          <div className="footer-col iii">
            <div className="footer-title">MENYU</div>
            <nav className="footer-links">
              <a href="/" className="footer-link">
                BOSH SAHIFA
              </a>
              <a href="/catalog" className="footer-link">
                KATALOG
              </a>
              <a href="#contact" className="footer-link">
                BOG‘LANISH
              </a>
            </nav>
          </div>

          <div className="footer-col iii">
            <div className="footer-title">KATEGORIYALAR</div>
            <div className="footer-links">
              <a href="/catalog" className="footer-link">
                KOMPRESSORLAR
              </a>
              <a href="/catalog" className="footer-link">
                GENERATORLAR
              </a>
              <a href="/catalog" className="footer-link">
                MINI EKSKAVATORLAR
              </a>
              <a href="/catalog" className="footer-link">
                SUV NASOSLARI
              </a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-title">ALOQA</div>

            <div className="footer-contact">
              <a className="footer-contactRow" href="tel:+998901234567">
                <span className="footer-ico">
                  <IoCallOutline />
                </span>
                <span>+998 99 200 00 33</span>
              </a>

              <a className="footer-contactRow" href="mailto:info@foragroup.uz">
                <span className="footer-ico">
                  <IoMailOutline />
                </span>
                <span>fahriddinovhondamir@gmail.com</span>
              </a>

              <div className="footer-contactRow footer-contactRow--static">
                <span className="footer-ico">
                  <IoLocationOutline />
                </span>
                <span>UZBEKISTON, TOSHKENT, Qorasaroy 284A</span>
              </div>
            </div>

            <motion.a
              href="#contact"
              className="footer-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              }}
            >
              SO‘ROV QOLDIRISH
            </motion.a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {year} FORA GROUP. ONLINE DO'KON
          </div>
          <div className="footer-mini">
            <span>FORA GROUP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
