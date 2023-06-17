import React from "react";
import database from "./Database";
import root from "./Root";


function Social() {
    function handleClick(){
        // window.open("http://localhost:8080/auth/google", "_self");
        database.getData("http://localhost:8080/google-login").then(data=>{
            localStorage.setItem("user", JSON.stringify({username: data.username, name: data.name}));
            window.location.href = root;
        })
    }
    return (
        <div className="social-box">
            <div className="google">
                <a onClick={handleClick} className="btn-google" role="button">
                    <i className="fa-brands fa-google"></i> Sign In with Google
                </a>
            </div>
        </div>
    )
}

export default Social;