/**
 * Renders the navigation section for the portfolio page.
 * @returns A JSX element representing the navigation section.
 */
export default function NavSec() {
  const items = ["Education", "Experience", "Languages", "Contact"];
  return (
    <span className="flex flex-wrap justify-center items-center space-x-4 text-2xl font-thin text-white uppercase select-none">
      {items.map((item) => (
        <a key={item} className="hover:underline" href={"#" + item}>
          {item}
        </a>
      ))}
    </span>
  );
}
