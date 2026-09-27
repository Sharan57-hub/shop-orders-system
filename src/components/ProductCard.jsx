function ProductCard({ product, addToCart }) {

    const categoryIcons = {
        Dairy: "🥛",
        Bakery: "🍞",
        Snacks: "🍪",
        Beverages: "🥤",
        Chocolates: "🍫",
        Groceries: "🛒",
        "Ice Cream": "🍦"
    };

    const icon =
        categoryIcons[product.category] || "🛍️";

    return (
        <div className="product-card">

            <div className="product-image">

                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                    />
                ) : (
                    <span>
                        {icon}
                    </span>
                )}

            </div>

            <div className="product-info">

                <p className="category">
                    {product.category}
                </p>

                <h3>
                    {product.name}
                </h3>

                <div className="product-details">

                    <p className="price">
                        ₹{Number(product.price).toFixed(2)}
                    </p>

                    <p className="stock">
                        {product.stock > 0
                            ? `${product.stock} available`
                            : "Out of stock"}
                    </p>

                </div>

                <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                >
                    {product.stock === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                </button>

            </div>

        </div>
    );
}

export default ProductCard;