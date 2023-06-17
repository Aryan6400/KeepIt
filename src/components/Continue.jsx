import React from "react";
import database from "./Database";

function Continue(){
    database.getData("http://localhost:8080/finduser").then(data=>{});
    return null;
}

export default Continue;