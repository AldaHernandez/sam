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
import { BookmarkPlus, Eye, HeartPlus, X } from "lucide-react";

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
          <DialogTitle id="modal-title" sx={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Typography variant="h5" component="p">
              {selectedItem.title}
            </Typography>
            <IconButton aria-label="close" onClick={onClose} sx={{maxWidth:"40px", maxHeight: "40px"}}>
              <X/>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack flexDirection="row" gap={2} mb={2} sx={{ width:"fit-content"}}>
              {selectedItem.posterUrl && (
                <img
                  src={selectedItem.posterUrl}
                  alt={selectedItem.title}
                  className="w-28 h-40 object-cover rounded"
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
                <Stack flexDirection={{sm:"row", md:"column"}} gap={2}>
                  <Button 
                    onClick={handleAddToLista}
                    startIcon={<BookmarkPlus />}
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    // sx={{
                    //   minWidth: { xs: "200px", sm: "auto"},
                    //   order: { xs: 2, sm: 1}
                    // }}
                  >
                    Añadir a la lista
                  </Button>
                  <Button 
                    onClick={handleAddToWatched}
                    startIcon={<Eye />}
                    variant="contained"
                    color="secondary"
                    fullWidth={false}
                    // sx={{minWidth: {xs: "200px", sm: "auto"}}}
                  >
                    Marcar como vista
                  </Button>
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
