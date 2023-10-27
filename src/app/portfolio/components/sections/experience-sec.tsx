/**
 * Renders the experience section of the portfolio page, including internship details and skills learned.
 * @returns JSX element
 */
export default function ExperienceSec() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="relative text-white">
        <h1 className="absolute text-7xl font-bold opacity-10 select-none md:text-8xl lg:text-9xl">
          Experience
        </h1>
        <h1 className="absolute mt-32 text-9xl font-bold opacity-10 select-none">
          01
        </h1>
        <h2 className="mt-20 text-4xl font-bold">BOTAŞ(internship)</h2>
        <h2 className="font-mono text-3xl">Software Developer</h2>
        <h2 className="text-3xl font-thin">07/2022 - 08/2022</h2>
      </span>
      <hr className="my-16 mx-auto w-56 h-1 bg-gray-700 rounded border-0" />
      <span className="text-4xl font-bold text-center text-white">
        Things I used & learned at internship.
      </span>
      <p className="mt-3 text-2xl font-thin text-center text-white sm:mx-20 md:mx-40 lg:mx-80">
        During my internship, I participated as a developer in an Artificial
        Intelligence and Image Processing-based Android application development
        project with our intern team.
      </p>
    </div>
  );
}
