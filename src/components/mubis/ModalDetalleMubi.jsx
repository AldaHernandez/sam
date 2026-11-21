import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BookmarkCheck, BookmarkPlus, Eye, Undo2, X } from "lucide-react";
import { useEffect, useState } from "react";

// status: "none" (search result not stored) | "watchlist" | "seen"
export default function ModalDetalleMubi({
  openModal,
  onClose,
  selectedItem,
  status,
  busy,
  addToWatchlist,
  addToSeen,
  removeFromSeen,
  rateItem,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // For unseen items the rating is only sent along with "Marcar como vista".
  // For seen items it is saved immediately.
  const [rating, setRating] = useState(null);
  useEffect(() => {
    setRating(selectedItem?.rating ?? null);
  }, [selectedItem?.dbId, selectedItem?.id, selectedItem?.rating]);

  const isSeen = status === "seen";

  const handleRatingChange = (_event, value) => {
    setRating(value);
    if (isSeen) rateItem(selectedItem.dbId, value);
  };

  // only offer the actions that make sense for the item's current state
  const actions = [];
  if (status === "none") {
    actions.push({
      key: "add",
      label: "Añadir a la lista",
      icon: <BookmarkPlus />,
      color: "primary",
      onClick: () => addToWatchlist(selectedItem),
    });
  }
  if (status === "watchlist") {
    actions.push({
      key: "in-list",
      label: "En tu lista",
      icon: <BookmarkCheck />,
      color: "primary",
      variant: "outlined",
      disabled: true,
    });
  }
  if (status !== "seen") {
    actions.push({
      key: "seen",
      label: "Marcar como vista",
      icon: <Eye />,
      color: "secondary",
      onClick: () => addToSeen(selectedItem, rating ?? undefined),
    });
  } else {
    actions.push({
      key: "unsee",
      label: "Mover a Por ver",
      icon: <Undo2 />,
      color: "secondary",
      variant: "outlined",
      onClick: () => removeFromSeen(selectedItem.dbId),
    });
  }

  return (
    <Dialog
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-title"
      maxWidth="sm"
      fullWidth
    >
      {selectedItem && (
        <>
          <DialogTitle
            id="modal-title"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h5" component="span">
              {selectedItem.title}
            </Typography>
            <IconButton
              aria-label="Cerrar"
              onClick={onClose}
              sx={{ maxWidth: "40px", maxHeight: "40px" }}
            >
              <X />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack flexDirection="row" gap={2} mb={2}>
              {selectedItem.posterUrl && (
                <img
                  src={selectedItem.posterUrl}
                  alt={selectedItem.title}
                  className="w-28 h-40 object-cover rounded shrink-0"
                />
              )}
              <Stack justifyContent="space-between" gap={1.5}>
                <Box>
                  <Chip
                    label={selectedItem.type === "tv" ? "Serie" : "Película"}
                    color={selectedItem.type === "tv" ? "secondary" : "primary"}
                    size="small"
                    variant="outlined"
                  />
                  <Typography variant="body1">
                    <strong>Año:</strong> {selectedItem.year}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="legend"
                  >
                    {isSeen ? "Tu calificación" : "Calificar (opcional)"}
                  </Typography>
                  <Rating
                    name="movie-rating"
                    value={rating}
                    precision={0.5}
                    disabled={busy}
                    onChange={handleRatingChange}
                  />
                </Box>
                <Stack flexDirection="row" flexWrap="wrap" gap={1.5}>
                  {actions.map(
                    ({ key, label, icon, color, variant = "contained", disabled, onClick }) =>
                      isMobile ? (
                        <Tooltip key={key} title={label}>
                          <span>
                            <IconButton
                              aria-label={label}
                              onClick={onClick}
                              disabled={disabled || busy}
                              color={color}
                              sx={
                                variant === "contained"
                                  ? {
                                      bgcolor: `${color}.main`,
                                      color: "white",
                                      "&:hover": { bgcolor: `${color}.dark` },
                                    }
                                  : { border: 1 }
                              }
                            >
                              {icon}
                            </IconButton>
                          </span>
                        </Tooltip>
                      ) : (
                        <Button
                          key={key}
                          onClick={onClick}
                          startIcon={icon}
                          variant={variant}
                          color={color}
                          disabled={disabled || busy}
                        >
                          {label}
                        </Button>
                      )
                  )}
                </Stack>
              </Stack>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {selectedItem.overview || "Sin descripción disponible."}
            </Typography>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
