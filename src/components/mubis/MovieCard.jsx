import { Box, Card, CardMedia, Chip, IconButton, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";

export default function MovieCard({movie, onRemove, onOpenModal, showRemoveButton = true, removeIcon = <Trash2 size={18} />}) {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                }
            }}
            onClick={() => onOpenModal(movie)}
        >
            <CardMedia
                component='img'
                height='300'
                image={movie.posterUrl || '/placeholder-poster.png'}
                alt={movie.title}
                sx={{ objectFit: 'cover'}}
            />
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom noWrap>
                    {movie.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    {movie.year}
                </Typography>
                <Chip
                    label={movie.type === "tv" ? "Serie" : "Película"}
                    color={movie.type === "tv" ? "primary" : "secondary"}
                    size="small"
                />
                </Box>
                {showRemoveButton && (
                <IconButton
                    onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    onRemove(movie.id);
                    }}
                    sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    bgcolor: 'error.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'error.dark' },
                    width: 32,
                    height: 32,
                    }}
                    size="small"
                >
                    {removeIcon}
                </IconButton>
                )}
            </CardContent>
        </Card>
    )
}