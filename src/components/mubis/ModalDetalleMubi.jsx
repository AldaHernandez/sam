import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { BookmarkPlus, HeartPlus } from "lucide-react";

export default function ModalDetalleMubi({
  openModal,
  onClose,
  selectedItem,
  addToListaConjunta,
}) {
  const handleAddToLista = () => {
    addToListaConjunta(selectedItem);
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
          <DialogTitle id="modal-title">
            <Typography variant="h5" component="p">
              {selectedItem.title}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" gap={2} mb={2}>
              {selectedItem.posterUrl && (
                <img
                  src={selectedItem.posterUrl}
                  alt={selectedItem.title}
                  className="w-24 h-36 object-cover rounded"
                />
              )}
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Año:</strong> {selectedItem.year}
                </Typography>
                <Chip
                  label={selectedItem.type === "tv" ? "Serie" : "Película"}
                  color={selectedItem.type === "tv" ? "primary" : "secondary"}
                  size="small"
                />
              </Box>
            </Box>
            <Typography variant="body2" color="textSecondary">
              {selectedItem.overview || "Sin descripción disponible."}
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: { xs: "center", md: "flex-end" },
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 1, md: 0 },
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
            <Button
              onClick={handleAddToLista}
              color="primary"
              variant="contained"
              startIcon={<BookmarkPlus />}
            >
              Agregar a Nuestra Lista
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
