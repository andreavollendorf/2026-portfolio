"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  TwoImages,
  KeyGaps,
  WhatWorked,
  Callout,
  LearningItem,
} from "../components";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "research", label: "Research" },
  { id: "iteration", label: "Iteration" },
  { id: "outcome", label: "Outcome" },
  { id: "next-steps", label: "Next Steps" },
  { id: "learnings", label: "What I learned" },
];

export default function CaseStudyPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Azure IoT / Dashboard & App"
      title="Intelligent monitoring for the production line."
      description="Designing an AI-powered dashboard and mobile companion that helps Operation Technicians manage thousands of machines without cognitive overload."
      meta={[
        { label: "Role", value: "UX/UI Designer" },
        { label: "Timeline", value: "6 months\nJanuary – June 2025" },
        { label: "Team", value: "Sahar Atoli, Madelyn Lee, Thomas Ermetes, Emily Hao, & Elisha Jeon" },
        { label: "Skills", value: "UX/UI    Product Strategy    User Research" },
      ]}
      sections={sections}
    >
      <Section
        id="overview"
        sectionTitle="Overview"
        chapterTitle="How might we help Operation Technicians monitor thousands of machines without being overwhelmed by data?"
        subtitle="A 6-month journey redesigning enterprise monitoring."
      >
        <Paragraph>
          As one of five designers on this sponsored capstone for Microsoft, I reimagined how
          Operation Technicians use Azure IoT. The first three months focused on dashboard
          redesign with AI Copilot integration. The next three explored net-new mobile experiences
          for on-the-go monitoring. I personally led the design of glanceable summaries and remote
          monitoring on the mobile app.
        </Paragraph>
      </Section>

      <Section
        id="problem"
        sectionTitle="The Problem"
        chapterTitle="Monitoring thousands of machines creates cognitive overload."
        subtitle="When everything is urgent, nothing is."
      >
        <Paragraph>
          Azure IoT helps Operation Technicians manage production lines — think donut factories
          or automotive plants with hundreds of machines running simultaneously. The current
          experience? A flood of raw data with no clear priorities.
        </Paragraph>
        <KeyGaps
          gaps={[
            { description: "Dashboard floods with alerts during critical situations with no priority system." },
            { description: "Must physically leave station to investigate, leaving the dashboard behind." },
            { description: "Wastes time piecing together information from multiple sources." },
            { description: "No mobile access — OT's can't monitor on-the-go." },
          ]}
        />
      </Section>

      <Section
        id="solution"
        sectionTitle="Solution"
        chapterTitle="Introducing a Copilot AI integrated dashboard + mobile companion."
        subtitle="AI-powered monitoring across platforms."
      >
        <Paragraph>
          We redesigned the Azure IoT experience across two platforms: an intelligent desktop
          dashboard with Copilot integration for comprehensive monitoring, and a mobile app for
          on-the-go checks and essential remote actions.
        </Paragraph>
        <ImageBlock alt="Dashboard and mobile app showcase" />
      </Section>

      <Section
        id="research"
        sectionTitle="Research"
        chapterTitle="Understanding the daily reality of Operation Technicians."
        subtitle="Contextual inquiry across three facilities."
      >
        <Paragraph>
          We spent time shadowing OTs at manufacturing plants to understand their workflows,
          pain points, and the moments where the current tools failed them most.
        </Paragraph>
        <TwoImages
          images={[
            { alt: "Research session photo" },
            { alt: "Affinity mapping" },
          ]}
        />
      </Section>

      <Section
        id="iteration"
        sectionTitle="Iteration"
        chapterTitle="Testing assumptions with real operators."
        subtitle="3 rounds of usability testing, countless pivots."
      >
        <Paragraph>
          Our initial designs looked great in Figma but fell apart in the field.
          Real factory floors are noisy, operators wear gloves, and screens are
          often viewed from several feet away.
        </Paragraph>
        <WhatWorked
          worked={[
            "Large touch targets for gloved operation",
            "High-contrast color coding for status",
            "Audio cues for critical alerts",
            "Simplified navigation structure",
          ]}
          didnt={[
            "Gesture-based interactions",
            "Detailed data tables on main view",
            "Subtle color variations for priority",
            "Modal-heavy confirmation flows",
          ]}
        />
        <TwoImages
          images={[
            { alt: "Early wireframes" },
            { alt: "Final iteration" },
          ]}
        />
      </Section>

      <Section
        id="outcome"
        sectionTitle="Looking Back"
        chapterTitle="Looking back on the most ambitious project I've worked on so far."
      >
        <ImageBlock alt="Team photo or final showcase" />
        <Callout>
          I learned how to navigate complex spaces and use cross-team
          feedback to continually refine and elevate my work.
        </Callout>
        <Paragraph>
          Special thanks to my amazing peers and the ACX team at Microsoft for
          their invaluable support!
        </Paragraph>
      </Section>

      <Section
        id="next-steps"
        sectionTitle="Next Steps"
        chapterTitle="Where we're headed from here."
      >
        <Paragraph>
          The pilot showed promising results, and the team is now exploring expanded
          mobile capabilities including offline mode and predictive maintenance alerts.
        </Paragraph>
      </Section>

      <Section
        id="learnings"
        sectionTitle="What I Learned"
        chapterTitle=""
      >
        <div className="-mt-8">
          <LearningItem title="The value of a good design system.">
            Working with Fluent 2 showed me that design systems
            become even more critical at scale. They keep teams aligned,
            reduce inconsistencies, and make collaboration across
            disciplines smoother. I learned how to build within a system
            while still leaving room for flexibility and thoughtful craft.
          </LearningItem>
          <LearningItem title="Finding my footing in new domains.">
            I stepped into IoT and OT workflows with zero experience in
            it, and while intimidated at first, I soon caught myself up to
            speed after doing research and asking lots of questions
            (thank you, Thomas). Although I don&apos;t know every
            methodology in the book, I was able to understand missing
            pieces and areas for improvement in the experience,
            reminding me how fun it is to be curious and willing to dig into
            new spaces.
          </LearningItem>
          <LearningItem title="Prototype fast. Learn faster.">
            Quick prototypes helped us test assumptions early, uncover
            edge-cases faster, and get richer feedback from engineers,
            PMs, and accessibility specialists. Iteration became the
            engine that moved the whole project forward, and
            communicating design decisions for critique was extremely
            valuable.
          </LearningItem>
        </div>
      </Section>
    </CaseStudyLayout>
  );
}
