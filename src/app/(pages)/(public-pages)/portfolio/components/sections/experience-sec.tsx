/**
 * Renders the experience section of the portfolio page, including internship details and skills learned.
 * @returns JSX element
 */
export default function ExperienceSec() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <span className="relative text-white ">
        <h1 className="absolute md:text-8xl lg:text-9xl text-7xl opacity-10 font-bold select-none">
          Experience
        </h1>
        <h1 className="absolute text-9xl opacity-10 font-bold mt-32 select-none">
          01
        </h1>
        <h2 className="text-4xl font-bold mt-20">BOTAŞ(internship)</h2>
        <h2 className="text-3xl font-mono">Software Developer</h2>
        <h2 className="text-3xl font-thin">07/2022 - 08/2022</h2>
      </span>
      <hr className="w-56 h-1 mx-auto my-16 bg-gray-700 border-0 rounded" />
      <span className="text-white font-bold text-4xl text-center">
        Things I used & learned at internship.
      </span>
      <p className="text-white font-thin text-2xl text-center mt-3 sm:mx-20 md:mx-40 lg:mx-80">
        During my internship, I participated as a developer in an Artificial
        Intelligence and Image Processing-based Android application development
        project with our intern team.
      </p>
    </div>
  );
}
