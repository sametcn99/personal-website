import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
export default function LanguagesSec() {
  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <div className="relative text-white ">
        <div className="absolute md:text-8xl lg:text-9xl text-7xl opacity-10 font-bold select-none">
          Languages
        </div>
        <div className="text-4xl font-bold mt-20">Turkish</div>
        <div className="text-3xl font-thin">Native Language</div>
        <hr className="w-56 h-1 mx-auto my-4 bg-gray-700 border-0 rounded md:my-10" />
        <div className="text-4xl font-bold mt-20">English</div>
        <div className="text-3xl font-thin mb-4">Secondary Language</div>
        <span>Reading</span>
        <LinearProgressWithLabel value={90} />
        <span>Writing</span>
        <LinearProgressWithLabel value={70} />
        <span>Speaking</span>
        <LinearProgressWithLabel value={55} />
      </div>
    </section>
  );
}
