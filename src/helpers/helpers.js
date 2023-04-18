import * as constants from "../constants";

export function checkInput(input) { 
  if (input.trim().length === 0) {
    return { status: false, message: "Input field is empty" };
  }
  if (input.trim().length > constants.INPUT_CHAR_LIMIT) {
    return {
      status: false,
      message: `Character limit has been exceeded. Max: ${constants.INPUT_CHAR_LIMIT}`,
    };
  }

  return { status: true, message: "A new note is added" };
}
export function correctInputFormat(input) {
  const subStrings = input.trim().split(" ");
  let correctForm = "";
  subStrings.forEach((sub, index) => {
    if (sub) {
      correctForm += sub + " ";
    }
  });

  correctForm = correctForm.charAt(0).toUpperCase() + correctForm.slice(1);
  return correctForm.trim();
}

function getMaxId(notesArray) {
  if (notesArray.length !== 0) {
    let maxId = constants.ID_START - 1;

    notesArray.forEach((note) => {
      if (note.id > maxId) {
        maxId = note.id;
      }
    });
    return maxId;
  }
  return null;
}

export function getNextId(notesArray) {
  const maxId = getMaxId(notesArray);

  if (maxId === null) {
    return constants.ID_START;
  } else {
    return maxId + 1;
  }
}

function getRandomInteger(min = 0, max = 255) {
  // lower boundary cannot be bigger than upper boundary

  if (min > max) {
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addTrailingZero(str) {
  str = str.toString();

  if (str.length === 1) {
    return "0" + str;
  }
  return str;
}

export function generateRandomColor(alpha = 1) {
  if (typeof alpha !== "number" || alpha > 1 || alpha < 0) {
    return "#f0f0f0";
  }

  const colorLength = 3;
  let randomColor = "";

  for (let i = 0; i < colorLength; i++) {
    randomColor += addTrailingZero(getRandomInteger().toString(16));
  }

  alpha = alpha === 1 ? "" : Math.ceil(255 * alpha).toString(16);

  return ("#" + randomColor + alpha).toUpperCase();
}

export function saveNotesArrayToLocalStorage(notesArray) { 
  localStorage.setItem(constants.NOTES_ARRAY_KEY, JSON.stringify(defaultNotes(notesArray))); 
}

export function getNotesArrayFromLocalStorage() {
  const notesArray = localStorage.getItem(constants.NOTES_ARRAY_KEY);

  return notesArray === null ? [] : JSON.parse(notesArray);
}

// change the color of note with the corresponding id
export function getColorChangedArray(notesArray, id) {
  const newArray = notesArray.map((note) => {
    return note.id === id
      ? { ...note, backgroundColor: generateRandomColor() }
      : note;
  });

  saveNotesArrayToLocalStorage(newArray);
  return newArray;
}

export function editNote(notesArray, id, activateEdit=true)  
{ 
  const updatedArray = notesArray.map(note => {
    return note.id === id ? {...note, isEditActive: activateEdit , editedContent: {...note.editedContent, content: ""}} : note; 
  }); 
  
  // saveNotesArrayToLocalStorage(updatedArray) ; 
  return updatedArray; 
} 

export function defaultNotes(notesArray) 
{ 
  const updatedArray = notesArray.map(note => {
    return note.isEditActive ? {...note, isEditActive: false } : note; 
  }); 
  
  // saveNotesArrayToLocalStorage(updatedArray) ; 
  return updatedArray; 
} 

export function editedInputArray(notesArray, id, editedContent) 
{
  const updatedArray = notesArray.map(note => {
    return note.id === id ? {...note, editedContent: {content: editedContent, invalidInput: false } } : note; 
  }); 

  return updatedArray; 
} 

export function updatedContentArray(notesArray, id, editedContent) 
{
  const updatedArray = notesArray.map(note => {
    // return note.id === id && checkInput(note.editedContent.content).status ? {...note, note: editedContent.content , editedContent: {content: "", invalidInput: false } , isEditActive: false } : note; 
    if (note.id === id) 
    {
      if (checkInput(note.editedContent.content).status) 
      {
        return {
          ...note, 
          note: editedContent, 
          editedContent: {content: "", invalidInput: false } , 
          isEditActive: false 
        }; 
      } 
      else 
      {
        return {
          ...note, 
          editedContent: {...note.editedContent, invalidInput: true } 
        }; 
      }
    } 
    return note; 
  }); 

  return updatedArray; 
} 

export function extractId(str) 
{
  if (!str.includes("-")) 
  {
    return null; 
  } 
  const index = str.lastIndexOf("-");  
  const [staticId, id] = [str.substring(0, index + 1), str.substring(index + 1)]; 

  if (id.length === 0) 
  {
    return null; 
  }
  return {
    staticId: staticId, 
    id: id     
  } 
} 

export function disableTextarea(notesArray, id) 
{
  const updatedArray = notesArray.map(note => {
    return note.id === id ? {...note, isEditActive: false } : note; 
  }); 

  return updatedArray; 
}