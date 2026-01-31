"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
} from "../components";

const IMG = "/images/proof-ops";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export default function ProofOpsPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Proof / Ops"
      title="Operations task management for a nationwide process serving network."
      description="Proof's operations team coordinates thousands of serves daily across a distributed network of process servers. I designed a task management system that brought structure and visibility to their most complex workflows."
      meta={[
        { label: "Role", value: "Director of Product Design" },
        { label: "Timeline", value: "2025" },
      ]}
      sections={sections}
      nextProject={{ slug: "theoremreach", title: "Strategy breakdown tool" }}
    >
      {/* ── Overview ───────────────────────────────────────────────── */}

      <Section
        id="overview"
        sectionTitle="Operations Task Management @ Proof"
        chapterTitle="Overview"
      >
        <Paragraph>
          Case study content coming soon.
        </Paragraph>
      </Section>

      {/* ── Problem ────────────────────────────────────────────────── */}

      <Section
        id="problem"
        sectionTitle="Problem"
        chapterTitle="The problem"
      >
        <Paragraph>
          Case study content coming soon.
        </Paragraph>
      </Section>

      {/* ── Approach ───────────────────────────────────────────────── */}

      <Section
        id="approach"
        sectionTitle="Approach"
        chapterTitle="The approach"
      >
        <Paragraph>
          Case study content coming soon.
        </Paragraph>
      </Section>

      {/* ── Solution ───────────────────────────────────────────────── */}

      <Section
        id="solution"
        sectionTitle="Solution"
        chapterTitle="The solution"
      >
        <Paragraph>
          Case study content coming soon.
        </Paragraph>
      </Section>

      {/* ── Outcome ────────────────────────────────────────────────── */}

      <Section
        id="outcome"
        sectionTitle="Outcome"
        chapterTitle="The outcome"
      >
        <Paragraph>
          Case study content coming soon.
        </Paragraph>
      </Section>
    </CaseStudyLayout>
  );
}
