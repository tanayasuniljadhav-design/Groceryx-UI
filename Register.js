
import { useState } from "react";
import "./Register.css";

function Register({
    onRegistrationSuccess,
    onCancel
}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (event) => {

        event.preventDefault();

        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (phone.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        const customer = {
            name,
            email,
            phone,
            password
        };

        localStorage.setItem(
            "groceryxCustomer",
            JSON.stringify(customer)
        );

        onRegistrationSuccess();
    };

    return (
        <div className="register-overlay">

            <div className="register-card">

                <button
                    className="close-button"
                    onClick={onCancel}
                >
                    ×
                </button>

                <div className="register-icon">
                    🛒
                </div>

                <h1>Create Account</h1>

                <p>
                    Join GroceryX and start shopping
                </p>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="register-submit"
                    >
                        Create Account
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;

