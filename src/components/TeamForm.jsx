import React, { useState } from "react";
import database from "./Database";
import root from "./Root";


function TeamForm() {
    const [team, setTeam] = useState("");
    const [jointeam, setjoinTeam] = useState("");
    function createTeam(event) {
        const name = event.target.value;
        setTeam(name);
    }
    function joinTeam(event) {
        const name = event.target.value;
        setjoinTeam(name);
    }

    function handlecreateClick() {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        let updatedUser;
        const index = user.teams.indexOf(team);
        if (index < 0) {
            updatedUser = {
                username: user.username,
                name: user.name,
                team: team
            }
            database.postData("http://localhost:8080/createteam", updatedUser).then(data => {
                const response = {
                    username: data.username,
                    name: data.name,
                    teams: data.teams
                }
                console.log(response.teams);
                localStorage.setItem("user", JSON.stringify(response));
                window.location.href = root + "/team";
            })
        }
        else {
            alert("Team already exixts in your list. Create a new one or join an exixting team.")
            setTeam("");
        }
    }

    function handlejoinClick() {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        let updatedUser;
        const index = user.teams.indexOf(team);
        if (index < 0) {
            updatedUser = {
                username: user.username,
                name: user.name,
                teamname: jointeam
            }
            database.postData("http://localhost:8080/jointeam", updatedUser).then(data => {
                if (data.status) {
                    const response = {
                        username: data.username,
                        name: data.name,
                        teams: data.teams
                    }
                    localStorage.setItem("user", JSON.stringify(response));
                    alert(data.value);
                    window.location.href = root + "/team";
                }
                else {
                    alert(data.value);
                }
            })
        }
        else {
            alert("Team already exixts in your list. Create a new one or join an exixting team.")
            setTeam("");
        }
    }
    return (
        <div className="teamform-container">
            <div className="create-team">
                <h1>Create a new Team.</h1>
                <div className="form-box">
                    <div className="input-group">
                        <label >Team Name:</label>
                        <input type="name" onChange={createTeam} className="form-email" name="team-name" value={team} />
                    </div>
                    <button type="submit" onClick={handlecreateClick} className="btn-submit">Create</button>
                </div>
            </div>

            <div className="join-team">
                <h1>Join an existing team.</h1>
                <div className="form-box">
                    <div className="input-group">
                        <label >Team Name:</label>
                        <input type="name" onChange={joinTeam} className="form-email" name="team-name" value={jointeam} />
                    </div>
                    <button type="submit" onClick={handlejoinClick} className="btn-submit">Join</button>
                </div>
            </div>
            <div className="goto-team">
                <h1>Go to your Teams.</h1>
                <div className="form-box">
                    <button type="submit" onClick={()=>{
                        window.location.href = root + "/team";
                    }} className="btn-submit">Go</button>
                </div>
            </div>
        </div>
    )
}

export default TeamForm;