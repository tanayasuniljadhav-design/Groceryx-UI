import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {

    return (

        <div className="product-card">

            {/* Wishlist */}

            <button className="wishlist-button">
                ♡
            </button>


            {/* Product Image */}

            <div className="product-image">
                {product.image}
            </div>


            {/* Product Information */}

            <div className="product-information">

                <h3>
                    {product.name}
                </h3>

                <p className="product-size">
                    {product.size}
                </p>


                <div className="product-rating">
                    ★ {product.rating}
                </div>


                <div className="product-price">

                    ₹{product.price}

                    <span>
                        ₹{product.mrp}
                    </span>

                </div>


                <p className="discount">
                    {product.discount}% OFF
                </p>


                <button
                    className="add-cart-button"
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </button>

            </div>

        </div>

    );
}

export default ProductCard;