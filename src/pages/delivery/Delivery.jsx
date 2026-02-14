import {
  IoPersonOutline,
  IoChatbubbleEllipsesOutline,
  IoCartOutline,
  IoReceiptOutline,
  IoCubeOutline,
  IoCarSportOutline,
  IoHomeOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { useLang } from "../../context/LanguageContext";
import "./Delivery.css";

function CurveArrow({ dir = "right" }) {
  return (
    <div className={`dlv-curveWrap dlv-curveWrap--${dir}`} aria-hidden="true">
      <svg className="dlv-curve" viewBox="0 0 220 120">
        <defs>
          <marker id="dlvArrowHead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
          </marker>
        </defs>
        <path className="dlv-curvePath" d="M18 18 C 120 18, 160 42, 188 92" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" markerEnd="url(#dlvArrowHead)" />
        <path className="dlv-curvePathFlow" d="M18 18 C 120 18, 160 42, 188 92" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" markerEnd="url(#dlvArrowHead)" />
      </svg>
    </div>
  );
}

const ICONS = [
  IoPersonOutline,
  IoChatbubbleEllipsesOutline,
  IoCartOutline,
  IoReceiptOutline,
  IoCubeOutline,
  IoCarSportOutline,
  IoHomeOutline,
  IoCheckmarkCircleOutline,
];

export default function Delivery() {
  const { t } = useLang();
  const steps = t("delivery.steps", []);

  return (
    <section className="dlv">
      <div className="dlv-shell">
        <div className="dlv-card">
          <div className="dlv-top">
            <h1 className="dlv-title">{t("delivery.title")}</h1>
            <p className="dlv-sub">{t("delivery.sub")}</p>
          </div>

          <div className="dlv-roadmap">
            {steps.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              const left = i % 2 === 0;
              return (
                <div key={item.v}>
                  <div className={`dlv-step ${left ? "dlv-step--left" : "dlv-step--right"} ${i === steps.length - 1 ? "dlv-step--done" : ""}`}>
                    <div className="dlv-badge"><Icon /></div>
                    <div className="dlv-body">
                      <div className="dlv-k">{i === steps.length - 1 ? t("delivery.end") : `${i + 1}-${t("delivery.step")}`}</div>
                      <div className="dlv-v">{item.v}</div>
                      <div className="dlv-t">{item.t}</div>
                    </div>
                  </div>
                  {i < steps.length - 1 ? <CurveArrow dir={left ? "right" : "left"} /> : null}
                </div>
              );
            })}
          </div>

          <div className="dlv-mini">
            <div className="dlv-miniItem"><div className="dlv-miniT">{t("delivery.miniTime")}</div><div className="dlv-miniV">{t("delivery.miniTimeVal")}</div></div>
            <div className="dlv-miniItem"><div className="dlv-miniT">{t("delivery.miniArea")}</div><div className="dlv-miniV">{t("delivery.miniAreaVal")}</div></div>
            <div className="dlv-miniItem"><div className="dlv-miniT">{t("delivery.miniContact")}</div><div className="dlv-miniV">{t("delivery.miniContactVal")}</div></div>
          </div>

          <div className="dlv-foot">
            <a className="dlv-btn dlv-btnGhost" href="/contact">{t("delivery.contact")}</a>
            <a className="dlv-btn" href="/catalog">{t("delivery.openCatalog")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
