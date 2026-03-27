"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  Quote,
  PillTabs,
  Highlight,
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
      description={<>Userwise gives mobile game developers powerful tools to retain players. I partnered closely with Maddie (Head of Product) and Tom (Co-founder) to design a LiveOps platform that helps studios retain players without adding operational complexity. <Highlight color="green">I was embedded as design partner to founders</Highlight>, translating product vision into shipped features while working directly with engineering.</>}
      meta={[
        { label: "Role", value: "Lead Product Designer\n(Founder Collaboration)" },
        { label: "Timeline", value: "2022–2023" },
      ]}
      sections={sections}
      nextProject={{ slug: "proof-serves", title: "Proof Serves" }}
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
          work focused on <Highlight color="pink">simplifying powerful tooling into clear, intuitive
          workflows</Highlight> that feel approachable, even for non-technical teams.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/slot.png`}
          alt="Slot configuration with basic settings, content pricing, and trigger rules"
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
          handle real operational complexity while remaining <Highlight color="yellow">usable for teams who
          aren&apos;t deeply technical</Highlight>. Every feature needed clear defaults,
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
        chapterTitle="Strategic partnership with founders and product leadership."
      >
        <Paragraph>
          I worked as an embedded design partner, not just a service provider.
          Weekly planning sessions with the Head of Product and Co-founder meant
          I was making product decisions — what to build, what to defer, how to
          sequence features for maximum impact. I conducted user interviews every
          two weeks to pressure-test direction, then translated those insights
          into wireframes, high-fidelity designs, and eng-ready specs. The pace
          was fast, the feedback loops were tight, and the collaboration was real.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/wire.png`}
          alt="Early wireframing explorations for the platform"
          caption="Early wireframing."
        />
      </Section>

      {/* ── What I Designed ────────────────────────────────────────── */}

      <Section
        id="designed"
        sectionTitle="What I Designed"
        chapterTitle="Core features that power the platform today."
      >
        <PillTabs
          tabs={[
            {
              id: "campaigns",
              label: "Campaigns",
              content: (
                <>
                  <Paragraph>
                    Campaign creation, scheduling, and management. Designed flows for
                    setting up targeted player campaigns with configurable triggers,
                    timing, and content. Focused on making complex scheduling logic visible
                    and editable without overwhelming users.
                  </Paragraph>
                  <ImageBlock
                    src={`${IMG}/campaign.png`}
                    alt="Campaign scheduling and management interface"
                  />
                </>
              ),
            },
            {
              id: "shops",
              label: "Shops",
              content: (
                <>
                  <Paragraph>
                    In-game store configuration. Designed interfaces for creating and
                    managing offers, bundles, and pricing logic. The challenge was
                    representing complex pricing rules (time-limited, player-segment-specific,
                    tiered) in a way that&apos;s scannable and editable.
                  </Paragraph>
                  <ImageBlock
                    src={`${IMG}/shops.png`}
                    alt="In-game shop configuration interface with offers and pricing"
                  />
                </>
              ),
            },
            {
              id: "version-history",
              label: "Version History",
              content: (
                <>
                  <Paragraph>
                    Change tracking and rollback. Designed a version history system that
                    lets teams see what changed, when, and by whom &mdash; with the
                    ability to restore previous states. Critical for teams managing live
                    games where mistakes can impact real players.
                  </Paragraph>
                  <ImageBlock
                    src={`${IMG}/version-history.png`}
                    alt="Version history interface showing change tracking and rollback"
                  />
                </>
              ),
            },
            {
              id: "json",
              label: "JSON Upload",
              content: (
                <>
                  <Paragraph>
                    Bulk data import with validation. Designed upload flows that handle
                    large JSON files, surface validation errors clearly, and let users fix
                    issues before committing changes. Focused on making error states
                    actionable rather than just informative.
                  </Paragraph>
                  <ImageBlock
                    src={`${IMG}/json.png`}
                    alt="JSON upload interface with validation and error handling"
                  />
                </>
              ),
            },
          ]}
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
          The platform launched in 2023 and is <Highlight color="purple">still actively used today</Highlight>, more
          than two years later. It serves studios including Halfbrick (makers of
          Fruit Ninja) and powers LiveOps for some of the world&apos;s
          most-played mobile games. The product&apos;s success allowed Userwise
          to expand beyond the platform into full-service game development and
          LiveOps management &mdash; growth enabled by a foundation that worked.
        </Paragraph>
        <Paragraph>
          The longevity of this work reflects the strategic decisions made early:
          prioritizing clarity over feature breadth, building for non-technical
          users while preserving power-user capabilities, and designing systems
          that could compound rather than require constant maintenance.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/result.png`}
          alt="Campaigns root view for Schedule or Triggered campaigns"
          caption="Campaigns (root) for &ldquo;Schedule&rdquo; or &ldquo;Triggered.&rdquo;"
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
