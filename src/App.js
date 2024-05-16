import React, { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import ProtectedRoute from "./components/routing/PrivateRoute"
import Dashboard from "./components/dashboard/Dashboard"
import { Provider } from "react-redux"
import store from "./store/store"
import PaymentDetails from "./components/payments/payment-details/PaymentDetails"
import AuthLayout from "./components/routing/AuthLayout"
import Loader from "./utils/loader/Loader"
import NotFound from "./components/login/NotFound"
import Store from "./components/stores/Store"
import StoreLink from "./components/storeLink/StoreLink"
import ProductDetails from "./components/products/ProductDetails"
import ProductEdit from "./components/products/ProductEdit"
import Rentals from "./components/seller/rentals/Rentals"
import Profile from "./components/profile/Profile"
import Forms from "./components/forms/Forms"
import Access from "./components/access/Access"
import AccessEdit from "./components/access/AccessEdit"
import AccessStaff from "./components/login/AccessStaff"
import StoreRoute from "./components/routing/StoreRoute"
import GeneratedShow from "./components/storeLink/store-show/GeneratedShow"
import StoreProvider from "./components/storeLink/store-context/StoreProvider"
import OrderComponent from "./components/orders/order-component/OrderComponent"
import Sidebar from "./components/dashboard/side-bar/Sidebar"
import ChatWith from "./components/chat/ChatWith"
import StoreConfirmation from "./components/storeLink/store-confirmation/StoreConfirmation"
import Setting from "./components/setting/Setting"
import './App.css'
import Compare from "./components/compare/Compare"
import VoiceRecognition from "./utils/voice-recognition/VoiceRecognition"
import Header from "./components/Header";
import Footer from "./components/footer/Footer"
import Opportunity from "./components/opportunityjobs/Opportunity"

const App = () => {
  const { loggedIn, checkStatus } = AuthLayout()
  const RoutesData = [
    {
      path: "/dashboard",
      protected: true,
      element: Dashboard,
      generated: false,
    },
    {
      path: "/profile",
      protected: true,
      element: Profile,
      generated: false,
    },
    {
      path: "/forms",
      protected: true,
      element: Forms,
      generated: false,
    },
    {
      path: "*",
      protected: false,
      element: NotFound,
      generated: false,
    },
    {
      path: "/payment-details",
      protected: true,
      element: PaymentDetails,
      generated: false,
    },
    {
      path: "/store-details",
      protected: true,
      element: Store,
      generated: false,
    },

    {
      path: "/product-details",
      protected: true,
      element: ProductDetails,
      generated: false,
    },
    {
      path: "/product-edit",
      protected: true,
      element: ProductEdit,
      generated: false,
    },
    {
      path: "/rentals",
      protected: true,
      element: Rentals,
      generated: false,
    },
    {
      path: "/profile",
      protected: true,
      element: Profile,
      generated: false,
    },
    {
      path: "/product-edit/:id",
      protected: true,
      element: ProductEdit,
      generated: false,
    },
    {
      path: "/access",
      protected: true,
      element: Access,
      generated: false,
    },
    {
      path: "/settings",
      protected: true,
      element: Setting,
      generated: false,
    },
    {
      path: "/explore",
      protected: true,
      element: Compare,
      generated: false,
    },
    {
      path: "/orders",
      protected: true,
      element: OrderComponent,
      generated: false,
    },
    {
      path: "/access-edit",
      protected: true,
      element: AccessEdit,
      generated: false,
    },
    {
      path: "/access-edit/:id",
      protected: true,
      element: AccessEdit,
      generated: false,
    },
    {
      path: "/store/:unique",
      element: StoreLink,
      generated: true,
      protected: false,
    },
    {
      path: "/store/:unique",
      element: StoreLink,
      generated: true,
      protected: false,
    },
    {
      path: "/:unique/store-confirm",
      element: StoreConfirmation,
      generated: true,
      protected: false,
    },
    {
      path: "/1245chat/:id",
      element: ChatWith,
      generated: false,
      protected: false,
    },
  ]


  useEffect(() => {})
  return (
    <Provider store={store}>
      <StoreProvider>
        <BrowserRouter>
       

          <Routes>
            <Route path="/" element={checkStatus ? <Loader full={true} /> : loggedIn ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/opportunity" element={<Opportunity/>}/>
            {RoutesData.map((curr, key) => (
              <Route
                key={key}
                path={curr.path}
                element={
                  curr.protected ? (
                    <div className="main-background">
                        <Header />
                      <div className="gradient2"></div>
                      <div className="gradient1"></div>
                      <div className="page-divider">
                      {loggedIn && <Sidebar />}
                      <div style={{ flex: 1, overflow: "auto" }}>
                        <ProtectedRoute component={curr.element} />
                      </div>
                        </div>
                        <hr />
                     <Footer/>
                    </div>
                  ) : curr.generated ? (
                    <div style={{ flex: 1, overflow: "auto" }}>
                    <StoreRoute component={curr.element} />
                  </div>
                    
                  ) : (
                    <curr.element />
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </Provider>
  )
}

export default App
