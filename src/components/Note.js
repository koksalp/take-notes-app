import React from "react";
import styles from "./styles/Note.module.css"; 
import { Note_CHANGE_COLOR_BUTTON_ID , Note_EDIT_BUTTON_ID , Note_TEXTAREA_ID } from "../constants"; 

export default function Note(props) 
{ 
    
    return (
        <div className={styles["note-div"]} style={{ backgroundColor: props.backgroundColor }} >  
            <button type="button" id={Note_CHANGE_COLOR_BUTTON_ID} className={styles["change-color-button"]} onClick={props.changeColor}><i className='fas fa-sync'></i></button> 
            {!props.isEditActive && <button type="button" id={Note_EDIT_BUTTON_ID} className={styles["edit-button"]} onClick={props.editNote}><i className='fas fa-edit'></i></button> } 
            <h2>Note #{props.index + 1} Id: {props.id} </h2> 
            {!props.isEditActive && <p >{props.note} </p> } 
            {props.isEditActive && <textarea rows="5" cols="30" value={props.editedContent.content} placeholder="Update your note" id={`${Note_TEXTAREA_ID + props.id}`} className={styles.textarea} autoFocus onChange={props.handleEditedInputChange}></textarea>}
            {!props.isEditActive && <button type="button" className={styles["confirm-button"]} onClick={props.deleteNote}>Delete <i className='fas fa-trash'></i></button> }
            {props.isEditActive && <button type="button" className={`${styles["confirm-button"]} ${props.editedContent.invalidInput ? styles["edit-button-invalid-input"] : "" }`} onClick={props.confirmEdit}>Edit <i className='fas fa-edit'></i></button>} 
            
        </div>
); 
} 