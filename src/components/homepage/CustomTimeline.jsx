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
    <div className="flex-1 bg-secondary px-2 sm:px-6 py-10">
      <Typography variant="h4" className="text-center !font-[600]">
        Nuestra historia
      </Typography>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent className="d-flex">
            <div className="w-40 h-60 overflow-hidden rounded-md ml-auto">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/timeline/dia_1_xd.png"
                alt="dia 1"
                loading="lazy"
              />
            </div>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className="!bg-black" />
            <TimelineConnector className="!bg-black" />
          </TimelineSeparator>
          <TimelineContent>
            15/10/2023 <br /> El día que nos conocimos :3 (foto para nada
            editada) <br /> 📍 Casa del Óscar
          </TimelineContent>
          {/*se pone lineheight, pero puede que cambie el contenido por un </p>, entonces, habrá que cambiar este estilo*/}
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            02/12/2023 <br /> Nuestra primera cita ☕ <br /> 📍 Casa Trópico
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className="!bg-black" />
            <TimelineConnector className="!bg-black" />
          </TimelineSeparator>
          <TimelineContent>
            <div className="w-40 h-60 overflow-hidden rounded-md mr-auto">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/timeline/1st-date.jpeg"
                alt="first date"
                loading="lazy"
              />
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <div className="w-40 h-50 overflow-hidden rounded-md ml-auto">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/timeline/primera-ida-al-cine.png"
                alt="primera ida al cine"
                loading="lazy"
              />
            </div>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className="!bg-black" />
            <TimelineConnector className="!bg-black" />
          </TimelineSeparator>
          <TimelineContent>
            02/01/2024 <br /> Primera ida al cine pa ver Wonka <br /> 📍
            Cinépolis Las Américas
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            13/01/2024 <br /> Primera foto juntos <br /> 📍 Casa de tus tíos
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className="!bg-black" />
            <TimelineConnector className="!bg-black" />
          </TimelineSeparator>
          <TimelineContent>
            <div className="w-40 h-60 overflow-hidden rounded-md mr-auto">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/timeline/primera-foto-juntos.jpeg"
                alt="primera foto juntes"
                loading="lazy"
              />
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <div className="w-40 h-60 overflow-hidden rounded-md ml-auto">
              <img
                className="w-full h-full object-cover"
                src="./src/assets/timeline/salida-awelos-mama.jpeg"
                alt="conociendo a abuelos y mamá"
                loading="lazy"
              />
            </div>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className="!bg-black" />
            <TimelineConnector className="!bg-black" />
          </TimelineSeparator>
          <TimelineContent>
            21/01/2024 <br /> Cuando conociste a mis abuelitos y a mi mamá{" "}
            <br /> 📍 Terraza de Colón
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
