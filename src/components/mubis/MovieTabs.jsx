import { Box, CircularProgress, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Bookmark, Eye } from "lucide-react";
import { useState } from "react";

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
    onOpenModal
}) {
    const [activeTab, setActiveTab] = useState(0);

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
                    borderColor: 'divider',
                    mb: 2,
                }}
            >
                <Tab
                    icon={<Bookmark />}
                    iconPosition="start" 
                    label={`Lista de deseos (${watchlist.length})`}
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
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* Watchlist Tab */}
                    <TabPanel value={activeTab} index={0}>
                        {watchlist.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Bookmark size={64} style={{ opacity: 0.3, margin: '0 auto' }} />
                            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                            Tu lista de deseos está vacía
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            ¡Busca películas o series para agregarlas!
                            </Typography>
                        </Box>
                        ) : (
                        <Grid container spacing={3}>
                            {watchlist.map((movie) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                <MovieCard // componente propio
                                    movie={movie}
                                    onRemove={onRemoveFromWatchlist}
                                    onOpenModal={onOpenModal}
                                    showRemoveButton={true}
                                />
                            </Grid>
                            ))}
                        </Grid>
                        )}
                    </TabPanel>

                    {/* Seen Movies Tab */}
                    <TabPanel value={activeTab} index={1}>
                        {seenMovies.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Eye size={64} style={{ opacity: 0.3, margin: '0 auto' }} />
                            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                            Aún no has visto ninguna película
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            ¡Marca las películas que ya viste!
                            </Typography>
                        </Box>
                        ) : (
                        <Grid container spacing={3}>
                            {seenMovies.map((movie) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                <MovieCard
                                    movie={movie}
                                    onRemove={onRemoveFromSeen}
                                    onOpenModal={onOpenModal}
                                    showRemoveButton={true}
                                />
                            </Grid>
                            ))}
                        </Grid>
                        )}
                    </TabPanel>
                </>
            )}
        </Box>
    );
}