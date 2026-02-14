import { motion } from "framer-motion";
import {
  IoLogoInstagram,
  IoPaperPlaneOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { useLang } from "../context/LanguageContext";
import { CATEGORIES } from "../pages/catalog/catalogData";
import "./Footer.css";

export default function Footer() {
  const { t, tc } = useLang();
  const year = new Date().getFullYear();
  const footerCats = CATEGORIES.slice(0, 4);

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

            <p className="footer-desc">{t("footer.desc")}</p>

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
            <div className="footer-title">{t("footer.menu")}</div>
            <nav className="footer-links">
              <a href="/" className="footer-link">{t("footer.home")}</a>
              <a href="/catalog" className="footer-link">{t("footer.catalog")}</a>
              <a href="#contact" className="footer-link">{t("footer.contact")}</a>
            </nav>
          </div>

          <div className="footer-col iii">
            <div className="footer-title">{t("footer.categories")}</div>
            <div className="footer-links">
              {footerCats.map((cat) => (
                <a href={`/catalog?category=${encodeURIComponent(cat)}`} className="footer-link" key={cat}>
                  {String(tc(cat)).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-title">{t("footer.contactTitle")}</div>

            <div className="footer-contact">
              <a className="footer-contactRow" href="tel:+998901234567">
                <span className="footer-ico"><IoCallOutline /></span>
                <span>+998 99 200 00 33 <br /> +998 99 200 00 77</span>
              </a>

              <a className="footer-contactRow" href="mailto:info@foragroup.uz">
                <span className="footer-ico"><IoMailOutline /></span>
                <span>fahriddinovhondamir@gmail.com</span>
              </a>

              <div className="footer-contactRow footer-contactRow--static">
                <span className="footer-ico"><IoLocationOutline /></span>
                <span>UZBEKISTON, TOSHKENT, Qorasaroy 284A</span>
              </div>
            </div>

            <motion.a
              href="#contact"
              className="footer-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
            >
              {t("footer.cta")}
            </motion.a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© {year} FORA GROUP. {t("footer.copyrightTail")}</div>
          <div className="footer-mini"><span>FORA GROUP</span></div>
        </div>
      </div>
    </footer>
  );
}
