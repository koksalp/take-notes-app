import React from "react";
import styles from "./styles/CreateNote.module.css"; 
import InputField from "./InputField"; 

export default function CreateNote(props)
{
    return (
        <React.Fragment>
            {
                props.notesInfo.addNewNote ? 
                    <InputField notesInfo={props.notesInfo} handleInputChange={props.handleInputChange} addNewNote={props.addNewNote}/>
                    : 
                    <button type="button" className={styles["add-notes"]} onClick={props.openInputField}>+</button>
            } 
        </React.Fragment> 
    ); 
} 