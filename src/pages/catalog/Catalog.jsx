import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoGridOutline,
  IoSearchOutline,
  IoFunnelOutline,
  IoCloseOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { useLang } from "../../context/LanguageContext";
import { CATEGORIES, PRODUCTS } from "./catalogData";
import "./Catalog.css";

function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Catalog() {
  const navigate = useNavigate();
  const params = useQueryParams();
  const { t, tc } = useLang();
  const [contactOpen, setContactOpen] = useState(false);

  const cat = params.get("category") || "";
  const [q, setQ] = useState(params.get("q") || "");
  const [onlyStock, setOnlyStock] = useState(params.get("stock") === "1");
  const [sort, setSort] = useState(params.get("sort") || "popular");

  useEffect(() => {
    setQ(params.get("q") || "");
    setOnlyStock(params.get("stock") === "1");
    setSort(params.get("sort") || "popular");
  }, [params]);

  const pushUrl = (next) => {
    const sp = new URLSearchParams();
    if (next.category) sp.set("category", next.category);
    if (next.q) sp.set("q", next.q);
    if (next.stock) sp.set("stock", "1");
    if (next.sort && next.sort !== "popular") sp.set("sort", next.sort);
    navigate(`/catalog?${sp.toString()}`);
  };

  const clearAll = () => {
    setQ("");
    setOnlyStock(false);
    setSort("popular");
    navigate("/catalog");
  };

  const products = useMemo(() => {
    let list = [...PRODUCTS];
    if (cat) list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(term) ||
          (p.category || "").toLowerCase().includes(term) ||
          tc(p.category || "").toLowerCase().includes(term)
      );
    }
    if (onlyStock) list = list.filter((p) => p.inStock === true);
    if (sort === "price_asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "price_desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sort === "name_asc") list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    if (sort === "name_desc") list.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    return list;
  }, [cat, q, onlyStock, sort, tc]);

  const FiltersBlock = ({ className = "" }) => (
    <div className={`catalog-tools ${className}`}>
      <div className="toolSearch">
        <span className="toolIcon" aria-hidden="true"><IoSearchOutline /></span>
        <input
          value={q}
          onChange={(e) => {
            const v = e.target.value;
            setQ(v);
            pushUrl({ category: cat, q: v, stock: onlyStock, sort });
          }}
          placeholder={t("catalog.searchPlaceholder")}
        />
        {q.trim() ? (
          <button
            type="button"
            className="toolClear"
            onClick={() => {
              setQ("");
              pushUrl({ category: cat, q: "", stock: onlyStock, sort });
            }}
            aria-label="Clear"
          >
            <IoCloseOutline />
          </button>
        ) : null}
      </div>

      <div className="toolRow">
        <div className="toolSelect">
          <span className="miniIcon" aria-hidden="true"><IoFunnelOutline /></span>
          <select
            value={sort}
            onChange={(e) => {
              const v = e.target.value;
              setSort(v);
              pushUrl({ category: cat, q, stock: onlyStock, sort: v });
            }}
          >
            <option value="popular">{t("catalog.sortDefault")}</option>
            <option value="price_asc">{t("catalog.sortPriceAsc")}</option>
            <option value="price_desc">{t("catalog.sortPriceDesc")}</option>
            <option value="name_asc">{t("catalog.sortNameAsc")}</option>
            <option value="name_desc">{t("catalog.sortNameDesc")}</option>
          </select>
        </div>

        <label className="toolCheck">
          <input
            type="checkbox"
            checked={onlyStock}
            onChange={(e) => {
              const v = e.target.checked;
              setOnlyStock(v);
              pushUrl({ category: cat, q, stock: v, sort });
            }}
          />
          <span>{t("catalog.onlyStock")}</span>
        </label>

        <button type="button" className="toolBtn" onClick={clearAll}>
          <IoCloseOutline />
          <span>{t("catalog.clear")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <main className="catalog">
      <div className="catalog-shell">
        <div className="catalog-top">
          <div className="catalog-head">
            <h1 className="catalog-title">{t("catalog.title")}</h1>
            <p className="catalog-sub">{t("catalog.sub")}</p>
          </div>
        </div>

        <section className="catalog-grid">
          <aside className="side">
            <div className="card side-card">
              <div className="sideTop">
                <div className="sideTitle">
                  <IoGridOutline />
                  <span>{t("catalog.sidebarTitle")}</span>
                </div>
                {cat ? (
                  <button
                    type="button"
                    className="sideReset"
                    onClick={() => pushUrl({ category: "", q, stock: onlyStock, sort })}
                    aria-label="Reset category"
                  >
                    <IoCloseOutline />
                  </button>
                ) : null}
              </div>

              <div className="sideList">
                <button
                  type="button"
                  className={`sideItem ${!cat ? "active" : ""}`}
                  onClick={() => pushUrl({ category: "", q, stock: onlyStock, sort })}
                >
                  <span>{t("catalog.all")}</span>
                  <span className="chev"><IoChevronForwardOutline /></span>
                </button>

                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`sideItem ${cat === c ? "active" : ""}`}
                    onClick={() => pushUrl({ category: c, q, stock: onlyStock, sort })}
                    title={tc(c)}
                  >
                    <span className="txt">{tc(c)}</span>
                    <span className="chev"><IoChevronForwardOutline /></span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="content">
            <div className="contentTop">
              <div className="contentTitle">{cat ? tc(cat) : t("catalog.allProducts")}</div>
              <div className="contentMeta">{t("catalog.count")}: <b>{products.length}</b></div>
            </div>

            {products.length === 0 ? (
              <div className="card empty">
                <div className="emptyTitle">{t("catalog.emptyTitle")}</div>
                <div className="emptyText">{t("catalog.emptyText")}</div>
                <button type="button" className="btnPrimary" onClick={clearAll}>{t("catalog.clearFilters")}</button>
              </div>
            ) : (
              <div className="cards">
                {products.map((p) => (
                  <article key={p.id} className="card pcard">
                    <div className="pimg">
                      <img src={p.image} alt={p.title} loading="lazy" />
                      <div className="pbadge">{tc(p.category)}</div>
                    </div>

                    <div className="pcardBody">
                      <div className="ptitle">{p.title}</div>
                      <div className="pfoot">
                        <button type="button" className="btnGhost" onClick={() => setContactOpen(true)}>
                          {t("catalog.details")}
                        </button>

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
                                  <div className="nav-modalTitle">{t("catalog.contactTitle")}</div>
                                  <button type="button" className="nav-modalClose" onClick={() => setContactOpen(false)} aria-label="Close">
                                    <IoCloseOutline />
                                  </button>
                                </div>
                                <div className="nav-modalBody">
                                  <p className="nav-modalText">{t("catalog.callForOrder")}</p>
                                  <div className="nav-phones">
                                    <a className="nav-phone" href="tel:+998992000077">+998 99 200 00 77</a>
                                    <a className="nav-phone" href="tel:+998992000033">+998 99 200 00 33</a>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="filtersMobile">
              <FiltersBlock className="catalog-tools--mobile" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
