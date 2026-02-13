// src/pages/contact/Contact.jsx
import { useMemo, useState } from "react";
import "./Contact.css";

function normalizePhone(v) {
  // faqat raqam va + qoldiramiz
  return v.replace(/[^\d+]/g, "").slice(0, 16);
}

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ ok: false, msg: "" });

  // ⚠️ Tokenni frontendga qo‘yish xavfli. Hozircha demo.
  const BOT_TOKEN = "BOT_TOKENINGIZ";
  const CHAT_ID = "CHAT_IDINGIZ";

  const canSend = useMemo(() => {
    return name.trim().length >= 2 && phone.trim().length >= 7 && !loading;
  }, [name, phone, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ok: false, msg: "" });

    if (!name.trim() || !phone.trim()) {
      setState({ ok: false, msg: "Iltimos, ism va raqamni kiriting." });
      return;
    }

    try {
      setLoading(true);

      const text =
        `📩 YANGI MUROJAAT (Fora Group)\n\n` +
        `👤 Ism: ${name.trim()}\n` +
        `📞 Telefon: ${phone.trim()}\n\n` +
        `⏱ Vaqt: ${new Date().toLocaleString()}`;

      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      });

      if (!res.ok) throw new Error("Telegram error");

      setState({ ok: true, msg: "So‘rovingiz yuborildi. Tez orada bog‘lanamiz ✅" });
      setName("");
      setPhone("");
    } catch (err) {
      setState({ ok: false, msg: "Xatolik yuz berdi. Qayta urinib ko‘ring." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fg-contact">
      <div className="fg-contactShell">
        <div className="fg-contactCard">
          <div className="fg-contactTop">
            <h1 className="fg-contactTitle">Bog‘lanish</h1>
            <p className="fg-contactSub">
              Ism va raqamingizni qoldiring — menejerimiz siz bilan bog‘lanadi.
            </p>

            <div className="fg-contactChips" aria-label="info">
              <div className="fg-chip">
                Ish vaqti: 09:00–18:00
              </div>
              <div className="fg-chip">
                Javob: odatda 10–30 daqiqa
              </div>
            </div>
          </div>

          <form className="fg-contactForm" onSubmit={handleSubmit}>
            <label className="fg-field">
              <span>Ismingiz</span>
              <input
                type="text"
                placeholder="Masalan: Mira'zam"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>

            <label className="fg-field">
              <span>Telefon raqam</span>
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(normalizePhone(e.target.value))}
                autoComplete="tel"
              />
            </label>

            <button className="fg-sendBtn" type="submit" disabled={!canSend}>
              {loading ? "Yuborilmoqda..." : "Yuborish"}
            </button>

            <div className="fg-note">
              Ma’lumotlaringiz faqat aloqa uchun ishlatiladi. Spam yo‘q.
            </div>

            {state.msg ? (
              <div className={`fg-alert ${state.ok ? "ok" : "bad"}`}>{state.msg}</div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
