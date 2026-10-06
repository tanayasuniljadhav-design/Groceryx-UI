
import { useState } from "react";
import "./Navbar.css";

function Navbar({ onLoginClick }) {

    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        if (searchText.trim() === "") {
            return;
        }

        alert("Searching for: " + searchText);
    };

    return (
        <nav className="navbar">

            {/* LOGO */}
            <div className="navbar-logo">
                🛒 GroceryX
            </div>

            {/* LOCATION */}
            <div className="navbar-location">
                📍 Mumbai
            </div>

            {/* SEARCH */}
            <div className="navbar-search">

                <input
                    type="text"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search for groceries, fruits, vegetables..."
                />

                <button
                    type="button"
                    onClick={handleSearch}
                >
                    🔍
                </button>

            </div>

            {/* NAVIGATION */}
            <div className="navbar-links">

                <button
                    type="button"
                    className="login-button"
                    onClick={onLoginClick}
                >
                    👤 Login
                </button>

                <span className="nav-item">
                    ♡ Wishlist
                </span>

                <span className="nav-item">
                    🛒 Cart
                </span>

            </div>

        </nav>
    );
}

export default Navbar;

