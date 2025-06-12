import CustomNavbar from "../components/layout/CustomNavbar";
import Footer from "../components/layout/Footer";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Play } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../assets/sparkles.json";
import { Button } from "@heroui/react";
import { lineHeight } from "@mui/system";

export default function Home() {
  return (
    <div className="flex flex-col mih-h-screen">
      <CustomNavbar />
      <section className="relative h-[90vh] bg-background gap-10 flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          {/* La frase se puede cambiar por otra */}
          <h2 className="w-[80vw] font-lora text-6xl text-black italic">
            "You make my days bright as the sun, each moment with{" "}
            <span className="text-primary">you</span> I adore..."
          </h2>
        </div>
        <Button
          color="primary"
          size="lg"
          variant="shadow"
          startContent={<Play />}
          className="btn"
        >
          Comenzar
        </Button>
      </section>
      <section id="nosotros" className="flex-1 bg-secondary px-6 py-10">
        <h2 className="text-4xl text-black font-bold font-lora mb-4 text-center">
          Nuestra historia
        </h2>
        <Timeline >
          <TimelineItem>
            <TimelineOppositeContent>
              <img src="./src/assets/favicon.png" alt="foto" />
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: "#000" }} />
              <TimelineConnector sx={{ bgcolor: "#000" }} />
            </TimelineSeparator>
            <TimelineContent sx={{lineHeight: "1.0"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium diam vitae vestibulum posuere. Integer vel neque vel orci molestie suscipit sit amet id leo. Aliquam erat volutpat. Ut imperdiet nisl nunc, id tristique nibh imperdiet non. Maecenas lectus nibh, venenatis in egestas sed, porttitor in leo. </TimelineContent> {/*se pone lineheight, pero puede que cambie el contenido por un </p>, entonces, habrá que cambiar este estilo*/}
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{lineHeight: "1.0"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium diam vitae vestibulum posuere. Integer vel neque vel orci molestie suscipit sit amet id leo. Aliquam erat volutpat. Ut imperdiet nisl nunc, id tristique nibh imperdiet non. Maecenas lectus nibh, venenatis in egestas sed, porttitor in leo. </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent sx={{lineHeight: "1.0"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium diam vitae vestibulum posuere. Integer vel neque vel orci molestie suscipit sit amet id leo. Aliquam erat volutpat. Ut imperdiet nisl nunc, id tristique nibh imperdiet non. Maecenas lectus nibh, venenatis in egestas sed, porttitor in leo. </TimelineContent>
          </TimelineItem>
        </Timeline>
      </section>
      <Footer />
    </div>
  );
}
