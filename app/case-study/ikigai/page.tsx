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

export default function IkigaiPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Ikigai"
      title="A generative AI platform for enterprise data workflows."
      description="Ikigai brings generative AI to enterprise data — helping teams automate complex workflows, generate predictions, and act on insights without writing code. I designed the core platform experience that makes powerful AI capabilities feel approachable."
      meta={[
        { label: "Role", value: "Product Designer" },
        { label: "Timeline", value: "2021" },
      ]}
      sections={sections}
      nextProject={{ slug: "treecard", title: "0→1 banking flows" }}
    >
      {/* ── Overview ───────────────────────────────────────────────── */}

      <Section
        id="overview"
        sectionTitle="Generative AI Platform @ Ikigai"
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
