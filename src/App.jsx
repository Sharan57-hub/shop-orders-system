import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import "./App.css";

function App() {

    const [cart, setCart] = useState([]);

    function addToCart(product) {

        setCart((currentCart) => {

            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    }

    function removeFromCart(productId) {

        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.id !== productId
            )
        );
    }

    function updateQuantity(productId, quantity) {

        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: quantity
                    }
                    : item
            )
        );
    }

    function clearCart() {
    setCart([]);
}

    return (
        <BrowserRouter>

            <Navbar cartCount={cart.length} />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/products"
                    element={
                        <Products
                            addToCart={addToCart}
                        />
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                        />
                    }
                />

                <Route
    path="/checkout"
    element={
        <Checkout
            cart={cart}
            clearCart={clearCart}
        />
    }
/>

                <Route
                    path="/orders"
                    element={<Orders />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;