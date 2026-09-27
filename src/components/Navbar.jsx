import { Link } from "react-router-dom";

function Navbar({ cartCount }) {

    return (
        <nav className="navbar">

            <div className="logo">
                🛒 Sharan's Shop
            </div>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/cart">
                    🛒 Cart ({cartCount})
                </Link>

                <Link to="/orders">
                    Orders
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;