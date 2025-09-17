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
import { timelineData } from "../../utils/timelineData";

export default function CustomTimeline() {
  const TextContent = ({ date, description, location }) => (
    <div className="py-2">
      <Typography variant="h6" component="span">
        {date}
      </Typography>
      <Typography>{description}</Typography>
      <Typography variant="caption" color="text.secondary">
        📍 {location}
      </Typography>
    </div>
  );

  const ImageContent = ({ imageSrc, altText }) => (
    <div className="py-2 flex items-center justify-center">
      {/* Solución a imágenes responsivas */}
      <div className="w-full max-w-[160px] sm:max-w-[200px] aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
        <img
          className="w-full h-full object-cover"
          src={imageSrc}
          alt={altText}
          loading="lazy"
        />
      </div>
    </div>
  );
  return (
    <div className="bg-secondary px-2 sm:px-6 py-10">
      <Typography variant="h4" className="text-center !font-lora italic">
        Nuestra historia
      </Typography>
      <Timeline position="alternate">
        {timelineData.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              {index % 2 === 0 ? (
                <ImageContent imageSrc={item.imageSrc} altText={item.altText} />
              ) : (
                <TextContent {...item} />
              )}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot className="!bg-black" />
              <TimelineConnector className="!bg-black" />
            </TimelineSeparator>

            <TimelineContent>
              {index % 2 === 0 ? (
                <TextContent {...item} />
              ) : (
                <ImageContent imageSrc={item.imageSrc} altText={item.altText} />
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
