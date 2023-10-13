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
    <div className="h-screen flex flex-col justify-center items-center">
      <span className="relative text-white ">
        <h1 className="absolute md:text-8xl lg:text-9xl text-7xl  opacity-10 font-bold select-none">
          Education
        </h1>
        <h2 className="text-4xl font-bold mt-20">Gazi University</h2>
        <h2 className="text-3xl font-mono">Computer Programming</h2>
        <h2 className="text-3xl font-thin">2019-2022</h2>
      </span>
      <hr className="w-56 h-1 mx-auto my-4 bg-gray-700 border-0 rounded md:my-10" />
      <span className="text-white font-bold text-4xl text-center">
        The things I learned at university
      </span>
      <div className="flex flex-row flex-wrap mt-5 select-none space-x-2">
        {items.map((item) => (
          <p
            key={item}
            className="bg-slate-700 rounded-3xl text-base hover:scale-105 font-thin text-white px-2 "
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
