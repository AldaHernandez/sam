import { useEffect, useState } from "react";

export default function useMovies() {
    // search states
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // modal states
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // lists states
    const [watchlist, setWatchlist] = useState([]);
    const [seenMovies, setSeenMovies] = useState([]);
    const [loadingLists, setLoadingLists] = useState(false);

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

    // fetch watchlist and seen movies on mount
    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        setLoadingLists(true);
        try{
            // fetch watchlist
            const watchlistRes = await fetch ('/api/get-watchlist.js');
            if (watchlistRes.ok) {
                const watchlistData = await watchlistRes.json();
                setWatchlist(watchlistData);
            }

            // fetch seen movies
            const seenRes = await fetch ('/api/get-seen.js');
            if (seenRes.ok) {
                const seenData = await seenRes.json();
                setSeenMovies(seenData);
            }
        } catch (error) {
            console.error("Error al cargar las listas:", error);
        } finally {
            setLoadingLists(false);
        }
    };

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };

    const addToWatchlist = async (item) => {
        try {
            const response = await fetch("/api/add-to-list.js", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    alert("Esta película/serie ya está en la lista");
                } else {
                    throw new Error(data.error || "Error al agregar");
                }
                return;
            }
            // añadir un snackbar de MUI
            alert("Agregado a la lista (:");
            fetchLists();
            // handleCloseModal(); ver si esto se queda o se va, para mejorar UX
        } catch (error) {
            console.error("Error", error);
            alert("Hubo un error al agregar a la lista");
        }
    };

    const addToSeen = async (item) => {
        try {
            const response = await fetch("/api/add-to-seen.js", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Eror al marcar como vista");
            }

            alert("Marcada como vista");
            fetchLists();
            // handleCloseModal();
        } catch (error) {
            console.error("Error", error);
            alert("Hubo un error al marcar como vista");
        }
    };

    const removeFromWatchlist = async (itemId) => {
        try {
            const response = await fetch(`/api/remove-from-watchlist/${itemId}`, {
                method: "PUT", // ver qué método utilizar aquí
            });

            if (!response.ok) {
                throw new Error("Error al eliminar");
            }

            alert("Eliminada de la lista");
            fetchLists();
        } catch (error) {
            console.error("Error", error);
            alert("Hubo un error al eliminar");
        }
  };

    const removeFromSeen = async (itemId) => {
        try {
            const response = await fetch(`/api/remove-from-seen/${itemId}`, {
                method: "PUT", // ver qué método utilizar aquí
            });

            if (!response.ok) {
                throw new Error("Error al eliminar");
            }

            alert("Eliminada de vistas");
            fetchLists();
        } catch (error) {
            console.error("Error", error);
            alert("Hubo un error al eliminar");
        }
    };

    return {
        // search
        options,
        loading,
        inputValue,
        setInputValue,

        // modal
        selectedItem,
        openModal,
        handleOpenModal,
        handleCloseModal,

        // lists
        watchlist,
        seenMovies,
        loadingLists,
        fetchLists,

        // actions
        addToWatchlist,
        addToSeen,
        removeFromWatchlist,
        removeFromSeen,
    }
}