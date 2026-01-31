"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
} from "../components";

const IMG = "/images/storymaster";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export default function StorymasterPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Storymaster"
      title="An AI-driven language learning app built around storytelling."
      description="Storymaster uses AI to generate personalized stories that adapt to a learner's level, making language acquisition feel natural and engaging. I designed the core learning experience — from story generation to vocabulary reinforcement."
      meta={[
        { label: "Role", value: "Product Designer" },
        { label: "Timeline", value: "2022" },
      ]}
      sections={sections}
      nextProject={{ slug: "ikigai", title: "Generative AI platform" }}
    >
      {/* ── Overview ───────────────────────────────────────────────── */}

      <Section
        id="overview"
        sectionTitle="Language Learning @ Storymaster"
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
