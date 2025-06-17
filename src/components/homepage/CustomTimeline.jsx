import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

export default function CustomTimeline() {
  return (
    <div className="flex-1 bg-secondary px-6 py-10">
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>
            <img src="./src/assets/favicon.png" alt="foto" />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: "#000" }} />
            <TimelineConnector sx={{ bgcolor: "#000" }} />
          </TimelineSeparator>
          <TimelineContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            pretium diam vitae vestibulum posuere. Integer vel neque vel orci
            molestie suscipit sit amet id leo. Aliquam erat volutpat. Ut
            imperdiet nisl nunc, id tristique nibh imperdiet non. Maecenas
            lectus nibh, venenatis in egestas sed, porttitor in leo.{" "}
          </TimelineContent>{" "}
          {/*se pone lineheight, pero puede que cambie el contenido por un </p>, entonces, habrá que cambiar este estilo*/}
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            pretium diam vitae vestibulum posuere. Integer vel neque vel orci
            molestie suscipit sit amet id leo. Aliquam erat volutpat. Ut
            imperdiet nisl nunc, id tristique nibh imperdiet non. Maecenas
            lectus nibh, venenatis in egestas sed, porttitor in leo.{" "}
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
