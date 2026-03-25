"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
} from "../components";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export default function TheoremReachPage() {
  return (
    <CaseStudyLayout
      breadcrumb="TheoremReach"
      title="A strategy breakdown tool for mobile survey research."
      description="TheoremReach connects brands with mobile audiences for market research. I designed a tool that helps researchers break down complex survey strategies into actionable, measurable segments."
      meta={[
        { label: "Role", value: "Product Designer" },
        { label: "Timeline", value: "2021" },
      ]}
      sections={sections}
      nextProject={{ slug: "proof-serves", title: "Client experience redesign" }}
    >
      {/* ── Overview ───────────────────────────────────────────────── */}

      <Section
        id="overview"
        sectionTitle="Strategy Breakdown Tool @ TheoremReach"
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
