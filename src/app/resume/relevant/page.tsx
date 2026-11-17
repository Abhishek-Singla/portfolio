import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ResumeView from "@/components/ResumeView";

export const metadata: Metadata = {
  title: "Product-focused resume | Abhishek Singla",
  description: "Print-friendly web version of the product-focused resume: product, payments and banking roles only.",
  alternates: { canonical: "/resume/relevant" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <Nav />
      <ResumeView variant="relevant" />
    </>
  );
}
