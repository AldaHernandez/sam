import { Card, CardBody } from "@heroui/react";
import CustomNavbar from "../components/layout/CustomNavbar";
import Footer from "../components/layout/Footer";
import { Button } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { color } from "framer-motion";
import { MoveDown } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col mih-h-screen">
      <CustomNavbar />
      <section className="h-[90vh] bg-[#EAEBD0] flex flex-col items-center justify-center px-6">
        {/* La frase se puede cambiar por otra */}
        <h2 className="w-[80vw] font-lora text-6xl text-[#1C2321] italic">
          "You make my days bright as the sun, each moment with{" "}
          <span className="text-[#AF3E3E]">you</span> I adore..."
        </h2>
        <a href="#nosotros">
          <MoveDown className="w-[42px] h-[42px] mt-20 motion-safe:animate-pulse" />
        </a>
      </section>
      <section id="nosotros" className="flex-1 bg-[#DA6C6C] px-6 py-10">
        <h2 className="text-4xl text-[#1C2321] font-bold mb-4 text-center">
          Nuestra historia
          <Timeline>
            <TimelineItem>
              <TimelineOppositeContent>
                <img src="./src/assets/favicon.png" alt="foto" />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot sx={{ bgcolor: "#000" }} />
                <TimelineConnector sx={{ bgcolor: "#000" }} />
              </TimelineSeparator>
              <TimelineContent>Eat</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Code</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>Sleep</TimelineContent>
            </TimelineItem>
          </Timeline>
        </h2>
        <p className="text-center text-gray-600"></p>
      </section>
      <Footer />
    </div>
  );
}
