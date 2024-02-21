import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./AddUser.css";
import { FormControlLabel, Switch } from "@mui/material";
const AddUser = ({ onFormClose }) => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const [error, setError] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const [isActive, setIsActive] = useState(true);

    const handleToggle = () => {
        setIsActive(!isActive);
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData({
            ...userData,
            [id]: value,
        });
        setError({
            ...error,
            [id]: "",
        });
    };

    const handleValidateFields = () => {
        let newErrors = {};
        if (!userData.username) {
            newErrors.username = "This field is required";
        }
        if (!userData.email) {
            newErrors.email = "This field is required";
        }
        if (!userData.phone) {
            newErrors.phone = "This field is required";
        }
        setError(newErrors);
        return newErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = handleValidateFields();
        if (Object.keys(newErrors).length === 0) {
            console.log("submit success");
        }
    };

    return (
        <div className="modal-form-body">
            <div className="modal-form">
                <div className="modal-title">
                    <span></span>
                    <h3>Add a new user</h3>
                    <button className="cancel-btn" onClick={onFormClose}>
                        <HighlightOffIcon />
                    </button>
                </div>
                <div className="modal-form-container">
                    <div className="modal-form-text">
                        <div></div>
                        <div className="modal-form-input">
                            <span className="input-title">User Type</span>
                            <select id="type" className="input-field">
                                <option value="">Select one</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <div className="modal-form-input">
                            <span className="input-title">Name</span>
                            <div className="input-field-form">
                                <input
                                    className="input-field"
                                    type="text"
                                    id="username"
                                    placeholder="User name"
                                    onChange={handleChange}
                                />
                                {error.username && <div className="error-message">{error.username}</div>}
                            </div>
                        </div>

                        <div className="modal-form-input">
                            <span className="input-title">Email Address</span>
                            <div className="input-field-form">
                                <input
                                    className="input-field"
                                    type="email"
                                    id="email"
                                    placeholder="Email Address"
                                    onChange={handleChange}
                                />
                                {error.email && <div className="error-message">{error.email}</div>}
                            </div>
                        </div>

                        <div className="modal-form-input">
                            <span className="input-title">Phone</span>
                            <div className="input-field-form">
                                <input
                                    className="input-field"
                                    type="text"
                                    id="phone"
                                    placeholder="Phone number"
                                    onChange={handleChange}
                                />
                                {error.phone && <div className="error-message">{error.phone}</div>}
                            </div>
                        </div>

                        <div className="modal-form-input">
                            <span className="input-title">Date of birth</span>
                            <input className="input-field" type="date" />
                        </div>

                        <div className="modal-form-input">
                            <span className="input-title">Gender</span>
                            <label style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                                <input type="radio" name="gender" value="male" />
                                Male
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                                <input type="radio" name="gender" value="female" />
                                Female
                            </label>
                        </div>
                        <div className="modal-form-input">
                            <span className="input-title">Status</span>

                            <FormControlLabel
                                control={<Switch checked={isActive} onChange={handleToggle} />}
                                label={isActive ? "Active" : "Inactive"}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-form-btn">
                    <button className="btn-cancel" onClick={onFormClose}>
                        Cancel
                    </button>
                    <button className="btn-submit" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
