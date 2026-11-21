import { Alert, Snackbar } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { ToastContext } from "./toastContext";

const DURATION = { success: 3500, info: 4000, error: 6000 };

// One toast at a time: a new one replaces the current one (no pile-up).
export default function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: "", severity: "info", key: 0 });

  const show = useCallback((severity, message) => {
    setToast((prev) => ({ open: true, message, severity, key: prev.key + 1 }));
  }, []);

  const api = useMemo(
    () => ({
      success: (msg) => show("success", msg),
      error: (msg) => show("error", msg),
      info: (msg) => show("info", msg),
    }),
    [show]
  );

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Snackbar
        key={toast.key}
        open={toast.open}
        autoHideDuration={DURATION[toast.severity]}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
