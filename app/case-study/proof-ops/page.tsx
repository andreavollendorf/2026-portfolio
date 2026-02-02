"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  VideoBlock,
} from "../components";

const IMG = "/images/proof-ops";

const sections = [
  { id: "context", label: "Context" },
  { id: "reality", label: "The reality" },
  { id: "problem", label: "The problem" },
  { id: "mapping", label: "Mapping work" },
  { id: "architecture", label: "Architecture" },
  { id: "documentation", label: "Documentation" },
  { id: "outcome", label: "Outcome" },
];

export default function ProofOpsPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Proof / Ops"
      title="Designing the systems that transformed how ops specialists serve thousands of law firms."
      description="Proof's operations team coordinates thousands of serves daily across a distributed network of process servers. I designed a task management system that brought structure, ownership, and visibility to their most complex workflows."
      meta={[
        { label: "Role", value: "Principal Product Designer" },
        { label: "Timeline", value: "8 weeks\n(Sep–Nov 2024)" },
      ]}
      sections={sections}
      nextProject={{ slug: "proof-serves", title: "Proof Serves" }}
      heroContent={
        <VideoBlock
          src={`${IMG}/ops-teams.mp4`}
          poster={`${IMG}/cover.webp`}
          alt="Proof Ops team management interface"
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
          contained
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
          but there was no structure for what needed attention or who should handle
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 my-8">
          <div>
            <h3 className="text-[15px] font-medium mb-1">No ownership</h3>
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              Enterprise clients paying premium rates got the same anonymous
              service as self-serve accounts. No one knew their history.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-medium mb-1">No visibility</h3>
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              We couldn&apos;t measure performance because there was nothing to
              measure. Everyone did everything.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-medium mb-1">No specialization</h3>
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              Some work requires deep expertise (affidavit prep, compliance
              review). Some requires speed (dispatch, basic QA). Treating all work
              as interchangeable meant neither got optimized.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-medium mb-1">No scalability</h3>
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              Every acquisition, every new service line, every enterprise deal
              required ad-hoc workarounds. There was no model for how to organize work.
            </p>
          </div>
        </div>

        <ImageBlock
          src={`${IMG}/old-dashboard.png`}
          alt="The old dashboard that ops was working out of"
          caption="The old dashboard — a choose-your-own-adventure with no ownership."
          contained
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
        <h3 className="text-[18px] font-medium mt-6 mb-2">Teams create client ownership</h3>
        <Paragraph>
          Every client maps to a team. Enterprise clients get dedicated teams.
          Platform clients map regionally. Dispatch handles exceptions across all
          teams.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/teams.png`}
          alt="Team type combobox with Enterprise, Platform, and Dispatch options"
          contained
        />

        <h3 className="text-[18px] font-medium mt-6 mb-2">Roles create specialization</h3>
        <Paragraph>
          10 distinct roles, mapped from the lifecycle work. Each has clear
          responsibilities, required skills, and measurable outputs.
        </Paragraph>
        <div className="[&_figure>div]:pt-10">
          <ImageBlock
            src={`${IMG}/roles.png`}
            alt="Role assignments — QA Coordinator, QA Specialist, and Service Specialist with team member tags"
            flush
            maxWidth="85%"
          />
        </div>

        <h3 className="text-[18px] font-medium mt-6 mb-2">Routing logic creates predictability</h3>
        <Paragraph>
          Tasks find the right person through rules, not luck. The system
          prioritizes continuity (same person on a client&apos;s work) while
          ensuring coverage.
        </Paragraph>
        <div className="[&_figure>div]:pt-12">
          <ImageBlock
            src={`${IMG}/tasks.png`}
            alt="Task routing — active tasks with affidavit preparation checklist and assignment"
            flush
          />
        </div>
      </Section>

      {/* ── Documentation ────────────────────────────────────────── */}

      <Section
        id="documentation"
        sectionTitle="Documentation"
        chapterTitle="Documentation as a design artifact."
      >
        <Paragraph>
          The complexity here — 10 roles, multiple team types, routing logic with
          fallbacks — couldn&apos;t live in wireframes. I wrote a comprehensive spec
          covering every task type: what triggers it, what information surfaces,
          what actions are available, SLA expectations, escalation paths.
        </Paragraph>
        <Paragraph>
          This document became the single source of truth for the build and
          survives today as institutional knowledge.
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

      {/* ── Outcome ──────────────────────────────────────────────── */}

      <Section
        id="outcome"
        sectionTitle="Outcome"
        chapterTitle="From tabs to tasks."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 my-8">
          <div>
            <h3 className="text-[15px] font-medium mb-1">Structured queues</h3>
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              Specialists went from babysitting 15–20 browser tabs to working a
              structured queue.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-medium mb-1">Dedicated enterprise support</h3>
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              When a paralegal calls, they reach someone who knows their account.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-medium mb-1">Measurable performance</h3>
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              For the first time, we can see who&apos;s excelling and where
              training is needed.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-medium mb-1">Foundation for growth</h3>
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              Acquisitions now have an integration playbook.
            </p>
          </div>
        </div>

        <ImageBlock
          src={`${IMG}/dashboard.png`}
          alt="The new tasks dashboard for operations teams at Proof"
          caption="The new tasks dashboard for operations teams @ Proof."
          contained
        />

        <Paragraph>
          &ldquo;Project Phoenix&rdquo; launched November 4, 2024.
        </Paragraph>
      </Section>
    </CaseStudyLayout>
  );
}
