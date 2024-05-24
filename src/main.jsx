import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from './utils/i18n.js'
import Notification from './utils/notification/Notification.jsx'
const storedThemeColor = localStorage.getItem("theme-color")
const themeColor = storedThemeColor || "red-theme"
document.body.classList.add(themeColor)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
      <Notification>
        <App />
        </Notification>
      </I18nextProvider>
    </QueryClientProvider>
)
