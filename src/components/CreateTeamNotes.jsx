import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import database from "./Database";

function CreateTeamNotes(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const [state, setState] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function submitNote(event) {
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        const data = {
            teamname: props.team,
            username: user.name,
            title: note.title,
            content: note.content
        }
        // console.log(data);
        database.postData("http://localhost:8080/createTeamNotes", data).then(function (data) {
            props.onAdd(data.notes);
        });
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
    }

    function expand() {
        setState(true);
    }

    return (
        <div>
            <form className="create-note">
                {state && <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                />}
                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={state ? "3" : "1"}
                />
                <Zoom in={state}>
                    <Fab onClick={submitNote}><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateTeamNotes;
