// definición del tema para MUI

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#AF3E3E", // rojo fuerte
        },
        secondary: {
            main: "#DA6C6C" // rojo suave
        },
        background: {
            default: "#EAEBD0" // beige
        },
        text: {
            primary: "#1C2321" // negre
        },
    },
    typography: {
        fontFamily: ["Lora", "serif"].join(","),
    },
});

export default theme;