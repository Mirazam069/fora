import { useMemo, useState } from "react";
import { useLang } from "../../context/LanguageContext";
import "./Contact.css";

function normalizePhone(v) {
  return v.replace(/[^\d+]/g, "").slice(0, 16);
}

export default function Contact() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ ok: false, msg: "" });

  const BOT_TOKEN = "BOT_TOKENINGIZ";
  const CHAT_ID = "CHAT_IDINGIZ";

  const canSend = useMemo(() => {
    return name.trim().length >= 2 && phone.trim().length >= 7 && !loading;
  }, [name, phone, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ok: false, msg: "" });

    if (!name.trim() || !phone.trim()) {
      setState({ ok: false, msg: t("contact.formError") });
      return;
    }

    try {
      setLoading(true);
      const text =
        `${t("contact.tgTitle")}\n\n` +
        `${t("contact.tgName")}: ${name.trim()}\n` +
        `${t("contact.tgPhone")}: ${phone.trim()}\n\n` +
        `${t("contact.tgTime")}: ${new Date().toLocaleString()}`;

      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      });

      if (!res.ok) throw new Error("Telegram error");

      setState({ ok: true, msg: t("contact.success") });
      setName("");
      setPhone("");
    } catch {
      setState({ ok: false, msg: t("contact.fail") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fg-contact">
      <div className="fg-contactShell">
        <div className="fg-contactCard">
          <div className="fg-contactTop">
            <h1 className="fg-contactTitle">{t("contact.title")}</h1>
            <p className="fg-contactSub">{t("contact.sub")}</p>

            <div className="fg-contactChips" aria-label="info">
              <div className="fg-chip">{t("contact.workTime")}</div>
              <div className="fg-chip">{t("contact.answerTime")}</div>
            </div>
          </div>

          <form className="fg-contactForm" onSubmit={handleSubmit}>
            <label className="fg-field">
              <span>{t("contact.nameLabel")}</span>
              <input
                type="text"
                placeholder={t("contact.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>

            <label className="fg-field">
              <span>{t("contact.phoneLabel")}</span>
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(normalizePhone(e.target.value))}
                autoComplete="tel"
              />
            </label>

            <button className="fg-sendBtn" type="submit" disabled={!canSend}>
              {loading ? t("contact.sending") : t("contact.send")}
            </button>

            <div className="fg-note">{t("contact.note")}</div>
            {state.msg ? <div className={`fg-alert ${state.ok ? "ok" : "bad"}`}>{state.msg}</div> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
