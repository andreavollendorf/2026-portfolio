"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
} from "../components";

const IMG = "/images/easy-a";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export default function EasyAPage() {
  return (
    <CaseStudyLayout
      breadcrumb="EasyA"
      title="Product screens and animations for the world's leading Web3 education app."
      description="EasyA makes blockchain development accessible to millions of developers worldwide. I designed key product screens and crafted animations that bring clarity and delight to complex Web3 concepts."
      meta={[
        { label: "Role", value: "Product Designer" },
        { label: "Focus", value: "Product screens & animation" },
      ]}
      sections={sections}
      nextProject={{ slug: "proof-ops", title: "Operations task management" }}
    >
      {/* ── Overview ───────────────────────────────────────────────── */}

      <Section
        id="overview"
        sectionTitle="Product Design @ EasyA"
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
