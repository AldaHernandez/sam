import {
  Autocomplete,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ModalDetalleMubi from "./ModalDetalleMubi";

export default function ContenidoMubis() {
  // inicializando estados
  const [options, setOptions] = useState([]); // lo que llenará al autocomplete
  const [loading, setLoading] = useState(false); // estado de carga al consultar endpoint
  const [inputValue, setInputValue] = useState(""); // para saber qué se está ingresando en el input
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // acciones a realizar cuando cambie el valor del input
  useEffect(() => {
    // si no se ingresa nada, se limpian las opciones
    if (inputValue === "") {
      setOptions([]);
      return;
    }

    setLoading(true);

    // consulta a la api, se añade debounce de 500ms
    const timerId = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(inputValue)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error en la respuesta de la API");
          }
          return res.json();
        })
        // respuesta del backend
        .then((data) => {
          setOptions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al buscar:", error);
          setOptions([]);
          setLoading(false);
        });
    }, 500);
    // si se escribe algo antes de que pasen los 500ms, se reinicia el contador
    return () => clearTimeout(timerId);
  }, [inputValue]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const addToListaConjunta = (item) => {
    console.log("Agregando a lista conjunta", item);
    handleCloseModal();
  };

  return (
    <section className="h-screen bg-background pt-[5rem] sm:px-14 px-4">
      <Stack gap={2}>
        <h2 className="text-center text-2xl font-semibold">
          ¡Ingresa el nombre de la serie o película que quieras buscar!
        </h2>
        <Autocomplete
          options={options}
          loading={loading}
          getOptionLabel={(option) => option.title || ""}
          // openOnFocus={false}
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
          renderInput={(params) => (
            <TextField
              {...params}
              label="Película o serie..."
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
        <ModalDetalleMubi
          openModal={openModal}
          onClose={handleCloseModal}
          selectedItem={selectedItem}
          addToListaConjunta={addToListaConjunta}
        />
      </Stack>
    </section>
  );
}
