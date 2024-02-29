import "./LoginPage.css";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { useState } from "react";

const Form = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const handleToggleForm = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    };

    return (
        <>
            <div className="body-container">
                <div className={`container ${isSignUp ? "right-panel-active" : ""}`} id="container">
                    <div className="form-box-container sign-up-container">
                        <SignUp />
                    </div>
                    <div className="form-box-container sign-in-container">
                        <SignIn />
                    </div>
                    <div className="overlay-container" id="overlayCon">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="sign-up-title">Welcome Back!</h1>
                                <p className="intro-text">Connected with us please login with your personal info</p>
                                <button className="btn-form">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="sign-up-title">Hello, Friend!</h1>
                                <p className="intro-text">Enter your personal details and start journey with us</p>
                                <button className="btn-form">Sign Up</button>
                            </div>
                        </div>
                        <button className="btn-form" id="overlayBtn" onClick={handleToggleForm}></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
