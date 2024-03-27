// header.jsx
import { useEffect, useState } from "react";
import "./Header.css";
import FPTlogo from "./img/FPT_logo.png";
import { Link } from "react-router-dom";
import { GetAccount } from "../../api/APIConfigure";

export default function Header({ height }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAPI = async () => {
      try {
        if (token) {
          const response = await GetAccount();
          setLoading(false);
          if (response.status === 200) {
            setLoading(true);
            setData(response.data);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAPI();
  }, [token]);

  const handleLogOut = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");

    if (confirmed) {
      localStorage.clear();
      setLoading(false);
      setData(null);
      window.location.reload();
    }
  };

  return (
    <header className="header" style={{ height: height }}>
      <div className="content">
        <div className="navbar">
          <Link to="/">
            <img src={FPTlogo} alt="FPT Software" />
          </Link>
          <div className="actions">
            {token === null ? (
              <Link to="/login-register" className="btn action-btn">
                Sign In
              </Link>
            ) : loading ? (
              <div className="user-info">
                <div className="avatar-wrapper">
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src="https://s3-alpha-sig.figma.com/img/d1b4/292d/1d049740ed416330e848f7addcf002e1?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IFPYBKxdkqIgxvIJsAuSyUvuA6Sym~VTdchANOPBU6nlNrfheO6iS5GB4hL-1FdE1UWxcmtB~vh7Xs03QBNhrQ0Iz4iSgO6FfudnwJYLo1HZfqBr9Z-DXEQPaNSgMfBD8EeWhYqTLpbTWfGc8q0jLx72qqKYqKOaREA7cv0MT~6U8IliXeMyAl9v3PEzIaMBJCSQXs9hjzYtieESLeQJlDKflqxUkr-vR91pG5Sy79V5HsUGcMgq2B0s951NadM~FJEbyweUqbkUa4S~l3kr6j6gOvkD5mw4rBYy9gSL1D2NJdpCPD5fZeeSe4~iIH~dN-mnIKqCm-EKHNrUT6rLyg__"
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="avatar-info">
                  <span className="avt-name">{data.fullName}</span>
                  <span onClick={handleLogOut} className="avt-lgout">
                    Log out
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ color: "white" }}>Loading...</div>
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
