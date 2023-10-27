import ScrollToTop from "./components/scroll-up-button/scroll-up-button";
import ContactSec from "./components/sections/contact-sec";
import EducationSec from "./components/sections/education-sec";
import ExperienceSec from "./components/sections/experience-sec";
import HeroSec from "./components/sections/hero-sec";
import LanguagesSec from "./components/sections/languages-sec";
import NavSec from "./components/sections/nav-sec";

/**
 * Renders the Portfolio page with sections for Education, Experience, Languages, and Contact.
 * @returns The JSX element for the Portfolio page.
 */
export default function Portfolio() {
  return (
    <main className="overflow-hidden">
      <ScrollToTop />
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
