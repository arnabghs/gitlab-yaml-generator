import {createTheme} from "@mui/material/styles";

let theme = createTheme({
    palette: {
        primary: {
            main: "#0c3c4c",
            contrastText: "#48a4ac",
            dark : "#647f8b",
            light : "#e9f1f2"
        },
        secondary: {
            main: "#bd4257",
            light: "#ffffff"
        },
        text : {
            primary: "#a8114f",
            secondary : "#050505",
            disabled: "#717474"
        },
    },
    spacing: 4
})

export default theme
