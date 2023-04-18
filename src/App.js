import React, { useState } from "react";
import "./App.css";
import CreateNote from "./components/CreateNote";
import Note from "./components/Note";
import DeleteAllButton from "./components/DeleteAllButton";
import * as constants from "./constants";
import * as helpers from "./helpers/helpers";

function App() {
  const [notesInfo, setNotesInfo] = useState({
    notes: helpers.getNotesArrayFromLocalStorage(),
    userInput: "",
    addNewNote: false,
    invalidInput: false, 
    message: "" 
  });

  function openInputField() {
    setNotesInfo((prevState) => ({
      ...prevState,
      addNewNote: true,
    }));
  }

  function handleInputChange(event) {
    setNotesInfo((prevState) => ({
      ...prevState,
      userInput: event.target.value,
      invalidInput: false, 
      message: "" 
    }));
  }

  // add a new note
  function addNewNote() {
    const input = notesInfo.userInput;
    const checkedInput = helpers.checkInput(input); 
    if (checkedInput.status) {
      const newNote = {
        note: helpers.correctInputFormat(input),
        id: helpers.getNextId(notesInfo.notes),
        backgroundColor: helpers.generateRandomColor(), 
        isEditActive: false,  
        editedContent: {
          content: "", 
          invalidInput: false 
        }
      }; 

      const latestNotesArray = [...notesInfo.notes, newNote];

      setNotesInfo((prevState) => ({
        ...prevState,
        notes: latestNotesArray,
        userInput: "", 
        addNewNote: false, 
        message: checkedInput.message 
      }));

      helpers.saveNotesArrayToLocalStorage(latestNotesArray);
    } else { 
      setNotesInfo((prevState) => ({
        ...prevState,
        invalidInput: true, 
        message: checkedInput.message 
      }));
    }
  }

  document.onkeydown = (event) => {
    if (event.target.id === constants.InputField_USER_INPUT_ID) {
      if (event.key === "Enter") {
        addNewNote();
      } else if (event.key === "Escape") {
        setNotesInfo((prevState) => ({
          ...prevState,
          userInput: "",
          addNewNote: false,
        }));
      }
    } else if (
      event.target.tagName.toLowerCase() === "body" &&
      event.key === "Enter"
    ) {
      setNotesInfo((prevState) => ({
        ...prevState,
        addNewNote: true,
      }));
    } 
    else if (event.key === "Escape" && helpers.extractId(event.target.id) !== null && helpers.extractId(event.target.id).staticId === constants.Note_TEXTAREA_ID) 
    { 
      const id = +helpers.extractId(event.target.id).id; 
      if (!isNaN(id)) 
      {
        const updatedNotesArray = helpers.disableTextarea(notesInfo.notes, id);  
        setNotesInfo((prevState) => ({
          ...prevState,
          notes: updatedNotesArray 
        }));
      }
    }
  };       

  function changeColor(id) {
    setNotesInfo((prevState) => ({
      ...prevState,
      notes: helpers.getColorChangedArray(notesInfo.notes, id),
    }));
  } 

  // a note with given id is removed
  function deleteNote(id) {
    let index;

    for (let i = 0; i < notesInfo.notes.length; i++) {
      if (notesInfo.notes[i].id === id) {
        index = i;
        break;
      }
    }

    const latestNotesArray = [...notesInfo.notes];
    latestNotesArray.splice(index, 1);

    setNotesInfo((prevState) => ({
      ...prevState,
      notes: latestNotesArray,
    }));

    helpers.saveNotesArrayToLocalStorage(latestNotesArray);
  }
  function deleteAllNotes() {
    setNotesInfo((prevState) => ({
      ...prevState,
      notes: [],
    }));

    helpers.saveNotesArrayToLocalStorage([]);
  } 

  // document.onclick = event => console.log(event.target); 
  function editNote(id)  
  {
    const updatedNotesArray = helpers.editNote(notesInfo.notes, id); 

    setNotesInfo((prevState) => ({
      ...prevState,
      notes: updatedNotesArray 
    }));

  } 
  function handleEditedInputChange(event)  
  { 
    const updatedNotesArray = helpers.editedInputArray(notesInfo.notes, +helpers.extractId(event.target.id).id, event.target.value); 
    setNotesInfo((prevState) => ({
      ...prevState,
      notes: updatedNotesArray 
    }));
  } 

  function confirmEdit(id, editedContent) 
  {
    const updatedNotesArray = helpers.updatedContentArray(notesInfo.notes, id, editedContent); 
    setNotesInfo((prevState) => ({
      ...prevState,
      notes: updatedNotesArray 
    })); 
    helpers.saveNotesArrayToLocalStorage(updatedNotesArray); 
  } 
  
  return (
    <React.Fragment> 
      {notesInfo.message && <h2 style={{ color: notesInfo.invalidInput ? "red" : "green" }}>{notesInfo.message}</h2>}
      <CreateNote
        notesInfo={notesInfo}
        openInputField={openInputField}
        handleInputChange={handleInputChange}
        addNewNote={addNewNote}
      />
      <br />
      {notesInfo.notes.length !== 0 && (
        <DeleteAllButton deleteAllNotes={deleteAllNotes} />
      )}
      <br />
      {notesInfo.notes.length === 0 ? (
        <h2>You have no current notes.</h2>
      ) : (
        notesInfo.notes.map((note, index) => {
          return (
            <Note
              key={note.id}
              {...note}
              index={index}
              deleteNote={() => deleteNote(note.id)}
              changeColor={() => changeColor(note.id)} 
              editNote={() => editNote(note.id)} 
              confirmEdit={() => confirmEdit(note.id, note.editedContent.content)} 
              handleEditedInputChange={handleEditedInputChange} 
              />
            );
          })
        )}
      </React.Fragment>
    );
  }
  
  export default App;
  