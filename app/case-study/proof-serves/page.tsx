"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  ImageCarousel,
  Stats,
  Quote,
  TeamMember,
} from "../components";

const IMG = "/images/proof-serves";

const sections = [
  { id: "why-it-mattered", label: "Why it mattered" },
  { id: "where-we-started", label: "Where we started" },
  { id: "research", label: "Research" },
  { id: "reframe", label: "The reframe" },
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
      description="Proof handles service of process: the constitutional requirement that someone must be formally notified when they're sued. Our platform connects thousands of law firms with a nationwide network of process servers. These serves often involve urgent, emotionally charged cases where uncertainty quickly erodes trust."
      meta={[
        { label: "Role", value: "Director of Product Design\n(Player/Coach)" },
        { label: "Timeline", value: "July–December 2025" },
      ]}
      sections={sections}
      heroContent={
        <ImageCarousel
          images={[
            { src: `${IMG}/carousel-1.png`, alt: "Redesigned serve experience" },
            { src: `${IMG}/carousel-2.png`, alt: "Job tracker view" },
            { src: `${IMG}/carousel-3.png`, alt: "Unified history" },
            { src: `${IMG}/carousel-4.png`, alt: "Address intelligence" },
            { src: `${IMG}/carousel-5.png`, alt: "Serves table" },
          ]}
        />
      }
      nextProject={{ slug: "easy-a", title: "EasyA" }}
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
        <ImageBlock
          src={`${IMG}/research.png`}
          alt="Chat thread analysis using Claude"
          caption="Used Claude to analyze chat threads at scale."
        />
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
        subtitle="There was a structural problem."
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
        <Paragraph>
          &ldquo;Jobs&rdquo; were an internal concept that made sense for ops but meant
          nothing to clients. We needed a new mental model: one serve, one story, regardless
          of how many reassignments happened behind the scenes. The serve became the container.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/data-model.png`}
          alt="The new data model for serves"
          caption="The new data model for serves"
        />
      </Section>

      {/* ── Solution ─────────────────────────────────────────────────── */}

      <Section
        id="solution"
        sectionTitle="Solution"
        chapterTitle="Three experiences that remove uncertainty."
      >
        {/* Job Tracker */}
        <h3 className="text-[18px] font-medium mt-6 mb-2">Job tracker</h3>
        <Paragraph>
          Answers one question: is this progressing the way it should? Instead of binary
          status labels, it surfaces contextual health indicators (on track, needs attention,
          at risk) and explains why. Attempts count in aggregate across the full serve. Risk
          surfaces early, not after failure.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/tracker.png`}
          alt="Job tracker showing health indicators"
        />

        {/* Unified History */}
        <h3 className="text-[18px] font-medium mt-6 mb-2">Unified history</h3>
        <Paragraph>
          Reassignments no longer reset the conversation. A single timeline preserves all
          attempts, chats, and documents regardless of how many times the serve changes hands.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/history.png`}
          alt="Unified history timeline"
        />

        {/* Address Intelligence */}
        <h3 className="text-[18px] font-medium mt-6 mb-2">Address intelligence</h3>
        <Paragraph>
          Many failed attempts came from address quality issues. We integrated Melissa Data to
          validate addresses proactively and surface risks before dispatch.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/address.png`}
          alt="Address intelligence validation"
        />
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

        <ImageBlock
          src={`${IMG}/iteration.png`}
          alt="Pages of design iteration"
          caption="Just one of many pages from months of iteration."
        />
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
          src={`${IMG}/serve-table.png`}
          alt="New Serves table built with AG Grid"
          caption="New Serves table built with AG Grid"
        />
      </Section>
    </CaseStudyLayout>
  );
}
