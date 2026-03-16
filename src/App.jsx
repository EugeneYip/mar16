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
  puzzle: [
    "M8 6a2 2 0 1 1 4 0v2h2a2 2 0 1 0 0 4h-2v2a2 2 0 1 1-4 0v-2H6a2 2 0 1 0 0-4h2z",
  ],
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
  tree: ["M12 3v18", "M12 8h6", "M12 13h6", "M12 8H6", "M12 13H6"],
  lock: ["M7 11V8a5 5 0 0 1 10 0v3", "M5 11h14v10H5z"],
  spark: ["M12 2v4", "M12 18v4", "M4.9 4.9l2.8 2.8", "M16.3 16.3l2.8 2.8", "M2 12h4", "M18 12h4", "M4.9 19.1l2.8-2.8", "M16.3 7.7l2.8-2.8"],
  stack: ["M4 7h16", "M4 12h16", "M4 17h16"],
  compass: ["M12 3l6 6-4 8-8 4 4-8z", "M12 12l6-3"],
  check: ["M5 13l4 4L19 7"],
  lightbulb: ["M9 18h6", "M10 22h4", "M8 14a6 6 0 1 1 8 0c-.8 1.2-1.8 2.1-3 3H11c-1.2-.9-2.2-1.8-3-3z"],
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
  paperSoft: "#FFF9F4",
  ink: "#2B2622",
  text: "#3C3632",
  muted: "#6F6760",
  faint: "#968E87",
  border: "#E8DDD1",
  borderSoft: "#EFE7DE",
  shadow: "0 8px 28px rgba(43,38,34,0.07)",
  red: "#C8102E",
  redSoft: "rgba(200,16,46,0.08)",
  redLine: "rgba(200,16,46,0.22)",
  redGlow: "rgba(200,16,46,0.13)",
  charcoal: "#202124",
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
  blackSoft: "rgba(32,33,36,0.06)",
  sidebar: "#171819",
  sidebarText: "#C6C6C6",
  sidebarMuted: "#8D8D8D",
  focus: "0 0 0 3px rgba(200,16,46,0.16)",
};

const NAV = [
  { id: "overview", label: "Overview", zh: "總覽", icon: "target" },
  { id: "digitization", label: "Digitization", zh: "數位化", icon: "zap" },
  { id: "creation", label: "Value Creation", zh: "價值創造", icon: "layers" },
  { id: "positioning", label: "Value Curves", zh: "價值曲線", icon: "grid" },
  { id: "delivery", label: "Operating Model", zh: "營運模式", icon: "puzzle" },
  { id: "capture", label: "Value Capture", zh: "價值擷取", icon: "shield" },
  { id: "cases", label: "Case Anchors", zh: "案例錨點", icon: "book" },
  { id: "drill", label: "15 Brief Quiz", zh: "15 題簡答", icon: "award" },
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
    facts: [
      "[FILE] Sides discussed in slides: patients or users, pharma companies, insurance companies, physicians.",
      "[FILE] Patient-side DoV: support, sharing, peers, hope, advice, tracking, doctor communication, helping science and others.",
      "[FILE] Primary value creation: same-side user network effect = emotional engine ↔ data or insights loop, mostly within a given ailment.",
      "[CASE] Revenue note: over 90% from pharma-related services, with outcome studies and marketing research making up the bulk.",
      "[FILE] Slides later flag that PLM was acquired by a side, raising questions about the web of value creation.",
    ],
    inference:
      "[INFERENCE] The General Platform idea is risky if the core loop depends on ailment-specific trust, sharing, and engagement. Expanding too broadly may dilute the same conditions that generate value.",
  },
  {
    title: "Barnes & Noble vs. Amazon",
    zh: "Barnes & Noble vs. Amazon",
    session: "Positioning",
    color: "purple",
    icon: "grid",
    facts: [
      "[FILE] Value-curve dimensions highlighted in class: commuting convenience, knowledge about books, variety and selection, store hours, lounge experience, price.",
      "[FILE] Platform-specific reminder: certain DoV are highly sensitive to scale.",
      "[FILE] Strategic responses shown on slides: fortify the old curve, jump to the new curve, or hybrid.",
      "[FILE] Slides also state Barnes & Noble had low incentives to slash prices, accelerate online, and cannibalize its own large incumbent business.",
      "[CASE] The case documents the scale and profitability of B&N’s superstore model, which helps explain why self-disruption was hard.",
    ],
    inference:
      "[INFERENCE] The strongest answer is not a simplistic yes or no. Platform defense becomes hard when the incumbent’s best response is constrained by the economics of its own existing model.",
  },
  {
    title: "Peloton",
    zh: "Peloton",
    session: "Delivery",
    color: "green",
    icon: "puzzle",
    facts: [
      "[FILE] User-side value curve in slides: low price, coaching, aesthetics, variety, privacy, community, status, convenience or ease.",
      "[FILE] Delivery framework in slides: minimum sufficient features and functions, internal activities, then signature practices.",
      "[CASE] Case facts include the premium hardware path, the importance of in-person selling, internal logistics, high retention, and fast revenue growth.",
      "[CASE] The case repeatedly shows that the business is not just a bike. It is a linked system of hardware, content, instructors, community, retail, logistics, and subscription.",
    ],
    inference:
      "[INFERENCE] Peloton only works as long as those pieces reinforce one another. The correct unit of analysis is the operating model, not an isolated feature list.",
  },
  {
    title: "Coursera and GenAI",
    zh: "Coursera 與 GenAI",
    session: "Capture",
    color: "gold",
    icon: "shield",
    facts: [
      "[FILE] GenAI or LLMs are framed as general-purpose technologies. The strategic question is which applications to pursue and how they are embedded in a broader system.",
      "[FILE] Mode 1 = direct human interaction. Mode 2 = machine-based interaction via API and software automation.",
      "[FILE] Slides list Coursera Coach, AI Course Builder, translation and localization, AI-assisted assessment, personalization, enterprise upskilling, and GenAI catalog expansion.",
      "[FILE] The class prompt explicitly asks whether there is any barrier to replication and how the innovation could be better protected.",
    ],
    inference:
      "[INFERENCE] API access alone is not a moat. Defensibility depends on whether AI is layered onto protectable position or VRIDO-type assets.",
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
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: T.redSoft,
            border: `1px solid ${T.redLine}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 6px ${T.redGlow}`,
          }}
        >
          <Icon name={icon} size={19} color={T.red} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 26, lineHeight: 1.15, color: T.ink, letterSpacing: -0.35 }}>{title}</h2>
          <div style={{ marginTop: 4, fontSize: 13.5, color: T.muted }}>{zh}</div>
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
        borderRadius: 22,
        boxShadow: T.shadow,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Callout({ tone = "blue", icon = "lightbulb", title, children }) {
  const c = colorPack(tone);
  return (
    <div
      style={{
        background: c.soft,
        border: `1px solid ${c.line}`,
        borderLeft: `4px solid ${c.main}`,
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 10,
            background: T.paper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={icon} size={15} color={c.main} />
        </div>
        <div style={{ fontWeight: 800, fontSize: 13.5, color: c.main }}>{title}</div>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.75, color: T.text }}>{children}</div>
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
        borderRadius: 18,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 11, color: c.main, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
      <div style={{ marginTop: 7, fontSize: 20, fontWeight: 900, color: T.ink, letterSpacing: -0.35 }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.6, color: T.muted }}>{caption}</div>
    </div>
  );
}

function KV({ left, right }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 220px) minmax(0, 1fr)",
        gap: 14,
        alignItems: "start",
        padding: "12px 0",
        borderBottom: `1px solid ${T.borderSoft}`,
      }}
    >
      <div style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{left}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.75, color: T.text }}>{right}</div>
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
        borderRadius: 18,
        background: isOpen ? c.soft : T.paper,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => !forceOpen && setOpen((v) => !v)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          border: "none",
          background: "transparent",
          cursor: forceOpen ? "default" : "pointer",
          color: T.ink,
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: 14.5 }}>{title}</div>
          {subtitle ? <div style={{ marginTop: 4, fontSize: 12, color: T.muted }}>{subtitle}</div> : null}
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 12,
            background: T.paper,
            border: `1px solid ${c.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.18s ease",
          }}
        >
          <Icon name="chevron" size={14} color={c.main} />
        </div>
      </button>
      {isOpen ? <div style={{ padding: "0 18px 18px 18px" }}>{children}</div> : null}
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

      <text x="198" y="124" textAnchor="middle" fill={T.muted} fontSize="11">Position in marketplace</text>
      <text x="342" y="124" textAnchor="middle" fill={T.muted} fontSize="11">Sources of uniqueness</text>
      <text x="270" y="292" textAnchor="middle" fill={T.muted} fontSize="11">Operating model design</text>
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
          <div>
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

      <path d="M210 94c34-26 66-26 100 0" fill="none" stroke={T.red} strokeWidth="2.2" markerEnd="url(#arrowEnd)" />
      <path d="M310 131c-34 26-66 26-100 0" fill="none" stroke={T.red} strokeWidth="2.2" markerEnd="url(#arrowEnd)" />

      <rect x="120" y="179" width="280" height="30" rx="15" fill={T.greenSoft} stroke={T.greenLine} />
      <text x="260" y="198" textAnchor="middle" fill={T.green} fontWeight="700" fontSize="11.5">Mostly operates within a given ailment</text>

      <defs>
        <marker id="arrowEnd" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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
      <text x="270" y="38" textAnchor="middle" fill={T.gold} fontSize="11" fontWeight="700">Value curves reveal trade-offs, differentiation, and where scale matters</text>
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

function CaseCard({ card, forceOpen }) {
  const c = colorPack(card.color);
  return (
    <div
      style={{
        background: T.paper,
        border: `1px solid ${c.line}`,
        borderTop: `4px solid ${c.main}`,
        borderRadius: 20,
        boxShadow: T.shadow,
        padding: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: c.soft,
              border: `1px solid ${c.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name={card.icon} size={18} color={c.main} />
          </div>
          <div>
            <div style={{ fontSize: 16.5, fontWeight: 900, color: T.ink }}>{card.title}</div>
            <div style={{ fontSize: 12.5, color: T.muted }}>{card.zh}</div>
          </div>
        </div>
        <Chip tone={card.color}>{card.session}</Chip>
      </div>

      <Accordion title="Directly supported facts" subtitle="檔案直接支持" defaultOpen forceOpen={forceOpen} tone={card.color}>
        <div style={{ display: "grid", gap: 8 }}>
          {card.facts.map((fact, idx) => (
            <div key={idx} className="factRow">
              <div className="factDot" style={{ background: c.main }} />
              <div style={{ fontSize: 13.5, lineHeight: 1.72, color: T.text }}>{fact}</div>
            </div>
          ))}
        </div>
      </Accordion>

      <div style={{ height: 12 }} />
      <Callout tone={card.color} icon="brain" title="Best exam-safe inference">
        {card.inference}
      </Callout>
    </div>
  );
}

function QAItem({ item, index, langMode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="qaCard">
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div className="qNum">Q{index + 1}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          {(langMode === "dual" || langMode === "en") && (
            <div style={{ fontSize: 14.5, lineHeight: 1.65, color: T.ink, fontWeight: 700 }}>{item.en}</div>
          )}
          {(langMode === "dual" || langMode === "zh") && (
            <div style={{ fontSize: 13.5, lineHeight: 1.7, color: T.muted, marginTop: langMode === "dual" ? 4 : 0 }}>{item.zh}</div>
          )}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            {item.tags.map((tag) => (
              <Chip key={tag} tone="blue" style={{ fontSize: 10 }}>{tag}</Chip>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="actionBtn" onClick={() => setShow((v) => !v)}>
          <Icon name={show ? "x" : "eye"} size={15} color={T.red} />
          {show ? "Hide Answer" : "Show Answer"}
        </button>
      </div>

      {show ? (
        <div className="answerBox">
          {(langMode === "dual" || langMode === "en") && <div className="answerEn">{item.answerEn}</div>}
          {(langMode === "dual" || langMode === "zh") && <div className="answerZh">{item.answerZh}</div>}
        </div>
      ) : null}
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

  const filteredQuestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QUESTIONS;
    return QUESTIONS.filter((item) =>
      [item.en, item.zh, item.answerEn, item.answerZh, ...(item.tags || [])].join(" ").toLowerCase().includes(q)
    );
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
      { rootMargin: "-20% 0px -65% 0px", threshold: 0.01 }
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
        button, input { font: inherit; }
        .appShell { display: grid; grid-template-columns: 280px minmax(0, 1fr); min-height: 100vh; }
        .sidebar {
          position: sticky; top: 0; height: 100vh; overflow: auto;
          background: linear-gradient(180deg, #131416 0%, #1A1B1D 100%);
          color: ${T.sidebarText}; border-right: 1px solid rgba(255,255,255,0.06);
        }
        .sidebarInner { padding: 22px 18px 28px; }
        .brandBar {
          padding: 18px; border-radius: 20px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06); box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .navBtn {
          width: 100%; border: none; background: transparent; color: inherit; cursor: pointer;
          border-radius: 14px; padding: 10px 12px; display: flex; align-items: center; gap: 11px;
          text-align: left; transition: background 0.16s ease, color 0.16s ease, transform 0.16s ease;
        }
        .navBtn:hover { background: rgba(255,255,255,0.06); }
        .navBtn.active {
          background: rgba(200,16,46,0.17);
          color: white;
          box-shadow: inset 0 0 0 1px rgba(200,16,46,0.25);
        }
        .navBtn.active .navSmall { color: rgba(255,255,255,0.75); }
        .navSmall { font-size: 11px; color: ${T.sidebarMuted}; margin-top: 2px; }
        .mainWrap { min-width: 0; }
        .hero {
          padding: 30px 34px 22px; border-bottom: 1px solid ${T.border};
          background:
            radial-gradient(circle at top right, rgba(200,16,46,0.08), transparent 30%),
            linear-gradient(180deg, ${T.bgAlt} 0%, ${T.bg} 100%);
        }
        .heroShell {
          max-width: 1160px; margin: 0 auto;
        }
        .heroTop { display: flex; gap: 20px; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; }
        .heroTitle { margin: 0; font-size: clamp(30px, 4vw, 42px); line-height: 1.05; color: ${T.ink}; letter-spacing: -0.9px; }
        .heroSub { margin-top: 10px; font-size: 15px; line-height: 1.8; color: ${T.muted}; max-width: 800px; }
        .toolbar { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 10px; margin-top: 18px; }
        .searchBox {
          display: flex; align-items: center; gap: 10px; background: ${T.paper}; border: 1px solid ${T.border};
          border-radius: 16px; padding: 12px 14px; box-shadow: ${T.shadow};
        }
        .searchInput { width: 100%; border: none; outline: none; background: transparent; color: ${T.ink}; font-size: 14px; }
        .segWrap {
          display: inline-flex; align-items: center; gap: 6px; background: ${T.paper}; border: 1px solid ${T.border};
          border-radius: 16px; padding: 6px; box-shadow: ${T.shadow};
        }
        .segBtn {
          border: none; background: transparent; color: ${T.muted}; cursor: pointer; padding: 9px 12px; border-radius: 11px;
          font-weight: 700; font-size: 12.5px;
        }
        .segBtn.active { background: ${T.redSoft}; color: ${T.red}; box-shadow: inset 0 0 0 1px ${T.redLine}; }
        .content {
          max-width: 1160px; margin: 0 auto; padding: 26px 34px 80px;
        }
        .contentGrid { display: grid; gap: 22px; }
        .overviewGrid { display: grid; grid-template-columns: 1.25fr .95fr; gap: 22px; }
        .metricGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .section { scroll-margin-top: 22px; }
        .sectionStack { display: grid; gap: 18px; }
        .gridFigure { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
        .miniCell { display: flex; gap: 10px; align-items: center; padding: 12px 12px; border-radius: 16px; background: ${T.blueSoft}; border: 1px solid ${T.blueLine}; }
        .miniArrow { width: 28px; height: 28px; border-radius: 10px; background: ${T.paper}; color: ${T.blue}; display: grid; place-items: center; font-weight: 900; }
        .miniTitle { font-weight: 800; font-size: 13px; color: ${T.ink}; }
        .miniSub { margin-top: 3px; font-size: 11px; color: ${T.muted}; }
        .flowRow { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: center; }
        .flowBox { min-width: 140px; text-align: center; padding: 16px 14px; border-radius: 18px; background: ${T.paper}; border: 1px solid ${T.border}; box-shadow: ${T.shadow}; }
        .flowTitle { font-weight: 800; font-size: 14px; color: ${T.ink}; }
        .flowSub { margin-top: 4px; font-size: 12px; color: ${T.muted}; }
        .flowArrow { color: ${T.red}; font-weight: 900; font-size: 20px; }
        .networkWrap { display: grid; gap: 12px; }
        .networkTop { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .networkCard { padding: 16px; border-radius: 18px; background: ${T.paper}; border: 1px solid ${T.border}; box-shadow: ${T.shadow}; }
        .networkBlue { background: ${T.blueSoft}; border-color: ${T.blueLine}; }
        .networkPurple { background: ${T.purpleSoft}; border-color: ${T.purpleLine}; }
        .networkHead { font-weight: 900; font-size: 14px; margin-bottom: 8px; color: ${T.ink}; }
        .networkBody { font-size: 13px; line-height: 1.7; color: ${T.text}; }
        .networkFoot { margin-top: 8px; font-size: 11px; color: ${T.muted}; }
        .networkBottom { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
        .badgeCell { padding: 14px 12px; border-radius: 16px; text-align: center; font-weight: 800; font-size: 13px; background: ${T.paper}; border: 1px solid ${T.border}; }
        .badgeGreen { color: ${T.green}; background: ${T.greenSoft}; border-color: ${T.greenLine}; }
        .badgeRed { color: ${T.red}; background: ${T.redSoft}; border-color: ${T.redLine}; }
        .badgeGold { color: ${T.gold}; background: ${T.goldSoft}; border-color: ${T.goldLine}; }
        .badgeOrange { color: #A86012; background: rgba(168,96,18,0.09); border-color: rgba(168,96,18,0.22); }
        .networkWarning { padding: 14px 16px; border-radius: 18px; background: rgba(200,16,46,0.06); border: 1px solid rgba(200,16,46,0.18); }
        .networkWarningTitle { color: ${T.red}; font-weight: 900; font-size: 13.5px; }
        .networkWarningSub { margin-top: 6px; color: ${T.text}; font-size: 12.5px; line-height: 1.65; }
        .stackFigure { display: grid; gap: 12px; }
        .stackLayer { padding: 16px; border-radius: 18px; border: 1px solid ${T.border}; box-shadow: ${T.shadow}; }
        .stackBlue { background: ${T.blueSoft}; border-color: ${T.blueLine}; }
        .stackPurple { background: ${T.purpleSoft}; border-color: ${T.purpleLine}; }
        .stackGreen { background: ${T.greenSoft}; border-color: ${T.greenLine}; }
        .stackTitle { font-weight: 900; font-size: 14px; color: ${T.ink}; }
        .stackText { margin-top: 6px; font-size: 13px; line-height: 1.7; color: ${T.text}; }
        .stackArrow { text-align: center; color: ${T.red}; font-weight: 900; font-size: 22px; }
        .stackFooter { padding: 14px 16px; border-radius: 16px; background: ${T.paper}; border: 1px dashed ${T.greenLine}; font-size: 12.5px; color: ${T.text}; line-height: 1.65; }
        .factRow { display: flex; gap: 10px; align-items: flex-start; }
        .factDot { width: 8px; height: 8px; border-radius: 999px; margin-top: 8px; flex-shrink: 0; }
        .qaList { display: grid; gap: 14px; }
        .qaCard { background: ${T.paper}; border: 1px solid ${T.border}; border-radius: 20px; box-shadow: ${T.shadow}; padding: 18px; }
        .qNum {
          width: 38px; height: 38px; border-radius: 14px; background: ${T.redSoft}; color: ${T.red};
          display: grid; place-items: center; font-weight: 900; font-size: 12.5px; flex-shrink: 0;
          border: 1px solid ${T.redLine};
        }
        .actionBtn {
          border: 1px solid ${T.redLine}; background: ${T.paper}; color: ${T.red}; border-radius: 12px; cursor: pointer;
          padding: 9px 12px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 12.5px;
        }
        .answerBox { margin-top: 14px; padding: 14px 15px; border-radius: 16px; background: ${T.greenSoft}; border: 1px solid ${T.greenLine}; }
        .answerEn { font-size: 13.5px; line-height: 1.75; color: ${T.ink}; }
        .answerZh { font-size: 12.8px; line-height: 1.75; color: ${T.muted}; margin-top: 8px; }
        .trapGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .trapItem { display: flex; gap: 10px; align-items: flex-start; padding: 14px; background: ${T.paper}; border: 1px solid ${T.border}; border-radius: 18px; }
        .drawerBtn {
          position: fixed; right: 14px; top: 14px; z-index: 50;
          width: 46px; height: 46px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);
          background: ${T.sidebar}; display: none; align-items: center; justify-content: center; cursor: pointer;
          box-shadow: 0 10px 26px rgba(0,0,0,0.25);
        }
        .drawerScrim { position: fixed; inset: 0; background: rgba(0,0,0,0.42); z-index: 41; }
        .drawerPanel {
          position: fixed; inset: 0 auto 0 0; width: 292px; max-width: 86vw; background: ${T.sidebar}; z-index: 42;
          transform: translateX(0); box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }
        .stickyTools {
          position: sticky; bottom: 12px; z-index: 2; display: none; margin-top: 18px;
        }
        .mobilePill {
          display: none; width: 100%; gap: 10px; align-items: center; justify-content: center; padding: 13px 14px;
          border-radius: 18px; background: ${T.paper}; border: 1px solid ${T.border}; box-shadow: ${T.shadow}; color: ${T.red}; font-weight: 800;
        }
        .footerSpace { height: 20px; }

        @media (max-width: 1100px) {
          .appShell { grid-template-columns: 1fr; }
          .sidebar { display: none; }
          .drawerBtn { display: flex; }
          .hero { padding: 78px 18px 20px; }
          .content { padding: 22px 18px 88px; }
          .overviewGrid, .metricGrid, .networkTop, .networkBottom, .trapGrid, .gridFigure { grid-template-columns: 1fr 1fr; }
          .toolbar { grid-template-columns: 1fr; }
          .stickyTools { display: block; }
          .mobilePill { display: inline-flex; }
        }

        @media (max-width: 760px) {
          .overviewGrid, .metricGrid, .networkTop, .networkBottom, .trapGrid, .gridFigure { grid-template-columns: 1fr; }
          .flowRow { justify-content: stretch; }
          .flowBox { min-width: unset; width: 100%; }
          .flowArrow { width: 100%; text-align: center; transform: rotate(90deg); }
          .toolbar { gap: 8px; }
          .heroTitle { font-size: 30px; }
          .heroSub { font-size: 14px; }
          .content { padding: 20px 14px 88px; }
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
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                    <Chip tone="red">Module 1</Chip>
                    <Chip tone="blue">Platform Innovation</Chip>
                    <Chip tone="gold">Framework-first</Chip>
                  </div>
                  <h1 className="heroTitle">Module 1 Visual Study Infrastructure</h1>
                  <div className="heroSub">
                    A rebuilt, reader-first React study system for faster recall, cleaner concept separation, deeper case anchoring, and safer exam answers. Default structure: framework first, case facts second, inference clearly labeled.
                    <br />
                    一份重新設計、以閱讀與記憶效率為核心的 React 學習系統。預設結構是 framework 先行、case facts 補強、推論明確標示，幫助你更快理解、更穩作答。
                  </div>
                </div>
                <Panel style={{ width: "min(100%, 340px)", padding: 18 }}>
                  <div style={{ fontSize: 12, color: T.red, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1 }}>Most testable</div>
                  <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="check" size={16} color={T.green} /><span style={{ fontSize: 13.5, lineHeight: 1.6 }}>3 conditions for sustained superior performance</span></div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="check" size={16} color={T.green} /><span style={{ fontSize: 13.5, lineHeight: 1.6 }}>Network effects are designed, not inherent</span></div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="check" size={16} color={T.green} /><span style={{ fontSize: 13.5, lineHeight: 1.6 }}>Minimum sufficient F&F and complementarity</span></div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="check" size={16} color={T.green} /><span style={{ fontSize: 13.5, lineHeight: 1.6 }}>API access alone is not a moat</span></div>
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
                    <button
                      key={value}
                      className={`segBtn ${langMode === value ? "active" : ""}`}
                      onClick={() => setLangMode(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="segWrap" role="tablist" aria-label="Study mode">
                  {[
                    ["overview", "Overview"],
                    ["deep", "Deep"],
                    ["drill", "Drill"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      className={`segBtn ${studyMode === value ? "active" : ""}`}
                      onClick={() => setStudyMode(value)}
                    >
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
                  title="Architecture of the module"
                  zh="模組架構總圖"
                  chips={[
                    { tone: "red", label: "Framework core" },
                    { tone: "blue", label: "Reader-first layout" },
                  ]}
                />

                <div className="overviewGrid">
                  <Panel>
                    <ThreeConditionsFigure />
                    <div style={{ marginTop: 16, fontSize: 14, lineHeight: 1.8, color: T.text }}>
                      {(langMode === "dual" || langMode === "en") && (
                        <>
                          <strong style={{ color: T.red }}>The big point:</strong> every viable enterprise must create value, deliver value, and capture value. Module 1 teaches them as one integrated blueprint, not as separate checklist items.
                        </>
                      )}
                      {(langMode === "dual" || langMode === "zh") && (
                        <div style={{ marginTop: langMode === "dual" ? 10 : 0 }}>
                          <strong style={{ color: T.red }}>最大主軸：</strong>任何可行企業都必須同時解決 value creation、value delivery、value capture。Module 1 把它們當成同一個 blueprint，而不是三張分離的清單。
                        </div>
                      )}
                    </div>
                  </Panel>

                  <div style={{ display: "grid", gap: 14 }}>
                    <Panel>
                      <EvidenceLegend />
                      <div style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.75, color: T.text }}>
                        This guide intentionally separates course notes and slides, case facts, and reasoned inference. That separation protects accuracy and also improves exam judgment.
                        <br />
                        這份版本刻意把課內 notes／slides、case facts、以及 reasoned inference 分開，既能提高準確度，也能避免把推論誤寫成事實。
                      </div>
                    </Panel>
                    <Panel>
                      <div style={{ fontSize: 12, color: T.red, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1 }}>Fast recall order</div>
                      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                        {[
                          "3 conditions → digitization → value creation sequence",
                          "network-effects taxonomy → value curve moves",
                          "operating model tool → competitive advantage taxonomy",
                          "4 case anchors → 15 brief quiz answers",
                        ].map((line, i) => (
                          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <div style={{ width: 26, height: 26, borderRadius: 10, background: T.redSoft, display: "grid", placeItems: "center", color: T.red, fontWeight: 900, fontSize: 11 }}>{i + 1}</div>
                            <div style={{ fontSize: 13.5, lineHeight: 1.65, color: T.text }}>{line}</div>
                          </div>
                        ))}
                      </div>
                    </Panel>
                  </div>
                </div>

                <div style={{ height: 18 }} />

                <div className="metricGrid">
                  <Metric label="Condition 1" value="Value Creation" caption="Who is served, in which use case, on which dimensions of value?" tone="red" />
                  <Metric label="Condition 2" value="Value Delivery" caption="What operating model makes the intended value proposition feasible?" tone="green" />
                  <Metric label="Condition 3" value="Value Capture" caption="Why will success not be copied away by others?" tone="gold" />
                </div>

                <div style={{ height: 18 }} />
                <Callout tone="gold" icon="star" title="Strategy as Deliberate Coherence">
                  {(langMode === "dual" || langMode === "en") && (
                    <>
                      Strategy means fitting many decisions across products, operations, markets, people, policies, and assets into one coherent whole that achieves economic performance.
                    </>
                  )}
                  {(langMode === "dual" || langMode === "zh") && (
                    <div style={{ marginTop: langMode === "dual" ? 8 : 0 }}>
                      Strategy 的重點是把產品、營運、市場、人員、政策、資產等大量決策整合成一個能帶來經濟績效的 coherent whole。
                    </div>
                  )}
                </Callout>
              </section>

              <section id="section-digitization" className="section">
                <SectionTitle
                  icon="zap"
                  title="Digitization and the new organizational infrastructure"
                  zh="數位化與新的組織基礎設施"
                  chips={[
                    { tone: "blue", label: "FILE" },
                    { tone: "red", label: "Economic lens" },
                  ]}
                />

                <Panel>
                  <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 12 }}>Digitization = broad reduction in costs</div>
                  <DigitizationFigure />
                  <div style={{ marginTop: 16, fontSize: 13.8, lineHeight: 1.8, color: T.text }}>
                    {(langMode === "dual" || langMode === "en") && (
                      <>
                        The course does not treat digitization as magic. It treats digitization as a broad lowering of costs with important downstream effects on coordination, strategy, and industry structure.
                      </>
                    )}
                    {(langMode === "dual" || langMode === "zh") && (
                      <div style={{ marginTop: langMode === "dual" ? 8 : 0 }}>
                        課內不是把 digitization 當成魔法，而是把它理解成各類成本的大幅下降，進而影響 coordination、strategy、industry structure。
                      </div>
                    )}
                  </div>
                </Panel>

                {showDeepOnly ? (
                  <div className="sectionStack">
                    <Panel>
                      <KV
                        left="Platform vs. traditional firm"
                        right="[FILE] The intro note says platforms differ not primarily in what they produce, but in how economic activity is structured and coordinated. Platform organizations adopt a hub-and-spoke topology and organize interactions among external participants through shared infrastructure, rules, standards, interfaces, code, protocols, incentives, and centralized information systems."
                      />
                      <KV
                        left="Why the platform form grows"
                        right="[FILE] Digitization relaxes long-standing limits on coordinating economic activity across organizational boundaries at scale. That makes platform-style organization more feasible and more important."
                      />
                      <KV
                        left="Exam-safe takeaway"
                        right="Digitization matters because it changes the economics of coordination. The platform is an organizational response to those changing coordination economics."
                      />
                    </Panel>
                  </div>
                ) : null}
              </section>

              <section id="section-creation" className="section">
                <SectionTitle
                  icon="layers"
                  title="Value creation on platforms"
                  zh="平臺上的價值創造"
                  chips={[
                    { tone: "blue", label: "FILE" },
                    { tone: "green", label: "Most testable" },
                  ]}
                />

                <Panel>
                  <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 12 }}>Start in the right order</div>
                  <CreationFigure />
                  <div style={{ height: 16 }} />
                  <Callout tone="blue" icon="route" title="Core value-creation formula">
                    Perceived Benefits = Direct “Product” Benefits + Network Benefits
                    <div style={{ marginTop: 8, color: T.muted }}>感知利益 = 直接產品利益 + 網路利益</div>
                  </Callout>
                </Panel>

                <div className="sectionStack">
                  <Panel>
                    <KV left="User × Use Case" right="[FILE] Start by defining who is being served and in what concrete context or problem. The best answers are specific rather than vague." />
                    <KV left="Dimensions of Value" right="[FILE] DoV are demand-side needs or preferences. They are not just technical features. This distinction is reinforced in Assignment 1 feedback." />
                    <KV left="Ecosystem / sides" right="[FILE] Sides are external actors between whom value transactions occur. Internal employees, operations, and infrastructure are not platform sides." />
                    <KV left="Two economic levers" right="[FILE] Value is created either by pushing benefits or willingness-to-pay upward, or by lowering costs of serving demand." />
                  </Panel>

                  <Panel>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 12 }}>Network-effects taxonomy and warnings</div>
                    <NetworkFigure />
                  </Panel>

                  {showDeepOnly ? (
                    <>
                      <Accordion title="Five critical warnings from the notes" subtitle="從 notes 萃取的五個高機率考點" defaultOpen forceOpen={forceOpen} tone="red">
                        <div style={{ display: "grid", gap: 10 }}>
                          {[
                            ["Designed, not inherent", "Network effects do not just exist in an industry. They are designed into and enabled by the platform business model."],
                            ["Requires mechanism", "You must specify which interactions create value, for whom, and under what conditions."],
                            ["Can be negative", "Congestion, oversaturation, intrusive ads, or quality decline can reduce value."],
                            ["Can vary in strength", "Strong versus weak effects depend on scale, design, and usage patterns."],
                            ["Activity-dependent", "Value depends not only on how many join, but also on what they do after joining."],
                          ].map(([head, body]) => (
                            <div key={head} style={{ padding: 14, borderRadius: 14, border: `1px solid ${T.border}`, background: T.paperSoft }}>
                              <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>{head}</div>
                              <div style={{ marginTop: 6, fontSize: 13.2, lineHeight: 1.72, color: T.text }}>{body}</div>
                            </div>
                          ))}
                        </div>
                      </Accordion>

                      <Panel>
                        <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 12 }}>PLM as the value-creation anchor</div>
                        <PLMLoopFigure />
                        <div style={{ marginTop: 16, fontSize: 13.8, lineHeight: 1.8, color: T.text }}>
                          PLM is the strongest case for understanding how human network effects create value. The user-side loop is not generic “more users = more value.” It is ailment-specific, trust-sensitive, and tightly linked to data generation.
                          <br />
                          PLM 是理解 human network effects 的核心案例。它不是一般教科書式的「更多使用者 = 更多價值」，而是與疾病社群、信任、分享、資料生成緊密綁定的特殊機制。
                        </div>
                        <div style={{ height: 14 }} />
                        <Callout tone="purple" icon="brain" title="Best GP answer logic">
                          [INFERENCE] If PLM’s core loop depends on ailment-specific trust, willingness to share, and engagement, then a broader General Platform could weaken the very same conditions that produce value.
                        </Callout>
                      </Panel>
                    </>
                  ) : null}
                </div>
              </section>

              <section id="section-positioning" className="section">
                <SectionTitle
                  icon="grid"
                  title="Value curves and market positioning"
                  zh="價值曲線與市場定位"
                  chips={[
                    { tone: "blue", label: "2_NOTE / 2_SLIDES" },
                    { tone: "purple", label: "Positioning logic" },
                  ]}
                />

                <Panel>
                  <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 14 }}>What a value curve is doing for you</div>
                  <ValueCurveFigure />
                  <div style={{ marginTop: 16, fontSize: 13.8, lineHeight: 1.8, color: T.text }}>
                    {(langMode === "dual" || langMode === "en") && (
                      <>
                        A value curve shows how value offered maps onto demand-side needs and dimensions of value relative to alternatives. It helps reveal close competitors, differentiation, trade-offs, and where scale may matter.
                      </>
                    )}
                    {(langMode === "dual" || langMode === "zh") && (
                      <div style={{ marginTop: langMode === "dual" ? 8 : 0 }}>
                        Value curve 會把某個 business model 相對於替代方案，在 demand-side needs 與 DoV 上提供多少價值畫出來，幫助你看出最接近的競爭者、差異化、取捨，以及 scale 何處重要。
                      </div>
                    )}
                  </div>
                </Panel>

                <div className="sectionStack">
                  <Panel>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 14 }}>Four ways to reposition</div>
                    <div className="metricGrid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
                      <Metric label="Move 1" value="Increase" caption="Raise a dimension of value" tone="green" />
                      <Metric label="Move 2" value="Decrease" caption="Reduce a dimension of value" tone="red" />
                      <Metric label="Move 3" value="Remove" caption="Stop competing on a DoV" tone="gold" />
                      <Metric label="Move 4" value="Add" caption="Create a new basis of competition" tone="purple" />
                    </div>
                  </Panel>

                  <Panel>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 14 }}>Platform-specific positioning distinctions</div>
                    <div style={{ display: "grid", gap: 10 }}>
                      {[
                        ["A. Separate positioning for each side", "Each side of a platform needs its own successful positioning, not one generic statement for the whole platform."],
                        ["B. Cross-side trade-offs", "Value offered on one side may depend on the positioning chosen on another side."],
                        ["C. Scale-sensitive value curves", "A platform may begin weak on some DoV and improve dramatically as scale grows."],
                      ].map(([head, body], idx) => (
                        <div key={idx} style={{ padding: 14, borderRadius: 16, border: `1px solid ${T.border}`, background: T.paperSoft }}>
                          <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>{head}</div>
                          <div style={{ marginTop: 6, fontSize: 13.2, lineHeight: 1.72, color: T.text }}>{body}</div>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <Panel>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 14 }}>Returns to scale across sessions</div>
                    <div className="trapGrid">
                      <div className="trapItem">
                        <Icon name="bar" size={18} color={T.blue} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>Supply-side economies of scale</div>
                          <div style={{ marginTop: 5, fontSize: 13.1, lineHeight: 1.72, color: T.text }}>Spreading fixed costs across more volume lowers average cost, often affecting price DoV most directly.</div>
                        </div>
                      </div>
                      <div className="trapItem">
                        <Icon name="network" size={18} color={T.purple} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>Demand-side economies of scale</div>
                          <div style={{ marginTop: 5, fontSize: 13.1, lineHeight: 1.72, color: T.text }}>The course directly frames this as network effects: average benefits or willingness-to-pay rise with scale.</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, fontSize: 12.8, color: T.muted, lineHeight: 1.7 }}>
                      Scale appears in more than one session. In positioning it explains why some DoV are highly sensitive to growth. In delivery it shapes model economics. In capture it becomes a positional source of advantage.
                    </div>
                  </Panel>
                </div>
              </section>

              <section id="section-delivery" className="section">
                <SectionTitle
                  icon="puzzle"
                  title="Value delivery and operating-model design"
                  zh="價值交付與營運模式設計"
                  chips={[
                    { tone: "green", label: "Ch.4 / Peloton" },
                    { tone: "blue", label: "System design" },
                  ]}
                />

                <Panel>
                  <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 14 }}>Operating model as a system, not a list</div>
                  <OperatingModelFigure />
                  <div style={{ marginTop: 16, fontSize: 13.8, lineHeight: 1.82, color: T.text }}>
                    {(langMode === "dual" || langMode === "en") && (
                      <>
                        The course defines value delivery as the operating model: an inter-related set of chosen practices. Returns to one practice may depend on the presence of other practices. That is why fit and complementarity matter.
                      </>
                    )}
                    {(langMode === "dual" || langMode === "zh") && (
                      <div style={{ marginTop: langMode === "dual" ? 8 : 0 }}>
                        課程把 value delivery 定義為 operating model，也就是一套 inter-related set of chosen practices。某個 practice 的回報往往依賴其他 practices 是否同時存在，所以 fit 與 complementarity 才重要。
                      </div>
                    )}
                  </div>
                </Panel>

                <div className="sectionStack">
                  <Panel>
                    <KV left="Minimum sufficient F&F" right="[FILE] Define the bare minimum necessary features and functions at the interface needed to deliver the intended value curve or proposition." />
                    <KV left="Internal activities" right="[FILE] Identify the activities needed to support both the interface and the overall business, such as marketing, tech, logistics, sales, data science, and content." />
                    <KV left="Signature practices" right="[FILE] Isolate the few practices that truly drive willingness-to-pay, benefits, and costs." />
                    <KV left="Necessary conditions" right="[FILE] Minimum sufficient F&F, internal coherence, complementarity, and value together greater than value on its own." />
                  </Panel>

                  {showDeepOnly ? (
                    <Panel>
                      <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 14 }}>Peloton as the operating-model anchor</div>
                      <div className="trapGrid">
                        <div className="trapItem">
                          <Icon name="target" size={18} color={T.green} />
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>Intended user-side curve</div>
                            <div style={{ marginTop: 5, fontSize: 13.1, lineHeight: 1.72, color: T.text }}>
                              Low price, coaching, aesthetics, variety, privacy, community, status, convenience or ease.
                            </div>
                          </div>
                        </div>
                        <div className="trapItem">
                          <Icon name="stack" size={18} color={T.blue} />
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>Delivery logic</div>
                            <div style={{ marginTop: 5, fontSize: 13.1, lineHeight: 1.72, color: T.text }}>
                              User-facing interface plus instructors and curriculum, marketing, tech or software, and other internal activities.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ height: 14 }} />
                      <Callout tone="green" icon="check" title="Correct exam posture">
                        Peloton should be analyzed as a coherent operating model. The right answer is not a product feature list. It is an explanation of how choices reinforce one another to make the intended value proposition feasible.
                      </Callout>
                    </Panel>
                  ) : null}
                </div>
              </section>

              <section id="section-capture" className="section">
                <SectionTitle
                  icon="shield"
                  title="Value capture and competitive advantage"
                  zh="價值擷取與競爭優勢"
                  chips={[
                    { tone: "gold", label: "Ch.5 / Coursera" },
                    { tone: "red", label: "Why won’t you be copied?" },
                  ]}
                />

                <Panel>
                  <AdvantageFigure />
                </Panel>

                <div className="sectionStack">
                  <Panel>
                    <KV left="Position-based advantages" right="Scale or positive feedback, incumbency advantage, and strategic agility. These can exist even if players were otherwise identical." />
                    <KV left="Resource or capability advantages" right="Unique resources, capabilities, or IP that can be pinned down as strategic assets." />
                    <KV left="VRIDO logic" right="Valuable, Rare, Inimitable, Durable, Organization-specific. These are the conditions under which an asset can support defensible uniqueness." />
                    <KV left="Subtle but important nuance" right="Organizational capabilities are special because firms do not own human capital the same way they own other assets. Only the organization-specific portion is a true basis of value capture." />
                  </Panel>

                  <Panel>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 12 }}>Coursera, GenAI, and the replication test</div>
                    <div className="trapGrid">
                      <div className="trapItem">
                        <Icon name="spark" size={18} color={T.gold} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>General-purpose technology</div>
                          <div style={{ marginTop: 5, fontSize: 13.1, lineHeight: 1.72, color: T.text }}>LLMs are framed as an enabling layer, not as a complete strategic answer by themselves.</div>
                        </div>
                      </div>
                      <div className="trapItem">
                        <Icon name="route" size={18} color={T.blue} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>Mode 1 vs Mode 2</div>
                          <div style={{ marginTop: 5, fontSize: 13.1, lineHeight: 1.72, color: T.text }}>Mode 1 = direct human chat. Mode 2 = API-based automation and integration.</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: 14 }} />
                    <Callout tone="gold" icon="lock" title="The one sentence to memorize">
                      API access alone is not a moat. The real value-capture question is whether the AI-enabled innovation is tied to protectable position or VRIDO-type assets inside a broader system.
                    </Callout>
                  </Panel>
                </div>
              </section>

              <section id="section-cases" className="section">
                <SectionTitle
                  icon="book"
                  title="Case anchors"
                  zh="案例錨點"
                  chips={[
                    { tone: "green", label: "Framework → Case" },
                    { tone: "gold", label: "Exam-safe inference" },
                  ]}
                />
                <div className="sectionStack">
                  {CASE_CARDS.map((card) => (
                    <CaseCard key={card.title} card={card} forceOpen={forceOpen} />
                  ))}
                </div>
              </section>

              <section id="section-drill" className="section">
                <SectionTitle
                  icon="award"
                  title="15 simulated brief quiz questions"
                  zh="15 題模擬簡答題"
                  chips={[
                    { tone: "red", label: `${filteredQuestions.length} visible` },
                    { tone: "blue", label: "Short-answer discipline" },
                  ]}
                />
                <Panel>
                  <div style={{ fontSize: 13.5, lineHeight: 1.75, color: T.text }}>
                    Use this section in two ways: first for active recall, then for answer compression. The goal is not just to remember concepts, but to answer in the professor’s preferred style: precise definition, mechanism, and coherence.
                    <br />
                    這一區建議先拿來做 active recall，再拿來做 answer compression。目標不只是記住概念，而是練成教授偏好的作答方式：定義精準、機制清楚、邏輯 coherent。
                  </div>
                </Panel>
                <div className="qaList">
                  {filteredQuestions.map((item, index) => (
                    <QAItem key={`${item.en}-${index}`} item={item} index={index} langMode={langMode} />
                  ))}
                </div>
              </section>

              <section id="section-traps" className="section">
                <SectionTitle
                  icon="alert"
                  title="Traps, bug-proofing, and final cram order"
                  zh="陷阱、穩定作答與最後衝刺順序"
                  chips={[
                    { tone: "red", label: "Avoid point loss" },
                    { tone: "green", label: "Fast review" },
                  ]}
                />

                <Panel>
                  <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 14 }}>Highest-probability traps</div>
                  <div className="trapGrid">
                    {[
                      ["Treating internal teams as platform sides", "把 internal teams 或營運部門當成 platform sides"],
                      ["Confusing demand-side DoV with supply-side features", "把需求面 DoV 和供給面 features 混為一談"],
                      ["Forgetting to classify stand-alone vs network benefits", "忘記把價值分類成 stand-alone 與 network benefits"],
                      ["Saying 'there are network effects' without mechanism", "只說有 network effects，卻不說明機制"],
                      ["Describing Peloton as a feature list", "把 Peloton 寫成功能清單，而不是 coherent operating model"],
                      ["Saying 'we use AI' without replication logic", "只說『我們用 AI』，卻沒有 replication logic"],
                    ].map(([en, zh]) => (
                      <div key={en} className="trapItem">
                        <Icon name="x" size={18} color={T.red} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 13.5, color: T.ink }}>{en}</div>
                          <div style={{ marginTop: 5, fontSize: 12.6, lineHeight: 1.68, color: T.muted }}>{zh}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel>
                  <div style={{ fontSize: 15, fontWeight: 900, color: T.ink, marginBottom: 14 }}>Final cram order</div>
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
                      <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 28, height: 28, borderRadius: 10, background: T.greenSoft, border: `1px solid ${T.greenLine}`, display: "grid", placeItems: "center", fontWeight: 900, color: T.green, fontSize: 12 }}>{idx + 1}</div>
                        <div style={{ fontSize: 13.5, lineHeight: 1.72, color: T.text }}>{item}</div>
                      </div>
                    ))}
                  </div>
                </Panel>

                <div className="stickyTools">
                  <button className="mobilePill" onClick={() => jump("drill")}>
                    <Icon name="award" size={16} color={T.red} />
                    Jump to quiz drill
                  </button>
                </div>
                <div className="footerSpace" />
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
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(200,16,46,0.16)",
              border: `1px solid rgba(200,16,46,0.28)`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Icon name="target" size={20} color={T.red} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.red, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1.2 }}>Northeastern-ready</div>
            <div style={{ fontSize: 17, color: "white", fontWeight: 900, lineHeight: 1.2 }}>Module 1 Infrastructure</div>
          </div>
        </div>
        <div style={{ marginTop: 14, fontSize: 12.5, lineHeight: 1.65, color: T.sidebarText }}>
          Framework first. Case facts second. Inference clearly labeled.
          <br />
          框架優先，案例補強，推論分開。
        </div>
      </div>

      <div style={{ marginTop: 20, display: "grid", gap: 6 }}>
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} className={`navBtn ${isActive ? "active" : ""}`} onClick={() => jump(item.id)}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name={item.icon} size={16} color={isActive ? T.red : T.sidebarMuted} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.4, fontWeight: 800 }}>{item.label}</div>
                <div className="navSmall">{item.zh}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 22, padding: 14, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Icon name="brain" size={16} color={T.red} />
          <div style={{ fontWeight: 900, fontSize: 12.5, color: "white" }}>Professor-style answer discipline</div>
        </div>
        <div style={{ display: "grid", gap: 8, color: T.sidebarText, fontSize: 12.3, lineHeight: 1.65 }}>
          <div>1. Define the concept precisely</div>
          <div>2. Show mechanism, not slogan</div>
          <div>3. Tie answer back to the case</div>
          <div>4. Keep creation, delivery, capture coherent</div>
        </div>
      </div>
    </div>
  );
}

export default App;
