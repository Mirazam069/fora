// src/components/Partners.jsx
import "./Hamkorlar.css";

import sheriklar1 from "../images/sheriklar1.png";
import sheriklar2 from "../images/sheriklar2.png";
import sheriklar3 from "../images/sheriklar3.png";
import sheriklar4 from "../images/sheriklar4.png";
import sheriklar5 from "../images/sheriklar5.png";
import sheriklar6 from "../images/sheriklar6.png";
import sheriklar7 from "../images/sheriklar7.png";
import { useLang } from "../context/LanguageContext";

export default function Partners() {
  const { t } = useLang();
  const logos = [
    sheriklar1,
    sheriklar2,
    sheriklar3,
    sheriklar4,
    sheriklar5,
    sheriklar6,
    sheriklar7,
  ];

  return (
    <section className="partners">
      <div className="partners-container">
        <h2 className="partners-title">{t("partners.title")}</h2>

        <div className="partners-slider">
          <div className="partners-track">
            {[...logos, ...logos].map((logo, index) => (
              <div className="partner-item" key={index}>
                <img src={logo} alt="partner" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
