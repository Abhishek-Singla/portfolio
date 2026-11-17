import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import {
  About, Impact, Work, Experience, CaseStudy, Writing, Quotes, Projects, Explore, Metrics, PrdExample, Approach,
  Skills, Templates, RoleFit, Education, Contact, Footer,
} from "@/components/Sections";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Impact />
        <Work />
        <Experience />
        <CaseStudy />
        <Writing />
        <Quotes />
        <Projects />
        <Explore />
        <Metrics />
        <PrdExample />
        <Approach />
        <Skills />
        <Templates />
        <RoleFit />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
