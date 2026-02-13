// src/pages/warranty/Warranty.jsx
import "./Warranty.css";

export default function Warranty() {
  return (
    <section className="wr">
      <div className="wr-shell">
        <div className="wr-card">
          <div className="wr-top">
            <h1 className="wr-title">Kafolat</h1>
            <p className="wr-sub">
              Uskunalar uchun kafolat shartlari va xizmat ko‘rsatish tartibi.
              Savolingiz bo‘lsa — bog‘lanish bo‘limi orqali murojaat qiling.
            </p>
          </div>

          <div className="wr-grid">
            <div className="wr-item">
              <div className="wr-k">Kafolat muddati</div>
              <div className="wr-v">
                Kafolat muddati mahsulot turiga qarab belgilanadi (odatda 6–24 oy).
              </div>
            </div>

            <div className="wr-item">
              <div className="wr-k">Nimalar kafolatga kiradi</div>
              <div className="wr-v">
                Zavod nuqsonlari, ishlab chiqarishdagi kamchiliklar va normal foydalanishdagi texnik nosozliklar.
              </div>
            </div>

            <div className="wr-item">
              <div className="wr-k">Nimalar kafolatga kirmaydi</div>
              <div className="wr-v">
                Noto‘g‘ri ishlatish, mexanik shikast, tashqi aralashuv, noto‘g‘ri kuchlanish,
                ruxsatsiz ta’mirlash yoki ehtiyot qismlarni almashtirish.
              </div>
            </div>

            <div className="wr-item">
              <div className="wr-k">Kerakli hujjatlar</div>
              <div className="wr-v">
                Chek/faktura, kafolat taloni (mavjud bo‘lsa) va mahsulotning seriya raqami.
              </div>
            </div>
          </div>

          <div className="wr-note">
            <div className="wr-noteTitle">Muhim eslatma</div>
            <div className="wr-noteText">
              Kafolat bo‘yicha yakuniy qaror servis tekshiruvi natijasiga ko‘ra chiqariladi.
              Agar mahsulot kafolat doirasida bo‘lsa, ta’mirlash yoki almashtirish amalga oshiriladi.
            </div>
          </div>

          <div className="wr-foot">
            <a className="wr-btn wr-btnGhost" href="/contact">
              Bog‘lanish
            </a>
            <a className="wr-btn" href="/catalog">
              Katalogni ko‘rish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
