import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { timelineData } from "../../utils/timelineData";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function CustomTimeline() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleOpen = (src, alt) => {
    setSelectedImage({ src, alt });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const TextContent = ({ date, description, location }) => (
    <div className="py-2">
      <Typography variant="h6" component="span">
        {date}
      </Typography>
      <Typography>{description}</Typography>
      <Typography variant="caption">📍 {location}</Typography>
    </div>
  );

  const ImageContent = ({ imageSrc, altText, side = "right" }) => {
    const justifyClass = side === "left" ? "justify-end" : "justify-start";
    return (
      <div className={`py-2 flex items-center ${justifyClass}`}>
        {/* Solución a imágenes responsivas */}
        <div
          className="w-full max-w-[160px] sm:max-w-[200px] aspect-[3/4] overflow-hidden rounded-lg shadow-lg cursor-pointer hover:opacity-80"
          onClick={() => handleOpen(imageSrc, altText)}
        >
          <img
            className="w-full h-full object-cover"
            src={imageSrc}
            alt={altText}
            loading="lazy"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-6 bg-secondary px-2 sm:px-6 py-10">
        <Typography
          variant="h4"
          className="text-center !font-lora !font-[500] italic mb-8"
        >
          Nuestra historia
        </Typography>

        <Timeline>
          {timelineData.slice(0, 5).map((item, index) => {
            const imageInOpposite = index % 2 === 0;

            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent>
                  {/* Si el índice es par, muestra la imagen a la izquierda, si no, el texto */}
                  {imageInOpposite ? (
                    <ImageContent
                      imageSrc={item.imageSrc}
                      altText={item.altText}
                      side="left"
                    />
                  ) : (
                    <TextContent {...item} />
                  )}
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot className="!bg-black" />
                  {index < timelineData.length - 1 && (
                    <TimelineConnector className="!bg-black" />
                  )}
                </TimelineSeparator>

                <TimelineContent>
                  {/* Lógica inversa para el contenido de la derecha */}
                  {imageInOpposite ? (
                    <TextContent {...item} />
                  ) : (
                    <ImageContent
                      imageSrc={item.imageSrc}
                      altText={item.altText}
                      side="right"
                    />
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}

          {/* items adicionales con animación */}
          {timelineData.slice(5).map((item, index) => {
            const imageInOpposite = (index + 5) % 2 === 0;

            return (
              <Collapse in={showAll} timeout={400} key={index + 5}>
                <TimelineItem>
                  <TimelineOppositeContent>
                    {imageInOpposite ? (
                      <ImageContent
                        imageSrc={item.imageSrc}
                        altText={item.altText}
                        side="left"
                      />
                    ) : (
                      <TextContent {...item} />
                    )}
                  </TimelineOppositeContent>

                  <TimelineSeparator>
                    <TimelineDot className="!bg-black" />
                    {index + 5 < timelineData.length - 1 && (
                      <TimelineConnector className="!bg-black" />
                    )}
                  </TimelineSeparator>

                  <TimelineContent>
                    {imageInOpposite ? (
                      <TextContent {...item} />
                    ) : (
                      <ImageContent
                        imageSrc={item.imageSrc}
                        altText={item.altText}
                        side="right"
                      />
                    )}
                  </TimelineContent>
                </TimelineItem>
              </Collapse>
            );
          })}
        </Timeline>

        {/* 👇 Botón toggle */}
        {timelineData.length > 5 && (
          <div className="flex justify-center">
            <Button
              variant="outlined"
              onClick={() => setShowAll((prev) => !prev)}
              endIcon={showAll ? <ChevronUp /> : <ChevronDown />}
              color="black"
            >
              {showAll ? "Mostrar menos" : "Mostrar más"}
            </Button>
          </div>
        )}
      </div>

      <Dialog
        open={open}
        slots={{
          transition: Slide,
        }}
        slotProps={{
          transition: {
            direction: "up",
          },
        }}
        onClose={handleClose}
        maxWidth="lg"
      >
        <DialogContent
          className="flex justify-center items-center relative bg-black"
          sx={{ overflow: "hidden", p: 0 }}
        >
          <IconButton onClick={handleClose} className="!absolute top-2 right-2">
            <X />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
