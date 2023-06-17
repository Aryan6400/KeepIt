import React, { useState } from "react";
import NotesIcon from '@mui/icons-material/Notes';
import { Link } from "react-router-dom";
import database from "./Database";
import root from "./Root";


function Header() {
  function logOut() {
    database.getData("http://localhost:8080/logout").then((data) => {
      localStorage.clear();
      window.location.href = root+"/SignUp";
    })
  }
  const auth = localStorage.getItem("user");
  return (
    <header>
      <div>
        <h1 className="head"><Link className="head-link" to="/"><NotesIcon />Keep-It</Link></h1>
        <p className="about"><Link className="about-link" to="/about">About</Link></p>
        {auth ? <p className="username">{JSON.parse(auth).name.slice(0,8)}</p> : null}
        {auth ? <p className="team"><Link className="team-link" to="/join-team">Teams</Link></p> : null}
        {auth ? <p className="bin"><Link className="bin-link" to="/bin">Bin</Link></p> : null}
        {!auth ? <p className="login"><Link className="login-link" to="/Login">Login</Link></p> : null}
        {!auth ? <p className="signup"><Link className="signup-link" to="/SignUp">SignUp</Link></p> : null}
        {auth ? <p className="logout"><Link onClick={logOut} className="logout-link" to="/SignUp">LogOut</Link></p> : null}
      </div>
    </header>
  );
}

export default Header;
