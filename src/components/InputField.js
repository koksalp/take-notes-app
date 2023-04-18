import React from "react";
import styles from "./styles/InputField.module.css"; 
import {InputField_USER_INPUT_ID} from "../constants"; 

export default function InputField(props) 
{ 
    const inputStyle = { 
        backgroundColor: props.notesInfo.invalidInput ? "#ff0000" : "" , 
        color: props.notesInfo.invalidInput ? "white" : "" 
    }; 

    return ( 
        <div className={styles["input-field-div"]}> 
            <input id={InputField_USER_INPUT_ID} autoFocus style={inputStyle} type="text" placeholder="What is your note?" value={props.notesInfo.userInput} className={`${styles["user-input"]} ${props.notesInfo.invalidInput ? styles["invalid-placeholder"] : ""}`} onChange={props.handleInputChange} /> 
            <br /> <br /> 
            <button type="button" onClick={props.addNewNote} className={styles["add-new-note"]} >Add new note </button>  
            <br /> <br />
        </div >   
    );      
} 

 