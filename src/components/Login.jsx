import React, { useState } from "react";
import database from "./Database";
import { useNavigate } from "react-router-dom";
import Social from "./Social";
import root from "./Root";


function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prevItem) => {
            return {
                ...prevItem,
                [name]: value
            };
        })
    }
    function handleClick() {
        database.postData("http://localhost:8080/login", user).then(data => {
            if (data.status) {
                const userDetails = { name: data.name, username: user.username, teams: data.teams};
                localStorage.setItem("user", JSON.stringify(userDetails));
                window.location.href = root;
            }
        })
    }
    return (
        <div className="signup-comp">
            <h1>Login to proceed.</h1>
            <div className="form-box">
                <div className="input-group">
                    <label >Email:</label>
                    <input type="email" onChange={handleChange} className="form-email" name="username" value={user.username} />
                </div>
                <div className="input-group">
                    <label >Password:</label>
                    <input type="password" onChange={handleChange} className="form-password" name="password" value={user.password} />
                </div>
                <button type="submit" onClick={handleClick} className="btn-submit">Login</button>
            </div>
            {/* <Social /> */}
        </div>
    )
}

export default Login;