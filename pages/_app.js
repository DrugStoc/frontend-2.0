import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import styles from "../styles/Home.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import { withRouter } from "next/router";
import { wrapper, store, persistor } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

wrapper;

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#556AAF",
    },
    secondary: {
      main: "#556AAF",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Helvetica Neue",
      "Arial,sans-serif",
    ].join(","),
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <Component {...pageProps} />
          <ToastContainer
            theme="dark"
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
