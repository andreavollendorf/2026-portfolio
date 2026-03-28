"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  VideoBlock,
  Highlight,
  PillTabs,
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
          Ops specialists weren't managing work. They were babysitting jobs. 
          Every job required active monitoring — manually checking on process servers, 
          hunting for status updates, piecing together what had happened from emails and Slack. 
          Work got dropped when someone was out. Errors got caught after the fact, when a client called.
          The issue wasn't effort. People were working hard. <Highlight color="yellow"> The system just gave them nothing to work with.</Highlight>
        </Paragraph>

        
        <Paragraph>
          This created compounding problems:
        </Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.25rem] my-2">
          <div className="p-4 rounded-lg bg-[var(--surface)]" style={{ boxShadow: "var(--shadow-flush)" }}>
            <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.85)] mb-1">No ownership</h3>
            <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">
              Enterprise clients paying premium rates got the same anonymous
              service as self-serve accounts. 
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
              Some work requires deep expertise. Some requires speed. Treating all work
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
          I interviewed ops specialists, shadowed their workflows, 
          and mapped every touchpoint from job creation to affidavit filing.
          This revealed 10+ distinct task types, each with different
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
        <PillTabs
          tabs={[
            {
              id: "teams",
              label: "Teams",
              content: (
                <>
                  <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.7)]">Teams create client ownership</h3>
                  <Paragraph>Every client maps to a team. Enterprise clients get dedicated teams. Platform clients map regionally. Dispatch handles exceptions across all teams.</Paragraph>
                  <ImageBlock src={`${IMG}/teams.png`} alt="Team type combobox with Enterprise, Platform, and Dispatch options" />
                </>
              ),
            },
            {
              id: "roles",
              label: "Roles",
              content: (
                <>
                  <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.7)]">Roles create specialization</h3>
                  <Paragraph>10 distinct roles, mapped from the lifecycle work. Each has clear responsibilities, required skills, and measurable outputs.</Paragraph>
                  <ImageBlock src={`${IMG}/roles.png`} alt="Role assignments — QA Coordinator, QA Specialist, and Service Specialist with team member tags" />
                </>
              ),
            },
            {
              id: "routing",
              label: "Routing Logic",
              content: (
                <>
                  <h3 className="text-[13px] font-[550] text-[rgba(0,0,0,.7)]">Routing logic creates predictability</h3>
                  <Paragraph>Tasks find the right person through rules, not luck. The system prioritizes continuity (same person on a client{"\u2019"}s work) while ensuring coverage.</Paragraph>
                  <ImageBlock src={`${IMG}/tasks.png`} alt="Task routing — active tasks with affidavit preparation checklist and assignment" />
                </>
              ),
            },
          ]}
        />
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

