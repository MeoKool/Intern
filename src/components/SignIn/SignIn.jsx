import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
const SignIn = () => {
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="sign-in-up-form">
            <h1 className="sign-up-title">Sign in</h1>
            <div className="social-container">
                <a href="#" className="social">
                    <GoogleIcon />
                </a>
            </div>
            <span className="introduce">or use your account</span>
            <div className="infield">
                <input
                    className="input-infield"
                    type="text"
                    placeholder="Username"
                    name="Username"
                    id="username"
                    onChange={handleChange}
                />
                <label className="input__label-field"></label>
            </div>
            <div className="infield">
                <input
                    className="input-infield"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                />
                <label className="input__label-field"></label>
            </div>
            <a href="#" className="forgot">
                Forgot your password?
            </a>
            <button className="btn-form">Sign In</button>
        </form>
    );
};

export default SignIn;
