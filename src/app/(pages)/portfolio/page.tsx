import React from "react";
import ContactSec from "./components/contact-sec";
import EducationSec from "./components/education-sec";
import ExperienceSec from "./components/experience-sec";
import HeroSec from "./components/hero-sec";
import LanguagesSec from "./components/languages-sec";
import NavSec from "./components/nav-sec";

export default function Portfolio() {
  return (
    <main className="overflow-hidden">
      <HeroSec />
      <NavSec />
      <section id="Education">
        <EducationSec />
      </section>
      <section id="Experience">
        <ExperienceSec />
      </section>
      <section id="Languages">
        <LanguagesSec />
      </section>
      <section id="Contact">
        <ContactSec />
      </section>
    </main>
  );
}
