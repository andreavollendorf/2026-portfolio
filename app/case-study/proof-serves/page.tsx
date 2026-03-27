"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  Stats,
  Quote,
  TeamMember,
} from "../components";
import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";

const IMG = "/images/proof-serves";
const CANVAS = `${IMG}/canvas`;

/* ── Chat Research Canvas ─────────────────────────────────────────── */

type Sticker = {
  src: string;
  x: number;
  y: number;
  width: number;
  zIndex: number;
};

const defaultStickers: Sticker[] = [
  { src: `${CANVAS}/card-pink.png`,   x: 2.8,  y: 4.5,  width: 20, zIndex: 6 },
  { src: `${CANVAS}/card-blue.png`,   x: 3.1,  y: 58.9, width: 20, zIndex: 6 },
  { src: `${CANVAS}/card-green.png`,  x: 74.4, y: 4.3,  width: 20, zIndex: 6 },
  { src: `${CANVAS}/card-yellow.png`, x: 74.5, y: 59.1, width: 20, zIndex: 6 },
  { src: `${CANVAS}/claude.png`,      x: 29.1, y: 15.2, width: 14, zIndex: 5 },
  { src: `${CANVAS}/popsql.png`,      x: 57,   y: 61,   width: 12, zIndex: 4 },
  { src: `${CANVAS}/chart.png`,       x: 42.9, y: 67.6, width: 20, zIndex: 3 },
  { src: `${CANVAS}/chart2.png`,      x: 23,   y: 44,   width: 48, zIndex: 3 },
  { src: `${CANVAS}/chart3.png`,      x: 18.7, y: 23.5, width: 20, zIndex: 2 },
  { src: `${CANVAS}/chart4.png`,      x: 50.9, y: 30.9, width: 26, zIndex: 2 },
  { src: `${CANVAS}/chart5.png`,      x: 41.9, y: 5,    width: 24, zIndex: 1 },
];

function ChatResearchCanvas() {
  const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>(() =>
    Object.fromEntries(defaultStickers.map((s, i) => [i, { x: s.x, y: s.y }]))
  );
  const [zIndices, setZIndices] = useState<Record<number, number>>(() =>
    Object.fromEntries(defaultStickers.map((s, i) => [i, s.zIndex]))
  );
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const topZ = useRef(Math.max(...defaultStickers.map((s) => s.zIndex)));
  const reducedMotion = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [hasWiggled, setHasWiggled] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || reducedMotion || hasWiggled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setHasWiggled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [reducedMotion, hasWiggled]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, idx: number) => {
      if (reducedMotion) return;
      e.preventDefault();
      setInView(false);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      topZ.current += 1;
      setZIndices((prev) => ({ ...prev, [idx]: topZ.current }));
      setActiveIdx(idx);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [reducedMotion]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (activeIdx === null || !canvasRef.current) return;
      const canvas = canvasRef.current.getBoundingClientRect();
      const rawX = ((e.clientX - canvas.left - offsetRef.current.x) / canvas.width) * 100;
      const rawY = ((e.clientY - canvas.top - offsetRef.current.y) / canvas.height) * 100;
      const stickerW = defaultStickers[activeIdx].width;
      const x = Math.max(-stickerW * 0.5, Math.min(100 - stickerW * 0.5, rawX));
      const y = Math.max(-10, Math.min(95, rawY));
      setPositions((prev) => ({ ...prev, [activeIdx]: { x, y } }));
    },
    [activeIdx]
  );

  const handlePointerUp = useCallback(() => {
    setActiveIdx(null);
  }, []);

  return (
    <figure className="my-8">
      <style>{`
        @keyframes sticker-wiggle {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-2.5deg); }
          40% { transform: rotate(2deg); }
          60% { transform: rotate(-1.5deg); }
          80% { transform: rotate(1deg); }
        }
      `}</style>
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #ebebeb", userSelect: "none" }}
      >
        {/* Header bar */}
        <img
          src={`${CANVAS}/header.png`}
          alt=""
          role="presentation"
          className="w-full block"
          draggable={false}
        />

        {/* Dot-grid canvas */}
        <div
          ref={canvasRef}
          aria-description="Interactive canvas — drag stickers to rearrange"
          className="relative overflow-hidden h-[260px] sm:h-[380px]"
          style={{
            backgroundColor: "#f5f5f5",
            backgroundImage: "radial-gradient(circle, #d0d0d0 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            touchAction: "none",
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {defaultStickers.map((sticker, idx) => {
            const pos = positions[idx] ?? { x: sticker.x, y: sticker.y };
            return (
              <img
                key={idx}
                src={sticker.src}
                alt=""
                draggable={false}
                className="absolute block"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: `${sticker.width}%`,
                  zIndex: zIndices[idx] ?? sticker.zIndex,
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
                  cursor: reducedMotion ? "default" : activeIdx === idx ? "grabbing" : "grab",
                  animation: inView && activeIdx !== idx
                    ? `sticker-wiggle 0.5s ease-in-out ${idx * 0.06}s both`
                    : "none",
                }}
                onPointerDown={(e) => handlePointerDown(e, idx)}
              />
            );
          })}
        </div>
      </div>
      <figcaption className="text-[13px] text-[var(--muted)] mt-3 text-center">
        Used Claude to analyze chat threads at scale.
      </figcaption>
    </figure>
  );
}

/* ── New Serve Structure ──────────────────────────────────────────── */

function NewServeStructure({ reducedMotion, hideTitle }: { reducedMotion: boolean; hideTitle?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const jobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const serveRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const serve = serveRef.current;
    if (!container || !serve) return;

    const cRect = container.getBoundingClientRect();
    const sRect = serve.getBoundingClientRect();
    const sx = sRect.left + sRect.width / 2 - cRect.left;
    const sy = sRect.top - cRect.top;

    const newPaths = jobRefs.current.map((el) => {
      if (!el) return "";
      const jRect = el.getBoundingClientRect();
      const jx = jRect.left + jRect.width / 2 - cRect.left;
      const jy = jRect.bottom - cRect.top;
      // Curved path from job bottom-center to serve top-center
      const midY = jy + (sy - jy) * 0.5;
      return `M${jx} ${jy} C${jx} ${midY}, ${sx} ${midY}, ${sx} ${sy}`;
    });
    setPaths(newPaths);
  }, []);

  useEffect(() => {
    measure();
    let rafId: number;
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [measure]);

  return (
    <div
      className={hideTitle ? "px-5 py-8 sm:px-6 sm:py-10" : "rounded-lg p-5 sm:p-6"}
      style={{
        backgroundColor: hideTitle ? "transparent" : "#f0faf5",
        border: hideTitle ? "none" : "1px solid #e5e5e5",
        height: hideTitle ? "100%" : undefined,
      }}
    >
      {!hideTitle && (
        <h4
          className="text-base sm:text-lg mb-6"
          style={{ color: "var(--foreground)", fontWeight: 400, fontFamily: "var(--font-mackinac), serif" }}
        >
          New serve structure
        </h4>
      )}
      <div ref={containerRef} style={{ position: "relative", height: hideTitle ? "100%" : undefined, display: hideTitle ? "flex" : undefined, flexDirection: hideTitle ? "column" : undefined, justifyContent: hideTitle ? "space-between" : undefined }}>
        {/* SVG connector lines — positioned behind everything */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          {paths.map((d, i) =>
            d ? (
              <g key={i}>
                {/* Static dashed curve */}
                <path
                  d={d}
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                {/* Animated pulse traveling along the curve */}
                {!reducedMotion && (
                  <path
                    d={d}
                    fill="none"
                    stroke="rgba(58, 171, 123, 0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="12 200"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="212"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>
                )}
              </g>
            ) : null
          )}
        </svg>

        {/* Job row */}
        <div className="flex items-start justify-center gap-1.5 sm:gap-3 w-full" style={{ position: "relative", zIndex: 1 }}>
          {["Job ID 1", "Job ID 2", "Job ID 3"].map((label, i) => (
            <div
              key={label}
              ref={(el) => { jobRefs.current[i] = el; }}
              style={{ flex: 1, minWidth: 0, position: "relative" }}
            >
              <div
                style={{
                  position: "relative",
                  padding: "8px 6px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  fontFamily: "var(--font-geist-mono), monospace",
                  border: "1px solid #e5e5e5",
                  color: "#555",
                  backgroundColor: "#fff",
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: "16px",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Spacer for the curve area — collapses when justify-between is active */}
        <div style={{ flexGrow: 1, minHeight: 60 }} />

        {/* Serve ID box */}
        <div className="flex justify-center" style={{ position: "relative", zIndex: 1 }}>
          <div
            ref={serveRef}
            style={{
              padding: "8px 6px",
              borderRadius: 6,
              whiteSpace: "nowrap",
              textAlign: "center",
              fontFamily: "var(--font-geist-mono), monospace",
              backgroundColor: "#3aab7b",
              color: "#fff",
              fontWeight: 500,
              fontSize: 12,
              lineHeight: "16px",
              minWidth: "200px",
              boxShadow: "0 0 20px 0 rgba(58, 171, 123, 0.2), 0 0 8px 0 rgba(58, 171, 123, 0.1)",
            }}
          >
            Serve ID 1234
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Data Model Diagram ──────────────────────────────────────────── */

/*
 * Animation stages for the old data model:
 * 0 – Job 1 pulses (active)
 * 1 – "Reassigned" between 1→2 appears
 * 2 – Job 1 + Job 2 both pulse
 * 3 – "Reassigned" between 2→3 appears
 * 4 – All three jobs pulse (the problem: 3 active jobs)
 * 5 – Hold, then reset
 */
const STAGE_DURATIONS = [1600, 500, 1600, 500, 2000, 800]; // ms per stage
const TOTAL_CYCLE = STAGE_DURATIONS.reduce((a, b) => a + b, 0);

function useAnimationStage(inView: boolean, reducedMotion: boolean) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) {
      setStage(0);
      return;
    }
    let elapsed = 0;
    let rafId: number;
    let last: number | null = null;
    let prevStage = 0;

    const tick = (now: number) => {
      if (last !== null) elapsed += now - last;
      last = now;

      let t = elapsed % TOTAL_CYCLE;
      let s = 0;
      for (let i = 0; i < STAGE_DURATIONS.length; i++) {
        if (t < STAGE_DURATIONS[i]) { s = i; break; }
        t -= STAGE_DURATIONS[i];
      }
      // Only trigger re-render when stage actually changes
      if (s !== prevStage) {
        prevStage = s;
        setStage(s);
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reducedMotion]);

  return stage;
}

/* ── Split Variant (two separate containers) ─────────────────────── */

function DataModelDiagramSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const stage = useAnimationStage(inView, reducedMotion);
  const jobActive = [stage >= 0, stage >= 2, stage >= 4];
  const reassignedVisible = [stage >= 1, stage >= 3];

  return (
    <figure className="my-8" ref={containerRef} role="img" aria-label="Diagram comparing old data model with multiple disconnected jobs versus new serve structure where all jobs feed into a single serve">
      <style>{`
        @keyframes diagram-pulse-blue {
          0%, 100% { box-shadow: 0 0 8px 0 rgba(59, 130, 246, 0.05), 0 0 3px 0 rgba(59, 130, 246, 0.03); }
          50% { box-shadow: 0 0 14px 2px rgba(59, 130, 246, 0.09), 0 0 5px 0 rgba(59, 130, 246, 0.05); }
        }
        @keyframes diagram-pulse-green {
          0%, 100% { box-shadow: 0 0 12px 0 rgba(58, 171, 123, 0.1), 0 0 4px 0 rgba(58, 171, 123, 0.06); }
          50% { box-shadow: 0 0 24px 4px rgba(58, 171, 123, 0.18), 0 0 8px 0 rgba(58, 171, 123, 0.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .diagram-glow { animation: none; }
        }
      `}</style>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        {/* ── Old Data Model (left container) ── */}
        <div className="flex flex-col">
          <div
            className="relative rounded-lg overflow-hidden px-5 py-8 sm:px-6 sm:py-10 flex-1"
            style={{ backgroundColor: "#F4F5F7" }}
          >
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset" }} />
            <div className="flex flex-col items-center justify-center h-full" style={{ position: "relative" }}>
              {["Job ID 1", "Job ID 2", "Job ID 3"].map((label, i) => {
                const isActive = !reducedMotion && jobActive[i];
                const isVisible = reassignedVisible[i];
                return (
                  <div key={label} className="flex flex-col items-center w-full">
                    <div style={{ position: "relative", width: "100%" }}>
                      <div
                        className="diagram-glow"
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: 6,
                          animation: "diagram-pulse-blue 2.4s ease-in-out infinite",
                          willChange: "box-shadow",
                          opacity: isActive ? 1 : 0,
                          transition: "opacity 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "relative",
                          padding: "8px 6px",
                          borderRadius: 6,
                          whiteSpace: "nowrap",
                          textAlign: "center",
                          fontFamily: "var(--font-geist-mono), monospace",
                          border: isActive ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid #e5e5e5",
                          color: isActive ? "#555" : "#bbb",
                          backgroundColor: isActive ? "#fff" : "#fafafa",
                          fontWeight: isActive ? 500 : 400,
                          fontSize: 12,
                          lineHeight: "16px",
                          transition: "border-color 500ms cubic-bezier(0.215, 0.61, 0.355, 1), color 500ms cubic-bezier(0.215, 0.61, 0.355, 1), background-color 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                    {i < 2 && (
                      <div
                        className="flex flex-col items-center"
                        style={{ position: "relative", height: 40 }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            width: 0,
                            borderLeft: "1px dashed #ccc",
                            transformOrigin: "top",
                            transform: reducedMotion || isVisible ? "scaleY(1)" : "scaleY(0)",
                            transition: "transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: 10,
                            color: "#999",
                            backgroundColor: "#F4F5F7",
                            padding: "1px 8px",
                            borderRadius: 9999,
                            border: "1px solid #e5e5e5",
                            lineHeight: 1.4,
                            whiteSpace: "nowrap",
                            opacity: reducedMotion ? 1 : isVisible ? 1 : 0,
                            transition: "opacity 400ms cubic-bezier(0.215, 0.61, 0.355, 1) 150ms",
                          }}
                        >
                          Reassigned
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <figcaption className="text-[13px] text-[var(--muted)] text-center mt-3">
            Old data model
          </figcaption>
        </div>

        {/* ── New Serve Structure (right container) ── */}
        <div className="flex flex-col">
          <div
            className="relative rounded-lg overflow-hidden flex-1"
            style={{ backgroundColor: "#F4F5F7" }}
          >
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset" }} />
            <NewServeStructure reducedMotion={reducedMotion} hideTitle />
          </div>
          <figcaption className="text-[13px] text-[var(--muted)] text-center mt-3">
            New serve structure
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

const sections = [
  { id: "why-it-mattered", label: "Why it mattered" },
  { id: "where-we-started", label: "Where we started" },
  { id: "research", label: "Research" },
  { id: "reframe", label: "The reframe" },
  { id: "one-serve", label: "One serve, one story" },
  { id: "solution", label: "Solution" },
  { id: "ops", label: "Enabling ops" },
  { id: "outcomes", label: "Outcomes" },
  { id: "collaboration", label: "Collaboration" },
  { id: "takeaway", label: "Takeaway" },
];

export default function ProofServesPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Proof / Serves"
      title="I redesigned how thousands of law firms track their serves."
      description="Proof handles service of process: the constitutional requirement that someone must be formally notified when they're sued. Our platform connects thousands of law firms with a nationwide network of process servers. These serves often involve urgent, emotionally charged cases where uncertainty quickly erodes trust. I led the redesign of our client-facing experience — the company's largest product initiative — partnering with product and engineering leadership to set strategy while staying hands-on in the craft."
      meta={[
        { label: "Role", value: "Director of Design" },
        { label: "Timeline", value: "July–December 2025" },
      ]}
      sections={sections}
      heroContent={
        <ImageBlock
          src={`${IMG}/serves-hero.png`}
          alt="Redesigned serve overview page"
        />
      }
      nextProject={{ slug: "proof-ops", title: "Proof Ops" }}
    >
      {/* ── Why It Mattered ──────────────────────────────────────────── */}

      <Section
        id="why-it-mattered"
        sectionTitle="Client Experience Redesign @ Proof"
        chapterTitle="Why it mattered"
      >
        <Stats
          stats={[
            { value: "30%", label: "of chat messages from clients were asking for status updates" },
            { value: ">$50k", label: "annual spend — high-value clients churned primarily because of poor visibility" },
            { value: "30 days", label: "was the retention window — confusion killed momentum" },
          ]}
        />
      </Section>

      {/* ── Where We Started ─────────────────────────────────────────── */}

      <Section
        id="where-we-started"
        sectionTitle="Where We Started"
        chapterTitle="The job details page hadn't been touched in years."
      >
        <Paragraph>
          We knew it needed work, but it was a big undertaking with lots of stakeholders
          and opinions. We agreed to take a phased approach, starting with one widget: chat.
        </Paragraph>
        <Paragraph>
          Chat is a key differentiator. Clients can message process servers directly. But
          every message creates a review task for ops. The business goal was to reduce task
          volume. The design question: why are clients chatting so much?
        </Paragraph>
        <ImageBlock
          src={`${IMG}/before.png`}
          alt="The old job details page before the redesign"
          caption="The &ldquo;old&rdquo; job details page before the redesign"
        />
      </Section>

      {/* ── Research ─────────────────────────────────────────────────── */}

      <Section
        id="research"
        sectionTitle="What Research Revealed"
        chapterTitle="The issue wasn't chat. It was clarity."
      >
        <Paragraph>
          I used Claude to classify 1,000+ chat threads by intent, identifying 16 distinct
          message categories. The pattern was clear…clients weren&apos;t chatting because they
          wanted to chat. They were asking the same question over and over: what&apos;s
          happening with my job?
        </Paragraph>
        <Paragraph>
          The problem wasn&apos;t the chat experience. It was that we weren&apos;t telling
          clients what they needed to know.
        </Paragraph>
        <ChatResearchCanvas />
        <Quote attribution="Paralegal, mid-sized family law firm">
          People are dealing with some of the most traumatic experiences they&apos;ll ever
          have. A divorce, a child custody dispute, somebody&apos;s taken off with the kid.
          The more information we can give them, the more reassuring it is to them that things
          are moving in the direction they need them to go.
        </Quote>
      </Section>

      {/* ── The Reframe ──────────────────────────────────────────────── */}

      <Section
        id="reframe"
        sectionTitle="The Reframe"
        chapterTitle="But clarity alone wouldn't solve it."
      >
        <Paragraph>
          When jobs get redispatched (natural disasters, server availability, access issues,
          client requests) our system created a brand new page. New job. New chat. New history.
          Clients with complex serves had 2–10 separate job pages to navigate. Which one was
          current? Where should they message?
        </Paragraph>
        <Paragraph>
          That&apos;s not a product experience. That&apos;s a breakdown of trust.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/structure.png`}
          alt="Old model vs new model comparison"
          caption="Old model (left) vs new model (right)"
        />
      </Section>

      {/* ── One Serve, One Story ───────────────────────────────────────── */}

      <Section
        id="one-serve"
        sectionTitle="The Restructure"
        chapterTitle="One serve, one story."
      >
        <Paragraph>
          &ldquo;Jobs&rdquo; were an internal concept that made sense for ops but meant
          nothing to clients. We needed a new mental model: one serve, one story, regardless
          of how many reassignments happened behind the scenes. The serve became the container.
        </Paragraph>
        <DataModelDiagramSplit />
      </Section>

      {/* ── Solution ─────────────────────────────────────────────────── */}

      <Section
        id="solution"
        sectionTitle="Solution"
        chapterTitle="Three experiences that remove uncertainty."
      >
        {/* Job Tracker */}
        <h3 className="text-[15px] font-medium mt-6 mb-2">Job tracker</h3>
        <Paragraph>
          Answers one question: is this progressing the way it should? Instead of binary
          status labels, it surfaces contextual health indicators (on track, needs attention,
          at risk) and explains why. Attempts count in aggregate across the full serve. Risk
          surfaces early, not after failure.
        </Paragraph>
        <div className="[&_figure>div]:pb-0 [&_figure>div]:items-end">
          <ImageBlock
            src={`${IMG}/tracker.png`}
            alt="Job tracker showing health indicators"
          />
        </div>

        {/* Unified History */}
        <h3 className="text-[15px] font-medium mt-6 mb-2">Unified history</h3>
        <Paragraph>
          Reassignments no longer reset the conversation. A single timeline preserves all
          attempts, chats, and documents regardless of how many times the serve changes hands.
        </Paragraph>
        <div className="[&_figure>div]:pb-0 [&_figure>div]:items-end">
          <ImageBlock
            src={`${IMG}/history.png`}
            alt="Unified history timeline"
          />
        </div>

        {/* Address Intelligence */}
        <h3 className="text-[15px] font-medium mt-6 mb-2">Address intelligence</h3>
        <Paragraph>
          Many failed attempts came from address quality issues. We integrated Melissa Data to
          validate addresses proactively and surface risks before dispatch.
        </Paragraph>
        <div className="[&_figure>div]:pb-0 [&_figure>div]:pr-0 [&_figure>div]:justify-end [&_figure>div]:items-end">
          <ImageBlock
            src={`${IMG}/address.png`}
            alt="Address intelligence validation"
          />
        </div>
      </Section>

      {/* ── Enabling Ops ─────────────────────────────────────────────── */}

      <Section
        id="ops"
        sectionTitle="Enabling Ops"
        chapterTitle="Enabling ops without rebuilding the platform."
      >
        <Paragraph>
          Client visibility required ops to see the same unified context. Stakeholders
          proposed redesigning the entire ops platform.
        </Paragraph>
        <Paragraph>
          I recommended a narrower approach: a global job selector that surfaces key context
          without changing existing workflows. Ship value now, defer the full redesign.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/ops.png`}
          alt="Ops-facing global job/serve selector"
          caption="Ops-facing global job/serve selector, with additional context on hover"
        />
        <Quote attribution="VP of Operations">
          Thank you for listening to our feedback and keeping the workflow very similar
          while also adding value with information in ways that we can go self-serve it
          and not confuse the team. Taking our feedback and doing what you did, it&apos;s
          a world of efforts, and it&apos;s very much appreciated.
        </Quote>
      </Section>

      {/* ── Outcomes ─────────────────────────────────────────────────── */}

      <Section
        id="outcomes"
        sectionTitle="Outcomes"
        chapterTitle=""
      >
        <Stats
          stats={[
            { value: "25%", label: "reduction in status-check messages" },
            { value: ">80%", label: "positive feedback" },
            { value: "70%", label: "quick action adoption" },
          ]}
        />
      </Section>

      {/* ── Collaboration ────────────────────────────────────────────── */}

      <Section
        id="collaboration"
        sectionTitle="Collaboration & Execution"
        chapterTitle=""
      >
        <Paragraph>
          I partnered closely with engineering to define the data model, edge cases, and
          interaction behavior, reviewing implementations for fidelity and feasibility. I
          worked with the PM to pressure-test scope, sequence work, and decide what not to
          build — prioritizing clarity and adoption over feature breadth.
        </Paragraph>
        <Paragraph>
          And I collaborated closely with my amazing design team; defining the system-level
          approach, setting design direction, making scope and sequencing decisions, and
          ensuring the final experience shipped as a coherent, end-to-end system.
        </Paragraph>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TeamMember name="Shaun Tan" role="Product Designer">
            Led structural design and iteration across complex states. Owned the job tracker
            structure, status variants, and edge-case exploration, as well as the chat experience.
          </TeamMember>
          <TeamMember name="Gabe Hernandez" role="Product Designer">
            Owned the detailed UI work across the experience, including component styling,
            borders, shadows, hover and focus states, spacing, and typographic refinement.
          </TeamMember>
        </div>

        <div className="[&_figure>div]:!h-auto">
          <ImageBlock
            src={`${IMG}/iteration.png`}
            alt="Pages of design iteration"
            caption="Just one of many pages from months of iteration."
            flush
          />
        </div>
      </Section>

      {/* ── Takeaway ─────────────────────────────────────────────────── */}

      <Section
        id="takeaway"
        sectionTitle="Key Takeaway"
        chapterTitle="Clients didn't need more features — they needed to understand what was already happening."
      >
        <Paragraph>
          By redesigning the client experience around a continuous story (and enabling internal
          teams to support that truth), we reduced confusion, restored trust, and created a
          scalable foundation for retention.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/serves.png`}
          alt="New Serves table built with AG Grid"
          caption="New Serves table built with AG Grid"
        />
      </Section>
    </CaseStudyLayout>
  );
}
