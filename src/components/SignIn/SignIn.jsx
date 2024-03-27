import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";

import { SignInAccount } from "../../api/APIConfigure";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setErrors({
      ...errors,
      [id]: "",
    });
  };

  const handleValidateFields = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email không được để trống.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng [@..].";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    }
    setErrors(newErrors);
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = handleValidateFields();
    if (Object.keys(newErrors).length === 0) {
      const userData = {
        email: formData.email,
        password: formData.password,
      };
      try {
        const response = await SignInAccount(userData);
        console.log(response);

        if (response.status === 200) {
          console.log("success");
          localStorage.setItem("token", response?.data?.token);
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors &&
          error.response.data.errors.Password
        ) {
          console.log(error.response.data.errors.Password);
          setErrors(error.response.data.errors.Password);
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.ErrorMessage
        ) {
          console.log(error.response.data.ErrorMessage);
          setErrors(error.response.data.ErrorMessage);
        } else {
          console.log("Lỗi không mong muốn từ máy chủ.");
          setErrors(
            "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập."
          );
        }
      }
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
        <div className="infield-text">
          <input
            className="input-infield"
            type="text"
            placeholder="Email"
            name="Email"
            id="email"
            onChange={handleChange}
          />
          <label className="input__label-field"></label>
        </div>
        <div className="error-box">
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="infield">
        <div className="infield-text">
          <input
            className="input-infield"
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            id="password"
            onChange={handleChange}
          />
          <IconButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <label className="input__label-field"></label>
        </div>
        <div className="error-box">
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
      </div>
      <div className="error-box">
        {errors &&
          Object.values(errors).map((error, index) => (
            <span key={index} className="error-message">
              {error}
            </span>
          ))}
      </div>

      <a href="#" className="forgot">
        Forgot your password?
      </a>
      <button className="btn-form">Sign In</button>
    </form>
  );
};

export default SignIn;
