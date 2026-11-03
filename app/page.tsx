import { PersonJsonLd } from "@/components/json-ld";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { GitHub } from "@/components/sections/github";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

/** ISR: the page (and its GitHub data) is regenerated at most once an hour. */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <About />
      <Experience />

      <Projects />
      <Skills />

      <GitHub />
      <Education />
      <Contact />
    </>
  );
}
