import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero">

                <div className="hero-content">

                    <p className="hero-small">
                        WELCOME TO
                    </p>

                    <h1>
                        Sharan's Shop
                    </h1>

                    <h2>
                        Your everyday essentials,
                        delivered with ease.
                    </h2>

                    <p>
                        Order groceries, snacks, beverages
                        and daily essentials from your
                        local shop.
                    </p>

                    <Link to="/products">
                        <button className="shop-button">
                            Start Shopping →
                        </button>
                    </Link>

                </div>

                <div className="hero-image">
                    🛒
                </div>

            </section>


            {/* Categories */}
            <section className="categories">

                <h2>
                    Shop by Category
                </h2>

                <div className="category-grid">

                    <div className="category-card">
                        <span>🥛</span>
                        <h3>Dairy</h3>
                        <p>Milk, curd & eggs</p>
                    </div>

                    <div className="category-card">
                        <span>🍪</span>
                        <h3>Snacks</h3>
                        <p>Biscuits & chips</p>
                    </div>

                    <div className="category-card">
                        <span>🥤</span>
                        <h3>Beverages</h3>
                        <p>Drinks & refreshments</p>
                    </div>

                    <div className="category-card">
                        <span>🍞</span>
                        <h3>Bakery</h3>
                        <p>Fresh bakery items</p>
                    </div>

                </div>

            </section>


            {/* Features */}
            <section className="features">

                <div className="feature">
                    <span>🛍️</span>

                    <div>
                        <h3>Easy Ordering</h3>
                        <p>
                            Select products and place
                            your order in seconds.
                        </p>
                    </div>
                </div>

                <div className="feature">
                    <span>💰</span>

                    <div>
                        <h3>Affordable Prices</h3>
                        <p>
                            Get your everyday essentials
                            at shop prices.
                        </p>
                    </div>
                </div>

                <div className="feature">
                    <span>📦</span>

                    <div>
                        <h3>Simple Checkout</h3>
                        <p>
                            Enter your details and
                            place your order easily.
                        </p>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default Home;