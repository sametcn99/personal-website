import React from "react";
import ContactSec from "./components/contact-sec";
import EducationSec from "./components/education-sec";
import ExperienceSec from "./components/experience-sec";
import HeroSec from "./components/hero-sec";
import LanguagesSec from "./components/languages-sec";

export default function Portfolio() {
  return (
    <main className="overflow-hidden">
      <HeroSec />
      <EducationSec />
      <ExperienceSec />
      <LanguagesSec />
      <ContactSec />
    </main>
  );
}
