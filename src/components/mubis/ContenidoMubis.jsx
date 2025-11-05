import {
  Autocomplete,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ContenidoMubis() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue === "") {
      setOptions([]);
      return;
    }

    setLoading(true);

    const timerId = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(inputValue)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error en la respuesta de la API");
          }
          return res.json();
        })
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

    return () => clearTimeout(timerId);
  }, [inputValue]);

  return (
    <>
      <section className="h-[100vh] bg-background pt-[5rem] sm:px-14 px-4">
        <Stack gap={2}>
          <h2 className="text-center text-2xl font-semibold">
            ¡Ingresa el nombre de la serie o película que quieras buscar!
          </h2>
          <Autocomplete
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.title || ""}
            openOnFocus={false}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="No se encontraron resultados"
            loadingText="Buscando..."
            renderInput={(params) => (
              <TextField
                {...params}
                label="Película, serie o persona..."
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
          />
        </Stack>
      </section>
    </>
  );
}
