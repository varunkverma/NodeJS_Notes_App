const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();

  // check if title already present
  //const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note with this title already exists"));
  }
};

const removeNote = title => {
  const notes = loadNotes();

  const notesToKeep = notes.filter(note => note.title !== title);
  if (notesToKeep.length < notes.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("note deleted successfully"));
  } else {
    console.log(chalk.red.inverse("No note found with passed title"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("Your Notes"));
  notes.forEach(note => {
    console.log(chalk.green(note.title));
  });
};

const readNote = title => {
  const notes = loadNotes();

  const noteToBeRead = notes.find(note => note.title === title);

  if (noteToBeRead) {
    console.log(chalk.green.inverse(noteToBeRead.title));
    console.log(chalk.green(noteToBeRead.body));
  } else {
    console.log(chalk.red.inverse("No note found with the entered title"));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = { addNote, removeNote, listNotes, readNote };
