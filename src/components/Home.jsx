import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import database from "./Database";
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewModuleIcon from '@mui/icons-material/ViewModule';


function Home() {
  var user = localStorage.getItem("user");
  user = JSON.parse(user);
  database.postData("http://localhost:8080/find", user).then(function (data) {
    addNote(data);
  })
  const [notes, setNotes] = useState([]);
  const [view, setView] = useState(false);

  function addNote(newNote) {
    setNotes(newNote);
  }

  function deleteNote(title, content) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    const note = { user: user.username, title: title, content: content }
    database.deleteData("http://localhost:8080", note).then(function (data) {
      addNote(data);
    });
  }

  function toggleView(){
    setView((prevView)=>{
      return !prevView
    })
  }
  // console.log(notes);
  return (
    <div>
      {view ? <p className="toggle-view" onClick={toggleView}><ViewModuleIcon /></p> : <p className="toggle-view" onClick={toggleView}><ViewAgendaIcon /></p>}
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            home={true}
            view={view}
            team={false}
          />
        );
      })}
    </div>
  );
}

export default Home;
