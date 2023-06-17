import React, { useState } from "react";
import Note from "./Note";
import database from "./Database";

function Bin() {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    database.postData("http://localhost:8080/bin", user).then(function (data) {
        addNote(data);
    })
    const [notes, setNotes] = useState([]);
    function addNote(newNote) {
        setNotes(newNote);
    }
    function deleteNote(title, content) {
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        const note = { user: user.username, title: title, content: content }
        database.deleteData("http://localhost:8080/bin", note).then(function (data) {
            addNote(data);
        });
    }
    function restoreNote(title, content){
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        const note = { user: user.username, title: title, content: content }
        database.postData("http://localhost:8080/restore", note).then(function (data) {
        addNote(data);
    })
    }
    return (
        <div>
            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                        onRestore={restoreNote}
                    />
                );
            })}
        </div>
    )
}


export default Bin;