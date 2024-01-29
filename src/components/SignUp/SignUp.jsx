import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        address: "",
        password: "",
        confirmPassword: "",
        phone: "",
        status: true,
        sex: true,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        const idSex = id === "sex" ? value === "male" : value;
        setFormData({
            ...formData,
            [id]: idSex,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form data submitted:", formData);
    };
    return (
        <form onSubmit={handleSubmit} className="sign-in-up-form">
            <h1 className="sign-up-title">Create Account</h1>
            <div className="social-container">
                <a href="#" className="social">
                    <i className="fab fa-google-plus-g">
                        <GoogleIcon />
                    </i>
                </a>
            </div>
            <span>or use your email for registration</span>
            <div className="infield">
                <input
                    className="input-infield"
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={formData.username}
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
                    value={formData.password}
                    onChange={handleChange}
                />
                <label className="input__label-field"></label>
            </div>
            <div className="infield">
                <input
                    className="input-infield"
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <label className="input__label-field"></label>
            </div>
            <div className="infield">
                <input
                    className="input-infield"
                    type="text"
                    placeholder="Full Name"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <label className="input__label-field"></label>
            </div>
            <div className="infield">
                <input
                    className="input-infield"
                    type="text"
                    placeholder="Address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <label className="input__label-field"></label>
            </div>
            <div className="infield">
                <select
                    className="input-infield"
                    placeholder="Sex"
                    id="sex"
                    value={formData.sex ? "male" : "female"}
                    onChange={handleChange}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label className="input__label-field"></label>
            </div>

            <div className="infield">
                <input
                    className="input-infield"
                    type="text"
                    placeholder="Phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <label className="input__label-field"></label>
            </div>
            <button className="btn-form">Sign Up</button>
        </form>
    );
};

export default SignUp;
