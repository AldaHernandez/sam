import { useCallback, useEffect, useState } from "react";
import useToast from "./useToast";

// small fetch wrapper: returns parsed JSON or throws an Error with `.status`
async function request(url, options) {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const err = new Error(data.error || `Request failed (${response.status})`);
        err.status = response.status;
        throw err;
    }
    return data;
}

const jsonRequest = (method, body) => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});

export default function useMovies() {
    const toast = useToast();

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
    // true only until the first load finishes (later refreshes happen silently)
    const [loadingLists, setLoadingLists] = useState(true);

    // true while a write action is in flight (used to disable buttons)
    const [busy, setBusy] = useState(false);

    // acciones a realizar cuando cambie el valor del input
    useEffect(() => {
        // si no se ingresa nada, se limpian las opciones
        if (inputValue === "") {
            setOptions([]);
            return;
        }

        setLoading(true);
        const controller = new AbortController();

        // consulta a la api, se añade debounce de 500ms
        const timerId = setTimeout(() => {
            request(`/api/search?q=${encodeURIComponent(inputValue)}`, {
                signal: controller.signal,
            })
                .then((data) => {
                    setOptions(data);
                    setLoading(false);
                })
                .catch((error) => {
                    if (error.name === "AbortError") return;
                    console.error("Error al buscar:", error);
                    setOptions([]);
                    setLoading(false);
                    toast.error("No se pudo buscar. Intenta de nuevo.");
                });
        }, 500);

        // si se escribe algo antes de que pasen los 500ms, se reinicia el contador
        // y se cancela la petición anterior (evita respuestas fuera de orden)
        return () => {
            clearTimeout(timerId);
            controller.abort();
        };
    }, [inputValue, toast]);

    const fetchLists = useCallback(async () => {
        try {
            const [watchlistData, seenData] = await Promise.all([
                request("/api/get-watchlist"),
                request("/api/get-seen"),
            ]);
            setWatchlist(watchlistData);
            setSeenMovies(seenData);
        } catch (error) {
            console.error("Error al cargar las listas:", error);
            toast.error("No se pudieron cargar tus listas.");
        } finally {
            setLoadingLists(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchLists();
    }, [fetchLists]);

    // The modal may open with a search result that is already stored.
    // Resolve it to the stored record so it has dbId / watched / rating.
    const storedItem = selectedItem
        ? [...watchlist, ...seenMovies].find(
              (m) => m.id === selectedItem.id && m.type === selectedItem.type
          )
        : null;
    const currentItem = selectedItem ? (storedItem ?? selectedItem) : null;
    const selectedStatus = !currentItem?.dbId
        ? "none"
        : currentItem.watched
          ? "seen"
          : "watchlist";

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };

    // runs a write action, handling busy state and error toasts
    const runAction = async (action, errorMessage) => {
        setBusy(true);
        try {
            await action();
        } catch (error) {
            console.error(error);
            toast.error(errorMessage);
        } finally {
            setBusy(false);
        }
    };

    // adds an item to the db. Returns the new row id, or null if it already existed
    const insertItem = async (item) => {
        try {
            const added = await request("/api/add-to-list", jsonRequest("POST", item));
            return added.data.id;
        } catch (error) {
            if (error.status === 409) return null;
            throw error;
        }
    };

    const addToWatchlist = (item) =>
        runAction(async () => {
            const id = await insertItem(item);
            if (id === null) {
                toast.info(`"${item.title}" ya está en tu lista`);
                return;
            }
            toast.success(`"${item.title}" agregada a Por ver`);
            handleCloseModal();
            await fetchLists();
        }, "No se pudo agregar a la lista.");

    // marks an item as seen (optionally with a rating).
    // Items coming from the search have no dbId yet, so they are added first.
    const addToSeen = (item, rating) =>
        runAction(async () => {
            const dbId = item.dbId ?? (await insertItem(item));
            if (!dbId) {
                // 409: it exists but we didn't have its id; refresh and let the user retry
                await fetchLists();
                toast.info("Esta película ya estaba en tu lista, inténtalo de nuevo.");
                return;
            }
            await request(
                `/api/watchlist/${dbId}`,
                jsonRequest("PATCH", rating === undefined ? { watched: true } : { watched: true, rating })
            );
            toast.success(`"${item.title}" marcada como vista`);
            handleCloseModal();
            await fetchLists();
        }, "No se pudo marcar como vista.");

    // moves an item back to the watchlist (the api clears its rating)
    const removeFromSeen = (dbId) =>
        runAction(async () => {
            const item = seenMovies.find((m) => m.dbId === dbId);
            await request(`/api/watchlist/${dbId}`, jsonRequest("PATCH", { watched: false }));
            toast.success(`"${item?.title ?? "La película"}" volvió a Por ver`);
            handleCloseModal();
            await fetchLists();
        }, "No se pudo mover a Por ver.");

    const removeFromWatchlist = (dbId) =>
        runAction(async () => {
            const item = watchlist.find((m) => m.dbId === dbId);
            await request(`/api/remove-from-watchlist?id=${dbId}`, { method: "DELETE" });
            toast.success(`"${item?.title ?? "La película"}" eliminada de la lista`);
            await fetchLists();
        }, "No se pudo eliminar de la lista.");

    // sets (or clears, with null) the rating of an item that is already stored
    const rateItem = (dbId, rating) =>
        runAction(async () => {
            // optimistic update so the stars react instantly
            setSeenMovies((prev) => prev.map((m) => (m.dbId === dbId ? { ...m, rating } : m)));
            try {
                await request(`/api/watchlist/${dbId}`, jsonRequest("PATCH", { rating }));
                toast.success(rating === null ? "Calificación eliminada" : "Calificación guardada");
            } catch (error) {
                await fetchLists(); // roll back to the server state
                throw error;
            }
        }, "No se pudo guardar la calificación.");

    return {
        // search
        options, loading, inputValue, setInputValue,
        // modal
        selectedItem: currentItem, selectedStatus, openModal, handleOpenModal, handleCloseModal,

        // lists
        watchlist, seenMovies, loadingLists, fetchLists,

        // actions
        busy, addToWatchlist, addToSeen, removeFromWatchlist, removeFromSeen, rateItem,
    };
}
