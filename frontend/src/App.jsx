import Home from "./pages/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import Checkout from "./pages/Checkout";
import MyOrder from "./pages/MyOrder";
import Profile from "./pages/Profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/myorders" element={<MyOrder />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
