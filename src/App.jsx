import React, { useEffect, useMemo, useState } from "react";

const ICONS = {
  target: [
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20",
    "M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12",
    "M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
  ],
  zap: ["M13 2 3 14h8l-1 8 10-12h-8z"],
  layers: ["M12 3 2 8l10 5 10-5-10-5z", "M2 13l10 5 10-5", "M2 18l10 5 10-5"],
  grid: ["M3 3h8v8H3z", "M13 3h8v8h-8z", "M3 13h8v8H3z", "M13 13h8v8h-8z"],
  puzzle: ["M8 6a2 2 0 1 1 4 0v2h2a2 2 0 1 0 0 4h-2v2a2 2 0 1 1-4 0v-2H6a2 2 0 1 0 0-4h2z"],
  shield: ["M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6z"],
  book: ["M4 5a3 3 0 0 1 3-3h13v18H7a3 3 0 0 0-3 3z", "M4 5v16a3 3 0 0 1 3-3h13"],
  award: ["M12 3l2.3 4.7 5.2.8-3.8 3.7.9 5.2L12 15l-4.6 2.4.9-5.2L4.5 8.5l5.2-.8z", "M8 15l-1 6 5-2 5 2-1-6"],
  alert: ["M12 3 2 20h20L12 3z", "M12 9v4", "M12 17h.01"],
  star: ["M12 3l2.8 5.8 6.4.9-4.6 4.4 1.1 6.3L12 17l-5.7 3 1.1-6.3L2.8 9.7l6.4-.9z"],
  eye: ["M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  chevron: ["M9 6l6 6-6 6"],
  menu: ["M3 6h18", "M3 12h18", "M3 18h18"],
  x: ["M6 6l12 12", "M18 6 6 18"],
  search: ["M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z", "M21 21l-4.3-4.3"],
  brain: [
    "M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0 1 5 3 3 0 0 0 2 5h1",
    "M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1-1 5 3 3 0 0 1-2 5h-1",
    "M12 4v16",
  ],
  route: ["M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M7 17c4 0 4-10 10-10"],
  bar: ["M5 20V10", "M12 20V4", "M19 20v-7"],
  stack: ["M4 7h16", "M4 12h16", "M4 17h16"],
  lock: ["M7 11V8a5 5 0 0 1 10 0v3", "M5 11h14v10H5z"],
  spark: ["M12 2v4", "M12 18v4", "M4.9 4.9l2.8 2.8", "M16.3 16.3l2.8 2.8", "M2 12h4", "M18 12h4", "M4.9 19.1l2.8-2.8", "M16.3 7.7l2.8-2.8"],
  compass: ["M12 3l6 6-4 8-8 4 4-8z", "M12 12l6-3"],
  check: ["M5 13l4 4L19 7"],
  lightbulb: ["M9 18h6", "M10 22h4", "M8 14a6 6 0 1 1 8 0c-.8 1.2-1.8 2.1-3 3H11c-1.2-.9-2.2-1.8-3-3z"],
  timer: ["M12 8v5l3 2", "M9 2h6", "M12 5a8 8 0 1 0 8 8 8 8 0 0 0-8-8z"],
  filter: ["M4 6h16", "M7 12h10", "M10 18h4"],
  refresh: ["M20 11a8 8 0 0 0-14-4", "M6 7H2V3", "M4 13a8 8 0 0 0 14 4", "M18 17h4v4"],
  columns: ["M4 5h6v14H4z", "M14 5h6v14h-6z"],
};

function Icon({ name, size = 18, color = "currentColor", stroke = 1.9, style }) {
  const paths = ICONS[name] || [];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

const T = {
  bg: "#F7F1E8",
  bgAlt: "#FBF7F0",
  paper: "#FFFDFC",
  paperSoft: "#FFF8F1",
  ink: "#2B2622",
  text: "#3C3632",
  muted: "#6F6760",
  faint: "#968E87",
  border: "#E8DDD1",
  borderSoft: "#EFE7DE",
  shadow: "0 8px 28px rgba(43,38,34,0.07)",
  shadowTight: "0 3px 12px rgba(43,38,34,0.05)",
  red: "#C8102E",
  redSoft: "rgba(200,16,46,0.08)",
  redLine: "rgba(200,16,46,0.22)",
  redGlow: "rgba(200,16,46,0.10)",
  blue: "#446B9E",
  blueSoft: "rgba(68,107,158,0.09)",
  blueLine: "rgba(68,107,158,0.22)",
  green: "#4F7A5C",
  greenSoft: "rgba(79,122,92,0.09)",
  greenLine: "rgba(79,122,92,0.22)",
  gold: "#B17D1A",
  goldSoft: "rgba(177,125,26,0.09)",
  goldLine: "rgba(177,125,26,0.22)",
  purple: "#7355A4",
  purpleSoft: "rgba(115,85,164,0.09)",
  purpleLine: "rgba(115,85,164,0.22)",
  slate: "#5A6778",
  slateSoft: "rgba(90,103,120,0.09)",
  orange: "#A86012",
  orangeSoft: "rgba(168,96,18,0.09)",
  orangeLine: "rgba(168,96,18,0.22)",
  sidebar: "#171819",
  sidebarText: "#C6C6C6",
  sidebarMuted: "#8D8D8D",
};

const NAV = [
  { id: "overview", label: "Overview", zh: "總覽", icon: "target" },
  { id: "digitization", label: "Digitization", zh: "數位化", icon: "zap" },
  { id: "creation", label: "Value Creation", zh: "價值創造", icon: "layers" },
  { id: "positioning", label: "Value Curves", zh: "價值曲線", icon: "grid" },
  { id: "delivery", label: "Operating Model", zh: "營運模式", icon: "puzzle" },
  { id: "capture", label: "Value Capture", zh: "價值擷取", icon: "shield" },
  { id: "cases", label: "Case Matrix", zh: "案例矩陣", icon: "columns" },
  { id: "drill", label: "Exam Mode", zh: "閉卷模式", icon: "timer" },
  { id: "traps", label: "Traps & Cram", zh: "陷阱與衝刺", icon: "alert" },
];

const QUESTIONS = [
  {
    en: "What are the three necessary conditions for a viable enterprise?",
    zh: "可行企業的三個必要條件是什麼？",
    answerEn:
      "Value creation, value delivery, and value capture. Module 1 treats them as one integrated business-model blueprint for all enterprises, including platforms.",
    answerZh:
      "Value creation、value delivery、value capture。Module 1 把三者視為一個整合的 business model blueprint，平臺也適用。",
    tags: ["overview", "framework"],
  },
  {
    en: "What does 'Strategy as Deliberate Coherence' mean?",
    zh: "『Strategy as Deliberate Coherence』是什麼意思？",
    answerEn:
      "Strategy is about fitting position, operating model, and sources of uniqueness into one coherent design. A list of good ideas is not enough.",
    answerZh:
      "Strategy 的重點是把 position、operating model、sources of uniqueness 整合成一個 coherent design。只有點子清單不夠。",
    tags: ["overview", "framework"],
  },
  {
    en: "Economically, how should you think about digitization?",
    zh: "從經濟學角度，應如何理解 digitization？",
    answerEn:
      "As a broad reduction in costs, especially communication, replication, monitoring, storage, processing, verification, experimentation, and transaction costs.",
    answerZh:
      "它是各類成本的廣泛下降，尤其包括 communication、replication、monitoring、storage、processing、verification、experimentation、transaction costs。",
    tags: ["digitization"],
  },
  {
    en: "What is the correct starting sequence for platform value-creation analysis?",
    zh: "平臺 value-creation 分析的正確起手式是什麼？",
    answerEn:
      "User, use case, dimensions of value, ecosystem or sides, then stand-alone versus network benefits.",
    answerZh:
      "User、use case、dimensions of value、ecosystem／sides，最後再區分 stand-alone 與 network benefits。",
    tags: ["creation"],
  },
  {
    en: "What is the difference between a DoV and a feature?",
    zh: "DoV 和 feature 的差別是什麼？",
    answerEn:
      "A DoV is a demand-side need or preference the user cares about. A feature is something the firm provides. The professor’s feedback explicitly warns against confusing them.",
    answerZh:
      "DoV 是使用者真正重視的需求面需要或偏好；feature 是企業提供的東西。教授在 feedback 中明確警告不能把兩者混為一談。",
    tags: ["creation", "traps"],
  },
  {
    en: "In platform analysis, what counts as a side?",
    zh: "在平臺分析中，什麼才算是一個 side？",
    answerEn:
      "A side is an external actor between whom value transactions occur through the platform. Internal employees, operations, or infrastructure are not sides.",
    answerZh:
      "Side 是透過平臺發生價值交易的外部參與者。內部員工、營運或基礎設施都不算。",
    tags: ["creation", "traps"],
  },
  {
    en: "What is the platform value-creation formula you should remember?",
    zh: "你應該記住的平臺價值創造公式是什麼？",
    answerEn: "Perceived Benefits = Direct 'Product' Benefits + Network Benefits.",
    answerZh: "Perceived Benefits = Direct 'Product' Benefits + Network Benefits。",
    tags: ["creation"],
  },
  {
    en: "Why is 'there are network effects' a weak answer?",
    zh: "為什麼只說『there are network effects』是弱答案？",
    answerEn:
      "Because network effects do not just exist. You must specify which interactions create value, for whom, through what mechanism, and under what conditions.",
    answerZh:
      "因為 network effects 不會自己存在。你必須說清楚哪種互動、為誰創造價值、透過什麼機制、以及在什麼條件下成立。",
    tags: ["creation", "network"],
  },
  {
    en: "What is the key PLM insight for value creation?",
    zh: "PLM 在 value creation 上最關鍵的洞察是什麼？",
    answerEn:
      "PLM’s primary value creation is a same-side user network effect: an emotional engine linked to a data and insights loop, mostly within a given ailment.",
    answerZh:
      "PLM 的 primary value creation 是 same-side user network effect，也就是 emotional engine 與 data／insights loop 的連動，而且主要發生在特定疾病社群內。",
    tags: ["cases", "creation"],
  },
  {
    en: "What does a value curve show?",
    zh: "Value curve 告訴你什麼？",
    answerEn:
      "It shows how a business model delivers value across relevant DoV relative to alternatives, revealing close competitors, differentiation, trade-offs, and where scale may matter.",
    answerZh:
      "它顯示某個 business model 相對於替代方案，在 relevant DoV 上提供多少價值，並揭示最接近的競爭者、差異化、取捨，以及 scale 可能在哪裡重要。",
    tags: ["positioning"],
  },
  {
    en: "What are the four ways to reposition a value curve?",
    zh: "重畫 value curve 的四種基本方式是什麼？",
    answerEn: "Increase a DoV, decrease a DoV, remove a DoV, and add a new DoV.",
    answerZh: "Increase a DoV、decrease a DoV、remove a DoV、add a new DoV。",
    tags: ["positioning"],
  },
  {
    en: "What is an operating model?",
    zh: "什麼是 operating model？",
    answerEn:
      "It is the inter-related system of chosen practices that makes the intended value proposition feasible. A strong answer should mention minimum sufficient features and functions, internal activities, signature practices, and complementarity.",
    answerZh:
      "它是一套讓 intended value proposition 可行的 inter-related system of chosen practices。高分答案應提到 minimum sufficient F&F、internal activities、signature practices、complementarity。",
    tags: ["delivery"],
  },
  {
    en: "Why is Peloton an operating-model case rather than just a product case?",
    zh: "為什麼 Peloton 是 operating-model case，而不只是 product case？",
    answerEn:
      "Because the analytical question is which user-facing features, internal activities, and signature practices together make its intended value curve economically feasible.",
    answerZh:
      "因為真正的分析問題是：哪些 user-facing features、internal activities、signature practices 組合在一起，才能讓它的 intended value curve 在經濟上可行。",
    tags: ["delivery", "cases"],
  },
  {
    en: "What are the two broad categories of competitive advantage?",
    zh: "競爭優勢的兩大類是什麼？",
    answerEn:
      "Position-based advantages and resource or capability advantages. Position-based sources include scale, incumbency, and agility. Resource-based advantage is pinned down with VRIDO.",
    answerZh:
      "Position-based advantages 與 resource／capability advantages。前者包含 scale、incumbency、agility；後者則用 VRIDO 來 pin down。",
    tags: ["capture"],
  },
  {
    en: "What is VRIDO?",
    zh: "VRIDO 是什麼？",
    answerEn:
      "The conditions for a strategic asset to support defensible uniqueness: Valuable, Rare, Inimitable, Durable, and Organization-specific.",
    answerZh:
      "它是 strategic asset 能否支撐 defensible uniqueness 的條件：Valuable、Rare、Inimitable、Durable、Organization-specific。",
    tags: ["capture"],
  },
  {
    en: "Why is API access to a third-party LLM not enough for competitive advantage?",
    zh: "為什麼存取第三方 LLM API 本身不足以形成競爭優勢？",
    answerEn:
      "Because access alone is replicable. The real question is whether the AI-enabled innovation is tied to protectable position or VRIDO-type assets inside a broader system.",
    answerZh:
      "因為 access 本身很容易被複製。真正的問題是，AI-enabled innovation 能否綁定在更大的系統內，並依附於可保護的 position 或 VRIDO 類資產。",
    tags: ["capture", "cases"],
  },
];

const CASE_CARDS = [
  {
    title: "PatientsLikeMe",
    zh: "PatientsLikeMe",
    session: "Creation",
    color: "blue",
    icon: "layers",
    anchor: "Ailment-specific emotional engine ↔ data/insights loop",
    files: "Patients, pharma, insurance, physicians; patient-side DoV include support, sharing, hope, advice, tracking, doctor communication, helping science.",
    case: "Over 90% of revenue came from pharma services, with outcome studies and marketing research making up the bulk.",
    inference: "General Platform expansion is risky if trust, sharing, and engagement are highly ailment-specific.",
  },
  {
    title: "Barnes & Noble vs. Amazon",
    zh: "Barnes & Noble vs. Amazon",
    session: "Positioning",
    color: "purple",
    icon: "grid",
    anchor: "Scale-sensitive value curves + incumbent self-cannibalization problem",
    files: "Slides compare curves on convenience, knowledge, selection, hours, lounge experience, and price. Strategic options are fortify, jump, or hybrid.",
    case: "The case documents the scale and profitability of the superstore model, which helps explain why decisive self-disruption was difficult.",
    inference: "The strongest answer is not yes or no. Platform defense gets hard when the incumbent’s profitable response is constrained by its own model economics.",
  },
  {
    title: "Peloton",
    zh: "Peloton",
    session: "Delivery",
    color: "green",
    icon: "puzzle",
    anchor: "Coherent operating model, not feature list",
    files: "Slides show the user-side value curve and the delivery tool: minimum sufficient F&F → internal activities → signature practices.",
    case: "The case shows premium hardware, in-person selling, logistics, subscription, and retention as linked parts of a larger system.",
    inference: "Peloton works only if those pieces reinforce one another and jointly make the intended value curve feasible.",
  },
  {
    title: "Coursera and GenAI",
    zh: "Coursera 與 GenAI",
    session: "Capture",
    color: "gold",
    icon: "shield",
    anchor: "API access alone is not a moat",
    files: "LLMs are framed as general-purpose technologies. Mode 1 = direct human interaction. Mode 2 = API-based machine integration.",
    case: "Coursera’s AI directions include Coach, Course Builder, translation, assessment, personalization, and enterprise upskilling.",
    inference: "Defensibility depends on whether AI is layered onto protectable position or VRIDO-type assets within a broader system.",
  },
];

const CASE_MATRIX_ROWS = [
  {
    dimension: "Module role",
    values: ["Value creation", "Positioning", "Value delivery", "Value capture"],
  },
  {
    dimension: "One-line anchor",
    values: CASE_CARDS.map((c) => c.anchor),
  },
  {
    dimension: "Most testable concept",
    values: [
      "Same-side network effects + stand-alone vs network value",
      "Value curves + scale-sensitive DoV + best response",
      "Minimum sufficient F&F + complementarity",
      "Position-based vs resource-based advantage + VRIDO",
    ],
  },
  {
    dimension: "Main danger in answering badly",
    values: [
      "Saying 'community' without mechanism",
      "Giving a simplistic yes/no without model economics",
      "Listing features instead of system logic",
      "Saying 'AI helps' without replication logic",
    ],
  },
  {
    dimension: "Best safe inference",
    values: CASE_CARDS.map((c) => c.inference),
  },
];

function colorPack(name) {
  switch (name) {
    case "blue":
      return { main: T.blue, soft: T.blueSoft, line: T.blueLine };
    case "green":
      return { main: T.green, soft: T.greenSoft, line: T.greenLine };
    case "gold":
      return { main: T.gold, soft: T.goldSoft, line: T.goldLine };
    case "purple":
      return { main: T.purple, soft: T.purpleSoft, line: T.purpleLine };
    case "orange":
      return { main: T.orange, soft: T.orangeSoft, line: T.orangeLine };
    default:
      return { main: T.red, soft: T.redSoft, line: T.redLine };
  }
}

function Chip({ children, tone = "red", style }) {
  const c = colorPack(tone);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        borderRadius: 999,
        border: `1px solid ${c.line}`,
        background: c.soft,
        color: c.main,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.2,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ icon, title, zh, chips = [] }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: T.redSoft,
            border: `1px solid ${T.redLine}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 6px ${T.redGlow}`,
          }}
        >
          <Icon name={icon} size={18} color={T.red} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.12, color: T.ink, letterSpacing: -0.35 }}>{title}</h2>
          <div style={{ marginTop: 4, fontSize: 13, color: T.muted }}>{zh}</div>
        </div>
      </div>
      {!!chips.length && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {chips.map((chip, idx) => (
            <Chip key={idx} tone={chip.tone}>{chip.label}</Chip>
          ))}
        </div>
      )}
    </div>
  );
}

function Panel({ children, style }) {
  return (
    <div
      style={{
        background: T.paper,
        border: `1px solid ${T.border}`,
        borderRadius: 20,
        boxShadow: T.shadow,
        padding: 20,
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Callout({ tone = "blue", icon = "lightbulb", title, compact = false, children }) {
  const c = colorPack(tone);
  return (
    <div
      style={{
        background: c.soft,
        border: `1px solid ${c.line}`,
        borderLeft: `4px solid ${c.main}`,
        borderRadius: 16,
        padding: compact ? 12 : 14,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, minWidth: 0 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 10,
            background: T.paper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon name={icon} size={15} color={c.main} />
        </div>
        <div style={{ fontWeight: 800, fontSize: 13.2, color: c.main, minWidth: 0, overflowWrap: "anywhere" }}>{title}</div>
      </div>
      <div style={{ fontSize: compact ? 13.1 : 13.6, lineHeight: 1.7, color: T.text, overflowWrap: "anywhere" }}>{children}</div>
    </div>
  );
}

function Metric({ label, value, caption, tone = "red" }) {
  const c = colorPack(tone);
  return (
    <div
      style={{
        background: c.soft,
        border: `1px solid ${c.line}`,
        borderRadius: 16,
        padding: 14,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 10.5, color: c.main, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8, overflowWrap: "anywhere" }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 18, fontWeight: 900, color: T.ink, letterSpacing: -0.25, overflowWrap: "anywhere" }}>{value}</div>
      <div style={{ marginTop: 5, fontSize: 12.2, lineHeight: 1.55, color: T.muted, overflowWrap: "anywhere" }}>{caption}</div>
    </div>
  );
}

function CompactStat({ icon, label, value, tone = "blue" }) {
  const c = colorPack(tone);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: c.soft, border: `1px solid ${c.line}`, display: "grid", placeItems: "center", flexShrink: 0 }}>
        <Icon name={icon} size={15} color={c.main} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: c.main, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
        <div style={{ fontSize: 13.4, lineHeight: 1.45, color: T.ink, fontWeight: 700, overflowWrap: "anywhere" }}>{value}</div>
      </div>
    </div>
  );
}

function KV({ left, right }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 190px) minmax(0, 1fr)",
        gap: 12,
        alignItems: "start",
        padding: "10px 0",
        borderBottom: `1px solid ${T.borderSoft}`,
      }}
    >
      <div style={{ fontSize: 12.3, fontWeight: 800, color: T.ink, overflowWrap: "anywhere" }}>{left}</div>
      <div style={{ fontSize: 13.1, lineHeight: 1.68, color: T.text, overflowWrap: "anywhere" }}>{right}</div>
    </div>
  );
}

function Accordion({ title, subtitle, children, defaultOpen = false, tone = "red", forceOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const c = colorPack(tone);
  const isOpen = forceOpen || open;
  return (
    <div
      style={{
        border: `1px solid ${isOpen ? c.line : T.border}`,
        borderRadius: 16,
        background: isOpen ? c.soft : T.paper,
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <button
        onClick={() => !forceOpen && setOpen((v) => !v)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          border: "none",
          background: "transparent",
          cursor: forceOpen ? "default" : "pointer",
          color: T.ink,
          minWidth: 0,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 13.8, overflowWrap: "anywhere" }}>{title}</div>
          {subtitle ? <div style={{ marginTop: 3, fontSize: 11.8, color: T.muted, overflowWrap: "anywhere" }}>{subtitle}</div> : null}
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 10,
            background: T.paper,
            border: `1px solid ${c.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.18s ease",
            flexShrink: 0,
          }}
        >
          <Icon name="chevron" size={14} color={c.main} />
        </div>
      </button>
      {isOpen ? <div style={{ padding: "0 16px 16px 16px", minWidth: 0 }}>{children}</div> : null}
    </div>
  );
}

function EvidenceLegend() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Chip tone="blue">FILE = notes / slides</Chip>
      <Chip tone="green">CASE = assigned case PDFs</Chip>
      <Chip tone="gold">INFERENCE = reasoned conclusion</Chip>
    </div>
  );
}

function ThreeConditionsFigure() {
  return (
    <svg viewBox="0 0 540 320" style={{ width: "100%", display: "block" }}>
      <defs>
        <linearGradient id="gradPaper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFDFB" />
          <stop offset="100%" stopColor="#FFF6EC" />
        </linearGradient>
      </defs>
      <rect x="20" y="18" rx="26" ry="26" width="500" height="284" fill="url(#gradPaper)" stroke={T.border} />
      <line x1="270" y1="78" x2="126" y2="238" stroke={T.redLine} strokeWidth="2" />
      <line x1="270" y1="78" x2="414" y2="238" stroke={T.redLine} strokeWidth="2" />
      <line x1="126" y1="238" x2="414" y2="238" stroke={T.redLine} strokeWidth="2" />
      <circle cx="270" cy="78" r="46" fill={T.redSoft} stroke={T.red} />
      <circle cx="126" cy="238" r="46" fill={T.greenSoft} stroke={T.green} />
      <circle cx="414" cy="238" r="46" fill={T.goldSoft} stroke={T.gold} />
      <text x="270" y="70" textAnchor="middle" fill={T.red} fontSize="13" fontWeight="800">VALUE</text>
      <text x="270" y="88" textAnchor="middle" fill={T.red} fontSize="13" fontWeight="800">CREATION</text>
      <text x="126" y="230" textAnchor="middle" fill={T.green} fontSize="13" fontWeight="800">VALUE</text>
      <text x="126" y="248" textAnchor="middle" fill={T.green} fontSize="13" fontWeight="800">DELIVERY</text>
      <text x="414" y="230" textAnchor="middle" fill={T.gold} fontSize="13" fontWeight="800">VALUE</text>
      <text x="414" y="248" textAnchor="middle" fill={T.gold} fontSize="13" fontWeight="800">CAPTURE</text>
      <rect x="170" y="140" width="200" height="40" rx="12" fill={T.paper} stroke={T.border} />
      <text x="270" y="165" textAnchor="middle" fill={T.ink} fontSize="12" fontWeight="800">STRATEGY AS DELIBERATE COHERENCE</text>
      <text x="198" y="124" textAnchor="middle" fill={T.muted} fontSize="11">Position</text>
      <text x="342" y="124" textAnchor="middle" fill={T.muted} fontSize="11">Uniqueness</text>
      <text x="270" y="292" textAnchor="middle" fill={T.muted} fontSize="11">Operating model</text>
    </svg>
  );
}

function DigitizationFigure() {
  const items = [
    ["Communication", "傳輸與溝通"],
    ["Replication", "複製"],
    ["Monitoring", "追蹤監控"],
    ["Storage", "儲存"],
    ["Processing", "資訊處理"],
    ["Verification", "驗證"],
    ["Experimentation", "開發實驗"],
    ["Transaction", "交易成本"],
  ];
  return (
    <div className="gridFigure">
      {items.map(([en, zh]) => (
        <div key={en} className="miniCell">
          <div className="miniArrow">↓</div>
          <div style={{ minWidth: 0 }}>
            <div className="miniTitle">{en}</div>
            <div className="miniSub">{zh}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreationFigure() {
  const steps = [
    ["User", "誰"],
    ["Use Case", "情境"],
    ["DoV", "價值維度"],
    ["Sides", "平臺各邊"],
    ["Benefits", "Stand-alone vs Network"],
  ];
  return (
    <div className="flowRow">
      {steps.map((step, idx) => (
        <React.Fragment key={step[0]}>
          <div className="flowBox">
            <div className="flowTitle">{step[0]}</div>
            <div className="flowSub">{step[1]}</div>
          </div>
          {idx < steps.length - 1 ? <div className="flowArrow">→</div> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function NetworkFigure() {
  return (
    <div className="networkWrap">
      <div className="networkTop">
        <div className="networkCard networkBlue">
          <div className="networkHead">Same-side / Direct</div>
          <div className="networkBody">Interactions within the same side improve value for that same side.</div>
          <div className="networkFoot">同邊內部互動提升該邊價值</div>
        </div>
        <div className="networkCard networkPurple">
          <div className="networkHead">Cross-side / Indirect</div>
          <div className="networkBody">Participation on one side raises value on another side.</div>
          <div className="networkFoot">某一邊的參與提升另一邊價值</div>
        </div>
      </div>
      <div className="networkBottom">
        <div className="badgeCell badgeGreen">Positive</div>
        <div className="badgeCell badgeRed">Negative</div>
        <div className="badgeCell badgeGold">Strong</div>
        <div className="badgeCell badgeOrange">Weak</div>
      </div>
      <div className="networkWarning">
        <div className="networkWarningTitle">Network effects are designed, not inherent.</div>
        <div className="networkWarningSub">必須說明哪種互動、為誰、透過什麼機制、以及在什麼條件下成立。</div>
      </div>
    </div>
  );
}

function PLMLoopFigure() {
  return (
    <svg viewBox="0 0 520 250" style={{ width: "100%", display: "block" }}>
      <rect x="15" y="18" width="490" height="214" rx="22" fill={T.paper} stroke={T.border} />
      <rect x="50" y="70" width="160" height="84" rx="18" fill={T.blueSoft} stroke={T.blueLine} />
      <text x="130" y="101" textAnchor="middle" fill={T.blue} fontWeight="800" fontSize="13">Emotional Engine</text>
      <text x="130" y="123" textAnchor="middle" fill={T.text} fontSize="11">support · sharing · peers · hope</text>
      <text x="130" y="141" textAnchor="middle" fill={T.muted} fontSize="10">患者彼此支持與互相學習</text>
      <rect x="310" y="70" width="160" height="84" rx="18" fill={T.purpleSoft} stroke={T.purpleLine} />
      <text x="390" y="101" textAnchor="middle" fill={T.purple} fontWeight="800" fontSize="13">Data / Insights Loop</text>
      <text x="390" y="123" textAnchor="middle" fill={T.text} fontSize="11">tracking · journaling · patterns</text>
      <text x="390" y="141" textAnchor="middle" fill={T.muted} fontSize="10">非典型且豐富的病患資料</text>
      <path d="M210 94c34-26 66-26 100 0" fill="none" stroke={T.red} strokeWidth="2.2" markerEnd="url(#arrowEnd2)" />
      <path d="M310 131c-34 26-66 26-100 0" fill="none" stroke={T.red} strokeWidth="2.2" markerEnd="url(#arrowEnd2)" />
      <rect x="120" y="179" width="280" height="30" rx="15" fill={T.greenSoft} stroke={T.greenLine} />
      <text x="260" y="198" textAnchor="middle" fill={T.green} fontWeight="700" fontSize="11.5">Mostly operates within a given ailment</text>
      <defs>
        <marker id="arrowEnd2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={T.red} />
        </marker>
      </defs>
    </svg>
  );
}

function ValueCurveFigure() {
  return (
    <svg viewBox="0 0 540 290" style={{ width: "100%", display: "block" }}>
      <rect x="15" y="18" width="510" height="252" rx="22" fill={T.paper} stroke={T.border} />
      <line x1="70" y1="220" x2="490" y2="220" stroke={T.border} strokeWidth="2" />
      <line x1="70" y1="55" x2="70" y2="220" stroke={T.border} strokeWidth="2" />
      {['Price','Convenience','Selection','Hours','Lounge','Reviews'].map((label, i) => (
        <g key={label}>
          <line x1={110 + i * 65} y1="215" x2={110 + i * 65} y2="225" stroke={T.faint} />
          <text x={110 + i * 65} y={242} textAnchor="middle" fill={T.muted} fontSize="10">{label}</text>
        </g>
      ))}
      <path d="M110 145 L175 105 L240 85 L305 80 L370 130 L435 62" fill="none" stroke={T.red} strokeWidth="3" strokeLinecap="round" />
      <path d="M110 115 L175 150 L240 122 L305 130 L370 70 L435 168" fill="none" stroke={T.blue} strokeWidth="3" strokeLinecap="round" />
      <text x="420" y="55" fill={T.red} fontSize="11" fontWeight="700">Amazon / new curve</text>
      <text x="372" y="68" fill={T.blue} fontSize="11" fontWeight="700">Incumbent / old curve</text>
      <rect x="84" y="22" width="372" height="24" rx="12" fill={T.goldSoft} stroke={T.goldLine} />
      <text x="270" y="38" textAnchor="middle" fill={T.gold} fontSize="11" fontWeight="700">Trade-offs, differentiation, close competitors, scale sensitivity</text>
    </svg>
  );
}

function OperatingModelFigure() {
  return (
    <div className="stackFigure">
      <div className="stackLayer stackBlue">
        <div className="stackTitle">1. Minimum Sufficient Interface F&F</div>
        <div className="stackText">Bare minimum features and functions needed to deliver the intended value curve.</div>
      </div>
      <div className="stackArrow">↓</div>
      <div className="stackLayer stackPurple">
        <div className="stackTitle">2. Internal Activities</div>
        <div className="stackText">Marketing, tech, logistics, sales, data science, content, research, support.</div>
      </div>
      <div className="stackArrow">↓</div>
      <div className="stackLayer stackGreen">
        <div className="stackTitle">3. Signature Practices</div>
        <div className="stackText">The few choices that materially drive willingness-to-pay, benefits, and costs.</div>
      </div>
      <div className="stackFooter">Complementarity = value with the rest of the system is greater than value on its own.</div>
    </div>
  );
}

function AdvantageFigure() {
  return (
    <svg viewBox="0 0 560 300" style={{ width: "100%", display: "block" }}>
      <rect x="16" y="16" width="528" height="268" rx="24" fill={T.paper} stroke={T.border} />
      <rect x="200" y="26" width="160" height="38" rx="14" fill={T.redSoft} stroke={T.redLine} />
      <text x="280" y="50" textAnchor="middle" fill={T.red} fontWeight="800" fontSize="13">Why won’t you be copied?</text>
      <line x1="280" y1="64" x2="280" y2="95" stroke={T.redLine} strokeWidth="2" />
      <line x1="140" y1="95" x2="420" y2="95" stroke={T.redLine} strokeWidth="2" />
      <line x1="140" y1="95" x2="140" y2="122" stroke={T.redLine} strokeWidth="2" />
      <line x1="420" y1="95" x2="420" y2="122" stroke={T.redLine} strokeWidth="2" />
      <rect x="60" y="122" width="160" height="54" rx="16" fill={T.blueSoft} stroke={T.blueLine} />
      <text x="140" y="146" textAnchor="middle" fill={T.blue} fontWeight="800" fontSize="13">Position-Based</text>
      <text x="140" y="166" textAnchor="middle" fill={T.muted} fontSize="11">Scale · Incumbency · Agility</text>
      <rect x="340" y="122" width="160" height="54" rx="16" fill={T.purpleSoft} stroke={T.purpleLine} />
      <text x="420" y="146" textAnchor="middle" fill={T.purple} fontWeight="800" fontSize="13">Resource-Based</text>
      <text x="420" y="166" textAnchor="middle" fill={T.muted} fontSize="11">Assets · Capabilities · IP</text>
      {[
        ["V", "Valuable", T.red, 54],
        ["R", "Rare", T.purple, 154],
        ["I", "Inimitable", T.gold, 254],
        ["D", "Durable", T.green, 354],
        ["O", "Org-specific", T.slate, 454],
      ].map(([abbr, label, color, x]) => (
        <g key={abbr}>
          <rect x={x} y="215" width="54" height="46" rx="12" fill="white" stroke={color} />
          <text x={x + 27} y="236" textAnchor="middle" fill={color} fontWeight="900" fontSize="18">{abbr}</text>
          <text x={x + 27} y="252" textAnchor="middle" fill={T.muted} fontSize="9.5">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function MatrixTable() {
  return (
    <div className="matrixShell">
      <table className="matrixTable">
        <thead>
          <tr>
            <th>Dimension</th>
            {CASE_CARDS.map((c) => (
              <th key={c.title}>{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CASE_MATRIX_ROWS.map((row) => (
            <tr key={row.dimension}>
              <td>{row.dimension}</td>
              {row.values.map((v, i) => (
                <td key={i}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MiniCaseTable() {
  return (
    <div className="miniTableWrap">
      <table className="miniTable">
        <thead>
          <tr>
            <th>Case</th>
            <th>[FILE] Direct course anchor</th>
            <th>[CASE] Useful factual ammo</th>
            <th>[INFERENCE] Safest exam conclusion</th>
          </tr>
        </thead>
        <tbody>
          {CASE_CARDS.map((c) => (
            <tr key={c.title}>
              <td>{c.title}</td>
              <td>{c.files}</td>
              <td>{c.case}</td>
              <td>{c.inference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClosedBookExam({ langMode, query }) {
  const baseQuestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QUESTIONS;
    return QUESTIONS.filter((item) =>
      [item.en, item.zh, item.answerEn, item.answerZh, ...(item.tags || [])].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const [seed, setSeed] = useState(0);
  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState({});
  const [typed, setTyped] = useState("");

  const shuffled = useMemo(() => {
    const arr = [...baseQuestions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * 7 + seed * 11 + 3) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [baseQuestions, seed]);

  useEffect(() => {
    setIdx(0);
    setShowAnswer(false);
    setTyped("");
  }, [seed, query]);

  const current = shuffled[idx];
  const total = shuffled.length;
  const scoreCounts = useMemo(() => {
    const vals = Object.values(scores);
    return {
      known: vals.filter((v) => v === "known").length,
      partial: vals.filter((v) => v === "partial").length,
      miss: vals.filter((v) => v === "miss").length,
    };
  }, [scores]);

  const record = (value) => {
    if (!current) return;
    setScores((prev) => ({ ...prev, [current.en]: value }));
    if (idx < total - 1) {
      setIdx((v) => v + 1);
      setShowAnswer(false);
      setTyped("");
    }
  };

  if (!current) {
    return (
      <Panel>
        <div style={{ fontSize: 14, color: T.text }}>No questions match the current search.</div>
      </Panel>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Panel>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Chip tone="red">{`Question ${idx + 1} / ${total}`}</Chip>
            <Chip tone="green">Known {scoreCounts.known}</Chip>
            <Chip tone="gold">Partial {scoreCounts.partial}</Chip>
            <Chip tone="purple">Miss {scoreCounts.miss}</Chip>
          </div>
          <button className="actionBtn" onClick={() => setSeed((v) => v + 1)}>
            <Icon name="refresh" size={15} color={T.red} />
            Shuffle
          </button>
        </div>
        <div style={{ marginTop: 14 }}>
          <div className="examProgress">
            <div className="examProgressFill" style={{ width: `${((idx + 1) / total) * 100}%` }} />
          </div>
        </div>
      </Panel>

      <Panel>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div className="qNum">Q{idx + 1}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            {(langMode === "dual" || langMode === "en") && (
              <div style={{ fontSize: 18, lineHeight: 1.5, color: T.ink, fontWeight: 800, overflowWrap: "anywhere" }}>{current.en}</div>
            )}
            {(langMode === "dual" || langMode === "zh") && (
              <div style={{ marginTop: langMode === "dual" ? 8 : 0, fontSize: 15, lineHeight: 1.65, color: T.muted, overflowWrap: "anywhere" }}>{current.zh}</div>
            )}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {current.tags.map((tag) => (
                <Chip key={tag} tone="blue" style={{ fontSize: 10 }}>{tag}</Chip>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 16 }} />
        <div style={{ fontSize: 11.5, fontWeight: 800, color: T.muted, textTransform: "uppercase", letterSpacing: 0.8 }}>Closed-book scratchpad</div>
        <textarea
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Type your answer from memory before revealing..."
          className="scratchpad"
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <button className="actionBtn" onClick={() => setShowAnswer((v) => !v)}>
            <Icon name={showAnswer ? "x" : "eye"} size={15} color={T.red} />
            {showAnswer ? "Hide Answer" : "Reveal Answer"}
          </button>
          <button className="actionBtn" onClick={() => idx < total - 1 && (setIdx((v) => v + 1), setShowAnswer(false), setTyped(""))}>
            <Icon name="chevron" size={15} color={T.red} />
            Skip
          </button>
        </div>

        {showAnswer ? (
          <div className="answerBox" style={{ marginTop: 16 }}>
            {(langMode === "dual" || langMode === "en") && <div className="answerEn">{current.answerEn}</div>}
            {(langMode === "dual" || langMode === "zh") && <div className="answerZh">{current.answerZh}</div>}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
              <button className="scoreBtn scoreKnown" onClick={() => record("known")}>I knew it</button>
              <button className="scoreBtn scorePartial" onClick={() => record("partial")}>Partial</button>
              <button className="scoreBtn scoreMiss" onClick={() => record("miss")}>Missed</button>
            </div>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langMode, setLangMode] = useState("dual");
  const [studyMode, setStudyMode] = useState("deep");
  const [query, setQuery] = useState("");
  const forceOpen = studyMode === "deep";

  const filteredQuestionCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QUESTIONS.length;
    return QUESTIONS.filter((item) =>
      [item.en, item.zh, item.answerEn, item.answerZh, ...(item.tags || [])].join(" ").toLowerCase().includes(q)
    ).length;
  }, [query]);

  useEffect(() => {
    const nodes = NAV.map((n) => document.getElementById(`section-${n.id}`)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("section-", ""));
          }
        });
      },
      { rootMargin: "-16% 0px -68% 0px", threshold: 0.01 }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const jump = (id) => {
    setDrawerOpen(false);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showDeepOnly = studyMode !== "overview";

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif` }}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; }
        body { background: ${T.bg}; }
        button, input, textarea { font: inherit; }
        textarea { resize: vertical; }
        .appShell { display: grid; grid-template-columns: 270px minmax(0, 1fr); min-height: 100vh; }
        .sidebar {
          position: sticky; top: 0; height: 100vh; overflow: auto;
          background: linear-gradient(180deg, #131416 0%, #1A1B1D 100%);
          color: ${T.sidebarText}; border-right: 1px solid rgba(255,255,255,0.06);
        }
        .sidebarInner { padding: 20px 16px 26px; }
        .brandBar {
          padding: 16px; border-radius: 18px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06); box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .navBtn {
          width: 100%; border: none; background: transparent; color: inherit; cursor: pointer;
          border-radius: 14px; padding: 9px 10px; display: flex; align-items: center; gap: 10px;
          text-align: left; transition: background 0.16s ease, color 0.16s ease, transform 0.16s ease;
          min-width: 0;
        }
        .navBtn:hover { background: rgba(255,255,255,0.06); }
        .navBtn.active { background: rgba(200,16,46,0.17); color: white; box-shadow: inset 0 0 0 1px rgba(200,16,46,0.25); }
        .navBtn.active .navSmall { color: rgba(255,255,255,0.75); }
        .navSmall { font-size: 10.5px; color: ${T.sidebarMuted}; margin-top: 2px; }
        .mainWrap { min-width: 0; }
        .hero {
          padding: 26px 30px 18px; border-bottom: 1px solid ${T.border};
          background: radial-gradient(circle at top right, rgba(200,16,46,0.08), transparent 30%), linear-gradient(180deg, ${T.bgAlt} 0%, ${T.bg} 100%);
        }
        .heroShell { max-width: 1180px; margin: 0 auto; }
        .heroTop { display: flex; gap: 18px; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; }
        .heroTitle { margin: 0; font-size: clamp(28px, 4vw, 40px); line-height: 1.04; color: ${T.ink}; letter-spacing: -0.8px; overflow-wrap: anywhere; }
        .heroSub { margin-top: 10px; font-size: 14px; line-height: 1.72; color: ${T.muted}; max-width: 780px; overflow-wrap: anywhere; }
        .toolbar { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 10px; margin-top: 16px; }
        .searchBox {
          display: flex; align-items: center; gap: 10px; background: ${T.paper}; border: 1px solid ${T.border};
          border-radius: 14px; padding: 11px 12px; box-shadow: ${T.shadowTight}; min-width: 0;
        }
        .searchInput { width: 100%; border: none; outline: none; background: transparent; color: ${T.ink}; font-size: 13.5px; min-width: 0; }
        .segWrap { display: inline-flex; align-items: center; gap: 6px; background: ${T.paper}; border: 1px solid ${T.border}; border-radius: 14px; padding: 5px; box-shadow: ${T.shadowTight}; }
        .segBtn { border: none; background: transparent; color: ${T.muted}; cursor: pointer; padding: 8px 11px; border-radius: 10px; font-weight: 700; font-size: 12px; white-space: nowrap; }
        .segBtn.active { background: ${T.redSoft}; color: ${T.red}; box-shadow: inset 0 0 0 1px ${T.redLine}; }
        .content { max-width: 1180px; margin: 0 auto; padding: 22px 30px 78px; min-width: 0; }
        .contentGrid { display: grid; gap: 20px; min-width: 0; }
        .overviewGrid { display: grid; grid-template-columns: 1.2fr .95fr; gap: 20px; min-width: 0; }
        .metricGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; min-width: 0; }
        .section { scroll-margin-top: 18px; min-width: 0; }
        .sectionStack { display: grid; gap: 16px; min-width: 0; }
        .gridFigure { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; min-width: 0; }
        .miniCell { display: flex; gap: 10px; align-items: center; padding: 11px; border-radius: 14px; background: ${T.blueSoft}; border: 1px solid ${T.blueLine}; min-width: 0; }
        .miniArrow { width: 26px; height: 26px; border-radius: 9px; background: ${T.paper}; color: ${T.blue}; display: grid; place-items: center; font-weight: 900; flex-shrink: 0; }
        .miniTitle { font-weight: 800; font-size: 12.4px; color: ${T.ink}; overflow-wrap: anywhere; }
        .miniSub { margin-top: 2px; font-size: 10.5px; color: ${T.muted}; overflow-wrap: anywhere; }
        .flowRow { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; justify-content: center; min-width: 0; }
        .flowBox { min-width: 120px; text-align: center; padding: 14px 12px; border-radius: 16px; background: ${T.paper}; border: 1px solid ${T.border}; box-shadow: ${T.shadowTight}; }
        .flowTitle { font-weight: 800; font-size: 13px; color: ${T.ink}; overflow-wrap: anywhere; }
        .flowSub { margin-top: 4px; font-size: 11px; color: ${T.muted}; overflow-wrap: anywhere; }
        .flowArrow { color: ${T.red}; font-weight: 900; font-size: 18px; }
        .networkWrap { display: grid; gap: 10px; min-width: 0; }
        .networkTop { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; min-width: 0; }
        .networkCard { padding: 14px; border-radius: 16px; background: ${T.paper}; border: 1px solid ${T.border}; box-shadow: ${T.shadowTight}; min-width: 0; }
        .networkBlue { background: ${T.blueSoft}; border-color: ${T.blueLine}; }
        .networkPurple { background: ${T.purpleSoft}; border-color: ${T.purpleLine}; }
        .networkHead { font-weight: 900; font-size: 13px; margin-bottom: 7px; color: ${T.ink}; overflow-wrap: anywhere; }
        .networkBody { font-size: 12.8px; line-height: 1.62; color: ${T.text}; overflow-wrap: anywhere; }
        .networkFoot { margin-top: 7px; font-size: 10.8px; color: ${T.muted}; overflow-wrap: anywhere; }
        .networkBottom { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; min-width: 0; }
        .badgeCell { padding: 13px 11px; border-radius: 14px; text-align: center; font-weight: 800; font-size: 12.2px; background: ${T.paper}; border: 1px solid ${T.border}; min-width: 0; overflow-wrap: anywhere; }
        .badgeGreen { color: ${T.green}; background: ${T.greenSoft}; border-color: ${T.greenLine}; }
        .badgeRed { color: ${T.red}; background: ${T.redSoft}; border-color: ${T.redLine}; }
        .badgeGold { color: ${T.gold}; background: ${T.goldSoft}; border-color: ${T.goldLine}; }
        .badgeOrange { color: ${T.orange}; background: ${T.orangeSoft}; border-color: ${T.orangeLine}; }
        .networkWarning { padding: 13px 14px; border-radius: 16px; background: rgba(200,16,46,0.06); border: 1px solid rgba(200,16,46,0.18); min-width: 0; }
        .networkWarningTitle { color: ${T.red}; font-weight: 900; font-size: 13px; overflow-wrap: anywhere; }
        .networkWarningSub { margin-top: 5px; color: ${T.text}; font-size: 12px; line-height: 1.6; overflow-wrap: anywhere; }
        .stackFigure { display: grid; gap: 10px; min-width: 0; }
        .stackLayer { padding: 14px; border-radius: 16px; border: 1px solid ${T.border}; box-shadow: ${T.shadowTight}; min-width: 0; }
        .stackBlue { background: ${T.blueSoft}; border-color: ${T.blueLine}; }
        .stackPurple { background: ${T.purpleSoft}; border-color: ${T.purpleLine}; }
        .stackGreen { background: ${T.greenSoft}; border-color: ${T.greenLine}; }
        .stackTitle { font-weight: 900; font-size: 13px; color: ${T.ink}; overflow-wrap: anywhere; }
        .stackText { margin-top: 5px; font-size: 12.6px; line-height: 1.62; color: ${T.text}; overflow-wrap: anywhere; }
        .stackArrow { text-align: center; color: ${T.red}; font-weight: 900; font-size: 20px; }
        .stackFooter { padding: 12px 14px; border-radius: 14px; background: ${T.paper}; border: 1px dashed ${T.greenLine}; font-size: 12px; color: ${T.text}; line-height: 1.58; overflow-wrap: anywhere; }
        .factRow { display: flex; gap: 10px; align-items: flex-start; min-width: 0; }
        .factDot { width: 8px; height: 8px; border-radius: 999px; margin-top: 8px; flex-shrink: 0; }
        .qaList { display: grid; gap: 12px; min-width: 0; }
        .qaCard { background: ${T.paper}; border: 1px solid ${T.border}; border-radius: 18px; box-shadow: ${T.shadowTight}; padding: 16px; min-width: 0; }
        .qNum { width: 36px; height: 36px; border-radius: 12px; background: ${T.redSoft}; color: ${T.red}; display: grid; place-items: center; font-weight: 900; font-size: 12px; flex-shrink: 0; border: 1px solid ${T.redLine}; }
        .actionBtn { border: 1px solid ${T.redLine}; background: ${T.paper}; color: ${T.red}; border-radius: 12px; cursor: pointer; padding: 9px 12px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 12.2px; white-space: nowrap; }
        .answerBox { padding: 13px 14px; border-radius: 14px; background: ${T.greenSoft}; border: 1px solid ${T.greenLine}; min-width: 0; }
        .answerEn { font-size: 13.2px; line-height: 1.68; color: ${T.ink}; overflow-wrap: anywhere; }
        .answerZh { font-size: 12.3px; line-height: 1.7; color: ${T.muted}; margin-top: 8px; overflow-wrap: anywhere; }
        .trapGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; min-width: 0; }
        .trapItem { display: flex; gap: 10px; align-items: flex-start; padding: 13px; background: ${T.paper}; border: 1px solid ${T.border}; border-radius: 16px; min-width: 0; }
        .drawerBtn { position: fixed; right: 12px; top: 12px; z-index: 50; width: 44px; height: 44px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: ${T.sidebar}; display: none; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 26px rgba(0,0,0,0.25); }
        .drawerScrim { position: fixed; inset: 0; background: rgba(0,0,0,0.42); z-index: 41; }
        .drawerPanel { position: fixed; inset: 0 auto 0 0; width: 292px; max-width: 86vw; background: ${T.sidebar}; z-index: 42; transform: translateX(0); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
        .stickyTools { position: sticky; bottom: 10px; z-index: 2; display: none; margin-top: 16px; }
        .mobilePill { display: none; width: 100%; gap: 10px; align-items: center; justify-content: center; padding: 12px 14px; border-radius: 16px; background: ${T.paper}; border: 1px solid ${T.border}; box-shadow: ${T.shadowTight}; color: ${T.red}; font-weight: 800; }
        .footerSpace { height: 10px; }
        .matrixShell, .miniTableWrap { overflow-x: auto; border-radius: 16px; border: 1px solid ${T.border}; background: ${T.paper}; }
        .matrixTable, .miniTable { width: 100%; border-collapse: collapse; min-width: 760px; }
        .matrixTable th, .matrixTable td, .miniTable th, .miniTable td { padding: 12px 13px; border-bottom: 1px solid ${T.borderSoft}; vertical-align: top; text-align: left; font-size: 12.8px; line-height: 1.64; color: ${T.text}; }
        .matrixTable thead th, .miniTable thead th { position: sticky; top: 0; background: ${T.paperSoft}; z-index: 1; color: ${T.ink}; font-weight: 900; }
        .matrixTable tbody td:first-child, .miniTable tbody td:first-child { font-weight: 800; color: ${T.ink}; background: ${T.paperSoft}; }
        .scratchpad {
          width: 100%; min-height: 120px; padding: 12px 13px; border-radius: 14px; border: 1px solid ${T.border}; background: ${T.paperSoft};
          color: ${T.ink}; line-height: 1.65; outline: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }
        .scratchpad:focus { border-color: ${T.redLine}; box-shadow: 0 0 0 3px ${T.redGlow}; }
        .scoreBtn {
          border: none; border-radius: 12px; padding: 9px 12px; font-weight: 800; cursor: pointer; color: white; white-space: nowrap;
        }
        .scoreKnown { background: ${T.green}; }
        .scorePartial { background: ${T.gold}; }
        .scoreMiss { background: ${T.red}; }
        .examProgress { width: 100%; height: 10px; border-radius: 999px; background: ${T.borderSoft}; overflow: hidden; }
        .examProgressFill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, ${T.red}, #E54E68); }
        .miniDash { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }

        @media (max-width: 1100px) {
          .appShell { grid-template-columns: 1fr; }
          .sidebar { display: none; }
          .drawerBtn { display: flex; }
          .hero { padding: 74px 18px 18px; }
          .content { padding: 18px 18px 78px; }
          .overviewGrid, .metricGrid, .networkTop, .networkBottom, .trapGrid, .gridFigure, .miniDash { grid-template-columns: 1fr 1fr; }
          .toolbar { grid-template-columns: 1fr; }
          .stickyTools { display: block; }
          .mobilePill { display: inline-flex; }
        }

        @media (max-width: 760px) {
          .overviewGrid, .metricGrid, .networkTop, .networkBottom, .trapGrid, .gridFigure, .miniDash { grid-template-columns: 1fr; }
          .toolbar { gap: 8px; }
          .heroTitle { font-size: 28px; }
          .heroSub { font-size: 13.5px; }
          .content { padding: 18px 12px 82px; }
          .flowRow { justify-content: stretch; }
          .flowBox { min-width: unset; width: 100%; }
          .flowArrow { width: 100%; text-align: center; transform: rotate(90deg); }
          .matrixTable, .miniTable { min-width: 680px; }
        }

        @media (max-width: 520px) {
          .hero { padding: 70px 10px 16px; }
          .content { padding: 16px 10px 84px; }
          .qNum { width: 34px; height: 34px; }
          .searchBox, .segWrap { border-radius: 12px; }
          .actionBtn { width: 100%; justify-content: center; }
          .scoreBtn { width: 100%; }
        }
      `}</style>

      <button className="drawerBtn" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">
        <Icon name="menu" size={21} color="white" />
      </button>

      {drawerOpen ? (
        <>
          <div className="drawerScrim" onClick={() => setDrawerOpen(false)} />
          <div className="drawerPanel">
            <Sidebar active={active} jump={jump} />
          </div>
        </>
      ) : null}

      <div className="appShell">
        <aside className="sidebar">
          <Sidebar active={active} jump={jump} />
        </aside>

        <div className="mainWrap">
          <header className="hero">
            <div className="heroShell">
              <div className="heroTop">
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                    <Chip tone="red">Module 1</Chip>
                    <Chip tone="blue">Study dashboard</Chip>
                    <Chip tone="gold">Framework-first</Chip>
                  </div>
                  <h1 className="heroTitle">Module 1 Visual Study Dashboard</h1>
                  <div className="heroSub">
                    Compressed, exam-oriented infrastructure with cleaner density, true closed-book drill mode, visual case matrices, and a mobile-safe UI sweep. Framework first, case facts second, inference clearly labeled.
                    <br />
                    壓縮文字密度、偏向考試實戰的 study dashboard。加入真正的閉卷模式、案例可視化矩陣，以及手機版與窄螢幕的 UI/UX bug sweep。架構先行，案例補強，推論分開。
                  </div>
                </div>
                <Panel style={{ width: "min(100%, 328px)", padding: 16 }}>
                  <div style={{ fontSize: 12, color: T.red, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1 }}>Most testable</div>
                  <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                    <CompactStat icon="check" label="Framework" value="3 conditions + deliberate coherence" tone="red" />
                    <CompactStat icon="check" label="Creation" value="UxU → DoV → Sides → Stand-alone vs Network" tone="blue" />
                    <CompactStat icon="check" label="Delivery" value="Minimum sufficient F&F + complementarity" tone="green" />
                    <CompactStat icon="check" label="Capture" value="API access alone is not a moat" tone="gold" />
                  </div>
                </Panel>
              </div>

              <div className="toolbar">
                <div className="searchBox">
                  <Icon name="search" size={18} color={T.red} />
                  <input
                    className="searchInput"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search concepts, cases, or quiz answers..."
                  />
                </div>

                <div className="segWrap" role="tablist" aria-label="Language mode">
                  {[
                    ["dual", "Dual"],
                    ["en", "English"],
                    ["zh", "中文"],
                  ].map(([value, label]) => (
                    <button key={value} className={`segBtn ${langMode === value ? "active" : ""}`} onClick={() => setLangMode(value)}>
                      {label}
                    </button>
                  ))}
                </div>

                <div className="segWrap" role="tablist" aria-label="Study mode">
                  {[
                    ["overview", "Overview"],
                    ["deep", "Deep"],
                    ["exam", "Exam"],
                  ].map(([value, label]) => (
                    <button key={value} className={`segBtn ${studyMode === value ? "active" : ""}`} onClick={() => setStudyMode(value)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <main className="content">
            <div className="contentGrid">
              <section id="section-overview" className="section">
                <SectionTitle
                  icon="target"
                  title="Overview"
                  zh="總覽"
                  chips={[
                    { tone: "red", label: "Core architecture" },
                    { tone: "blue", label: "Quick recall" },
                  ]}
                />

                <div className="overviewGrid">
                  <Panel>
                    <ThreeConditionsFigure />
                    <div style={{ marginTop: 14 }}>
                      <Callout tone="gold" icon="star" title="Big point" compact>
                        Every viable enterprise must create value, deliver value, and capture value. Module 1 teaches these as one integrated blueprint, not as separate buckets.
                        <div style={{ marginTop: 6, color: T.muted }}>任何可行企業都必須同時做到 value creation、value delivery、value capture。Module 1 把它們視為同一套 blueprint。</div>
                      </Callout>
                    </div>
                  </Panel>

                  <div style={{ display: "grid", gap: 12 }}>
                    <Panel>
                      <EvidenceLegend />
                      <div style={{ marginTop: 10, fontSize: 12.8, lineHeight: 1.68, color: T.text }}>
                        This version compresses prose into visual blocks and preserves evidence discipline: FILE, CASE, and INFERENCE stay separate.
                      </div>
                    </Panel>
                    <Panel>
                      <div style={{ fontSize: 12, color: T.red, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1 }}>Recall order</div>
                      <div className="miniDash" style={{ marginTop: 10 }}>
                        <Metric label="1" value="Framework" caption="3 conditions + coherence" tone="red" />
                        <Metric label="2" value="Creation" caption="UxU, DoV, sides, NE" tone="blue" />
                        <Metric label="3" value="Positioning" caption="Value curve + scale" tone="purple" />
                        <Metric label="4" value="Capture" caption="VRIDO + replication" tone="gold" />
                      </div>
                    </Panel>
                  </div>
                </div>
              </section>

              <section id="section-digitization" className="section">
                <SectionTitle icon="zap" title="Digitization" zh="數位化" chips={[{ tone: "blue", label: "Economic lens" }]} />
                <Panel>
                  <DigitizationFigure />
                  <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                    <Callout tone="blue" icon="compass" title="Direct course language" compact>
                      Platforms differ from traditional firms not primarily in what they produce, but in how economic activity is structured and coordinated. Platform organizations adopt a hub-and-spoke topology.
                    </Callout>
                    <Callout tone="red" icon="lightbulb" title="Exam-safe takeaway" compact>
                      Digitization matters because it changes the economics of coordination. The platform is an organizational response to those new coordination economics.
                    </Callout>
                  </div>
                </Panel>
              </section>

              <section id="section-creation" className="section">
                <SectionTitle icon="layers" title="Value Creation" zh="價值創造" chips={[{ tone: "green", label: "High frequency" }]} />
                <div className="sectionStack">
                  <Panel>
                    <CreationFigure />
                    <div style={{ height: 12 }} />
                    <Callout tone="blue" icon="route" title="Core formula" compact>
                      Perceived Benefits = Direct “Product” Benefits + Network Benefits
                      <div style={{ marginTop: 5, color: T.muted }}>感知利益 = 直接產品利益 + 網路利益</div>
                    </Callout>
                  </Panel>

                  <Panel>
                    <NetworkFigure />
                  </Panel>

                  <Panel>
                    <div className="miniDash">
                      <Metric label="User" value="Specific" caption="Vivid profile, not vague category" tone="red" />
                      <Metric label="DoV" value="Demand-side" caption="Needs and priorities, not features" tone="blue" />
                      <Metric label="Sides" value="External actors" caption="Not internal ops or staff" tone="purple" />
                      <Metric label="Benefits" value="Stand-alone vs Network" caption="Explicitly classify both" tone="gold" />
                    </div>
                  </Panel>

                  {showDeepOnly ? (
                    <Panel>
                      <div style={{ fontSize: 14.4, fontWeight: 900, color: T.ink, marginBottom: 10 }}>PLM anchor loop</div>
                      <PLMLoopFigure />
                      <div style={{ height: 12 }} />
                      <Callout tone="purple" icon="brain" title="Best GP inference" compact>
                        If the core loop depends on ailment-specific trust, sharing, and engagement, a broader General Platform may dilute the same conditions that generate value.
                      </Callout>
                    </Panel>
                  ) : null}
                </div>
              </section>

              <section id="section-positioning" className="section">
                <SectionTitle icon="grid" title="Value Curves" zh="價值曲線" chips={[{ tone: "purple", label: "Positioning" }]} />
                <div className="sectionStack">
                  <Panel>
                    <ValueCurveFigure />
                  </Panel>
                  <Panel>
                    <div className="metricGrid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
                      <Metric label="Move 1" value="Increase" caption="Raise a DoV" tone="green" />
                      <Metric label="Move 2" value="Decrease" caption="Trade off a DoV" tone="red" />
                      <Metric label="Move 3" value="Remove" caption="Stop competing there" tone="gold" />
                      <Metric label="Move 4" value="Add" caption="Redefine competition" tone="purple" />
                    </div>
                  </Panel>
                  {showDeepOnly ? (
                    <Panel>
                      <div className="miniDash">
                        <Metric label="Platform A" value="Each side" caption="needs separate positioning" tone="blue" />
                        <Metric label="Platform B" value="Cross-side" caption="trade-offs matter" tone="purple" />
                        <Metric label="Platform C" value="Scale-sensitive" caption="curves can move fast" tone="gold" />
                        <Metric label="Best response" value="Contextual" caption="not always 'beat them'" tone="red" />
                      </div>
                    </Panel>
                  ) : null}
                </div>
              </section>

              <section id="section-delivery" className="section">
                <SectionTitle icon="puzzle" title="Operating Model" zh="營運模式" chips={[{ tone: "green", label: "System logic" }]} />
                <div className="sectionStack">
                  <Panel>
                    <OperatingModelFigure />
                  </Panel>
                  <Panel>
                    <div className="miniDash">
                      <Metric label="F&F" value="Minimum sufficient" caption="Bare minimum interface needed" tone="blue" />
                      <Metric label="Activities" value="Internal support" caption="Marketing, tech, logistics, content" tone="purple" />
                      <Metric label="Practices" value="Signature choices" caption="What really drives WTP and cost" tone="green" />
                      <Metric label="Fit" value="Complementarity" caption="Together > alone" tone="gold" />
                    </div>
                  </Panel>
                </div>
              </section>

              <section id="section-capture" className="section">
                <SectionTitle icon="shield" title="Value Capture" zh="價值擷取" chips={[{ tone: "gold", label: "Defensibility" }]} />
                <div className="sectionStack">
                  <Panel>
                    <AdvantageFigure />
                  </Panel>
                  <Panel>
                    <div className="miniDash" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
                      <Metric label="V" value="Valuable" caption="unique productivity" tone="red" />
                      <Metric label="R" value="Rare" caption="not broadly available" tone="purple" />
                      <Metric label="I" value="Inimitable" caption="hard to copy" tone="gold" />
                      <Metric label="D" value="Durable" caption="persists over time" tone="green" />
                      <Metric label="O" value="Org-specific" caption="more value inside firm" tone="blue" />
                    </div>
                  </Panel>
                  <Panel>
                    <Callout tone="gold" icon="lock" title="One sentence to memorize" compact>
                      API access alone is not a moat. The real question is whether AI-enabled innovation is tied to protectable position or VRIDO-type assets inside a broader system.
                    </Callout>
                  </Panel>
                </div>
              </section>

              <section id="section-cases" className="section">
                <SectionTitle icon="columns" title="Case Matrix" zh="案例矩陣" chips={[{ tone: "blue", label: "Visual compare" }, { tone: "green", label: "Fast revision" }]} />
                <div className="sectionStack">
                  <Panel>
                    <div style={{ fontSize: 14.2, fontWeight: 900, color: T.ink, marginBottom: 10 }}>Cross-case comparison matrix</div>
                    <MatrixTable />
                  </Panel>
                  <Panel>
                    <div style={{ fontSize: 14.2, fontWeight: 900, color: T.ink, marginBottom: 10 }}>Evidence-layer case table</div>
                    <MiniCaseTable />
                  </Panel>
                  {showDeepOnly ? (
                    <div className="sectionStack">
                      {CASE_CARDS.map((card) => {
                        const c = colorPack(card.color);
                        return (
                          <Panel key={card.title} style={{ borderTop: `4px solid ${c.main}` }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 12, background: c.soft, border: `1px solid ${c.line}`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                                  <Icon name={card.icon} size={17} color={c.main} />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                  <div style={{ fontWeight: 900, fontSize: 15.4, color: T.ink, overflowWrap: "anywhere" }}>{card.title}</div>
                                  <div style={{ fontSize: 12.2, color: T.muted }}>{card.zh}</div>
                                </div>
                              </div>
                              <Chip tone={card.color}>{card.session}</Chip>
                            </div>
                            <div className="trapGrid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                              <Callout tone="blue" icon="book" title="[FILE] Course anchor" compact>{card.files}</Callout>
                              <Callout tone="green" icon="stack" title="[CASE] Useful fact" compact>{card.case}</Callout>
                              <Callout tone="gold" icon="brain" title="[INFERENCE] Safe conclusion" compact>{card.inference}</Callout>
                            </div>
                          </Panel>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </section>

              <section id="section-drill" className="section">
                <SectionTitle icon="timer" title="Closed-Book Exam Mode" zh="閉卷測驗模式" chips={[{ tone: "red", label: `${filteredQuestionCount} questions` }, { tone: "gold", label: "One at a time" }]} />
                <ClosedBookExam langMode={langMode} query={query} />
              </section>

              <section id="section-traps" className="section">
                <SectionTitle icon="alert" title="Traps & Final Cram" zh="陷阱與最後衝刺" chips={[{ tone: "red", label: "Point-loss prevention" }, { tone: "green", label: "Fast review order" }]} />
                <div className="sectionStack">
                  <Panel>
                    <div className="trapGrid">
                      {[
                        ["Treating internal teams as platform sides", "把 internal teams 或營運部門當成 platform sides"],
                        ["Confusing demand-side DoV with supply-side features", "把需求面 DoV 和供給面 features 混為一談"],
                        ["Forgetting stand-alone vs network classification", "忘記區分 stand-alone 與 network value"],
                        ["Saying 'there are network effects' without mechanism", "只說有 network effects，卻不講機制"],
                        ["Treating Peloton as a feature list", "把 Peloton 寫成功能清單，而不是 coherent operating model"],
                        ["Saying 'we use AI' without replication logic", "只說『我們用 AI』，卻沒有 replication logic"],
                      ].map(([en, zh]) => (
                        <div key={en} className="trapItem">
                          <Icon name="x" size={18} color={T.red} />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 800, fontSize: 13.3, color: T.ink, overflowWrap: "anywhere" }}>{en}</div>
                            <div style={{ marginTop: 5, fontSize: 12.2, lineHeight: 1.62, color: T.muted, overflowWrap: "anywhere" }}>{zh}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <Panel>
                    <div style={{ display: "grid", gap: 10 }}>
                      {[
                        "3 conditions for sustained superior performance",
                        "Strategy as Deliberate Coherence",
                        "Digitization as broad cost reduction",
                        "User → Use Case → DoV → Sides → Stand-alone vs Network",
                        "Network effects are designed, not inherent",
                        "Value curve definition + four reposition moves",
                        "Platform-specific positioning and scale sensitivity",
                        "Operating model = minimum sufficient F&F + activities + signature practices + complementarity",
                        "Position-based vs resource-based advantage + VRIDO",
                        "Mode 1 vs Mode 2 and why API access alone is not a moat",
                        "Case anchors: PLM / Amazon-B&N / Peloton / Coursera",
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start", minWidth: 0 }}>
                          <div style={{ width: 26, height: 26, borderRadius: 10, background: T.greenSoft, border: `1px solid ${T.greenLine}`, display: "grid", placeItems: "center", fontWeight: 900, color: T.green, fontSize: 11, flexShrink: 0 }}>{idx + 1}</div>
                          <div style={{ fontSize: 13.2, lineHeight: 1.64, color: T.text, overflowWrap: "anywhere" }}>{item}</div>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <div className="stickyTools">
                    <button className="mobilePill" onClick={() => jump("drill")}>
                      <Icon name="timer" size={16} color={T.red} />
                      Jump to exam mode
                    </button>
                  </div>
                  <div className="footerSpace" />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active, jump }) {
  return (
    <div className="sidebarInner">
      <div className="brandBar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(200,16,46,0.16)", border: `1px solid rgba(200,16,46,0.28)`, display: "grid", placeItems: "center" }}>
            <Icon name="target" size={19} color={T.red} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: T.red, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1.2 }}>Northeastern-ready</div>
            <div style={{ fontSize: 16, color: "white", fontWeight: 900, lineHeight: 1.2, overflowWrap: "anywhere" }}>Module 1 Dashboard</div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 12.1, lineHeight: 1.62, color: T.sidebarText }}>
          More visual. Less text density. Cleaner closed-book practice.
          <br />
          更多視覺化，更低文字密度，更像真實閉卷測驗。
        </div>
      </div>

      <div style={{ marginTop: 18, display: "grid", gap: 6 }}>
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} className={`navBtn ${isActive ? "active" : ""}`} onClick={() => jump(item.id)}>
              <div style={{ width: 34, height: 34, borderRadius: 12, background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name={item.icon} size={16} color={isActive ? T.red : T.sidebarMuted} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.2, fontWeight: 800, overflowWrap: "anywhere" }}>{item.label}</div>
                <div className="navSmall">{item.zh}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 18, padding: 14, borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Icon name="brain" size={16} color={T.red} />
          <div style={{ fontWeight: 900, fontSize: 12.4, color: "white" }}>Answer discipline</div>
        </div>
        <div style={{ display: "grid", gap: 7, color: T.sidebarText, fontSize: 12.1, lineHeight: 1.58 }}>
          <div>1. Define precisely</div>
          <div>2. Show mechanism</div>
          <div>3. Tie to the case</div>
          <div>4. Keep creation / delivery / capture coherent</div>
        </div>
      </div>
    </div>
  );
}

export default App;
