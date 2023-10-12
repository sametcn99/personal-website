/**
 * Renders the hero section of the portfolio page.
 * @returns JSX element
 */
export default function HeroSec() {
  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center"
      id="hero-sec"
    >
      <span className="text-white text-center space-y-2">
        <h1 className="text-5xl font-bold">
          Hello!
          <br /> I&apos;m a Full-Stack Software Developer
        </h1>
        <h2 className="text-3xl">Welcome to my portfolio!</h2>
      </span>
    </div>
  );
}
