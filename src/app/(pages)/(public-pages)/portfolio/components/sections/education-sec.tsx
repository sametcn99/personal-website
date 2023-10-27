/**
 * Renders the Education section of the portfolio page, including the user's education information and a list of skills learned at university.
 * @returns JSX element
 */
export default function EducationSec() {
  const items = [
    "C#",
    "Python",
    "JavaScript",
    "Java",
    "MSSQL",
    "MySQL",
    "Asp.NET",
  ];
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="relative text-white">
        <h1 className="absolute text-7xl font-bold opacity-10 select-none md:text-8xl lg:text-9xl">
          Education
        </h1>
        <h2 className="mt-20 text-4xl font-bold">Gazi University</h2>
        <h2 className="font-mono text-3xl">Computer Programming</h2>
        <h2 className="text-3xl font-thin">2019-2022</h2>
      </span>
      <hr className="my-4 mx-auto w-56 h-1 bg-gray-700 rounded border-0 md:my-10" />
      <span className="text-4xl font-bold text-center text-white">
        The things I learned at university
      </span>
      <div className="flex flex-row flex-wrap justify-center items-center mt-5 space-x-2 select-none">
        {items.map((item) => (
          <p
            key={item}
            className="px-2 text-base font-thin text-white rounded-3xl hover:scale-105 bg-slate-700"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
