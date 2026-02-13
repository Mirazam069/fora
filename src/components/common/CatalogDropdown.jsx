import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./CatalogDropdown.css";

export default function CatalogDropdown({ open, onClose, onPick, tree = [] }) {
  const panelRef = useRef(null);

  const [activeParent, setActiveParent] = useState(0);
  const [expandedParent, setExpandedParent] = useState(() => new Set([0]));
  const [activeChild, setActiveChild] = useState(0);

  const parents = useMemo(() => tree || [], [tree]);
  const children = parents?.[activeParent]?.items || [];

  useEffect(() => {
    setActiveChild(0);
  }, [activeParent]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    const onClickOutside = (e) => {
      if (!panelRef.current) return;
      if (panelRef.current.contains(e.target)) return;
      onClose?.();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  const toggleParent = (idx) => {
    setExpandedParent((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const pick = (pTitle, cTitle) => {
    onPick?.(pTitle, cTitle);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="catd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={panelRef}
            className="catd-panel"
            initial={{ opacity: 0, y: -14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Katalog"
          >
            <div className="catd-inner">
              <aside className="catd-left">
                <div className="catd-leftHead">
                  <span className="catd-leftTitle">Kategoriyalar</span>
                </div>

                <div className="catd-tree">
                  {parents.map((p, i) => {
                    const isActive = i === activeParent;
                    const isExpanded = expandedParent.has(i);

                    return (
                      <div className="catd-parent" key={p.title + i}>
                        <button
                          type="button"
                          className={`catd-parentBtn ${isActive ? "is-active" : ""}`}
                          onClick={() => {
                            setActiveParent(i);
                            toggleParent(i);
                          }}
                        >
                          <span className="catd-parentIcon">{isExpanded ? "−" : "+"}</span>
                          <span className="catd-parentText">{p.title}</span>
                          <span className={`catd-parentChevron ${isExpanded ? "is-open" : ""}`}>
                            ▾
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              className="catd-children"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                            >
                              {p.items.map((c, ci) => {
                                const active = isActive && ci === activeChild;
                                return (
                                  <button
                                    key={c + ci}
                                    type="button"
                                    className={`catd-childBtn ${active ? "is-active" : ""}`}
                                    onClick={() => {
                                      setActiveParent(i);
                                      setActiveChild(ci);
                                      pick(p.title, c);
                                    }}
                                  >
                                    <span className="catd-childDot" />
                                    <span className="catd-childText">{c}</span>
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </aside>

              <section className="catd-right">
                <div className="catd-rightHead">
                  <div className="catd-breadcrumb">
                    <span>Katalog</span>
                    <span className="sep">/</span>
                    <strong>{parents?.[activeParent]?.title || "—"}</strong>
                    {children?.[activeChild] ? (
                      <>
                        <span className="sep">/</span>
                        <strong>{children[activeChild]}</strong>
                      </>
                    ) : null}
                  </div>

                  <button type="button" className="catd-close" onClick={onClose} aria-label="Yopish">
                    ✕
                  </button>
                </div>

                <div className="catd-rightBody">
                  <div className="catd-quickTitle">Tezkor bo‘limlar</div>

                  <div className="catd-quickGrid">
                    {(children.length ? children : ["—"]).slice(0, 8).map((x, k) => (
                      <button
                        key={x + k}
                        type="button"
                        className="catd-quickCard"
                        onClick={() => pick(parents[activeParent]?.title || "", x)}
                      >
                        <span className="qTag">KATEGORIYA</span>
                        <span className="qName">{x}</span>
                        <span className="qGo">→</span>
                      </button>
                    ))}
                  </div>

                  <div className="catd-tip">
                    * `onPick(parent, child)` ichida siz xohlagan routingga yuborasiz.
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
