"use client";

import { useState, useRef, useEffect } from "react";
import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  VideoBlock,
  Highlight,
} from "../components";

const IMG = "/images/proof-ops";

const sections = [
  { id: "context", label: "Context" },
  { id: "reality", label: "The reality" },
  { id: "problem", label: "The problem" },
  { id: "mapping", label: "Mapping work" },
  { id: "architecture", label: "Architecture" },
  { id: "documentation", label: "Documentation" },
  { id: "collaboration", label: "Collaboration" },
  { id: "outcome", label: "Outcome" },
];

export default function ProofOpsPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Proof / Ops"
      title="Designing the systems that transformed how ops specialists serve thousands of law firms."
      description={<>Proof&apos;s operations team coordinates thousands of serves daily across a distributed network of process servers. I designed a task management system that brought structure, ownership, and visibility to their most complex workflows. <Highlight color="pink">I led this cross-functional initiative</Highlight> partnering with VP of Operations, Product, and Engineering to design and ship the foundation for scalable ops.</>}
      meta={[
        { label: "Role", value: "Principal Product Designer\n(Player/Coach)" },
        { label: "Timeline", value: "8 weeks\n(Sep–Nov 2024)" },
      ]}
      sections={sections}
      nextProject={{ slug: "userwise", title: "Userwise" }}
      heroContent={
        <VideoBlock
          src={`${IMG}/ops-teams.mp4`}
          poster={`${IMG}/cover.webp`}
          alt="Proof Ops team management interface"
          flush
        />
      }
    >
      {/* ── Context ──────────────────────────────────────────────── */}

      <Section
        id="context"
        sectionTitle="Operations Task Management @ Proof"
        chapterTitle="Everyone deserves to know when they're being sued."
      >
        <Paragraph>
          Proof is a legal tech platform that handles service of process: the
          constitutional requirement that someone must be formally notified when
          they&apos;re sued. Proof&apos;s platform connects thousands of law firms with
          a nationwide network of vetted process servers.
        </Paragraph>
      </Section>

      {/* ── The Reality ──────────────────────────────────────────── */}

      <Section
        id="reality"
        sectionTitle="The Reality"
        chapterTitle="Legal tech is complex."
      >
        <Paragraph>
          Behind every successful serve is an ops team navigating layers of
          complexity: federal law, state law, county rules, court jurisdiction,
          judge preferences, client preferences. Can you serve on Sunday in
          Florida? Does this county require a notary? Is this a garnishment or a
          summons? Does that change the timeline?
        </Paragraph>
        <Paragraph>
          Before this project, that knowledge lived in spreadsheets, Slack
          threads, and people&apos;s heads.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/complexity.png`}
          alt="Layers of legal complexity — federal law, state law, county rules, court jurisdiction, judge and client preferences"
        />
      </Section>

      {/* ── The Problem ──────────────────────────────────────────── */}

      <Section
        id="problem"
        sectionTitle="The Problem"
        chapterTitle="There was no task system. At all."
      >
        <Paragraph>
          Specialists worked from a dashboard that showed jobs needing attention,
          but <Highlight color="yellow">there was no structure for what needed attention</Highlight> or who should handle
          it. The most common workflow was &ldquo;babysitting&rdquo;: a specialist
          would open 15–20 browser tabs, one per job, and watch them move through
          the serve lifecycle. When something needed action, they&apos;d jump in.
          Then go back to watching.
        </Paragraph>
        <Paragraph>
          Work got distributed through Slack and tribal knowledge. A supervisor
          would say &ldquo;hey, can someone look at the Smith case?&rdquo; and
          whoever was available would grab it. A client could have five serves open
          with the same recurring issue and no one would notice — because people
          were thinking about individual jobs, not client relationships or task types.
        </Paragraph>
        <Paragraph>
          This created compounding problems:
        </Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.25rem] my-2">
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">No ownership</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              Enterprise clients paying premium rates got the same anonymous
              service as self-serve accounts. No one knew their history.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">No visibility</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              We couldn&apos;t measure performance because there was nothing to
              measure. Everyone did everything.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">No specialization</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              Some work requires deep expertise (affidavit prep, compliance
              review). Some requires speed (dispatch, basic QA). Treating all work
              as interchangeable meant neither got optimized.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">No scalability</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              Every acquisition, every new service line, every enterprise deal
              required ad-hoc workarounds. There was no model for how to organize work.
            </p>
          </div>
        </div>

        <ImageBlock
          src={`${IMG}/old-dashboard.png`}
          alt="The old dashboard that ops was working out of"
          caption="The old dashboard — a choose-your-own-adventure with no ownership."
        />
      </Section>

      {/* ── Mapping Work ─────────────────────────────────────────── */}

      <Section
        id="mapping"
        sectionTitle="Mapping Work"
        chapterTitle="Mapping what &ldquo;work&rdquo; actually meant."
      >
        <Paragraph>
          Before I could design a task system, I had to define what a task even
          was.
        </Paragraph>
        <Paragraph>
          I mapped the complete job lifecycle, from the moment a job enters the
          platform to final completion, and identified every point where ops might
          need to act. This revealed 10+ distinct task types, each with different
          triggers, different required information, and different actions.
        </Paragraph>
        <Paragraph>
          The &ldquo;babysitting&rdquo; workflow existed because the system had no
          concept of these distinctions. A job needing dispatch looked the same as a
          job needing affidavit review. The only way to know was to open it and look.
        </Paragraph>
        <div className="[&_figure>div]:!h-auto">
          <ImageBlock
            src={`${IMG}/lifecycle.png`}
            alt="Complete job lifecycle map revealing 10+ distinct task types and routing gaps"
            caption="Complete job lifecycle map revealing 10+ distinct task types and routing gaps."
            flush
          />
        </div>
      </Section>

      {/* ── Architecture ─────────────────────────────────────────── */}

      <Section
        id="architecture"
        sectionTitle="System Architecture"
        chapterTitle="I designed a three-layer model: Teams, Roles, and Routing Logic."
      >
        <ArchitectureTabs />
      </Section>

      {/* ── Documentation ────────────────────────────────────────── */}

      <Section
        id="documentation"
        sectionTitle="Documentation"
        chapterTitle="Documentation as strategic alignment."
      >
        <Paragraph>
          The complexity here — 10 roles, multiple team types, routing logic with
          fallbacks — required alignment across ops leadership, product, and
          engineering. I wrote a comprehensive spec that became the single source
          of truth for the build and <Highlight color="green">survives today as institutional knowledge</Highlight>{" "}
          for onboarding and operations planning.
        </Paragraph>
        <div className="[&_figure>div]:pt-12">
          <ImageBlock
            src={`${IMG}/documentation.png`}
            alt="Internal documentation for cross-functional reference on how to handle tasks"
            caption="Internal documentation for cross-functional reference on how to handle tasks."
            flush
          />
        </div>
      </Section>

      {/* ── Collaboration & Execution ─────────────────────────────── */}

      <Section
        id="collaboration"
        sectionTitle="Collaboration & Execution"
        chapterTitle="Navigating competing priorities."
      >
        <Paragraph>
          This project required navigating competing priorities across operations,
          product, and engineering. I led weekly alignment sessions with the VP of
          Operations to validate the role model, worked directly with engineers to
          define routing logic and edge cases, and partnered with the product team
          to sequence the rollout and plan for adoption.
        </Paragraph>
        <Paragraph>
          I also created the comprehensive documentation that became the shared
          reference for implementation — bridging the gap between my design
          thinking and what engineering needed to build.
        </Paragraph>
      </Section>

      {/* ── Outcome ──────────────────────────────────────────────── */}

      <Section
        id="outcome"
        sectionTitle="Outcome"
        chapterTitle="From tabs to tasks."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.25rem] my-2">
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">Structured queues</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              Specialists went from babysitting 15–20 browser tabs to working a
              structured queue.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">Dedicated enterprise support</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              When a paralegal calls, they reach someone who knows their account.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">Measurable performance</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              For the first time, we can see who&apos;s excelling and where
              training is needed.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">Foundation for growth</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              Acquisitions now have an integration playbook.
            </p>
          </div>
        </div>

        <ImageBlock
          src={`${IMG}/dashboard.png`}
          alt="The new tasks dashboard for operations teams at Proof"
          caption="The new tasks dashboard for operations teams @ Proof."
        />

        <Paragraph>
          &ldquo;Project Phoenix&rdquo; launched November 4, 2024.
        </Paragraph>
      </Section>
    </CaseStudyLayout>
  );
}

/* ── Architecture Tabs ── */

const archTabs = [
  {
    id: "teams",
    label: "Teams",
    heading: "Teams create client ownership",
    body: "Every client maps to a team. Enterprise clients get dedicated teams. Platform clients map regionally. Dispatch handles exceptions across all teams.",
    img: `${IMG}/teams.png`,
    alt: "Team type combobox with Enterprise, Platform, and Dispatch options",
  },
  {
    id: "roles",
    label: "Roles",
    heading: "Roles create specialization",
    body: "10 distinct roles, mapped from the lifecycle work. Each has clear responsibilities, required skills, and measurable outputs.",
    img: `${IMG}/roles.png`,
    alt: "Role assignments — QA Coordinator, QA Specialist, and Service Specialist with team member tags",
  },
  {
    id: "routing",
    label: "Routing Logic",
    heading: "Routing logic creates predictability",
    body: "Tasks find the right person through rules, not luck. The system prioritizes continuity (same person on a client\u2019s work) while ensuring coverage.",
    img: `${IMG}/tasks.png`,
    alt: "Task routing — active tasks with affidavit preparation checklist and assignment",
  },
];

function ArchitectureTabs() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const isKeyboard = useRef(false);

  useEffect(() => {
    const btn = btnRefs.current[active];
    const ind = indicatorRef.current;
    const container = containerRef.current;
    if (!btn || !ind || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const x = bRect.left - cRect.left;
    // Suppress slide animation on keyboard input
    if (isKeyboard.current) {
      ind.style.transition = "none";
      isKeyboard.current = false;
    } else {
      ind.style.transition = "transform 250ms var(--ease-in-out-quart), width 250ms var(--ease-in-out-quart)";
    }
    ind.style.width = `${bRect.width}px`;
    ind.style.transform = `translateX(${x}px)`;
  }, [active]);

  return (
    <div style={{ marginTop: ".5rem" }}>
      <style>{`
        .arch-pill { position: relative; z-index: 1; padding: .375rem .875rem; border-radius: 9999px; border: none; cursor: pointer; font-size: .8125rem; font-weight: 500; font-family: inherit; letter-spacing: -.005rem; background: transparent; color: rgba(0,0,0,.5); transition: color 150ms ease, transform 100ms ease; }
        .arch-pill-active { color: #fff; }
        .arch-pill:active { transform: scale(0.97); }
        .arch-tab-panel { display: flex; flex-direction: column; gap: .875rem; transition: opacity 150ms var(--ease-out-cubic), filter 150ms var(--ease-out-cubic); }
        @media (prefers-reduced-motion: reduce) {
          .arch-tab-panel { transition: none; }
          .arch-indicator { transition: none !important; }
        }
      `}</style>
      <div
        ref={containerRef}
        onMouseLeave={() => { const h = hoverRef.current; if (h) h.style.opacity = "0"; }}
        style={{
          display: "inline-flex",
          gap: ".25rem",
          padding: ".25rem",
          borderRadius: 9999,
          backgroundColor: "var(--surface-hover)",
          position: "relative",
        }}
      >
        {/* Hover highlight — follows mouse between inactive pills */}
        <div
          ref={hoverRef}
          style={{
            position: "absolute",
            top: ".25rem",
            left: 0,
            height: "calc(100% - .5rem)",
            borderRadius: 9999,
            backgroundColor: "rgba(0,0,0,.05)",
            willChange: "transform",
            opacity: 0,
            transition: "transform 200ms var(--ease-out-quart), width 200ms var(--ease-out-quart), opacity 150ms ease",
            pointerEvents: "none",
          }}
        />
        {/* Active indicator */}
        <div
          ref={indicatorRef}
          className="arch-indicator"
          style={{
            position: "absolute",
            top: ".25rem",
            left: 0,
            height: "calc(100% - .5rem)",
            borderRadius: 9999,
            backgroundColor: "var(--accent-pill)",
            willChange: "transform",
          }}
        />
        {archTabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { btnRefs.current[i] = el; }}
            onClick={() => setActive(i)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") isKeyboard.current = true; }}
            onMouseEnter={() => {
              if (i === active) return;
              const btn = btnRefs.current[i];
              const container = containerRef.current;
              const h = hoverRef.current;
              if (!btn || !container || !h) return;
              const cRect = container.getBoundingClientRect();
              const bRect = btn.getBoundingClientRect();
              h.style.width = `${bRect.width}px`;
              h.style.transform = `translateX(${bRect.left - cRect.left}px)`;
              h.style.opacity = "1";
            }}
            onMouseLeave={() => {
              const h = hoverRef.current;
              if (h) h.style.opacity = "0";
            }}
            className={`arch-pill ${active === i ? "arch-pill-active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "1.25rem", position: "relative" }}>
        {archTabs.map((t, i) => (
          <div
            key={t.id}
            className="arch-tab-panel"
            style={{
              opacity: active === i ? 1 : 0,
              filter: active === i ? "blur(0)" : "blur(4px)",
              position: active === i ? "relative" : "absolute",
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: active === i ? "auto" : "none",
            }}
          >
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.7)]">{t.heading}</h3>
            <Paragraph>{t.body}</Paragraph>
            <ImageBlock src={t.img} alt={t.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
