import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useLang } from "../context/LanguageContext";
import { PRODUCTS as CATALOG_PRODUCTS } from "../pages/catalog/catalogData";
import "./Products.css";

function getRandomItems(arr, count = 8) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

export default function Products() {
  const navigate = useNavigate();
  const { t, tc } = useLang();
  const [contactOpen, setContactOpen] = useState(false);
  const randomProducts = useMemo(() => getRandomItems(CATALOG_PRODUCTS, 8), []);

  const goToCategory = (category) => {
    const qs = new URLSearchParams();
    qs.set("category", category);
    navigate(`/catalog?${qs.toString()}`);
  };

  return (
    <>
      <section className="products">
        <div className="products-inner">
          <div className="products-head">
            <div>
              <h2 className="products-title">{t("products.title")}</h2>
              <p className="products-sub">{t("products.sub")}</p>
            </div>
            <button className="products-link" type="button" onClick={() => navigate("/catalog")}>
              {t("products.viewAll")} {"->"}
            </button>
          </div>

          <div className="products-grid">
            {randomProducts.map((p, i) => (
              <motion.article
                key={p.id}
                className="product-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                onClick={() => goToCategory(p.category)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") goToCategory(p.category);
                }}
              >
                <div className="product-imgWrap">
                  <img className="product-img" src={p.image} alt={p.title} />
                </div>

                <div className="product-body">
                  <div className="product-cat">{String(tc(p.category) || "").toUpperCase()}</div>
                  <h3 className="product-name" title={p.title}>{p.title}</h3>
                  <div className="product-foot">
                    <button
                      type="button"
                      className="product-btn product-btn--order"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setContactOpen(true);
                      }}
                    >
                      {t("products.order")}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="nav-modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setContactOpen(false);
            }}
          >
            <motion.div
              className="nav-modal"
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.contactModalAria")}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="nav-modalTop">
                <div className="nav-modalTitle">{t("products.contactTitle")}</div>
                <button type="button" className="nav-modalClose" onClick={() => setContactOpen(false)} aria-label="Close">
                  <IoCloseOutline />
                </button>
              </div>
              <div className="nav-modalBody">
                <p className="nav-modalText">{t("products.callForOrder")}</p>
                <div className="nav-phones">
                  <a className="nav-phone" href="tel:+998992000077">+998 99 200 00 77</a>
                  <a className="nav-phone" href="tel:+998992000033">+998 99 200 00 33</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
