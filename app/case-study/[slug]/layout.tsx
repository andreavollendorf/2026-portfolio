import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Study",
  description:
    "A product design case study by Andrea Vollendorf.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
