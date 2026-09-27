import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ProductCard from "../components/ProductCard";

function Products({ addToCart }) {

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("name");

        if (error) {
            console.log("Error:", error);
        } else {
            setProducts(data);
        }

        setLoading(false);
    }

    const categories = [
        "All",
        ...new Set(products.map((product) => product.category))
    ];

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                (product) =>
                    product.category === selectedCategory
            );

    return (
        <div className="products-page">

            <div className="products-heading">

                <div>
                    <p className="products-label">
                        OUR COLLECTION
                    </p>

                    <h1>
                        Our Products
                    </h1>

                    <p>
                        Fresh products and everyday essentials
                        from your local shop.
                    </p>
                </div>

                <div className="product-count">
                    {filteredProducts.length} Products
                </div>

            </div>

            {/* Category Filter */}

            <div className="category-filter">

                {categories.map((category) => (

                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? "category-button active"
                                : "category-button"
                        }
                        onClick={() =>
                            setSelectedCategory(category)
                        }
                    >
                        {category}
                    </button>

                ))}

            </div>

            {/* Products */}

            {loading ? (

                <div className="loading">
                    Loading products...
                </div>

            ) : filteredProducts.length === 0 ? (

                <div className="no-products">
                    <h2>No products found</h2>
                    <p>
                        There are no products in this category.
                    </p>
                </div>

            ) : (

                <div className="product-grid">

                    {filteredProducts.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default Products;