import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BookmarkPlus, Eye, HeartPlus, X } from "lucide-react";

export default function ModalDetalleMubi({
  openModal,
  onClose,
  selectedItem,
  addToWatchlist,
  addToSeen
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddToWatchlist = () => {
    addToWatchlist(selectedItem);
  };

  const handleAddToWatched = () => {
    // addToSeen cuando esté lista
  };

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
            }}
          >
            <Typography variant="h5" component="p">
              {selectedItem.title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ maxWidth: "40px", maxHeight: "40px" }}
            >
              <X />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack
              flexDirection="row"
              gap={2}
              mb={2}
              sx={{ width: "fit-content" }}
            >
              {selectedItem.posterUrl && (
                <img
                  src={selectedItem.posterUrl}
                  alt={selectedItem.title}
                  className="w-28 h-40 object-cover rounded"
                />
              )}
              <Stack justifyContent="space-between">
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
                <Stack flexDirection="row" gap={2}>
                  {isMobile ? (
                    // Botones para móvil
                    <>
                      <IconButton
                        onClick={handleAddToWatchlist}
                        color="primary"
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": { bgcolor: "primary.dark" },
                        }}
                      >
                        <BookmarkPlus />
                      </IconButton>
                      <IconButton
                        onClick={handleAddToWatched}
                        color="secondary"
                        sx={{
                          bgcolor: "secondary.main",
                          color: "white",
                          "&:hover": { bgcolor: "secondary.dark" },
                        }}
                      >
                        <Eye />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleAddToWatchlist}
                        startIcon={<BookmarkPlus />}
                        variant="contained"
                        color="primary"
                        fullWidth={false}
                      >
                        Añadir a la lista
                      </Button>
                      <Button
                        onClick={handleAddToWatched}
                        startIcon={<Eye />}
                        variant="contained"
                        color="secondary"
                        fullWidth={false}
                      >
                        Marcar como vista
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
            </Stack>
            <Typography variant="body2" color="textSecondary">
              {selectedItem.overview || "Sin descripción disponible."}
            </Typography>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
