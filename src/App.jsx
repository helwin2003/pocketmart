import { React, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login";
import Home from "./pages/home";
import Fruits from "./pages/grocery/fruits";
import { Layout, Grid } from "antd";
import NavBar from "./components/navBar";
import Header from "./components/header";
import Bakery from "./pages/grocery/bakery";
import Dress from "./pages/fashion/dress";
import { CartProvider } from "./context/cartContext";
import Footer from "./components/footer";
import Accessories from "./pages/fashion/accessories";
import Billing from "./pages/billing";
const { useBreakpoint } = Grid;

const { Content } = Layout;

const App = () => {
  const screens = useBreakpoint();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <BrowserRouter basename="/pocketmart">
        <Layout style={{ minHeight: "100vh" }}>
          {isLoggedIn && <Header onLogout={handleLogout} />}
          <Layout hasSider>
            {isLoggedIn && <NavBar />}
            <Layout
              style={{
                marginTop: 64,
                marginLeft: isLoggedIn && screens.md ? 200 : 0,
                flexDirection: "column",
              }}
            >
              <Content>
                <Routes>
                  <Route
                    path="/"
                    element={
                      isLoggedIn ? (
                        <Navigate to="/home" replace />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />

                  <Route
                    path="/login"
                    element={
                      isLoggedIn ? (
                        <Navigate to="/home" replace />
                      ) : (
                        <Login onLogin={() => setIsLoggedIn(true)} />
                      )
                    }
                  />

                  {isLoggedIn ? (
                    <>
                      <Route path="/home" element={<Home />} />
                      <Route path="/grocery/fruveg" element={<Fruits />} />
                      <Route path="/grocery/bakery" element={<Bakery />} />
                      <Route path="/fashion/dress" element={<Dress />} />
                      <Route
                        path="/fashion/accessories"
                        element={<Accessories />}
                      />
                      <Route path="/billing" element={<Billing />} replace />
                    </>
                  ) : (
                    <Route
                      path="*"
                      element={<Navigate to="/login" replace />}
                    />
                  )}
                </Routes>
                <div
                  style={{
                    display: location.pathname === "/grocery/fruveg" && "none",
                    zIndex: 5500,
                  }}
                >
                  {isLoggedIn && <Footer />}
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
