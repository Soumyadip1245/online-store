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
import ProductDetails from "./components/products/ProductDetails"
import ProductEdit from "./components/products/ProductEdit"
import Rentals from "./components/seller/rentals/Rentals"
import Profile from "./components/profile/Profile"
import Access from "./components/access/Access"
import AccessEdit from "./components/access/AccessEdit"
import StoreRoute from "./components/routing/StoreRoute"
import StoreProvider from "./components/storeLink/store-context/StoreProvider"
import OrderComponent from "./components/orders/order-component/OrderComponent"
import Sidebar from "./components/dashboard/side-bar/Sidebar"
import ChatWith from "./components/chat/ChatWith"
import StoreConfirmation from "./components/storeLink/store-confirmation/StoreConfirmation"
import Setting from "./components/setting/Setting"
import './App.css'
import Compare from "./components/compare/Compare"
import Header from "./components/Header";
import Footer from "./components/footer/Footer"
import Opportunity from "./components/opportunityjobs/Opportunity"
import { LightBar } from "./components/design/LightBar.tsx"
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
const App = () => {
  const { loggedIn, checkStatus } = AuthLayout()
  const location = window.location.host
  const host = location.split(".")
  const [subdomain, setSubdomain] = useState(false)
  useEffect(() => {
    const location = window.location.host
    const host = location.split(".")
    const pathName = window.location.pathname;
    const store = pathName.split('/').filter(Boolean)[0];
    if (!((host[0] === 'localhost:5173' || host[0] === 'cosmossecure') && store != 'store')) {
      setSubdomain(true)
    }
  }, [])
  return (
    <Provider store={store}>
      <StoreProvider>
        <BrowserRouter>


          <Routes>
           {!subdomain && <Route path="/" element={checkStatus ? <Loader full={true} /> : loggedIn ? <Navigate to="/dashboard" /> : <Login />} />}
            <Route path="/opportunity" element={<Opportunity />} />
            <Route path="/design" element={<LightBar />} />
            {!subdomain && RoutesData.map((curr, key) => (
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
                      <Footer />
                    </div>
                  ) : (
                    <curr.element />
                  )
                }
              />
            ))}
            {subdomain &&
                <>
                <Route path="/" element={<StoreRoute /> } />
                <Route path="/store/:unique" element={<StoreRoute /> } />
                </>
            }
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </Provider>
  )
}

export default App