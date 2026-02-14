import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoSearchOutline,
  IoGridOutline,
  IoCallOutline,
  IoCloseOutline,
  IoMenuOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import NavbarLogo from "../images/foraLogo.png";
import { CATEGORIES } from "../pages/catalog/catalogData";
import { useLang } from "../context/LanguageContext";
import "./Navbar.css";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function normalizeText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘`´ʻʼ']/g, "'")
    .trim();
}

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { lang, setLang, t, tc } = useLang();
  const catWrapRef = useRef(null);
  const navigate = useNavigate();

  const filteredCats = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return CATEGORIES;
    return CATEGORIES.filter((c) => {
      const base = normalizeText(c);
      const localized = normalizeText(tc(c));
      return base.includes(q) || localized.includes(q);
    });
  }, [query, tc]);

  const catCols = useMemo(() => {
    const cols = chunk(filteredCats, Math.ceil(filteredCats.length / 3));
    while (cols.length < 3) cols.push([]);
    return cols.slice(0, 3);
  }, [filteredCats]);

  useEffect(() => {
    function onDown(e) {
      if (!catWrapRef.current) return;
      if (catWrapRef.current.contains(e.target)) return;
      setCatOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setCatOpen(false);
        setContactOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const lock = mobileOpen || contactOpen;
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen, contactOpen]);

  const openContact = () => {
    setContactOpen(true);
    setCatOpen(false);
  };

  const onPickCategory = (name) => {
    setCatOpen(false);
    setMobileOpen(false);
    navigate(`/catalog?category=${encodeURIComponent(name)}`);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const normalizedQuery = normalizeText(q);

    const matchedCategory = CATEGORIES.find((c) => {
      const base = normalizeText(c);
      const localized = normalizeText(tc(c));
      return (
        base === normalizedQuery ||
        localized === normalizedQuery ||
        base.includes(normalizedQuery) ||
        localized.includes(normalizedQuery) ||
        normalizedQuery.includes(base) ||
        normalizedQuery.includes(localized)
      );
    });

    if (matchedCategory) {
      onPickCategory(matchedCategory);
      return;
    }

    setCatOpen(false);
    setMobileOpen(false);
    navigate(`/catalog?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <header className="nav" role="banner">
        <div className="nav-shell">
          <div className="nav-row">
            <motion.a
              className="nav-logo"
              href="/"
              aria-label="Fora Group Home"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <img className="nav-logoImg" src={NavbarLogo} alt="Fora Group logo" draggable="false" />
            </motion.a>

            <motion.form
              className="nav-search"
              onSubmit={onSearchSubmit}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <span className="nav-searchIcon" aria-hidden="true">
                <IoSearchOutline />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="nav-searchInput"
                placeholder={t("nav.searchPlaceholder")}
                aria-label={t("nav.searchAria")}
              />
            </motion.form>

            <div className="nav-actions">
              <div className="nav-catWrap" ref={catWrapRef}>
                <motion.button
                  type="button"
                  className={`nav-catBtn ${catOpen ? "is-open" : ""}`}
                  onClick={() => setCatOpen((s) => !s)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  aria-haspopup="menu"
                  aria-expanded={catOpen}
                >
                  <span className="nav-catIcon" aria-hidden="true">
                    <IoGridOutline />
                  </span>
                  <span>{t("nav.catalog")}</span>
                  <motion.span
                    className="nav-catChevron"
                    aria-hidden="true"
                    animate={{ rotate: catOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoChevronDownOutline />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      className="nav-catDropdown nav-catDropdown--right"
                      role="menu"
                      initial={{ opacity: 0, y: 10, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="nav-catTop">
                        <div className="nav-catTitle">{t("nav.categories")}</div>
                        <button
                          type="button"
                          className="nav-catClose"
                          onClick={() => setCatOpen(false)}
                          aria-label="Close categories"
                        >
                          <IoCloseOutline />
                        </button>
                      </div>

                      <div className="nav-catCols">
                        {catCols.map((col, idx) => (
                          <div className="nav-catCol" key={idx}>
                            {col.map((c) => (
                              <motion.button
                                key={c}
                                type="button"
                                className="nav-catItem"
                                role="menuitem"
                                onClick={() => onPickCategory(c)}
                                whileHover={{ x: 3 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                {tc(c)}
                              </motion.button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="button"
                className="nav-contactBtn"
                onClick={openContact}
                aria-haspopup="dialog"
                aria-expanded={contactOpen}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="nav-contactIcon" aria-hidden="true">
                  <IoCallOutline />
                </span>
                <span>{t("nav.contact")}</span>
              </motion.button>

              <div className="nav-lang" role="group" aria-label="Language switch">
                <button
                  type="button"
                  className={`nav-langBtn ${lang === "uz" ? "active" : ""}`}
                  onClick={() => setLang("uz")}
                >
                  UZ
                </button>
                <button
                  type="button"
                  className={`nav-langBtn ${lang === "ru" ? "active" : ""}`}
                  onClick={() => setLang("ru")}
                >
                  RU
                </button>
              </div>

              <motion.button
                type="button"
                className="nav-burger"
                onClick={() => setMobileOpen(true)}
                whileTap={{ scale: 0.97 }}
                aria-label="Open menu"
              >
                <IoMenuOutline />
              </motion.button>
            </div>
          </div>

          <div className="nav-sub" aria-label="Secondary navigation">
            <div className="nav-subLeft">
              <NavLink
                to="/catalog"
                className={({ isActive }) => (isActive ? "nav-subLink active" : "nav-subLink")}
                onClick={() => setCatOpen(false)}
              >
                <IoGridOutline />
                <span>{t("nav.catalog")}</span>
              </NavLink>
              <div className="nav-divider" />
              <NavLink
                to="/delivery"
                className={({ isActive }) => (isActive ? "nav-subLink active" : "nav-subLink")}
              >
                <span>{t("nav.delivery")}</span>
              </NavLink>
              <div className="nav-divider" />
              <NavLink
                to="/warranty"
                className={({ isActive }) => (isActive ? "nav-subLink active" : "nav-subLink")}
              >
                <span>{t("nav.warranty")}</span>
              </NavLink>
              <div className="nav-divider" />
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "nav-subLink active" : "nav-subLink")}
              >
                <span>{t("nav.contactPage")}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </header>

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
                <div className="nav-modalTitle">{t("nav.contact")}</div>
                <button type="button" className="nav-modalClose" onClick={() => setContactOpen(false)} aria-label="Close">
                  <IoCloseOutline />
                </button>
              </div>

              <div className="nav-modalBody">
                <p className="nav-modalText">{t("nav.callForOrder")}</p>
                <div className="nav-phones">
                  <a className="nav-phone" href="tel:+998992000077">+998 99 200 00 77</a>
                  <a className="nav-phone" href="tel:+998992000033">+998 99 200 00 33</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="nav-mobileOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="nav-mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="nav-mobileTop">
                <div className="nav-mobileBrand">
                  <img className="nav-logoImg nav-logoImg--sm" src={NavbarLogo} alt="Fora Group logo" draggable="false" />
                </div>
                <motion.button
                  type="button"
                  className="nav-mobileClose"
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Close menu"
                >
                  <IoCloseOutline />
                </motion.button>
              </div>

              <div className="nav-mobileLang">
                <button
                  type="button"
                  className={`nav-langBtn ${lang === "uz" ? "active" : ""}`}
                  onClick={() => setLang("uz")}
                >
                  UZ
                </button>
                <button
                  type="button"
                  className={`nav-langBtn ${lang === "ru" ? "active" : ""}`}
                  onClick={() => setLang("ru")}
                >
                  RU
                </button>
              </div>

              <form className="nav-mobileSearch" onSubmit={onSearchSubmit}>
                <span className="nav-searchIcon" aria-hidden="true">
                  <IoSearchOutline />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="nav-searchInput"
                  placeholder={t("nav.searchPlaceholder")}
                  aria-label={t("nav.searchAria")}
                />
              </form>

              <div className="nav-mobileSection">
                <div className="nav-mobileTitle">{t("nav.catalog")}</div>
                <div className="nav-mobileCats">
                  {filteredCats.map((c) => (
                    <motion.button
                      key={c}
                      type="button"
                      className="nav-mobileCat"
                      onClick={() => onPickCategory(c)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{tc(c)}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="nav-mobileSection">
                <div className="nav-mobileTitle">{t("nav.pages")}</div>
                <div className="nav-mobileCats">
                  <button className="nav-mobileCat" onClick={() => { setMobileOpen(false); navigate("/delivery"); }}>
                    {t("nav.delivery")}
                  </button>
                  <button className="nav-mobileCat" onClick={() => { setMobileOpen(false); navigate("/payment"); }}>
                    {t("nav.paymentMethods")}
                  </button>
                  <button className="nav-mobileCat" onClick={() => { setMobileOpen(false); navigate("/warranty"); }}>
                    {t("nav.warranty")}
                  </button>
                  <button className="nav-mobileCat" onClick={() => { setMobileOpen(false); navigate("/contact"); }}>
                    {t("nav.contactPage")}
                  </button>
                </div>
              </div>

              <div className="nav-mobileBottom">
                <motion.button
                  type="button"
                  className="nav-contactBtn nav-contactBtn--full"
                  onClick={() => { setMobileOpen(false); openContact(); }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="nav-contactIcon" aria-hidden="true"><IoCallOutline /></span>
                  <span>{t("nav.contact")}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
