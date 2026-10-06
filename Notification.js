
import "./Notification.css";

function Notification({
    message,
    type = "success"
}) {

    return (
        <div className={`notification ${type}`}>

            <div className="notification-icon">

                {type === "success" && "✓"}

                {type === "error" && "!"}

                {type === "info" && "i"}

                {type === "warning" && "!"}

            </div>

            <div className="notification-message">
                {message}
            </div>

        </div>
    );
}

export default Notification;

