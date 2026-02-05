"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  Quote,
} from "../components";

const IMG = "/images/userwise";

const sections = [
  { id: "outcome", label: "The outcome" },
  { id: "challenge", label: "The challenge" },
  { id: "process", label: "How I worked" },
  { id: "designed", label: "What I designed" },
  { id: "result", label: "The result" },
];

export default function UserwisePage() {
  return (
    <CaseStudyLayout
      breadcrumb="Userwise"
      title="Designing player retention tools for mobile game developers."
      description="Userwise gives mobile game developers powerful tools to retain players. I partnered closely with Maddie (Head of Product) and Tom (Co-founder) to design a LiveOps platform that helps studios retain players without adding operational complexity."
      meta={[
        { label: "Role", value: "Lead Product Designer\n(Founder Collaboration)" },
        { label: "Timeline", value: "2022–2023" },
      ]}
      sections={sections}
      nextProject={{ slug: "proof-ops", title: "Proof Ops" }}
      heroContent={
        <ImageBlock
          src={`${IMG}/userwise-hero.png`}
          alt="Userwise campaign scheduling interface"
        />
      }
    >
      {/* ── The Outcome ────────────────────────────────────────────── */}

      <Section
        id="outcome"
        sectionTitle="LiveOps Platform @ Userwise"
        chapterTitle="Shipped a LiveOps platform that&rsquo;s still serving studios like Halfbrick (Fruit Ninja) two years later."
      >
        <Paragraph>
          Userwise gives mobile game developers powerful tools to retain players.
          I partnered closely with Maddie (Head of Product) and Tom (Co-founder)
          of Userwise to design a LiveOps platform that helps mobile game
          developers retain players without adding operational complexity. The
          work focused on simplifying powerful tooling into clear, intuitive
          workflows that feel approachable, even for non-technical teams.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/slots.png`}
          alt="Shops feature showing slots grid with pricing and segment details"
          contained
        />
      </Section>

      {/* ── The Challenge ──────────────────────────────────────────── */}

      <Section
        id="challenge"
        sectionTitle="The Challenge"
        chapterTitle="Powerful features that needed to feel simple."
      >
        <Paragraph>
          LiveOps platforms are inherently complex &mdash; scheduling campaigns,
          configuring in-game shops, managing versions across environments,
          importing bulk data. The challenge was designing interfaces that could
          handle real operational complexity while remaining usable for teams who
          aren&apos;t deeply technical. Every feature needed clear defaults,
          visible state, and recoverable actions.
        </Paragraph>
        <Quote attribution="Head of Product @ Userwise">
          I really loved your ability to take my thoughts and my ideas and my
          half baked concepts about what I wanted to achieve and what I wanted to
          build for my product. You turned that thing that I had in my head into
          reality, and that really meant a lot to me.
        </Quote>
      </Section>

      {/* ── How I Worked ───────────────────────────────────────────── */}

      <Section
        id="process"
        sectionTitle="How I Worked"
        chapterTitle="Wireframes to production, in close partnership with the founders."
      >
        <Paragraph>
          Working in tight feedback loops with the team (weekly feature planning,
          user interviews every two weeks), I translated those conversations into
          UX flows and wireframes. From there, I moved into high-fidelity
          design, iterating until features were ready for engineering. The pace
          was fast: weekly check-ins, rapid iteration, tight collaboration.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/wire.png`}
          alt="Early wireframing explorations for the platform"
          caption="Early wireframing."
          contained
        />
      </Section>

      {/* ── What I Designed ────────────────────────────────────────── */}

      <Section
        id="designed"
        sectionTitle="What I Designed"
        chapterTitle="Core features that power the platform today."
      >
        <h3 className="text-[18px] font-medium mt-6 mb-2">Campaigns</h3>
        <Paragraph>
          Campaign creation, scheduling, and management. Designed flows for
          setting up targeted player campaigns with configurable triggers,
          timing, and content. Focused on making complex scheduling logic visible
          and editable without overwhelming users.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/campaign.png`}
          alt="Campaign scheduling and management interface"
          contained
        />

        <h3 className="text-[18px] font-medium mt-6 mb-2">Shops</h3>
        <Paragraph>
          In-game store configuration. Designed interfaces for creating and
          managing offers, bundles, and pricing logic. The challenge was
          representing complex pricing rules (time-limited, player-segment-specific,
          tiered) in a way that&apos;s scannable and editable.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/shops.png`}
          alt="In-game shop configuration interface with offers and pricing"
          contained
        />

        <h3 className="text-[18px] font-medium mt-6 mb-2">Version history</h3>
        <Paragraph>
          Change tracking and rollback. Designed a version history system that
          lets teams see what changed, when, and by whom &mdash; with the
          ability to restore previous states. Critical for teams managing live
          games where mistakes can impact real players.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/version-history.png`}
          alt="Version history interface showing change tracking and rollback"
          contained
        />

        <h3 className="text-[18px] font-medium mt-6 mb-2">JSON upload</h3>
        <Paragraph>
          Bulk data import with validation. Designed upload flows that handle
          large JSON files, surface validation errors clearly, and let users fix
          issues before committing changes. Focused on making error states
          actionable rather than just informative.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/json.png`}
          alt="JSON upload interface with validation and error handling"
          contained
        />

        <Quote attribution="Co-founder @ Userwise">
          You somehow managed to declutter the chaos of my mind and turn it into
          actual designs that I could physically see in front of my eyes.
        </Quote>
      </Section>

      {/* ── The Result ─────────────────────────────────────────────── */}

      <Section
        id="result"
        sectionTitle="The Result"
        chapterTitle="A platform that shipped, compounded, and lasted."
      >
        <Paragraph>
          The platform launched in 2023 and is still actively used today, more
          than two years later. It serves studios including Halfbrick (makers of
          Fruit Ninja) and powers LiveOps for some of the world&apos;s
          most-played mobile games. The product&apos;s success allowed Userwise
          to expand beyond the platform into full-service game development and
          LiveOps management &mdash; growth enabled by a foundation that worked.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/result.png`}
          alt="Campaigns root view for Schedule or Triggered campaigns"
          caption="Campaigns (root) for &ldquo;Schedule&rdquo; or &ldquo;Triggered.&rdquo;"
          contained
        />

        <Quote attribution="Head of Product @ Userwise">
          Through your skills and your expertise and your talents, you truly have
          the ability to turn people&apos;s dreams into reality, and I really
          think that&apos;s a great superpower to have.
        </Quote>
      </Section>
    </CaseStudyLayout>
  );
}
