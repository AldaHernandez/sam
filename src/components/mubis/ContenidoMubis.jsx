import {
  Autocomplete,
  CircularProgress,
  Stack,
  Tabs,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ModalDetalleMubi from "./ModalDetalleMubi";
import useMovies from "../../hooks/useMovies";
import MovieTabs from "./MovieTabs";

export default function ContenidoMubis() {
  // desestructurando hook useMovies
  const {
    options,
    loading,
    inputValue,
    setInputValue,

    selectedItem,
    openModal,
    handleOpenModal,
    handleCloseModal,

    watchlist,
    seenMovies,
    loadingLists,

    addToWatchlist,
    addToSeen,
    removeFromWatchlist,
    removeFromSeen,
  } = useMovies();

  return (
    <section className="h-screen bg-background pt-[5rem] sm:px-14 px-4">
      <Stack alignItems="center" gap={3}>
        <Autocomplete
          options={options}
          loading={loading}
          getOptionLabel={(option) => option.title || ""}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event, option) => {
            if (option) {
              handleOpenModal(option);
            }
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          noOptionsText="No se encontraron resultados"
          loadingText="Buscando..."
          sx={{ width: { xs: "100%", md: "50%" } }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Escribe una película o serie..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              key={option.id}
              className="mt-2 ml-2 flex items-center gap-2 rounded-sm hover:bg-primary hover:cursor-pointer hover:text-background"
            >
              {option.posterUrl ? (
                <img
                  src={option.posterUrl}
                  alt={option.title}
                  className="w-10 h-14 rounded object-cover"
                />
              ) : (
                <div className="w-10 h-14 bg-gray-300 rounded" />
              )}
              <div>
                <div className="font-medium">{option.title}</div>
                <div className="text-sm">
                  {option.year} - {option.type === "tv" ? "Serie" : "Película"}
                </div>
              </div>
            </li>
          )}
        />

        <MovieTabs
          watchlist={watchlist}
          seenMovies={seenMovies}
          loadingLists={loadingLists}
          onRemoveFromWatchlist={removeFromWatchlist}
          onRemoveFromSeen={removeFromSeen}
          onOpenModal={handleOpenModal} 
        />

        <ModalDetalleMubi
          openModal={openModal}
          onClose={handleCloseModal}
          selectedItem={selectedItem}
          addToWatchlist={addToWatchlist}
          addToSeen={addToSeen}
        />
      </Stack>
    </section>
  );
}
