import { useLang } from "../../context/LanguageContext";
import "./Warranty.css";

export default function Warranty() {
  const { t } = useLang();
  const items = t("warranty.items", []);

  return (
    <section className="wr">
      <div className="wr-shell">
        <div className="wr-card">
          <div className="wr-top">
            <h1 className="wr-title">{t("warranty.title")}</h1>
            <p className="wr-sub">{t("warranty.sub")}</p>
          </div>

          <div className="wr-grid">
            {items.map((item) => (
              <div className="wr-item" key={item.k}>
                <div className="wr-k">{item.k}</div>
                <div className="wr-v">{item.v}</div>
              </div>
            ))}
          </div>

          <div className="wr-note">
            <div className="wr-noteTitle">{t("warranty.noteTitle")}</div>
            <div className="wr-noteText">{t("warranty.noteText")}</div>
          </div>

          <div className="wr-foot">
            <a className="wr-btn wr-btnGhost" href="/contact">{t("warranty.contact")}</a>
            <a className="wr-btn" href="/catalog">{t("warranty.openCatalog")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
