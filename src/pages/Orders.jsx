import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {

        const { data, error } = await supabase
            .from("orders")
            .select(`
                *,
                order_items (
                    id,
                    quantity,
                    price,
                    products (
                        name,
                        category
                    )
                )
            `)
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Error:", error);
        } else {
            setOrders(data || []);
        }

        setLoading(false);
    }

    function getStatusClass(status) {

        if (status === "Completed") {
            return "status-completed";
        }

        if (status === "Cancelled") {
            return "status-cancelled";
        }

        return "status-pending";
    }

    if (loading) {
        return (
            <div className="orders-page">

                <div className="orders-title">
                    <p className="orders-label">
                        ORDER HISTORY
                    </p>

                    <h1>My Orders</h1>
                </div>

                <div className="orders-loading">
                    Loading your orders...
                </div>

            </div>
        );
    }

    return (
        <div className="orders-page">

            <div className="orders-title">

                <div>
                    <p className="orders-label">
                        ORDER HISTORY
                    </p>

                    <h1>My Orders</h1>

                    <p>
                        View your previous orders and order details.
                    </p>
                </div>

                <div className="orders-count">
                    {orders.length}{" "}
                    {orders.length === 1 ? "Order" : "Orders"}
                </div>

            </div>

            {orders.length === 0 ? (

                <div className="empty-orders">

                    <div className="empty-orders-icon">
                        📦
                    </div>

                    <h2>No orders yet</h2>

                    <p>
                        You haven't placed any orders yet.
                    </p>

                </div>

            ) : (

                <div className="orders-list">

                    {orders.map((order) => {

                        const orderItems = order.order_items || [];

                        return (
                            <div
                                className="order-card"
                                key={order.id}
                            >

                                {/* Order Header */}

                                <div className="order-header">

                                    <div>
                                        <p className="order-number">
                                            ORDER #{order.id}
                                        </p>

                                        <h2>
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )}
                                        </h2>
                                    </div>

                                    <span
                                        className={`order-status ${getStatusClass(
                                            order.order_status
                                        )}`}
                                    >
                                        {order.order_status}
                                    </span>

                                </div>

                                {/* Customer Details */}

                                <div className="customer-details">

                                    <div>
                                        <span>Customer</span>
                                        <strong>
                                            {order.customer_name}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Phone</span>
                                        <strong>
                                            {order.phone}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Items</span>
                                        <strong>
                                            {orderItems.reduce(
                                                (total, item) =>
                                                    total +
                                                    item.quantity,
                                                0
                                            )}
                                        </strong>
                                    </div>

                                </div>

                                {/* Products */}

                                <div className="order-products">

                                    <h3>Order Items</h3>

                                    {orderItems.map((item) => (

                                        <div
                                            className="order-item"
                                            key={item.id}
                                        >

                                            <div className="order-item-info">

                                                <div className="order-item-icon">
                                                    🛍️
                                                </div>

                                                <div>
                                                    <strong>
                                                        {item.products?.name ||
                                                            "Product"}
                                                    </strong>

                                                    <p>
                                                        {item.products?.category ||
                                                            "Product"}{" "}
                                                        • Quantity:{" "}
                                                        {item.quantity}
                                                    </p>
                                                </div>

                                            </div>

                                            <strong className="order-item-price">
                                                ₹
                                                {(
                                                    Number(item.price) *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </strong>

                                        </div>

                                    ))}

                                </div>

                                {/* Total */}

                                <div className="order-total">

                                    <span>
                                        Total Amount
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            order.total_amount
                                        ).toFixed(2)}
                                    </strong>

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default Orders;