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
} from "@mui/material";
import { BookmarkPlus, Eye, HeartPlus } from "lucide-react";

export default function ModalDetalleMubi({
  openModal,
  onClose,
  selectedItem,
  addToListaConjunta,
}) {
  const handleAddToLista = () => {
    addToListaConjunta(selectedItem);
  };

  const handleAddToWatched = () => {
    console.log("Ya la viste, wei??");
  }

  return (
    <Dialog
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-title"
      maxWidth="sm"
      // disableEscapeKeyDown="false"
      fullWidth
    >
      {selectedItem && (
        <>
          <DialogTitle id="modal-title">
            <Typography variant="h5" component="p">
              {selectedItem.title}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack flexDirection="row" gap={2} mb={2}>
              {selectedItem.posterUrl && (
                <img
                  src={selectedItem.posterUrl}
                  alt={selectedItem.title}
                  className="w-24 h-36 object-cover rounded"
                />
              )}
              <Stack justifyContent="space-between">
                <Box>
                  <Typography variant="body1">
                    <strong>Año:</strong> {selectedItem.year}
                  </Typography>
                  <Chip
                    label={selectedItem.type === "tv" ? "Serie" : "Película"}
                    color={selectedItem.type === "tv" ? "primary" : "secondary"}
                    size="small"
                  />
                </Box>
                <Stack flexDirection="row">
                  <IconButton 
                    onClick={handleAddToLista}
                    color="primary"
                    variant="contained"
                  >
                    <BookmarkPlus />
                  </IconButton>
                  <IconButton 
                    onClick={handleAddToWatched}
                    color="secondary"
                    variant="contained"
                  >
                    <Eye />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
            <Typography variant="body2" color="textSecondary">
              {selectedItem.overview || "Sin descripción disponible."}
            </Typography>
          </DialogContent>
          {/* <DialogActions
            sx={{
              justifyContent: { xs: "center", md: "flex-end" },
              flexDirection: { xs: "column", md: "row" },
              gap:1,
            }}
          >
            <Button 
              onClick={onClose} 
              variant="outlined"
              color="secondary"
              fullWidth={false}
              sx={{
                minWidth: { xs: "200px", sm: "auto"},
                order: { xs: 2, sm: 1}
              }}
            >
              Cancelar
            </Button>
            <IconButton 
              onClick={handleAddToLista}
              color="primary"
              variant="contained"
            >
              <BookmarkPlus />
            </IconButton>
          </DialogActions> */}
        </>
      )}
    </Dialog>
  );
}
