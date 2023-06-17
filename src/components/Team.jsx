import React, { useState } from "react";
import Note from "./Note";
import database from "./Database";
import CreateTeamNotes from "./CreateTeamNotes";
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

function Team() {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    const [notes, setNotes] = useState([]);
    const [teamName, setTeamName] = useState(null);
    const [view, setView] = useState(false);

    function getTeamNotes(event) {
        database.postData("http://localhost:8080/getTeamNotes", { teamname: event }).then(data => {
            addNote(data.notes);
            setTeamName(event);
        })
    }

    function addNote(newNote) {
        setNotes(newNote);
    }

    function deleteNote(title, content, username) {
        const note = { teamname: teamName, username: username, title: title, content: content }
        database.deleteData("http://localhost:8080/teamNotes", note).then(function (data) {
            addNote(data.notes);
        });
    }

    function toggleView() {
        setView((prevView) => {
            return !prevView
        })
    }
    
    return (
        <div>
            {view ? <p className="toggle-view" onClick={toggleView}><ViewModuleIcon /></p> : <p className="toggle-view" onClick={toggleView}><ViewAgendaIcon /></p>}
            <div className="team-container">
                <div className="left">
                    <h3>
                        Your Teams :
                    </h3>
                    {user.teams.map(team => {
                        let teamname;
                        team.length > 18 ? teamname = team.slice(0, 16) : teamname = team
                        return (
                            <p id={teamName===teamname && "active-team-name"} className="team-name" onClick={function handleClick() {
                                getTeamNotes(team);
                            }}>{teamname}</p>
                        );
                    })}
                </div>

                {teamName === null ? null : <div className="top">
                    <CreateTeamNotes onAdd={addNote} team={teamName} />
                </div>}

                <div className="right">
                    {notes.map((noteItem, index) => {
                        return (
                            <Note
                                key={index}
                                id={index}
                                username={noteItem.name}
                                title={noteItem.title}
                                content={noteItem.content}
                                onDelete={deleteNote}
                                home={true}
                                team={true}
                                view={view}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Team;