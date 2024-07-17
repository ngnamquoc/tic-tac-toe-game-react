import { useState } from "react";
export default function Player({initialName,symbol,isActive,updatePlayerName}){
    const [userName, setName]=useState(initialName);
    const [isEditing, setIsEditing]=useState(false);
    function handleEditToggle(){
        setIsEditing((editing)=>!editing);
        if(isEditing){
            //only update when user click save
            updatePlayerName(symbol,userName);
        }
    }
    function handleChange(event){
        //2-way-binding concept to dymically update username
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
        <li className={isActive?"active":undefined}>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditToggle}>{buttonTitle}</button>
        </li>

    );
}