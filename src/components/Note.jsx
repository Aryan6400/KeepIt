import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

function Note(props) {
  const [state, setState] = useState(false);
  const [hover, setHover] = useState(false);
  function handleClick() {
    props.onDelete(props.title, props.content, props.username);
  }
  function Expand(){
    setState((prevState)=>{
      return !prevState;
    });
  }
  function hoverOn(){
    setHover(true);
  }
  function hoverOff(){
    setHover(false);
  }
  function restore(){
    props.onRestore(props.title, props.content);
  }
  return (
    <div onMouseEnter={hoverOn} onMouseLeave={hoverOff} className={props.view ? "change-view":"note"}>
      {!props.home && hover && <button title="Restore" onClick={restore} ><RestoreFromTrashIcon /> </button>}
      <button title={state?"Minimize":"Expand"} onClick={Expand} >{state ? <RemoveIcon /> : <MoreHorizIcon />} </button>
      {props.team && <p id="team-note-username">{props.username}</p>}
      <h1>{props.title}</h1>
      {state && <p>{props.content}</p>}
      {state && hover && <button title={!props.home?"Delete Forever":"Move to bin"} id="delete-btn" onClick={handleClick}><DeleteIcon /></button>}
    </div>
  );
}

export default Note;
