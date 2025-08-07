import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import App from "./App";
import { store } from './app/store'
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
    palette: { mode: 'dark'}
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);