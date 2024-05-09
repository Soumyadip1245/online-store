import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { QueryClient, QueryClientProvider } from "react-query"
import { ThemeProvider, createTheme } from "@mui/material"
import Header from "./components/Header"
const storedThemeColor = localStorage.getItem("theme-color")
const themeColor = storedThemeColor || "red-theme"
document.body.classList.add(themeColor)
const root = ReactDOM.createRoot(document.getElementById("root"))

const queryClient = new QueryClient()
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
      <div className="index-container">
        <Header />
        <App />
      </div>
    </QueryClientProvider>
  </ThemeProvider>
)
