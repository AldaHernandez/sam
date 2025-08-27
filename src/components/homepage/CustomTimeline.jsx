import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";

export default function CustomTimeline() {
  return (
    <div className="flex-1 bg-secondary px-6 py-10">
      <Typography variant="h4" className="text-center">
        Nuestra historia
      </Typography>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent className="d-flex justify-center">
            <img
              className="w-60 xs:w-60 ml-auto rounded-md"
              src="./src/assets/dia_1_xd.png"
              alt="dia 1"
              loading="lazy"
            />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: "#000" }} />
            <TimelineConnector sx={{ bgcolor: "#000" }} />
          </TimelineSeparator>
          <TimelineContent>
            15/10/2023 <br /> El día que nos conocimos :3 (foto para nada
            editada)
          </TimelineContent>
          {/*se pone lineheight, pero puede que cambie el contenido por un </p>, entonces, habrá que cambiar este estilo*/}
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            02/12/2023 <br /> Nuestra primera cita ☕
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className="d-flex justify-center">
            <img
              className="w-48 xs:w-60 mr-auto rounded-md"
              src="./src/assets/first-date.jpeg"
              alt="first date"
              loading="lazy"
            />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            pretium diam vitae vestibulum posuere. Integer vel neque vel orci
            molestie suscipit sit amet id leo. Aliquam erat volutpat. Ut
            imperdiet nisl nunc, id tristique nibh imperdiet non. Maecenas
            lectus nibh, venenatis in egestas sed, porttitor in leo.{" "}
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
