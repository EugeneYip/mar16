import { useState, useEffect } from "react";

/* ── Icon paths ── */
const ic = {
  target: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  zap: "M13 2L3 14h9l-1 10 10-12h-9l1-10z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  puzzle: "M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  award: "M12 15l-3.5 6.5 1-4.5L6 13.5 10.5 13 12 8.5l1.5 4.5 4.5.5-3.5 3.5 1 4.5z",
  alert: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  chev: "M9 18l6-6-6-6",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
};
const I = ({ n, s = 16, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ic[n] || ""} /></svg>
);

/* ── Colors: Warm + Northeastern ── */
const K = {
  bg: "#FAF6F1",
  card: "#FFFFFF",
  sidebar: "#1B1B1B",
  sidebarText: "#CCCCCC",
  sidebarActive: "rgba(204,51,51,0.15)",
  red: "#CC3333",       // NU red
  redLight: "#CC333312",
  redBorder: "#CC333325",
  dark: "#2C2C2C",
  text: "#3A3530",
  textMid: "#6B6560",
  textDim: "#9E9890",
  accent: "#CC3333",
  blue: "#3B6FA0",
  blueLight: "#3B6FA010",
  blueBorder: "#3B6FA025",
  green: "#4A7C59",
  greenLight: "#4A7C5910",
  greenBorder: "#4A7C5925",
  gold: "#B8860B",
  goldLight: "#B8860B10",
  goldBorder: "#B8860B25",
  purple: "#7B5EA7",
  purpleLight: "#7B5EA710",
  purpleBorder: "#7B5EA725",
  orange: "#C4722A",
  border: "#E8E0D8",
  borderLight: "#F0EBE5",
};

const nav = [
  { id: "fw", label: "Core Framework", zh: "核心架構", icon: "target" },
  { id: "dg", label: "Digitization", zh: "數位化", icon: "zap" },
  { id: "vc", label: "Value Creation", zh: "價值創造", icon: "layers" },
  { id: "vp", label: "Value Curves", zh: "價值曲線", icon: "grid" },
  { id: "vd", label: "Value Delivery", zh: "價值交付", icon: "puzzle" },
  { id: "cp", label: "Value Capture", zh: "價值擷取", icon: "shield" },
  { id: "ca", label: "Case Anchors", zh: "案例錨點", icon: "book" },
  { id: "qz", label: "Quiz Practice", zh: "模擬練習", icon: "award" },
  { id: "tr", label: "Traps / Cram", zh: "陷阱與衝刺", icon: "alert" },
];

const qd = [
  { q: "What are the three necessary conditions for a sustainable enterprise?", qz: "可持續企業的三個必要條件？", a: "Value creation, value delivery, and value capture. They form the minimum blueprint for business model economics, including platforms.", az: "Value creation、value delivery、value capture。構成商業模式經濟學的最低必要藍圖，平臺也不例外。" },
  { q: "What does 'Strategy as Deliberate Coherence' mean?", qz: "「Strategy as Deliberate Coherence」？", a: "Fitting many decisions across products, operations, markets, people, and policies into one coherent whole that achieves economic performance.", az: "把產品、營運、市場、人員、政策等大量決策整合成一個能實現經濟績效的 coherent whole。" },
  { q: "Economically, what does digitization do?", qz: "從經濟學角度，digitization 做什麼？", a: "It lowers major categories of costs and expands the possibilities of coordination and organization.", az: "它降低多種重要成本，並擴大了協調與組織經濟活動的可能性。" },
  { q: "Starting sequence for platform value creation analysis?", qz: "平臺 value creation 分析起手順序？", a: "User, use case, dimensions of value, ecosystem/sides, then stand-alone versus network benefits.", az: "User、use case、DoV、ecosystem/sides，再分 stand-alone 與 network benefits。" },
  { q: "State the core formula for platform value creation.", qz: "平臺價值創造核心公式？", a: "Perceived Benefits = Direct 'Product' Benefits + Network Benefits.", az: "感知利益 = 直接「產品」利益 + 網路利益。" },
  { q: "Why is 'there are network effects' a weak answer?", qz: "為何「there are network effects」是弱答案？", a: "Network effects must be designed into the platform. The term is meaningless without specifying which interactions create value, for whom, through what mechanism.", az: "network effects 必須被設計進平臺。不說清互動、為誰、機制，這名詞沒有分析意義。" },
  { q: "What does a value curve show?", qz: "Value curve 告訴你什麼？", a: "How value maps to demand-side needs across DoV, which competitors are closest, how they differentiate, and where scale may matter.", az: "價值如何對應 demand-side needs 與 DoV，誰最近競爭者，差異化基礎，scale 在哪裡重要。" },
  { q: "Four ways to reposition a value curve?", qz: "四種 reposition 方式？", a: "Increase a DoV, decrease a DoV, subtract/remove a DoV, add a new DoV.", az: "Increase、decrease、subtract/remove、add a new DoV。" },
  { q: "What is an operating model?", qz: "什麼是 operating model？", a: "An inter-related system of features, internal activities, and signature practices that makes the intended value proposition feasible. Whole exceeds sum of parts through complementarity.", az: "讓 intended value proposition 可行的相互關聯系統。透過互補性，整體大於各部分之和。" },
  { q: "What is VRIDO and why doesn't API access satisfy it?", qz: "VRIDO 是什麼？API 為何不滿足？", a: "Valuable, Rare, Inimitable, Durable, Organization-specific. A third-party API is accessible to all competitors, failing Rare and Inimitable.", az: "第三方 API 所有競爭者都能用，不滿足 Rare 與 Inimitable。優勢必須來自疊加的資產。" },
];

/* ── Primitives ── */
const Tag = ({ children, color = K.red }) => (
  <span style={{ display: "inline-block", padding: "2px 9px", borderRadius: 4, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.3, color, background: color + "12", marginRight: 6, marginBottom: 4 }}>{children}</span>
);
const Note = ({ children, color = K.blue, icon, title }) => (
  <div style={{ background: color + "08", border: "1px solid " + color + "20", borderLeft: "3px solid " + color, borderRadius: 8, padding: "14px 18px", margin: "14px 0", lineHeight: 1.7 }}>
    {title && <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 5, display: "flex", alignItems: "center", gap: 6 }}>{icon && <I n={icon} s={14} c={color} />}{title}</div>}
    <div style={{ color: K.text, fontSize: 13.5 }}>{children}</div>
  </div>
);
const Card = ({ children, style }) => (
  <div style={{ background: K.card, border: "1px solid " + K.border, borderRadius: 10, padding: 20, margin: "16px 0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflowX: "auto", ...style }}>{children}</div>
);
const Fold = ({ title, tz, children, startOpen = false, color = K.red }) => {
  const [o, set] = useState(startOpen);
  return (
    <div style={{ border: "1px solid " + (o ? color + "30" : K.border), borderRadius: 8, margin: "8px 0", background: o ? color + "04" : K.card }}>
      <button onClick={() => set(!o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", background: "none", border: "none", cursor: "pointer", color: K.dark, fontSize: 14, fontWeight: 600, textAlign: "left" }}>
        <span style={{ display: "inline-block", transition: "transform 0.2s", transform: o ? "rotate(90deg)" : "none" }}><I n="chev" s={13} c={color} /></span>
        {title}{tz && <span style={{ color: K.textDim, fontWeight: 400, fontSize: 12, marginLeft: 6 }}>{tz}</span>}
      </button>
      {o && <div style={{ padding: "2px 16px 16px 38px" }}>{children}</div>}
    </div>
  );
};
const QC = ({ item, idx }) => {
  const [s, set] = useState(false);
  return (
    <div style={{ background: K.card, border: "1px solid " + (s ? K.red + "40" : K.border), borderRadius: 10, padding: 16, margin: "10px 0", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
      <div style={{ display: "flex", gap: 10 }}>
        <span style={{ background: K.redLight, color: K.red, borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>Q{idx + 1}</span>
        <div style={{ minWidth: 0 }}><div style={{ color: K.dark, fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{item.q}</div><div style={{ color: K.textDim, fontSize: 12, marginTop: 2 }}>{item.qz}</div></div>
      </div>
      <button onClick={() => set(!s)} style={{ marginTop: 10, padding: "5px 14px", borderRadius: 6, border: "1px solid " + K.red + "40", background: s ? K.redLight : "transparent", color: K.red, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{s ? "Hide Answer" : "Show Answer"}</button>
      {s && <div style={{ marginTop: 10, padding: "12px 14px", background: K.greenLight, borderRadius: 8, borderLeft: "3px solid " + K.green }}><div style={{ color: K.dark, fontSize: 13.5, lineHeight: 1.6 }}>{item.a}</div><div style={{ color: K.textMid, fontSize: 12, marginTop: 6 }}>{item.az}</div></div>}
    </div>
  );
};
const CC = ({ title, tz, session, color, facts, inf }) => (
  <div style={{ background: K.card, border: "1px solid " + color + "20", borderTop: "3px solid " + color, borderRadius: 10, padding: 18, margin: "12px 0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 4 }}><span style={{ fontWeight: 700, fontSize: 15, color }}>{title}</span><Tag color={color}>{session}</Tag></div>
    {tz && <div style={{ color: K.textDim, fontSize: 12, marginBottom: 10 }}>{tz}</div>}
    <div style={{ fontSize: 13, color: K.text, lineHeight: 1.7 }}>{facts}</div>
    {inf && <div style={{ marginTop: 10, padding: "10px 12px", background: color + "06", borderRadius: 6, borderLeft: "2px solid " + color + "40", fontSize: 12.5, color: K.text, lineHeight: 1.6 }}><span style={{ fontWeight: 700, color, fontSize: 11, marginRight: 6 }}>INFERENCE:</span>{inf}</div>}
  </div>
);

/* ── Diagrams ── */
const TriDia = () => (
  <svg viewBox="0 0 460 310" style={{ width: "100%", maxWidth: 440, display: "block", margin: "16px auto" }}>
    <line x1="230" y1="48" x2="70" y2="250" stroke={K.red} strokeWidth="1.2" opacity="0.25" />
    <line x1="230" y1="48" x2="390" y2="250" stroke={K.red} strokeWidth="1.2" opacity="0.25" />
    <line x1="70" y1="250" x2="390" y2="250" stroke={K.red} strokeWidth="1.2" opacity="0.25" />
    <circle cx="230" cy="48" r="34" fill={K.redLight} stroke={K.red} strokeWidth="1.5" />
    <text x="230" y="44" textAnchor="middle" fill={K.red} fontSize="10" fontWeight="700">VALUE</text>
    <text x="230" y="57" textAnchor="middle" fill={K.red} fontSize="10" fontWeight="700">CREATION</text>
    <circle cx="70" cy="250" r="34" fill={K.greenLight} stroke={K.green} strokeWidth="1.5" />
    <text x="70" y="246" textAnchor="middle" fill={K.green} fontSize="10" fontWeight="700">VALUE</text>
    <text x="70" y="259" textAnchor="middle" fill={K.green} fontSize="10" fontWeight="700">DELIVERY</text>
    <circle cx="390" cy="250" r="34" fill={K.goldLight} stroke={K.gold} strokeWidth="1.5" />
    <text x="390" y="246" textAnchor="middle" fill={K.gold} fontSize="10" fontWeight="700">VALUE</text>
    <text x="390" y="259" textAnchor="middle" fill={K.gold} fontSize="10" fontWeight="700">CAPTURE</text>
    <text x="230" y="155" textAnchor="middle" fill={K.textMid} fontSize="10" fontWeight="600">DELIBERATE COHERENCE</text>
    <text x="137" y="132" textAnchor="middle" fill={K.textDim} fontSize="9">Position</text>
    <text x="323" y="132" textAnchor="middle" fill={K.textDim} fontSize="9">Uniqueness</text>
    <text x="230" y="296" textAnchor="middle" fill={K.textDim} fontSize="9">Operating Model</text>
  </svg>
);

const NEDia = () => {
  const boxes = [
    { label: "SAME-SIDE\n(Direct)", x: 0, w: 230, color: K.blue, ex: "e.g. PLM patients sharing\nwithin ALS community", sub: "User \u2194 User" },
    { label: "CROSS-SIDE\n(Indirect)", x: 244, w: 230, color: K.purple, ex: "e.g. More patients =\nbetter pharma data", sub: "Side A \u2192 Side B" },
  ];
  const tags = [
    { label: "POSITIVE", color: K.green, d: "More = more value", x: 0 },
    { label: "NEGATIVE", color: "#C04040", d: "More = less value", x: 124 },
    { label: "STRONG", color: K.gold, d: "High marginal \u0394", x: 248 },
    { label: "WEAK", color: K.orange, d: "Low marginal \u0394", x: 372 },
  ];
  return (
    <svg viewBox="0 0 474 240" style={{ width: "100%", maxWidth: 480, display: "block", margin: "12px auto" }}>
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="0" width={b.w} height="96" rx="8" fill={b.color + "08"} stroke={b.color + "25"} />
          {b.label.split("\n").map((l, j) => <text key={j} x={b.x + b.w / 2} y={20 + j * 16} textAnchor="middle" fill={b.color} fontSize="11" fontWeight="700">{l}</text>)}
          {b.ex.split("\n").map((l, j) => <text key={"e"+j} x={b.x + b.w / 2} y={56 + j * 14} textAnchor="middle" fill={K.textDim} fontSize="9">{l}</text>)}
          <text x={b.x + b.w / 2} y={88} textAnchor="middle" fill={b.color} fontSize="9">{b.sub}</text>
        </g>
      ))}
      {tags.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y="108" width="114" height="44" rx="6" fill={t.color + "08"} stroke={t.color + "20"} />
          <text x={t.x + 57} y="128" textAnchor="middle" fill={t.color} fontSize="10" fontWeight="700">{t.label}</text>
          <text x={t.x + 57} y="143" textAnchor="middle" fill={K.textDim} fontSize="9">{t.d}</text>
        </g>
      ))}
      <rect x="0" y="168" width="474" height="60" rx="8" fill="#C0404008" stroke="#C0404018" />
      <text x="237" y="192" textAnchor="middle" fill="#C04040" fontSize="10.5" fontWeight="600">Network effects are DESIGNED, not inherent. Must specify mechanism.</text>
      <text x="237" y="212" textAnchor="middle" fill={K.textDim} fontSize="9.5">{"網路效應是被設計出來的，不是天然存在。必須說明機制。"}</text>
    </svg>
  );
};

/* ── Main ── */
export default function App() {
  const [act, setAct] = useState("fw");
  const [mobOpen, setMob] = useState(false);

  const go = (id) => {
    setAct(id);
    setMob(false);
    document.getElementById("s-" + id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setAct(e.target.id.replace("s-", "")); }),
      { threshold: 0.1 }
    );
    nav.forEach((s) => { const el = document.getElementById("s-" + s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const p = { fontSize: 14, color: K.text, lineHeight: 1.75, margin: "8px 0" };
  const h2 = { fontSize: 22, fontWeight: 800, color: K.dark, margin: "0 0 2px 0", letterSpacing: -0.3 };
  const h2z = { fontSize: 13, color: K.textDim, margin: "0 0 16px 0", fontWeight: 400 };
  const sec = { marginBottom: 52, scrollMarginTop: 24 };

  const SidebarContent = () => (
    <>
      <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: K.red, letterSpacing: 1.5, textTransform: "uppercase" }}>Module 1</div>
        <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>Quiz Study Guide</div>
      </div>
      <div style={{ padding: "10px 8px" }}>
        {nav.map((s) => (
          <button key={s.id} onClick={() => go(s.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 6, border: "none", cursor: "pointer", background: act === s.id ? K.sidebarActive : "transparent", color: act === s.id ? "#fff" : K.sidebarText, fontSize: 12, fontWeight: act === s.id ? 600 : 400, textAlign: "left", marginBottom: 1 }}>
            <I n={s.icon} s={13} c={act === s.id ? K.red : "#888"} />
            <div><div>{s.label}</div><div style={{ fontSize: 9, opacity: 0.6 }}>{s.zh}</div></div>
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: K.bg, color: K.text, fontFamily: "Georgia, 'Noto Sans TC', serif" }}>
      <link href={"https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap"} rel="stylesheet" />

      {/* Desktop sidebar */}
      <nav style={{ width: 210, minWidth: 210, background: K.sidebar, position: "sticky", top: 0, height: "100vh", flexShrink: 0, overflowY: "auto", display: "block" }}>
        <SidebarContent />
      </nav>

      {/* Mobile menu button */}
      <button onClick={() => setMob(!mobOpen)} style={{ position: "fixed", top: 12, right: 12, zIndex: 1001, background: K.sidebar, border: "none", borderRadius: 8, padding: 8, cursor: "pointer", display: "none" }}>
        <I n={mobOpen ? "x" : "menu"} s={20} c="#fff" />
      </button>

      {/* Mobile overlay */}
      {mobOpen && <div onClick={() => setMob(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999 }} />}
      {mobOpen && (
        <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 240, background: K.sidebar, zIndex: 1000, overflowY: "auto" }}>
          <SidebarContent />
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          button[style*="fixed"][style*="right"] { display: block !important; }
          main { padding: 20px 16px 60px !important; }
        }
      `}</style>

      {/* Main content */}
      <main style={{ flex: 1, padding: "32px 44px 80px", maxWidth: 760, minWidth: 0 }}>
        <div style={{ marginBottom: 32, paddingBottom: 18, borderBottom: "2px solid " + K.red + "20" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 6, height: 28, background: K.red, borderRadius: 3 }} />
            <h1 style={{ fontSize: 26, fontWeight: 800, color: K.dark, margin: 0, letterSpacing: -0.5, fontFamily: "Georgia, serif" }}>Module 1 Quiz{" \u2014 "}Definitive Study Guide</h1>
          </div>
          <p style={{ fontSize: 13, color: K.textDim, margin: "4px 0 0 14px" }}>{"模組一小考終極定版 \u00b7 Cross-verified from course files only"}</p>
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            <Tag color={K.blue}>FILE = notes/slides</Tag>
            <Tag color={K.green}>CASE = case PDFs</Tag>
            <Tag color={K.gold}>INFERENCE = reasoned</Tag>
          </div>
        </div>

        {/* ── FRAMEWORK ── */}
        <div id="s-fw" style={sec}>
          <h2 style={h2}>Core Framework: Three Necessary Conditions</h2>
          <p style={h2z}>核心架構：三個必要條件</p>
          <Tag color={K.blue}>FILE: ssrn Ch.2 / HBR / 0_NOTE</Tag>
          <TriDia />
          <p style={p}>Any economically sustainable enterprise must satisfy all three simultaneously. They apply to <strong style={{ color: K.red }}>all enterprises, including platforms</strong>.</p>
          <Note color={K.gold} icon="star" title="Strategy = Deliberate Coherence">
            Fitting many decisions across products, operations, markets, people, and policies into <strong>one coherent whole</strong> that achieves economic performance. Not a checklist of buzzwords.<br />
            {"把大量決策整合成一個 coherent whole。不是零散名詞清單。"}
          </Note>
          <Note color={K.blue} icon="eye" title="The Exam Lens / 考試視角">
            For any question, ask: <strong>What value is created, how is it delivered, and why can it be captured?</strong> Then force precision: for whom, which use case, which DoV, which interactions or practices, what source of defensibility.<br />
            {"任何題目先問：創造什麼價值、如何交付、為何能被擷取？然後精準回答：為誰、什麼 use case、哪些 DoV、什麼互動、靠什麼防守。"}
          </Note>
        </div>

        {/* ── DIGITIZATION ── */}
        <div id="s-dg" style={sec}>
          <h2 style={h2}>Digitization</h2>
          <p style={h2z}>數位化</p>
          <Tag color={K.blue}>FILE: 0_NOTE</Tag>
          <p style={p}>Digitization = a <strong style={{ color: K.red }}>broad reduction in costs</strong> with major organizational consequences.</p>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[["Communication / transmission","溝通與傳輸"],["Replication","複製"],["Tracking / monitoring / data","追蹤、監控、資料蒐集"],["Storage","儲存"],["Info processing (incl. AI)","資訊處理（含 AI）"],["Verification","驗證"],["Product dev / experimentation","產品開發與實驗"],["Transaction costs","交易成本"]].map(([e,z],i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: K.blueLight, borderRadius: 6, border: "1px solid " + K.blueBorder }}>
                  <span style={{ color: K.blue, fontSize: 12, fontWeight: 700 }}>{"\u2193"}</span>
                  <div><div style={{ fontSize: 12.5, color: K.dark, fontWeight: 500 }}>{e}</div><div style={{ fontSize: 10.5, color: K.textDim }}>{z}</div></div>
                </div>
              ))}
            </div>
          </Card>
          <Note color={K.purple} title="Organizational consequence / 組織後果">
            {"Traditional production relied on firms + linear value chains. Digitization enabled coordination across boundaries at scale. Platforms adopt a "}
            <strong>hub-and-spoke topology</strong>
            {"; they differ \"not primarily in what they produce, but in "}
            <strong>how economic activity is structured and coordinated</strong>
            {"\" [0_NOTE, verbatim]"}
          </Note>
        </div>

        {/* ── VALUE CREATION ── */}
        <div id="s-vc" style={sec}>
          <h2 style={h2}>Value Creation on Platforms</h2>
          <p style={h2z}>平臺上的價值創造</p>
          <Tag color={K.blue}>FILE: 1_NOTE / 1_SLIDES</Tag>
          <Note color={K.blue} icon="target" title="Standard Analytical Sequence / 標準起手式">
            {"1. User \u2192 2. Use Case \u2192 3. Dimensions of Value (DoV) \u2192 4. Ecosystem / Sides \u2192 5. Stand-alone vs. Network benefits"}<br />
            <span style={{ fontSize: 12, color: K.textMid }}>DoV = demand-side needs, NOT supply-side features. Sides = external actors, NOT employees/internal ops.</span>
          </Note>
          <Card style={{ textAlign: "center", padding: "16px 20px" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: K.red, marginBottom: 4 }}>{"Perceived Benefits = Direct \"Product\" Benefits + Network Benefits"}</div>
            <div style={{ fontSize: 12.5, color: K.textMid }}>{"感知利益 = 直接「產品」利益 + 網路利益"}</div>
            <div style={{ fontSize: 10.5, color: K.textDim, marginTop: 4 }}>[1_NOTE, verbatim formula]</div>
          </Card>
          <p style={{ ...p, fontWeight: 600, color: K.dark }}>Network Effects Taxonomy / 網路效應分類</p>
          <NEDia />
          <Fold title="Five Critical Warnings" tz="五個關鍵警告" color="#C04040" startOpen>
            <div style={{ fontSize: 13, color: K.text, lineHeight: 1.8 }}>
              {[
                "NOT inherent \u2014 result of intentional platform design / 非天然存在，是平臺設計出來的",
                "Requires specificity \u2014 which interactions, for whom, conditions / 必須具體說明機制",
                "Can be NEGATIVE (congestion, oversaturation) / 可以是負面的",
                "Strength and impact VARY by size, design, activities / 強度因條件而異",
                "Depends on user count AND actions after joining / 不只看人數，也看加入後做了什麼",
              ].map((t, i) => <div key={i} style={{ marginBottom: 6 }}><Tag color="#C04040">{i + 1}</Tag> {t}</div>)}
            </div>
          </Fold>
          <Note color={K.gold} icon="alert" title="Must classify every DoV / 必須分類每個 DoV">
            {"Every Dimension of Value must be explicitly classified as network-driven or stand-alone. This is not optional. [Assignment 1 Feedback, Q3]"}
          </Note>
        </div>

        {/* ── VALUE CURVES ── */}
        <div id="s-vp" style={sec}>
          <h2 style={h2}>{"Value Curves & Positioning"}</h2>
          <p style={h2z}>價值曲線與市場定位</p>
          <Tag color={K.blue}>FILE: 2_NOTE / 2_SLIDES</Tag>
          <p style={p}><strong style={{ color: K.red }}>Value Curve</strong> = how a business model delivers value across DoV vs. alternatives. Determined by <strong>underlying set of practices</strong> (operating model).</p>
          <Card>
            <p style={{ fontSize: 13, fontWeight: 600, color: K.dark, margin: "0 0 10px" }}>Four ways to reposition / innovate:</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                ["\u2460 Increase a DoV","提升 DoV","Invest more",K.green],
                ["\u2461 Decrease a DoV","降低 DoV","Sacrifice for tradeoff","#C04040"],
                ["\u2462 Remove a DoV","刪除 DoV","Stop competing here",K.orange],
                ["\u2463 Add New DoV","新增 DoV","Redefine competition",K.purple],
              ].map(([l,z,d,c],i) => (
                <div key={i} style={{ padding: "10px 12px", background: c + "08", border: "1px solid " + c + "20", borderRadius: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: c }}>{l}</div>
                  <div style={{ fontSize: 11, color: c }}>{z}</div>
                  <div style={{ fontSize: 10.5, color: K.textDim, marginTop: 4 }}>{d}</div>
                </div>
              ))}
            </div>
          </Card>
          <Fold title="Platform-Specific Positioning (A / B / C)" tz="平臺定位區別" color={K.purple} startOpen>
            <div style={{ fontSize: 13.5, color: K.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 8 }}><Tag color={K.purple}>A</Tag> Each side requires <strong>separate successful positioning</strong>. / 每邊需個別定位</div>
              <div style={{ marginBottom: 8 }}><Tag color={K.purple}>B</Tag> <strong>Cross-side tradeoffs</strong> {"\u2014"} value on one side is sensitive to positioning on another. / 跨邊取捨</div>
              <div><Tag color={K.purple}>C</Tag> Platform value curves are <strong>highly dynamic and responsive to scale</strong>. / 對規模高度敏感</div>
            </div>
          </Fold>
          <Fold title="Returns to Scale (cross-session concept)" tz="規模報酬" color={K.gold}>
            <div style={{ fontSize: 13.5, color: K.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 6 }}><strong style={{ color: K.blue }}>Supply-side</strong> = fixed costs spread {"\u2192"} lower avg cost {"\u2192"} mainly price DoV / 供給端規模經濟</div>
              <div style={{ marginBottom: 6 }}><strong style={{ color: K.purple }}>Demand-side = "network effects"</strong> = utility up with network {"\u2192"} boosts multiple DoV / 需求端規模經濟 [2_SLIDES, verbatim]</div>
              <div style={{ fontSize: 12, color: K.textDim }}>Appears in positioning (Amazon), delivery (Peloton), and capture (Coursera) with different emphasis each time.</div>
            </div>
          </Fold>
        </div>

        {/* ── VALUE DELIVERY ── */}
        <div id="s-vd" style={sec}>
          <h2 style={h2}>{"Value Delivery & Operating Model"}</h2>
          <p style={h2z}>價值交付與營運模式</p>
          <Tag color={K.blue}>FILE: ssrn Ch.4 / HBR</Tag>
          <p style={p}><strong style={{ color: K.red }}>Operating model</strong> = an <strong>inter-related system of choices and practices</strong>. Decisions together create more value than each on its own. Whole {">"} sum of parts.</p>
          <Card>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
              {[
                ["\u2460 Min. Sufficient", "F&F at Interface", K.blue],
                ["\u2461 Internal", "Activities", K.purple],
                ["\u2462 Signature", "Practices", K.gold],
              ].map(([a, b, c], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ padding: "10px 14px", background: c + "08", border: "1px solid " + c + "20", borderRadius: 8, textAlign: "center", minWidth: 110 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: c }}>{a}</div>
                    <div style={{ fontSize: 11, color: c }}>{b}</div>
                  </div>
                  {i < 2 && <span style={{ color: K.textDim, fontSize: 18 }}>{"\u2192"}</span>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "10px 14px", background: K.greenLight, borderRadius: 8, border: "1px solid " + K.greenBorder, textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: K.green }}>{"Complementarity: value together > value alone"}</div>
              <div style={{ fontSize: 11, color: K.textDim }}>{"互補性：整體 > 各部分之和 \u2014 practices 必須相互強化"}</div>
            </div>
          </Card>
        </div>

        {/* ── VALUE CAPTURE ── */}
        <div id="s-cp" style={sec}>
          <h2 style={h2}>{"Value Capture & Competitive Advantage"}</h2>
          <p style={h2z}>價值擷取與競爭優勢</p>
          <Tag color={K.blue}>FILE: ssrn Ch.5 / HBR / 4_SLIDES</Tag>
          <Note color={K.gold} icon="shield" title={"Central question: \"Why won't you be copied?\""}>
            {"If competitors can copy you, they drive profits to zero \u2014 unless you have sources of uniqueness."}
          </Note>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ padding: 14, background: K.blueLight, borderRadius: 8, border: "1px solid " + K.blueBorder }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: K.blue, marginBottom: 8 }}>Position-Based / 定位型</div>
                <div style={{ fontSize: 12.5, color: K.text, lineHeight: 1.6 }}>
                  {"\u2022"} <strong>Scale</strong> (supply + demand + learning)<br />
                  {"\u2022"} <strong>Incumbency</strong> (first-mover)<br />
                  {"\u2022"} <strong>Strategic agility</strong> (small player)
                </div>
              </div>
              <div style={{ padding: 14, background: K.purpleLight, borderRadius: 8, border: "1px solid " + K.purpleBorder }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: K.purple, marginBottom: 8 }}>Resource-Based / 資源型</div>
                <div style={{ fontSize: 12.5, color: K.text, lineHeight: 1.6 }}>
                  Unique factors satisfying <strong>VRIDO</strong>:<br />
                  <span style={{ fontSize: 11, color: K.textDim }}>Processes, routines, IP, licenses, culture, data, relationships</span>
                </div>
              </div>
            </div>
          </Card>
          <p style={{ ...p, fontWeight: 600, color: K.dark }}>VRIDO Framework</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", margin: "10px 0 16px" }}>
            {[
              ["V","Valuable","有價值","Unique productivity",K.red],
              ["R","Rare","稀缺","Not widely available",K.purple],
              ["I","Inimitable","不可模仿","Hard to copy",K.gold],
              ["D","Durable","持久","Persists over time",K.green],
              ["O","Org-specific","組織專屬","More value inside firm",K.orange],
            ].map(([l,w,z,d,c],i) => (
              <div key={i} style={{ background: c + "08", border: "1.5px solid " + c + "30", borderRadius: 10, padding: "12px 8px", textAlign: "center", width: 88 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: c }}>{l}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: c, marginTop: 2 }}>{w}</div>
                <div style={{ fontSize: 9.5, color: K.textDim, marginTop: 4, lineHeight: 1.3 }}>{d}</div>
                <div style={{ fontSize: 9.5, color: K.textDim, marginTop: 2 }}>{z}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CASES ── */}
        <div id="s-ca" style={sec}>
          <h2 style={h2}>Case Anchors</h2>
          <p style={h2z}>案例錨點</p>
          <CC title="PatientsLikeMe" tz="Value Creation Anchor" session="CREATION" color={K.blue}
            facts={<><strong>Sides:</strong> Patients, Pharma, Insurance, Physicians.<br /><strong>Patient DoV:</strong> Emotional (support, sharing, peers, hope) + Health (advice, tracking, doctor comms, science).<br /><strong>Primary:</strong> Same-side network effect = emotional engine {"<->"} data/insights loop, <strong>within a given ailment</strong>.<br /><strong>Revenue:</strong> ~90% pharma: outcome studies (50%) + marketing research (40%). [CASE p.6]<br /><strong>"Acquired by a side"</strong> {"—"} flagged as analytically important.</>}
            inf={"GP risky: core loop is ailment-specific. Broadening may dilute trust/sharing/engagement."}
          />
          <CC title={"Barnes & Noble vs. Amazon"} tz="Positioning Anchor" session="POSITIONING" color={K.purple}
            facts={<><strong>Evolution:</strong> {"Independents -> Chainstores -> Superstores -> Amazon."}<br /><strong>DoV:</strong> price, convenience, knowledge, variety, hours, lounge. Amazon added reviews, recs, 24/7.<br /><strong>Key:</strong> Certain DoV highly sensitive to scale in platform models. [2_SLIDES]<br /><strong>Options:</strong> Fortify / Jump / Hybrid. B{"&"}N had low incentives to self-cannibalize.</>}
            inf={"Defending against platform is hard when incumbent's most profitable response is constrained by its own model economics."}
          />
          <CC title="Peloton" tz="Operating Model Anchor" session="DELIVERY" color={K.green}
            facts={<><strong>DoV:</strong> price, coaching, aesthetics, variety, privacy, community, status, convenience.<br /><strong>Framework:</strong> {"① Min sufficient F&F -> ② Activities (instructors, marketing, tech) -> ③ Signature practices."}<br /><strong>Facts:</strong> Founded 2011, proprietary HW, $2K price signal, pop-ups essential, internal logistics 2018, $1.826B FY2020, 92% retention. [CASE]</>}
            inf={"Works only if practices reinforce each other. Coherent operating model, not feature list."}
          />
          <CC title={"Coursera & GenAI"} tz="Value Capture Anchor" session="CAPTURE" color={K.gold}
            facts={<><strong>LLMs = general-purpose tech</strong> {"—"} enabling layer, not standalone answer. [4_SLIDES]<br /><strong>Mode 1:</strong> Direct human chat. <strong>Mode 2:</strong> API-driven automation.<br /><strong>Directions:</strong> Coach, Course Builder, translation, assessment, personalization, GenAI Academy. [CASE]<br /><strong>Critical:</strong> API access alone is NOT a moat.</>}
            inf={"Defensible advantage requires layering AI onto protectable positional or VRIDO-type assets."}
          />
        </div>

        {/* ── QUIZ ── */}
        <div id="s-qz" style={sec}>
          <h2 style={h2}>{"Quiz Practice — 10 Model Q&A"}</h2>
          <p style={h2z}>{"模擬練習 — 十題標準短答"}</p>
          {qd.map((it, i) => <QC key={i} item={it} idx={i} />)}
        </div>

        {/* ── TRAPS ── */}
        <div id="s-tr" style={sec}>
          <h2 style={h2}>{"Traps & Cram Priority"}</h2>
          <p style={h2z}>{"陷阱與最後衝刺順序"}</p>
          <p style={{ ...p, fontWeight: 700, color: "#C04040" }}>Highest-Probability Traps / 最容易失分的陷阱</p>
          <Card>
            {[
              ["Treating internal teams as platform sides","把員工當 platform sides"],
              ["Listing supply features instead of demand-side DoV","列供給端功能非需求端 DoV"],
              ["Forgetting to classify DoV as network vs. stand-alone","忘了分類 DoV"],
              ["Network effects without explaining mechanism","只說有 NE 卻不講機制"],
              ["Peloton as feature list instead of coherent system","Peloton 寫成功能清單"],
              ["'We use AI' without addressing replication","只說用 AI 沒談防禦"],
              ["Case opinions without framework logic","意見不綁回框架"],
            ].map(([e,z],i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: i < 6 ? "1px solid " + K.borderLight : "none" }}>
                <span style={{ color: "#C04040", flexShrink: 0, fontWeight: 700 }}>{"\u2717"}</span>
                <div><div style={{ fontSize: 13, color: K.dark }}>{e}</div><div style={{ fontSize: 10.5, color: K.textDim }}>{z}</div></div>
              </div>
            ))}
          </Card>
          <p style={{ ...p, fontWeight: 700, color: K.green, marginTop: 24 }}>Final Cram Priority / 最後衝刺順序</p>
          <Card>
            {[
              ["3 conditions (creation, delivery, capture)","三個條件"],
              ["Digitization = cost reduction","數位化 = 成本下降"],
              ["Perceived Benefits = Product + Network","核心公式"],
              ["UxU -> DoV -> sides -> stand-alone vs. network","分析起手式"],
              ["Network effects are designed, not inherent","NE 是設計出來的"],
              ["Value curve purpose + 4 reposition moves","價值曲線 + 四種 reposition"],
              ["Platform: each side / cross-side tradeoffs / scale","平臺定位區別"],
              ["OM = min sufficient + signature practices + complementarity","營運模式"],
              ["Position vs. resource + VRIDO","兩大優勢 + VRIDO"],
              ["Mode 1 vs. 2; API alone is not a moat","API 存取不等於護城河"],
              ["PLM = ailment loop / Amazon = scale / Peloton = coherent OPM / Coursera = protectable system","案例錨點"],
            ].map(([e,z],i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 10 ? "1px solid " + K.borderLight : "none" }}>
                <span style={{ background: K.greenLight, color: K.green, border: "1px solid " + K.greenBorder, borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{i + 1}</span>
                <div><div style={{ fontSize: 13, color: K.dark, fontWeight: 500 }}>{e}</div><div style={{ fontSize: 10.5, color: K.textDim }}>{z}</div></div>
              </div>
            ))}
          </Card>
        </div>
      </main>
    </div>
  );
}
