export default function EducationSec() {
  return (
    <section className="h-screen flex flex-col justify-center items-center" id="education-sec">
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
      <p className="text-white font-thin text-2xl text-center mt-3">
        C# &#9900; Python &#9900; JavaScript &#9900; Java &#9900; MSSQL &#9900;
        MySQL &#9900; Asp.NET
      </p>
    </section>
  );
}
