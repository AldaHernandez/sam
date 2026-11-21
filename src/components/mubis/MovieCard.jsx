import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { Film, Trash2 } from "lucide-react";

export default function MovieCard({
  movie,
  onRemove,
  onOpenModal,
  showRemoveButton = true,
  removeIcon = <Trash2 size={18} />,
  removeLabel = "Eliminar de la lista",
}) {
  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": { transform: "none" },
        },
      }}
    >
      {/* the whole card is a real button (keyboard + screen reader friendly) */}
      <CardActionArea
        onClick={() => onOpenModal(movie)}
        aria-label={`Ver detalles de ${movie.title}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ position: "relative", aspectRatio: "2 / 3", bgcolor: "grey.200" }}>
          {movie.posterUrl ? (
            <CardMedia
              component="img"
              image={movie.posterUrl}
              alt={movie.title}
              loading="lazy"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.disabled",
              }}
            >
              <Film size={48} aria-hidden />
            </Box>
          )}
          <Chip
            label={movie.type === "tv" ? "Serie" : "Película"}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "rgba(0,0,0,0.65)",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 1.5, "&:last-child": { pb: 1.5 } }}>
          <Typography
            component="h3"
            title={movie.title}
            className="line-clamp-2 break-words"
            sx={{ fontWeight: 600, fontSize: "1rem", lineHeight: 1.3, minHeight: "2.6em" }}
          >
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {movie.year}
          </Typography>
          {movie.watched && (
            <Rating
              value={movie.rating ?? 0}
              precision={0.5}
              size="small"
              readOnly
              aria-label={
                movie.rating != null ? `Calificación: ${movie.rating} de 5` : "Sin calificar"
              }
            />
          )}
        </CardContent>
      </CardActionArea>

      {/* sibling of the action area: a button can't be nested inside another button */}
      {showRemoveButton && (
        <Tooltip title={removeLabel}>
          <IconButton
            aria-label={`${removeLabel}: ${movie.title}`}
            onClick={() => onRemove(movie.dbId)}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.65)",
              color: "#fff",
              "&:hover": { bgcolor: "error.main" },
            }}
          >
            {removeIcon}
          </IconButton>
        </Tooltip>
      )}
    </Card>
  );
}
