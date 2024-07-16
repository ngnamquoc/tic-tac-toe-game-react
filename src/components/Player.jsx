import { useState } from "react";
export default function Player({initialName,symbol}){
    const [userName, setName]=useState(initialName);
    const [isEditing, setIsEditing]=useState(false);
    function handleEditToggle(){
        //update state instantly by arrow function
        setIsEditing((editing)=>!editing);
        // console.log("editing mode" + isEditing);
    }
    function handleChange(event){
        //apply 2-way-binding concept
        // console.log(event.target.value);
        setName(event.target.value);
    }
    //default playerName & button title
    let playerName=<span className="player-name">{userName}</span>
    let buttonTitle="Edit";
    //When on editing mode
    if(isEditing){
        playerName=<span className="player-name"><input onChange={handleChange} required defaultValue={name} type="text" placeholder="Type Name..."/></span>;
        buttonTitle="Save";
    }
    
    return(
        <li>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditToggle}>{buttonTitle}</button>
        </li>

    );
}