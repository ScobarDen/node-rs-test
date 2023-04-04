const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen.bold("Note was added"));
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Notes list:"));
  notes.forEach((note) => console.log(chalk.blue(note.title)));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNoteById(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  if (JSON.stringify(notes) === JSON.stringify(newNotes)) {
    console.log(chalk.bgRed.bold(`Note with id ${id} not deleted`));
  } else {
    console.log(chalk.bgGreen.bold(`Note with id ${id} deleted`));
  }
}

module.exports = {
  addNote,
  printNotes,
  removeNoteById,
};
