"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
} from "../components";

const IMG = "/images/treecard";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export default function TreecardPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Treecard"
      title="0→1 banking flows for an eco-friendly debit card."
      description="Treecard is a fee-free debit card that plants trees with every purchase. I designed the core banking flows from scratch — onboarding, account setup, transactions, and card management — balancing financial clarity with the brand's mission-driven identity."
      meta={[
        { label: "Role", value: "Product Designer" },
        { label: "Timeline", value: "2022" },
      ]}
      sections={sections}
      nextProject={{ slug: "userwise", title: "Liveops platform" }}
    >
      {/* ── Overview ───────────────────────────────────────────────── */}

      <Section
        id="overview"
        sectionTitle="Banking Flows @ Treecard"
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
