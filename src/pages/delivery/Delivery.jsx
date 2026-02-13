// src/pages/delivery/Delivery.jsx
import "./Delivery.css";
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

function CurveArrow({ dir = "right" }) {
  return (
    <div className={`dlv-curveWrap dlv-curveWrap--${dir}`} aria-hidden="true">
      <svg className="dlv-curve" viewBox="0 0 220 120">
        <defs>
          <marker
            id="dlvArrowHead"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
          </marker>
        </defs>

        {/* base line */}
        <path
          className="dlv-curvePath"
          d="M18 18 C 120 18, 160 42, 188 92"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#dlvArrowHead)"
        />

        {/* moving highlight (flow) */}
        <path
          className="dlv-curvePathFlow"
          d="M18 18 C 120 18, 160 42, 188 92"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#dlvArrowHead)"
        />
      </svg>
    </div>
  );
}


export default function Delivery() {
  return (
    <section className="dlv">
      <div className="dlv-shell">
        <div className="dlv-card">
          <div className="dlv-top">
            <h1 className="dlv-title">Yetkazib berish</h1>
            <p className="dlv-sub">
              Buyurtma qilingan mahsulot qanday yo‘l bilan sizga yetib boradi — qisqa va tushunarli.
            </p>
          </div>

          <div className="dlv-roadmap">
            {/* 1 */}
            <div className="dlv-step dlv-step--left">
              <div className="dlv-badge"><IoPersonOutline /></div>
              <div className="dlv-body">
                <div className="dlv-k">1-qadam</div>
                <div className="dlv-v">Mijoz murojaat qiladi</div>
                <div className="dlv-t">Telefon yoki sayt orqali bog‘lanadi, mahsulot haqida savol beradi.</div>
              </div>
            </div>

            <CurveArrow dir="right" />

            {/* 2 */}
            <div className="dlv-step dlv-step--right">
              <div className="dlv-badge"><IoChatbubbleEllipsesOutline /></div>
              <div className="dlv-body">
                <div className="dlv-k">2-qadam</div>
                <div className="dlv-v">Aniqlashtiramiz</div>
                <div className="dlv-t">Model, miqdor, narx va manzil bo‘yicha tezkor kelishamiz.</div>
              </div>
            </div>

            <CurveArrow dir="left" />

            {/* 3 */}
            <div className="dlv-step dlv-step--left">
              <div className="dlv-badge"><IoCartOutline /></div>
              <div className="dlv-body">
                <div className="dlv-k">3-qadam</div>
                <div className="dlv-v">Buyurtma rasmiylashadi</div>
                <div className="dlv-t">Buyurtma tasdiqlanadi va tayyorlash jarayoni boshlanadi.</div>
              </div>
            </div>

            <CurveArrow dir="right" />

            {/* 4 */}
            <div className="dlv-step dlv-step--right">
              <div className="dlv-badge"><IoReceiptOutline /></div>
              <div className="dlv-body">
                <div className="dlv-k">4-qadam</div>
                <div className="dlv-v">Hujjatlar tayyor</div>
                <div className="dlv-t">Chek/faktura va kerakli hujjatlar (mavjud bo‘lsa) rasmiylashtiriladi.</div>
              </div>
            </div>

            <CurveArrow dir="left" />

            {/* 5 */}
            <div className="dlv-step dlv-step--left">
              <div className="dlv-badge"><IoCubeOutline /></div>
              <div className="dlv-body">
                <div className="dlv-k">5-qadam</div>
                <div className="dlv-v">Qadoqlash & tayyorlash</div>
                <div className="dlv-t">Mahsulot tekshiriladi, qadoqlanadi va jo‘natishga tayyorlanadi.</div>
              </div>
            </div>

            <CurveArrow dir="right" />

            {/* 6 */}
            <div className="dlv-step dlv-step--right">
              <div className="dlv-badge"><IoCarSportOutline /></div>
              <div className="dlv-body">
                <div className="dlv-k">6-qadam</div>
                <div className="dlv-v">Yo‘lga chiqadi</div>
                <div className="dlv-t">Kuryer/transport orqali belgilangan manzilga olib boriladi.</div>
              </div>
            </div>

            <CurveArrow dir="left" />

            {/* 7 */}
            <div className="dlv-step dlv-step--left">
              <div className="dlv-badge"><IoHomeOutline /></div>
              <div className="dlv-body">
                <div className="dlv-k">7-qadam</div>
                <div className="dlv-v">Manzilga yetkaziladi</div>
                <div className="dlv-t">Mijoz qabul qiladi, hammasi joyida ekanligi tekshiriladi.</div>
              </div>
            </div>

            <CurveArrow dir="right" />

            {/* 8 */}
            <div className="dlv-step dlv-step--right dlv-step--done">
              <div className="dlv-badge"><IoCheckmarkCircleOutline /></div>
              <div className="dlv-body">
                <div className="dlv-k">Yakun</div>
                <div className="dlv-v">Murojaat yopiladi</div>
                <div className="dlv-t">Savollar bo‘lsa, servis/kafolat bo‘yicha yordam beramiz.</div>
              </div>
            </div>
          </div>

          <div className="dlv-mini">
            <div className="dlv-miniItem">
              <div className="dlv-miniT">Odatda vaqt</div>
              <div className="dlv-miniV">1–3 ish kuni</div>
            </div>
            <div className="dlv-miniItem">
              <div className="dlv-miniT">Hudud</div>
              <div className="dlv-miniV">Toshkent + viloyatlar</div>
            </div>
            <div className="dlv-miniItem">
              <div className="dlv-miniT">Aloqa</div>
              <div className="dlv-miniV">Contact sahifasi orqali</div>
            </div>
          </div>

          <div className="dlv-foot">
            <a className="dlv-btn dlv-btnGhost" href="/contact">Bog‘lanish</a>
            <a className="dlv-btn" href="/catalog">Katalogni ko‘rish</a>
          </div>
        </div>
      </div>
    </section>
  );
}
