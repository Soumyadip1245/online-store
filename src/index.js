import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { I18nextProvider } from "react-i18next"
import i18n from "./utils/i18n"
import { QueryClient, QueryClientProvider } from "react-query"
import { ThemeProvider, createTheme } from "@mui/material"
import Header from "./components/Header"
import { BrowserRouter } from "react-router-dom"
import Footer from "./components/footer/Footer"
const storedThemeColor = localStorage.getItem("theme-color")
const themeColor = storedThemeColor || "red-theme"
document.body.classList.add(themeColor)
const root = ReactDOM.createRoot(document.getElementById("root"))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
const theme = createTheme({
  palette: {
    primary: {
      main: "#001529",
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
})
root.render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <App />
        
      </I18nextProvider>
    </QueryClientProvider>
  </ThemeProvider>
)
