const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const pkg = require("./package.json");
const { addNote, printNotes, removeNoteById } = require("./notes.controller");

yargs(hideBin(process.argv))
  .command(
    "add",
    "Print all notes",
    {
      title: {
        type: "string",
        describe: "Note title",
        demandOption: true,
      },
    },
    ({ title }) => {
      addNote(title);
    }
  )
  .command("list", "Add new note to list", {}, () => {
    printNotes();
  })
  .command(
    "remove",
    "Remove note by id",
    {
      id: { type: "string", describe: "Note id", demandOption: true },
    },
    ({ id }) => {
      removeNoteById(id);
    }
  )
  .version(pkg.version)
  .parse();
