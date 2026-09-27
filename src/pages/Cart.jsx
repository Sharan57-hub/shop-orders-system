import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart, updateQuantity }) {

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="cart-page">

                <h1>Your Cart</h1>

                <p>Your cart is empty.</p>

                <Link to="/products">
                    <button>
                        Continue Shopping
                    </button>
                </Link>

            </div>
        );
    }

    return (
        <div className="cart-page">

            <h1>Your Cart</h1>

            {cart.map((item) => (

                <div
                    className="cart-item"
                    key={item.id}
                >

                    <div>
                        <h3>{item.name}</h3>

                        <p>
                            ₹{item.price} × {item.quantity}
                        </p>
                    </div>

                    <div>

                        <button
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.quantity - 1
                                )
                            }
                        >
                            -
                        </button>

                        <span>
                            {item.quantity}
                        </span>

                        <button
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.quantity + 1
                                )
                            }
                        >
                            +
                        </button>

                    </div>

                    <strong>
                        ₹{Number(item.price) * item.quantity}
                    </strong>

                    <button
                        onClick={() =>
                            removeFromCart(item.id)
                        }
                    >
                        Remove
                    </button>

                </div>

            ))}

            <div className="cart-summary">

                <h2>
                    Total: ₹{total.toFixed(2)}
                </h2>

                <Link to="/checkout">
                    <button>
                        Proceed to Checkout
                    </button>
                </Link>

            </div>

        </div>
    );
}

export default Cart;