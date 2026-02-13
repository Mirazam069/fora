// src/components/common/Navbar.jsx
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
import "./Navbar.css";

const CATEGORIES = [
  "Vintli kompressorlar",
  "Kultivatorlar",
  "Traktorlar",
  "Generatorlar",
  "Mini ekskavatorlar",
  "Porshenli kompressorlar",
  "Armatura bukish",
  "Armatura kesish",
  "Po‘lat prut kesish stanoklari",
  "Silliqlash mashinalari",
  "Suv nasoslari",
  "Polietilen quvur payvandlagichlar",
  "Zichlash (vibro) apparatlari",
  "Asfalt kesgichlar",
];

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const catWrapRef = useRef(null);
  const navigate = useNavigate();

  const filteredCats = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter((c) => c.toLowerCase().includes(q));
  }, [query]);

  const catCols = useMemo(() => {
    const cols = chunk(filteredCats, Math.ceil(filteredCats.length / 3));
    while (cols.length < 3) cols.push([]);
    return cols.slice(0, 3);
  }, [filteredCats]);

  // outside click -> close categories (desktop)
  useEffect(() => {
    function onDown(e) {
      if (!catWrapRef.current) return;
      if (catWrapRef.current.contains(e.target)) return;
      setCatOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // ESC -> close overlays
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

  // lock body scroll on mobile/menu/modal
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

  return (
    <>
      <header className="nav" role="banner">
        <div className="nav-shell">
          {/* =========================
              1-QATOR: LOGO + SEARCH + ACTIONS
          ========================= */}
          <div className="nav-row">
            {/* LOGO */}
            <motion.a
              className="nav-logo"
              href="/"
              aria-label="Fora Group Home"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <img
                className="nav-logoImg"
                src={NavbarLogo}
                alt="Fora Group logo"
                draggable="false"
              />
            </motion.a>

            {/* SEARCH */}
            <motion.div
              className="nav-search"
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
                placeholder="Qidirish..."
                aria-label="Search"
              />
            </motion.div>

            {/* DESKTOP ACTIONS */}
            <div className="nav-actions">
              {/* KATALOG */}
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
                  <span>Katalog</span>
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
                        <div className="nav-catTitle">Kategoriyalar</div>
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
                                {c}
                              </motion.button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BOGLANISH */}
              <motion.button
                type="button"
                className="nav-contactBtn"
                onClick={openContact}
                aria-haspopup="dialog"
                aria-expanded={contactOpen}
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="nav-contactIcon" aria-hidden="true">
                  <IoCallOutline />
                </span>
                <span>Bog‘lanish</span>
              </motion.button>

              {/* MOBILE BURGER */}
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

          {/* =========================
              2-QATOR: SUBNAV (Katalog | line | pagelar)
          ========================= */}
          <div className="nav-sub" aria-label="Secondary navigation">
            <div className="nav-subLeft">
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? "nav-subLink active" : "nav-subLink"
                }
                onClick={() => setCatOpen(false)}
              >
                <IoGridOutline />
                <span>Katalog</span>
              </NavLink>

              <div className="nav-divider" />

              <NavLink
                to="/delivery"
                className={({ isActive }) =>
                  isActive ? "nav-subLink active" : "nav-subLink"
                }
              >
                <span>Yetkazib berish</span>
              </NavLink>

              <div className="nav-divider" />

              <NavLink
                to="/warranty"
                className={({ isActive }) =>
                  isActive ? "nav-subLink active" : "nav-subLink"
                }
              >
                <span>Kafolat & Servis</span>
              </NavLink>

              <div className="nav-divider" />

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-subLink active" : "nav-subLink"
                }
              >
                <span>Aloqa</span>
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {/* CONTACT MODAL */}
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
                <p className="nav-modalText">Buyurtma uchun qo‘ng‘iroq qiling:</p>

                <div className="nav-phones">
                  <a className="nav-phone" href="tel:+998992000077 ">
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

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobileOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="nav-mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="nav-mobileTop">
                <div className="nav-mobileBrand">
                  <img
                    className="nav-logoImg nav-logoImg--sm"
                    src={NavbarLogo}
                    alt="Fora Group logo"
                    draggable="false"
                  />
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

              <div className="nav-mobileSearch">
                <span className="nav-searchIcon" aria-hidden="true">
                  <IoSearchOutline />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="nav-searchInput"
                  placeholder="Qidirish..."
                  aria-label="Search"
                />
              </div>

              {/* KATALOG */}
              <div className="nav-mobileSection">
                <div className="nav-mobileTitle">Katalog</div>
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
                      <span>{c}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* SAHIFALAR */}
              <div className="nav-mobileSection">
                <div className="nav-mobileTitle">Sahifalar</div>

                <div className="nav-mobileCats">
                  <button
                    className="nav-mobileCat"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/delivery");
                    }}
                  >
                    Yetkazib berish
                  </button>

                  <button
                    className="nav-mobileCat"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/payment");
                    }}
                  >
                    To‘lov usullari
                  </button>

                  <button
                    className="nav-mobileCat"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/warranty");
                    }}
                  >
                    Kafolat & Servis
                  </button>

                  <button
                    className="nav-mobileCat"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/contact");
                    }}
                  >
                    Aloqa
                  </button>
                </div>
              </div>

              <div className="nav-mobileBottom">
                <motion.button
                  type="button"
                  className="nav-contactBtn nav-contactBtn--full"
                  onClick={() => {
                    setMobileOpen(false);
                    openContact();
                  }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatDelay: 0.6,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="nav-contactIcon" aria-hidden="true">
                    <IoCallOutline />
                  </span>
                  <span>Bog‘lanish</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
