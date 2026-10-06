
import "./OfferScreen.css";

function OfferScreen() {

    return (
        <div className="offer-screen">

            <div className="offer-content">

                <div className="offer-shopping">
                    🛒
                </div>

                <p className="offer-small">
                    GROCERYX SPECIAL OFFER
                </p>

                <h1>
                    WELCOME OFFER
                </h1>

                <div className="offer-discount">
                    50% OFF
                </div>

                <h2>
                    On Your First Grocery Order
                </h2>

                <p className="offer-code">
                    Use Code: <strong>GROCERY50</strong>
                </p>

                <p className="offer-loading">
                    Taking you to your shopping dashboard...
                </p>

                <div className="offer-loader">
                    <div></div>
                </div>

            </div>

        </div>
    );
}

export default OfferScreen;

