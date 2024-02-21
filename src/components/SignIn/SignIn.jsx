import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import axios from "axios";
const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://app.swaggerhub.com/apis/users/login",
        {
          user: formData,
        }
      );
      setSuccess(true);
      setError(null);
      if (response.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        window.location.href = "/";
      }
    } catch (error) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.");
    }
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
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label className="input__label-field"></label>
      </div>
      <div className="infield">
        <input
          className="input-infield"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
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
