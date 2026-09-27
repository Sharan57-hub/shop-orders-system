import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Checkout({ cart, clearCart }) {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );

    async function placeOrder(event) {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (!name || !phone) {
            alert("Please enter your name and phone number.");
            return;
        }

        setLoading(true);

        // Create order
        const { data: order, error: orderError } =
            await supabase
                .from("orders")
                .insert([
                    {
                        customer_name: name,
                        phone: phone,
                        total_amount: total,
                        order_status: "Pending"
                    }
                ])
                .select()
                .single();

        if (orderError) {
            console.log(orderError);
            alert("Failed to place order.");
            setLoading(false);
            return;
        }

        // Create order items
        const orderItems = cart.map((item) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
        }));

        const { error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItems);

        if (itemsError) {
            console.log(itemsError);
            alert("Order items could not be saved.");
            setLoading(false);
            return;
        }

        // Empty the cart
        clearCart();

        alert("Order placed successfully!");

        navigate("/orders");

        setLoading(false);
    }

    return (
        <div className="checkout-page">

            <h1>Checkout</h1>

            <form onSubmit={placeOrder}>

                <label>
                    Customer Name
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />

                <label>
                    Phone Number
                </label>

                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                />

                <h2>Order Summary</h2>

                {cart.map((item) => (
                    <div key={item.id}>

                        <span>
                            {item.name} × {item.quantity}
                        </span>

                        <span>
                            ₹{(
                                Number(item.price) *
                                item.quantity
                            ).toFixed(2)}
                        </span>

                    </div>
                ))}

                <h2>
                    Total: ₹{total.toFixed(2)}
                </h2>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Placing Order..."
                        : "Place Order"}
                </button>

            </form>

        </div>
    );
}

export default Checkout;