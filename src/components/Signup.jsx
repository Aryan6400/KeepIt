import React, { useState } from "react";
import database from "./Database";
import root from "./Root";
import Social from "./Social";



function SignUp() {
    const [user, setUser] = useState({
        name: "",
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
        database.postData("http://localhost:8080/signup", user).then(data => {
            if (data.status) {
                const userDetails = { name: user.name, username: user.username, teams: [] }
                localStorage.setItem("user", JSON.stringify(userDetails));
                window.location.href = root;
            }
        })
    }
    return (
        <div className="signup-comp">
            <h1>Sign Up to Proceed</h1>
            <div className="form-box">
                <div className="input-group">
                    <label >Name:</label>
                    <input type="name" onChange={handleChange} className="form-email" name="name" value={user.name} />
                </div>
                <div className="input-group">
                    <label >Email:</label>
                    <input type="email" onChange={handleChange} className="form-email" name="username" value={user.username} />
                </div>
                <div className="input-group">
                    <label >Password:</label>
                    <input type="password" onChange={handleChange} className="form-password" name="password" value={user.password} />
                </div>
                <button type="submit" onClick={handleClick} className="btn-submit">SignUp</button>
            </div>
            {/* <Social /> */}
        </div>
    )
}

export default SignUp;
