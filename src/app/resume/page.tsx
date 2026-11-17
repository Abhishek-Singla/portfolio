import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ResumeView from "@/components/ResumeView";

export const metadata: Metadata = {
  title: "Resume | Abhishek Singla",
  description: "Print-friendly web version of Abhishek Singla's full resume.",
  alternates: { canonical: "/resume" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <Nav />
      <ResumeView variant="full" />
    </>
  );
}
