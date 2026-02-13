// src/pages/catalog/Catalog.jsx
import "./Catalog.css";
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

import { CATEGORIES, PRODUCTS } from "./catalogData";

function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function formatUZS(n) {
  try {
    return new Intl.NumberFormat("uz-UZ").format(n);
  } catch {
    return String(n);
  }
}

export default function Catalog() {
  const navigate = useNavigate();
  const params = useQueryParams();
  const [contactOpen, setContactOpen] = useState(false);

  // ✅ cat endi state emas — har doim URL’dan
  const cat = params.get("category") || "";

  // ✅ qolganlari state bo‘lib turadi (q / stock / sort)
  const [q, setQ] = useState(params.get("q") || "");
  const [onlyStock, setOnlyStock] = useState(params.get("stock") === "1");
  const [sort, setSort] = useState(params.get("sort") || "popular");

  // ✅ URL -> state sync (q / stock / sort)
  useEffect(() => {
    setQ(params.get("q") || "");
    setOnlyStock(params.get("stock") === "1");
    setSort(params.get("sort") || "popular");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.toString()]);

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
      const t = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(t) ||
          (p.category || "").toLowerCase().includes(t)
      );
    }

    // demo data’da inStock bo‘lmasa ham muammo bermasin
    if (onlyStock) list = list.filter((p) => p.inStock === true);

    if (sort === "price_asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "price_desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sort === "name_asc") list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    if (sort === "name_desc") list.sort((a, b) => (b.title || "").localeCompare(a.title || ""));

    return list;
  }, [cat, q, onlyStock, sort]);

  const FiltersBlock = ({ className = "" }) => (
    <div className={`catalog-tools ${className}`}>
      <div className="toolSearch">
        <span className="toolIcon" aria-hidden="true">
          <IoSearchOutline />
        </span>

        <input
          value={q}
          onChange={(e) => {
            const v = e.target.value;
            setQ(v);
            pushUrl({ category: cat, q: v, stock: onlyStock, sort });
          }}
          placeholder="Qidirish (nom, kategoriya, brend)..."
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
          <span className="miniIcon" aria-hidden="true">
            <IoFunnelOutline />
          </span>

          <select
            value={sort}
            onChange={(e) => {
              const v = e.target.value;
              setSort(v);
              pushUrl({ category: cat, q, stock: onlyStock, sort: v });
            }}
          >
            <option value="popular">Saralash: Default</option>
            <option value="price_asc">Narx: arzon → qimmat</option>
            <option value="price_desc">Narx: qimmat → arzon</option>
            <option value="name_asc">Nomi: A → Z</option>
            <option value="name_desc">Nomi: Z → A</option>
          </select>
        </div>

        <label className="toolCheck" title="Hozircha demo data’da stock yo‘q bo‘lishi mumkin">
          <input
            type="checkbox"
            checked={onlyStock}
            onChange={(e) => {
              const v = e.target.checked;
              setOnlyStock(v);
              pushUrl({ category: cat, q, stock: v, sort });
            }}
          />
          <span>Faqat mavjud</span>
        </label>

        <button type="button" className="toolBtn" onClick={clearAll}>
          <IoCloseOutline />
          <span>Tozalash</span>
        </button>
      </div>
    </div>
  );

  return (
    <main className="catalog">
      <div className="catalog-shell">
        {/* TOP BAR */}
        <div className="catalog-top">
          <div className="catalog-head">
            <h1 className="catalog-title">Mahsulotlar katalogi</h1>
            <p className="catalog-sub">
              Kategoriya tanlang, qidiruv qiling va narx bo‘yicha saralang.
            </p>
          </div>

          {/* ✅ Desktopda filter shu yerda */}
          {/* <div className="filtersDesktop">
            <FiltersBlock className="catalog-tools--desktop" />
          </div> */}
        </div>

        {/* BODY */}
        <section className="catalog-grid">
          {/* SIDEBAR */}
          <aside className="side">
            <div className="card side-card">
              <div className="sideTop">
                <div className="sideTitle">
                  <IoGridOutline />
                  <span>Kategoriyalar</span>
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
                  <span>Barchasi</span>
                  <span className="chev">
                    <IoChevronForwardOutline />
                  </span>
                </button>

                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`sideItem ${cat === c ? "active" : ""}`}
                    onClick={() => pushUrl({ category: c, q, stock: onlyStock, sort })}
                    title={c}
                  >
                    <span className="txt">{c}</span>
                    <span className="chev">
                      <IoChevronForwardOutline />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="content">
            <div className="contentTop">
              <div className="contentTitle">{cat ? cat : "Barcha mahsulotlar"}</div>
              <div className="contentMeta">
                Miqdor: <b>{products.length}</b> ta
              </div>
            </div>

            {/* ✅ PRODUCTS kartalari */}
            {products.length === 0 ? (
              <div className="card empty">
                <div className="emptyTitle">Hech narsa topilmadi</div>
                <div className="emptyText">Qidiruv yoki filterlarni o‘zgartirib ko‘ring.</div>
                <button type="button" className="btnPrimary" onClick={clearAll}>
                  Filterlarni tozalash
                </button>
              </div>
            ) : (
              <div className="cards">
                {products.map((p) => (
                  <article key={p.id} className="card pcard">
                    <div className="pimg">
                      <img src={p.image} alt={p.title} loading="lazy" />
                      <div className="pbadge">{p.category}</div>
                    </div>

                    <div className="pcardBody">
                      <div className="ptitle">{p.title}</div>

                      <div className="pfoot">
                        {/* <div className="price">
                          <span className="n">{formatUZS(p.price)}</span>
                          <span className="u"> so‘m / {p.unit}</span>
                        </div> */}

                        <button
                          type="button"
                          className="btnGhost"
                          onClick={() => setContactOpen(true)}
                        >
                          Batafsil
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
                                aria-label="Bog‘lanish oynasi"
                                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="nav-modalTop">
                                  <div className="nav-modalTitle">Bog‘lanish</div>
                                  <button
                                    type="button"
                                    className="nav-modalClose"
                                    onClick={() => setContactOpen(false)}
                                    aria-label="Close"
                                  >
                                    <IoCloseOutline />
                                  </button>
                                </div>

                                <div className="nav-modalBody">
                                  <p className="nav-modalText">
                                    Buyurtma uchun qo‘ng‘iroq qiling:
                                  </p>

                                  <div className="nav-phones">
                                    <a className="nav-phone" href="tel:+998992000077">
                                      +998 99 200 00 77
                                    </a>
                                    <a className="nav-phone" href="tel:+998992000033">
                                      +998 99 200 00 33
                                    </a>
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

            {/* ✅ MOBILE: avval mahsulotlar, keyin filter */}
            <div className="filtersMobile">
              <FiltersBlock className="catalog-tools--mobile" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
