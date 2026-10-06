import "./CategoryMenu.css";

function CategoryMenu() {

    const categories = [
        "All",
        "🥛 Dairy",
        "🍎 Fruits",
        "🥦 Vegetables",
        "🍞 Bakery",
        "🍪 Snacks",
        "🥤 Beverages",
        "🧹 Household"
    ];

    return (

        <div className="category-menu">

            {categories.map((category, index) => (

                <div
                    className="category-menu-item"
                    key={index}
                >
                    {category}
                </div>

            ))}

        </div>

    );
}

export default CategoryMenu;