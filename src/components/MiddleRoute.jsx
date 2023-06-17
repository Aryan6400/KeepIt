import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import database from "./Database";

function MiddleRoute(){
    database.getData("http://localhost:8080/isGoogleLogin").then(data=>{
        console.log(data);
    })
    return null;
}

export default MiddleRoute;