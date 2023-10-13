/**
 * Renders the navigation section for the portfolio page.
 * @returns A JSX element representing the navigation section.
 */
export default function NavSec() {
  const items = ["Education", "Experience", "Languages", "Contact"];
  return (
    <span className="text-white flex justify-center items-center space-x-4 uppercase font-thin select-none text-2xl">
      {items.map((item) => (
        <a key={item} className="hover:underline" href={"#" + item}>
          {item}
        </a>
      ))}
    </span>
  );
}
