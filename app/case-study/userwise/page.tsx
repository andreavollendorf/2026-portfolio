"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
} from "../components";

const IMG = "/images/userwise";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export default function UserwisePage() {
  return (
    <CaseStudyLayout
      breadcrumb="Userwise"
      title="A liveops platform for mobile game studios."
      description="Userwise gives game studios the tools to run live operations — managing in-game events, offers, and player segments in real time. I designed the core platform experience that helps teams ship faster without engineering support."
      meta={[
        { label: "Role", value: "Product Designer" },
        { label: "Timeline", value: "2021" },
      ]}
      sections={sections}
      nextProject={{ slug: "easy-a", title: "Web3 education app" }}
    >
      {/* ── Overview ───────────────────────────────────────────────── */}

      <Section
        id="overview"
        sectionTitle="Liveops Platform @ Userwise"
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
