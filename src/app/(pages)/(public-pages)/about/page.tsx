import MarkdownComponent from "../../../components/markdowncomponent/markdown";
import "../../../styles/globals.css";

/**
 * Renders the About page component.
 * @returns JSX element
 */
export default function About() {
  return (
    <main className="mx-2 md:mx-16 lg:mx-40 pt-4 animated-gradient px-4">
      <MarkdownComponent />
    </main>
  );
}
