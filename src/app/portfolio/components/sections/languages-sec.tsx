import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/**
 * A component that displays the user's language proficiency levels.
 * @returns JSX.Element
 */
export default function LanguagesSec() {
  /**
   * A customized LinearProgress component that displays the progress bar with a label.
   * @param props - LinearProgressProps & { value: number }
   * @returns JSX.Element
   */
  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="fff">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen select-none">
      <div className="relative text-white">
        <div className="absolute text-7xl font-bold opacity-10 select-none md:text-8xl lg:text-9xl">
          Languages
        </div>
        <div className="mt-20 text-4xl font-bold">Turkish</div>
        <div className="text-3xl font-thin">Native Language</div>
        <hr className="my-4 mx-auto w-56 h-1 bg-gray-700 rounded border-0 md:my-10" />
        <div className="mt-20 text-4xl font-bold">English</div>
        <div className="mb-4 text-3xl font-thin">Secondary Language</div>
        <span>Reading</span>
        <LinearProgressWithLabel value={90} />
        <span>Writing</span>
        <LinearProgressWithLabel value={70} />
        <span>Speaking</span>
        <LinearProgressWithLabel value={55} />
      </div>
    </div>
  );
}
