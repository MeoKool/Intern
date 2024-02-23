// header.jsx
import "./Header.css";
import FPTlogo from "./img/FPT_logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  // lấy token trên local storage
  const token = localStorage.getItem("token");
  return (
    <header className="header">
      <div className="content">
        <div className="navbar">
          <Link to="/">
            <img src={FPTlogo} alt="FPT Software" />
          </Link>
          <div className="actions">
            {/* <a href="/login-register" className="btn action-btn">
              Sign In
            </a> */}
            {/* nếu token === null thì hiển thị sign in không có thì hiển thị avatar */}
            {token === null ? (
              <a href="/login-register" className="btn action-btn">
                Sign In
              </a>
            ) : (
              <div className="user-info">
                <div className="avatar">
                  {
                    <img
                      className="avatar-img"
                      src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/391742883_2007923272925779_8551026695272517549_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHTWfFqOU5sjz9OaONLXPntm2I2DwQ8SjKbYjYPBDxKMto8PFEs2vWPVdNn7jkpdr-7XVmDhOQ3ISV0Y5gUlIgI&_nc_ohc=8GIBq94M1joAX8z9g8M&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfB8mpDh1HOIrb-0wV8_6H3FYkiGTHcfpXQhAN3s0Bn3Tg&oe=65D9C90F"
                      alt="avatar"
                    />
                  }
                </div>
              </div>
            )}
            <div className="language-container">
              {/* Khung biểu hiện ngôn ngữ */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
