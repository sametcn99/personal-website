import HeroSec from "./components/sections/hero-sec";

/**
 * Renders the Portfolio page with sections for Education, Experience, Languages, and Contact.
 * @returns The JSX element for the Portfolio page.
 */
export default function Portfolio() {
  return (
    <main className="overflow-hidden max-h-screen">
      <HeroSec />
    </main>
  );
}
