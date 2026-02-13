// src/components/common/Products.jsx
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

import { PRODUCTS as CATALOG_PRODUCTS } from "../pages/catalog/catalogData";

function formatUZS(n) {
  try {
    return new Intl.NumberFormat("uz-UZ").format(n);
  } catch {
    return String(n);
  }
}

function getRandomItems(arr, count = 8) {
  const copy = [...arr];
  // Fisher–Yates shuffle
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

export default function Products() {
  const navigate = useNavigate();

  // ✅ har refreshda random (xohlasang keyin "seed" qilib barqaror ham qilamiz)
  const randomProducts = useMemo(() => getRandomItems(CATALOG_PRODUCTS, 8), []);

  const goToCategory = (category) => {
    const qs = new URLSearchParams();
    qs.set("category", category);
    navigate(`/catalog?${qs.toString()}`);
  };

  return (
    <section className="products">
      <div className="products-inner">
        <div className="products-head">
          <div>
            <h2 className="products-title">MAHSULOTLAR</h2>
            <p className="products-sub">ENG KO‘P SO‘RALADIGAN USKUNALAR</p>
          </div>

          <button
            className="products-link"
            type="button"
            onClick={() => navigate("/catalog")}
          >
            BARCHASINI KO‘RISH →
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
                <div className="product-cat">{String(p.category || "").toUpperCase()}</div>

                <h3 className="product-name" title={p.title}>
                  {p.title}
                </h3>

                <div className="product-foot">
                  <div className="product-price">
                    {formatUZS(p.price)} so‘m
                    {p.unit ? <span className="product-unit"> / {p.unit}</span> : null}
                  </div>

                  <div className="product-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="product-btn product-btn--ghost"
                      type="button"
                      onClick={() => goToCategory(p.category)}
                    >
                      KATEGORIYA
                    </button>

                    <button
                      className="product-btn"
                      type="button"
                      onClick={() => alert("Buyurtma (demo): " + p.title)}
                    >
                      BUYURTMA
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
