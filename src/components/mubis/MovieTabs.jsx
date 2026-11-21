import { Box, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { Bookmark, Eye, Undo2 } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import MovieCard from "./MovieCard";

const GRID_CLASSES =
  "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`movie-tabpanel-${index}`}
      aria-labelledby={`movie-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MovieTabs({
  watchlist,
  seenMovies,
  loadingLists,
  onRemoveFromWatchlist,
  onRemoveFromSeen,
  onOpenModal,
}) {
  const [activeTab, setActiveTab] = useState(0);
  // item pending removal from the watchlist (waiting for confirmation)
  const [pendingRemoval, setPendingRemoval] = useState(null);

  const requestRemoval = (dbId) => {
    setPendingRemoval(watchlist.find((m) => m.dbId === dbId) ?? null);
  };

  const confirmRemoval = () => {
    if (pendingRemoval) onRemoveFromWatchlist(pendingRemoval.dbId);
    setPendingRemoval(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 2,
        }}
      >
        <Tab
          icon={<Bookmark />}
          iconPosition="start"
          label={`Por ver (${watchlist.length})`}
          id="movie-tab-0"
          aria-controls="movie-tabpanel-0"
        />
        <Tab
          icon={<Eye />}
          iconPosition="start"
          label={`Vistas (${seenMovies.length})`}
          id="movie-tab-1"
          aria-controls="movie-tabpanel-1"
        />
      </Tabs>

      {loadingLists ? (
        <div className={`${GRID_CLASSES} py-6`} aria-busy="true" aria-label="Cargando">
          {Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={i} variant="rounded" sx={{ aspectRatio: "2 / 3", height: "auto" }} />
          ))}
        </div>
      ) : (
        <>
          {/* Watchlist Tab */}
          <TabPanel value={activeTab} index={0}>
            {watchlist.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Bookmark
                  size={64}
                  style={{ opacity: 0.3, margin: "0 auto" }}
                />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  Aún no tienes películas por ver
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ¡Busca películas o series para agregarlas!
                </Typography>
              </Box>
            ) : (
              <div className={GRID_CLASSES}>
                {watchlist.map((movie) => (
                  <MovieCard // componente propio
                    key={movie.dbId}
                    movie={movie}
                    onRemove={requestRemoval}
                    onOpenModal={onOpenModal}
                    showRemoveButton={true}
                  />
                ))}
              </div>
            )}
          </TabPanel>

          {/* Seen Movies Tab */}
          <TabPanel value={activeTab} index={1}>
            {seenMovies.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Eye size={64} style={{ opacity: 0.3, margin: "0 auto" }} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  Aún no has visto ninguna película
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ¡Marca las películas que ya viste!
                </Typography>
              </Box>
            ) : (
              <div className={GRID_CLASSES}>
                {seenMovies.map((movie) => (
                  <MovieCard
                    key={movie.dbId}
                    movie={movie}
                    onRemove={onRemoveFromSeen}
                    onOpenModal={onOpenModal}
                    showRemoveButton={true}
                    removeIcon={<Undo2 size={18} />}
                    removeLabel="Mover a Por ver"
                  />
                ))}
              </div>
            )}
          </TabPanel>
        </>
      )}

      <ConfirmDialog
        open={Boolean(pendingRemoval)}
        title="¿Eliminar de la lista?"
        message={`"${pendingRemoval?.title ?? ""}" se eliminará de tu lista por ver.`}
        confirmLabel="Eliminar"
        onConfirm={confirmRemoval}
        onCancel={() => setPendingRemoval(null)}
      />
    </Box>
  );
}
