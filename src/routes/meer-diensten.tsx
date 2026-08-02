import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { Nav } from "@/components/Nav";

/* ---------------------------------------------------------------------------
 * "Meer diensten" — geanimeerde boom-achtergrond.
 * Port van het design-handoff prototype (design_handoff_meer_diensten).
 * Een lichtboom groeit mee met de scrollpositie; klikken op een dienst-knoop
 * stuurt een puls langs de takken en opent een detailpaneel.
 * Alle per-frame updates gaan via refs + één rAF-loop — geen re-render.
 * ------------------------------------------------------------------------- */

const RED = (a: number) => `rgba(255,70,70,${a})`;

type Service = {
  key: string;
  label: string;
  sub: string;
  price: string;
  suffix: string;
  desc: string;
  points: string[];
  node: [number, number];
  ctrl: [number, number];
  anchor: "start" | "middle" | "end";
  labelDx: number;
};

const SERVICES: Service[] = [
  {
    key: "hosting",
    label: "HOSTING",
    sub: "vanaf € 29,50",
    price: "€ 29,50",
    suffix: "/maand",
    desc: "Snelle, veilige hosting met monitoring en updates. We nemen je bestaande site over.",
    points: [
      "Dagelijkse back-ups en 24/7 monitoring",
      "SSL, updates en security-patches inbegrepen",
      "Nederlandse servers, geen verrassingen",
    ],
    node: [206, 392],
    ctrl: [352, 660],
    anchor: "end",
    labelDx: -62,
  },
  {
    key: "perf",
    label: "PERFORMANCE",
    sub: "op aanvraag",
    price: "Op aanvraag",
    suffix: "",
    desc: "Snelheidsoptimalisatie voor een snellere, soepelere site — merkbaar voor bezoekers én voor Google.",
    points: [
      "Core Web Vitals naar groen",
      "Afbeeldingen, caching en scripts geoptimaliseerd",
      "Meetrapport voor en na",
    ],
    node: [520, 196],
    ctrl: [470, 500],
    anchor: "middle",
    labelDx: 0,
  },
  {
    key: "seo",
    label: "SEO",
    sub: "op aanvraag",
    price: "Op aanvraag",
    suffix: "",
    desc: "Vindbaarheid verbeteren met technische en content SEO, gericht op zoekwoorden die klanten opleveren.",
    points: [
      "Technische audit en fixes",
      "Zoekwoordonderzoek en contentplan",
      "Maandelijkse rapportage",
    ],
    node: [826, 372],
    ctrl: [664, 640],
    anchor: "start",
    labelDx: 62,
  },
];

const ROOT: [number, number] = [500, 1015];
const FORK: [number, number] = [500, 700];

type Pt = [number, number];

const qPoint = (p0: Pt, c: Pt, p1: Pt, t: number): Pt => {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
    u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1],
  ];
};
const qTangent = (p0: Pt, c: Pt, p1: Pt, t: number): Pt => {
  const u = 1 - t;
  const x = 2 * u * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]);
  const y = 2 * u * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]);
  const m = Math.hypot(x, y) || 1;
  return [x / m, y / m];
};
const rng = (seed: number) => () =>
  (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

function splitQuad(p0: Pt, c: Pt, p1: Pt, t: number): [Pt, Pt, Pt][] {
  const a: Pt = [p0[0] + (c[0] - p0[0]) * t, p0[1] + (c[1] - p0[1]) * t];
  const b: Pt = [c[0] + (p1[0] - c[0]) * t, c[1] + (p1[1] - c[1]) * t];
  const m: Pt = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  return [
    [p0, a, m],
    [m, b, p1],
  ];
}

type Branch = { d: string; w: number; stroke: string; t0: number; t1: number; s: number };
type Bloom = { d: string; w: number; stroke: string; s: number };
type Surge = { d: string; s: number };
type EmberGroup = { s: number; items: { x: string; y: string; r: string; delay: string }[] };

function build() {
  const branches: Branch[] = [];
  const blooms: Bloom[] = [];
  const surges: Surge[] = [];
  const embers: EmberGroup[] = [];

  branches.push({
    d: `M${ROOT[0]},${ROOT[1]} Q${ROOT[0] + 16},${(ROOT[1] + FORK[1]) / 2} ${FORK[0]},${FORK[1]}`,
    w: 6,
    stroke: "rgba(236,236,240,.5)",
    t0: 0,
    t1: 0.13,
    s: -1,
  });
  surges.push({ d: branches[0].d, s: -1 });

  // baby-boompje: klein kroontje dat al staat voordat je scrolt
  const sap: [number, number, number, number, number][] = [
    [-1, 30, 0.03, 42, -46],
    [1, 24, 0.038, 46, -50],
    [-1, 8, 0.048, 30, -62],
    [1, 4, 0.056, 34, -66],
    [0, 0, 0.064, 6, -78],
  ];
  sap.forEach(([dir, dy, t0, dx, dyy]) => {
    const bx = FORK[0] + dir * 3;
    const by = FORK[1] + dy;
    branches.push({
      d: `M${bx},${by} Q${bx + dir * dx * 0.6},${by + dyy * 0.45} ${bx + dir * dx},${by + dyy}`,
      w: 1.9,
      stroke: RED(0.42),
      t0,
      t1: t0 + 0.05,
      s: -1,
    });
  });

  SERVICES.forEach((sv, si) => {
    const rand = rng(3571 + si * 977);
    const p0 = FORK;
    const c = sv.ctrl;
    const p1 = sv.node;
    const start = 0.17 + si * 0.05;
    const end = 0.45 + si * 0.115;

    const [hh1, hh2] = splitQuad(p0, c, p1, 0.5);
    [hh1, hh2].forEach((seg, k) => {
      const d = `M${seg[0][0].toFixed(1)},${seg[0][1].toFixed(1)} Q${seg[1][0].toFixed(1)},${seg[1][1].toFixed(1)} ${seg[2][0].toFixed(1)},${seg[2][1].toFixed(1)}`;
      branches.push({
        d,
        w: 3.4 - k * 0.8,
        stroke: "rgba(236,236,240,.36)",
        t0: start + (k * (end - start)) / 2,
        t1: start + ((k + 1) * (end - start)) / 2,
        s: si,
      });
      surges.push({ d, s: si });
    });

    const grow = (
      px: number,
      py: number,
      ang: number,
      len: number,
      depth: number,
      t0: number,
      span: number,
    ) => {
      const nx = px + Math.cos(ang) * len;
      const ny = py + Math.sin(ang) * len;
      const cx = px + Math.cos(ang - 0.3 + rand() * 0.6) * len * 0.55;
      const cy = py + Math.sin(ang - 0.3 + rand() * 0.6) * len * 0.55;
      branches.push({
        d: `M${px.toFixed(1)},${py.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`,
        w: Math.max(0.55, depth * 0.62),
        stroke: RED(0.14 + depth * 0.09),
        t0,
        t1: Math.min(0.99, t0 + span),
        s: si,
      });
      if (depth <= 1) return;
      // kinderen starten pas als de moedertak klaar is, anders zweeft een tak los
      const childStart = Math.min(0.985, t0 + span);
      const spread = 0.38 + rand() * 0.34;
      grow(nx, ny, ang - spread, len * (0.62 + rand() * 0.14), depth - 1, childStart, span * 0.8);
      grow(
        nx,
        ny,
        ang + spread * (0.75 + rand() * 0.6),
        len * (0.6 + rand() * 0.16),
        depth - 1,
        childStart,
        span * 0.8,
      );
      if (rand() > 0.55)
        grow(
          nx,
          ny,
          ang + (rand() - 0.5) * 0.5,
          len * 0.5,
          depth - 1,
          Math.min(0.985, childStart + span * 0.2),
          span * 0.75,
        );
    };

    [0.1, 0.2, 0.3, 0.41, 0.52, 0.62, 0.72, 0.82, 0.92].forEach((t, k) => {
      const p = qPoint(p0, c, p1, t);
      const tan = qTangent(p0, c, p1, t);
      const base = Math.atan2(tan[1], tan[0]);
      const side = k % 2 === 0 ? -1 : 1;
      const w0 = start + (end - start) * t + 0.006;
      const deep = k % 3 === 1 ? 4 : 3;
      grow(p[0], p[1], base + side * (0.5 + rand() * 0.4), 66 + rand() * 52, deep, w0, 0.17);
      grow(p[0], p[1], base - side * (0.62 + rand() * 0.34), 52 + rand() * 40, deep - 1, w0 + 0.02, 0.15);
    });

    // sluimerende bloesem rond het knooppunt — groeit pas bij een klik
    const br = rng(881 + si * 313);
    for (let i = 0; i < 18; i++) {
      const ang = (i / 18) * Math.PI * 2 + br() * 0.3;
      const len = 46 + br() * 96;
      const ex = p1[0] + Math.cos(ang) * len;
      const ey = p1[1] + Math.sin(ang) * len;
      const mx = p1[0] + Math.cos(ang + 0.42) * len * 0.55;
      const my = p1[1] + Math.sin(ang + 0.42) * len * 0.55;
      blooms.push({
        d: `M${p1[0]},${p1[1]} Q${mx.toFixed(1)},${my.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`,
        w: 0.9,
        stroke: RED(0.16 + br() * 0.5),
        s: si,
      });
    }

    const er = rng(211 + si * 641);
    embers.push({
      s: si,
      items: Array.from({ length: 14 }, () => ({
        x: (p1[0] + (er() - 0.5) * 150).toFixed(1),
        y: (p1[1] + 40 + er() * 90).toFixed(1),
        r: (0.9 + er() * 1.7).toFixed(1),
        delay: (er() * 7).toFixed(2) + "s",
      })),
    });
  });

  return { branches, blooms, surges, embers };
}

function buildLeaves() {
  const lr = rng(4211);
  return Array.from({ length: 22 }, () => {
    const size = 5 + lr() * 8;
    return {
      left: (lr() * 100).toFixed(1) + "%",
      size: size.toFixed(1) + "px",
      color: `rgba(255,${50 + Math.floor(lr() * 40)},${50 + Math.floor(lr() * 30)},${(0.14 + lr() * 0.3).toFixed(2)})`,
      dur: (22 + lr() * 26).toFixed(1) + "s",
      delay: (-lr() * 40).toFixed(1) + "s",
    };
  });
}

const KEYFRAMES = `
@keyframes md-ember{0%{transform:translate(0,0);opacity:0}15%{opacity:.85}100%{transform:translate(6px,-210px);opacity:0}}
@keyframes md-breathe{0%{opacity:.25}50%{opacity:.7}100%{opacity:.25}}
@keyframes md-haloDrift{0%{transform:translate(0,0) scale(1)}50%{transform:translate(2vw,-3vh) scale(1.12)}100%{transform:translate(0,0) scale(1)}}
@keyframes md-leafFall{0%{transform:translate(0,-12vh) rotate(0deg);opacity:0}8%{opacity:1}92%{opacity:1}100%{transform:translate(9vw,112vh) rotate(420deg);opacity:0}}
`;

export const Route = createFileRoute("/meer-diensten")({
  head: () => ({
    meta: [
      { title: "Meer diensten — AIMI" },
      {
        name: "description",
        content:
          "Losse diensten van AIMI: hosting, performance-optimalisatie en SEO. Voor wie al een site heeft en alleen dat nodig heeft.",
      },
      { property: "og:title", content: "Meer diensten — AIMI" },
      {
        property: "og:description",
        content: "Hosting, performance en SEO — ook los af te nemen.",
      },
      { property: "og:url", content: "https://aimi-development.nl/meer-diensten" },
    ],
    links: [
      { rel: "canonical", href: "https://aimi-development.nl/meer-diensten" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: MeerDiensten,
});

type Store = {
  data: ReturnType<typeof build>;
  branch: (SVGPathElement | null)[];
  branchLen: number[];
  bloom: (SVGPathElement | null)[];
  surge: (SVGPathElement | null)[];
  surgeLen: number[];
  ember: (SVGGElement | null)[];
  node: (SVGGElement | null)[];
  frame: (SVGGElement | null)[];
  p: number;
  pTarget: number;
  surgeAnim: { chain: number[]; t: number; dur: number } | null;
  heroEl: HTMLElement | null;
  panelEl: HTMLElement | null;
  svgWrapEl: HTMLElement | null;
  bloomTimer: ReturnType<typeof setTimeout> | undefined;
  raf: number;
  last: number;
  onScroll?: () => void;
  onResize?: () => void;
};

function MeerDiensten() {
  const [open, setOpen] = useState<number | null>(null);
  const openRef = useRef<number | null>(null);
  const leavesRef = useRef<ReturnType<typeof buildLeaves> | null>(null);
  if (!leavesRef.current) leavesRef.current = buildLeaves();

  const R = useRef<Store | null>(null);
  if (!R.current) {
    R.current = {
      data: build(),
      branch: [],
      branchLen: [],
      bloom: [],
      surge: [],
      surgeLen: [],
      ember: [],
      node: [],
      frame: [],
      p: 0,
      pTarget: 0,
      surgeAnim: null,
      heroEl: null,
      panelEl: null,
      svgWrapEl: null,
      bloomTimer: undefined,
      raf: 0,
      last: 0,
    };
  }
  const st = R.current;
  const data = st.data;
  const leaves = leavesRef.current;

  const applyLayout = () => {
    const isOpen = openRef.current !== null;
    const narrow = window.innerWidth < 1100;
    const p = st.panelEl;
    const w = st.svgWrapEl;
    if (p) {
      if (narrow) {
        p.style.width = "auto";
        p.style.left = "20px";
        p.style.right = "20px";
        p.style.top = "auto";
        p.style.bottom = "70px";
        p.style.maxHeight = "46vh";
        p.style.overflowY = "auto";
        p.style.transform = isOpen ? "translateY(0)" : "translateY(20px)";
      } else {
        p.style.maxHeight = "none";
        p.style.overflowY = "visible";
        p.style.width = "340px";
        p.style.left = "auto";
        p.style.right = "40px";
        p.style.top = "50%";
        p.style.bottom = "auto";
        p.style.transform = isOpen
          ? "translateY(-50%) translateX(0)"
          : "translateY(-50%) translateX(20px)";
      }
      p.style.opacity = isOpen ? "1" : "0";
      p.style.pointerEvents = isOpen ? "auto" : "none";
    }
    if (!w) return;
    if (!isOpen) {
      w.style.transform = "none";
      return;
    }
    if (!narrow) {
      w.style.transform = "translateX(-15%) scale(.9)";
      return;
    }
    // smal scherm: schuif de boom precies in de vrije band tussen nav en paneel
    const scale = 0.66;
    const prev = w.style.transition;
    w.style.transition = "none";
    w.style.transform = `scale(${scale})`;
    const node = st.node[openRef.current!];
    const navBottom = 92;
    const panelTop = p ? p.getBoundingClientRect().top : window.innerHeight - 220;
    let dy = 0;
    if (node) {
      const r = node.getBoundingClientRect();
      const bandTop = navBottom + 8;
      const bandBottom = panelTop - 14;
      if (r.height > bandBottom - bandTop) {
        dy = bandTop + 60 - r.top;
      } else if (r.bottom > bandBottom) {
        dy = bandBottom - r.bottom;
      } else if (r.top < bandTop) {
        dy = bandTop - r.top;
      }
    }
    void w.offsetHeight;
    w.style.transition = prev || "transform 1.1s cubic-bezier(.2,.8,.2,1)";
    w.style.transform = `translateY(${dy.toFixed(1)}px) scale(${scale})`;
  };

  const resetBloom = () => {
    st.bloom.forEach((el) => {
      if (el) {
        el.style.transitionDelay = "0ms";
        el.style.strokeDashoffset = String(el.getTotalLength());
      }
    });
    st.ember.forEach((el) => {
      if (el) el.style.opacity = "0";
    });
    st.frame.forEach((el) => {
      if (el) el.style.transform = "scale(1) rotate(0deg)";
    });
  };

  const openNode = (i: number) => {
    if (openRef.current === i) return;
    clearTimeout(st.bloomTimer);
    resetBloom();
    const chain = [0];
    data.surges.forEach((s, k) => {
      if (s.s === i && k > 0) chain.push(k);
    });
    st.surgeAnim = { chain, t: 0, dur: 0.75 };
    setOpen(i);
  };

  const closeNode = () => {
    clearTimeout(st.bloomTimer);
    resetBloom();
    st.branch.forEach((el) => {
      if (el) el.style.opacity = "1";
    });
    setOpen(null);
  };

  // Reageer op state-wissel: dim takken, plan bloei, verschuif de boom.
  useEffect(() => {
    openRef.current = open;
    if (open !== null) {
      data.branches.forEach((b, k) => {
        const el = st.branch[k];
        if (el) el.style.opacity = b.s === -1 || b.s === open ? "1" : "0.12";
      });
      st.bloomTimer = setTimeout(() => {
        let n = 0;
        data.blooms.forEach((f, k) => {
          const el = st.bloom[k];
          if (!el || f.s !== open) return;
          el.style.transitionDelay = n * 45 + "ms";
          el.style.strokeDashoffset = "0";
          n++;
        });
        st.ember.forEach((el, k) => {
          if (el) el.style.opacity = k === open ? "1" : "0";
        });
        const fr = st.frame[open];
        if (fr) fr.style.transform = "scale(1.35) rotate(45deg)";
        applyLayout();
      }, 720);
    } else {
      applyLayout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Mount: dash-lengtes, listeners en rAF-loop.
  useEffect(() => {
    st.branch.forEach((el, i) => {
      if (!el) return;
      const L = el.getTotalLength();
      st.branchLen[i] = L;
      el.style.strokeDasharray = String(L);
      el.style.strokeDashoffset = String(L);
      el.style.opacity = "1";
    });
    st.bloom.forEach((el) => {
      if (!el) return;
      const L = el.getTotalLength();
      el.style.strokeDasharray = String(L);
      el.style.strokeDashoffset = String(L);
      el.style.opacity = "1";
      el.style.transition = "stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)";
    });
    st.surge.forEach((el, i) => {
      if (!el) return;
      const L = el.getTotalLength();
      st.surgeLen[i] = L;
      el.style.strokeDasharray = `70 ${L}`;
      el.style.strokeDashoffset = String(L);
    });

    st.onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      st.pTarget = max > 0 ? Math.min(1, (window.scrollY || window.pageYOffset || 0) / max) : 0;
    };
    st.onResize = () => applyLayout();
    window.addEventListener("scroll", st.onScroll, { passive: true });
    window.addEventListener("resize", st.onResize);
    st.onScroll();
    st.p = st.pTarget;
    applyLayout();
    st.last = performance.now();

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - st.last) / 1000);
      st.last = t;
      tick(dt);
      st.raf = requestAnimationFrame(loop);
    };
    st.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(st.raf);
      clearTimeout(st.bloomTimer);
      if (st.onScroll) window.removeEventListener("scroll", st.onScroll);
      if (st.onResize) window.removeEventListener("resize", st.onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tick = (dt: number) => {
    st.p += (st.pTarget - st.p) * 0.09;
    // baby-boom: bij scroll 0 staat er al een kleine stam met eerste twijgen
    const p = 0.12 + st.p * 0.88;

    data.branches.forEach((b, i) => {
      const el = st.branch[i];
      if (!el) return;
      const L = st.branchLen[i] || 0;
      const k = Math.max(0, Math.min(1, (p - b.t0) / (b.t1 - b.t0)));
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      el.style.strokeDashoffset = String(L * (1 - e));
      const cap = e > 0.002 ? "round" : "butt";
      if ((el as any).__cap !== cap) {
        (el as any).__cap = cap;
        el.setAttribute("stroke-linecap", cap);
      }
    });

    SERVICES.forEach((_s, i) => {
      const el = st.node[i];
      if (!el) return;
      const appear = 0.4 + i * 0.115;
      const k = Math.max(0, Math.min(1, (p - appear) / 0.08));
      el.style.opacity = (
        openRef.current === null || openRef.current === i ? k : k * 0.18
      ).toFixed(3);
      el.style.pointerEvents = k > 0.8 ? "auto" : "none";
    });

    if (st.heroEl) {
      const k = Math.min(1, st.p / 0.35);
      st.heroEl.style.opacity = (1 - k * 0.45).toFixed(3);
      st.heroEl.style.transform = `translateY(${(-k * 90).toFixed(1)}px) scale(${(1 - k * 0.26).toFixed(3)})`;
      st.heroEl.style.transformOrigin = "left top";
    }

    // energie-puls van de stam naar het gekozen knooppunt
    if (st.surgeAnim) {
      st.surgeAnim.t += dt / st.surgeAnim.dur;
      const chain = st.surgeAnim.chain;
      const n = chain.length;
      chain.forEach((idx, k) => {
        const el = st.surge[idx];
        if (!el) return;
        const L = st.surgeLen[idx] || 0;
        const seg = Math.max(0, Math.min(1, st.surgeAnim!.t * n - k));
        el.style.opacity = seg > 0 && seg < 1 ? "1" : "0";
        el.style.strokeDashoffset = String(L * (1 - seg) - 70 * seg);
      });
      if (st.surgeAnim.t >= 1) {
        chain.forEach((idx) => {
          if (st.surge[idx]) st.surge[idx]!.style.opacity = "0";
        });
        st.surgeAnim = null;
      }
    }
  };

  const o = open === null ? null : SERVICES[open];

  return (
    <div
      style={{
        position: "relative",
        background: "#060607",
        fontFamily: "'Sora',Helvetica,Arial,sans-serif",
        color: "#efeff1",
        minHeight: "360vh",
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* Achtergrond: halo, bodemgloed, vallende blaadjes (z-0) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "12%",
            top: "12%",
            width: "76vw",
            height: "76vw",
            transition: "opacity 1.2s ease,transform 1.6s cubic-bezier(.2,.8,.2,1)",
            opacity: 0.55,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(255,60,60,.16),transparent 66%)",
              filter: "blur(90px)",
              animation: "md-haloDrift 26s ease-in-out infinite",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 95%,rgba(255,50,50,.10),transparent 55%)",
          }}
        />
        {leaves.map((lf, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: lf.left,
              width: lf.size,
              height: lf.size,
              background: lf.color,
              borderRadius: "0 100% 0 100%",
              opacity: 0,
              animation: `md-leafFall ${lf.dur} linear infinite`,
              animationDelay: lf.delay,
            }}
          />
        ))}
      </div>

      {/* SVG-boom (z-1) — klik naast een node = sluiten */}
      <div
        ref={(el) => {
          st.svgWrapEl = el;
        }}
        onClick={() => {
          if (openRef.current !== null) closeNode();
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          transition: "transform 1.1s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {data.branches.map((b, i) => (
            <path
              key={i}
              ref={(el) => {
                st.branch[i] = el;
              }}
              d={b.d}
              fill="none"
              stroke={b.stroke}
              strokeWidth={b.w}
              strokeLinecap="round"
              style={{ opacity: 0, transition: "opacity .8s ease" }}
            />
          ))}
          {data.blooms.map((f, i) => (
            <path
              key={i}
              ref={(el) => {
                st.bloom[i] = el;
              }}
              d={f.d}
              fill="none"
              stroke={f.stroke}
              strokeWidth={f.w}
              strokeLinecap="round"
              style={{ opacity: 0 }}
            />
          ))}
          {data.surges.map((s, i) => (
            <path
              key={i}
              ref={(el) => {
                st.surge[i] = el;
              }}
              d={s.d}
              fill="none"
              stroke="rgba(255,90,90,.95)"
              strokeWidth="2.6"
              strokeLinecap="round"
              style={{ opacity: 0 }}
            />
          ))}
          {data.embers.map((g, i) => (
            <g
              key={i}
              ref={(el) => {
                st.ember[i] = el;
              }}
              style={{ opacity: 0, transition: "opacity .9s ease" }}
            >
              {g.items.map((e, j) => (
                <circle
                  key={j}
                  cx={e.x}
                  cy={e.y}
                  r={e.r}
                  fill="rgba(255,90,90,.9)"
                  style={{ animation: "md-ember 7s linear infinite", animationDelay: e.delay }}
                />
              ))}
            </g>
          ))}
          {SERVICES.map((s, i) => {
            const [x, y] = s.node;
            return (
              <g
                key={s.key}
                ref={(el) => {
                  st.node[i] = el;
                }}
                onClick={(ev) => {
                  ev.stopPropagation();
                  openNode(i);
                }}
                role="button"
                tabIndex={0}
                aria-label={`${s.label} — ${s.sub}`}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    ev.stopPropagation();
                    openNode(i);
                  }
                }}
                style={{ opacity: 0, cursor: "pointer", pointerEvents: "none" }}
              >
                <rect x={x - 52} y={y - 52} width="86" height="86" fill="transparent" />
                <g
                  ref={(el) => {
                    st.frame[i] = el;
                  }}
                  style={{
                    transition:
                      "transform .8s cubic-bezier(.2,.8,.2,1),opacity .6s ease",
                    transformOrigin: `${x}px ${y}px`,
                    transformBox: "view-box",
                  }}
                >
                  <rect
                    x={x - 30}
                    y={y - 30}
                    width="60"
                    height="60"
                    fill="rgba(6,6,7,.7)"
                    stroke={RED(0.75)}
                    strokeWidth="1.1"
                    transform={`rotate(45 ${x} ${y})`}
                  />
                  <rect
                    x={x - 44}
                    y={y - 44}
                    width="88"
                    height="88"
                    fill="none"
                    stroke="rgba(255,70,70,.3)"
                    strokeWidth=".8"
                    transform={`rotate(45 ${x} ${y})`}
                    style={{ animation: "md-breathe 5s ease-in-out infinite" }}
                  />
                </g>
                <g style={{ transition: "opacity .5s ease" }}>
                  {i === 0 && (
                    <g
                      stroke={RED(0.95)}
                      strokeWidth="1.7"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x={x - 17} y={y - 15} width="34" height="23" rx="2" />
                      <line x1={x} y1={y + 8} x2={x} y2={y + 14} />
                      <line x1={x - 10} y1={y + 14} x2={x + 10} y2={y + 14} />
                    </g>
                  )}
                  {i === 1 && (
                    <polyline
                      points={`${x + 7},${y - 15} ${x - 8},${y + 1} ${x + 3},${y + 1} ${x - 7},${y + 15}`}
                      fill="none"
                      stroke={RED(0.95)}
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  )}
                  {i === 2 && (
                    <g stroke={RED(0.95)} strokeWidth="1.8" fill="none" strokeLinecap="round">
                      <circle cx={x - 3} cy={y - 4} r="12" />
                      <line x1={x + 6} y1={y + 5} x2={x + 13} y2={y + 13} />
                    </g>
                  )}
                </g>
                <text
                  x={x + s.labelDx}
                  y={y + 78}
                  textAnchor={s.anchor}
                  fill="#efeff1"
                  fontFamily="Sora,Helvetica,sans-serif"
                  fontSize="17"
                  fontWeight="500"
                  letterSpacing="1.6"
                >
                  {s.label}
                </text>
                <text
                  x={x + s.labelDx}
                  y={y + 96}
                  textAnchor={s.anchor}
                  fill="#78787f"
                  fontFamily="Sora,Helvetica,sans-serif"
                  fontSize="11.5"
                  letterSpacing="1.2"
                >
                  {s.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Nav — identiek aan de hoofdpagina */}
      <Nav />

      {/* Hero (z-5) */}
      <div
        ref={(el) => {
          st.heroEl = el;
        }}
        style={{
          position: "fixed",
          left: "40px",
          top: "24vh",
          zIndex: 5,
          maxWidth: "430px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "11.5px",
            fontWeight: 500,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#ff4b4b",
          }}
        >
          Ook los af te nemen
        </div>
        <h1
          style={{
            margin: "14px 0 18px",
            fontSize: "60px",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Alles wat
          <br />
          <span style={{ fontWeight: 600 }}>wij kunnen</span>
        </h1>
        <p style={{ fontSize: "14.5px", lineHeight: 1.75, color: "#8f8f98", fontWeight: 300 }}>
          Eén stam, drie takken. Hosting, snelheid en vindbaarheid — los af te nemen, zonder dat
          we een nieuwe site hoeven te bouwen.
        </p>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "10.5px",
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: "#5e5e66",
          }}
        >
          <span style={{ display: "block", width: "34px", height: "1px", background: "#ff4b4b" }} />
          <span>Scroll om te laten groeien</span>
        </div>
      </div>

      {/* Detailpaneel (z-7) */}
      <div
        ref={(el) => {
          st.panelEl = el;
        }}
        style={{
          position: "fixed",
          right: "40px",
          top: "50%",
          zIndex: 7,
          width: "340px",
          transform: "translateY(-50%) translateX(20px)",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .6s ease,transform .7s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div
          style={{
            padding: "26px",
            borderRadius: "2px",
            border: "1px solid rgba(255,70,70,.25)",
            background: "rgba(9,9,11,.86)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: "10.5px",
                fontWeight: 500,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "#ff4b4b",
              }}
            >
              {o ? o.label : ""}
            </div>
            <div
              onClick={() => closeNode()}
              role="button"
              tabIndex={0}
              aria-label="Sluiten"
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") closeNode();
              }}
              style={{ cursor: "pointer", fontSize: "15px", color: "#78787f", lineHeight: 1 }}
            >
              ×
            </div>
          </div>
          <div style={{ marginTop: "16px", display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "30px", fontWeight: 300, letterSpacing: "-0.01em" }}>
              {o ? o.price : ""}
            </span>
            <span style={{ fontSize: "13px", color: "#78787f" }}>{o ? o.suffix : ""}</span>
          </div>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: "13.5px",
              lineHeight: 1.7,
              color: "#9a9aa2",
              fontWeight: 300,
            }}
          >
            {o ? o.desc : ""}
          </p>
          <div
            style={{ marginTop: "22px", display: "flex", flexDirection: "column", gap: "11px" }}
          >
            {(o ? o.points : []).map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "11px",
                  fontSize: "13px",
                  lineHeight: 1.55,
                  color: "#b6b6bd",
                  fontWeight: 300,
                }}
              >
                <span
                  style={{
                    marginTop: "6px",
                    width: "4px",
                    height: "4px",
                    background: "#ff4b4b",
                    flex: "none",
                    transform: "rotate(45deg)",
                  }}
                />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <a
            href="/#contact"
            style={{
              display: "block",
              marginTop: "26px",
              padding: "13px 0",
              textAlign: "center",
              border: "1px solid rgba(255,70,70,.35)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: "#efeff1",
            }}
          >
            Neem contact op
          </a>
        </div>
      </div>

      {/* Footer (onderaan de 360vh, z-5) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 5,
          padding: "22px 40px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
          fontSize: "12px",
          color: "#6f6f77",
          background: "rgba(6,6,7,.75)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ fontWeight: 600, color: "#efeff1" }}>
          AIMI<span style={{ color: "#ff4b4b" }}>.</span>
        </div>
        <div>© 2026 AIMI — Alle rechten voorbehouden</div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="/privacybeleid">Privacybeleid</a>
          <a href="/algemene-voorwaarden">Algemene Voorwaarden voor AIMI</a>
        </div>
      </div>

      <CookieBanner />
    </div>
  );
}
