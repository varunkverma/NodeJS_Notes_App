const yargs = require("yargs");
const chalk = require("chalk");
const notes = require("./notes");

// Create add command using yargs
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Title of the note",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "the note's body",
      demandOption: true,
      type: "string"
    }
  },
  handler(args) {
    notes.addNote(args.title, args.body);
  }
});

// Create remove command using yargs
yargs.command({
  command: "remove",
  describe: "remove a new note",
  builder: {
    title: {
      describe: "The title of the note to be removed",
      demandOption: true,
      type: "string"
    }
  },
  handler(args) {
    notes.removeNote(args.title);
  }
});

// Create list command using yargs
yargs.command({
  command: "list",
  describe: "list all notes",
  handler() {
    notes.listNotes();
  }
});

// Create read command using yargs
yargs.command({
  command: "read",
  describe: "read notes",
  builder: {
    title: {
      description: "the title of the note to be read",
      demandOption: true,
      type: "string"
    }
  },
  handler(args) {
    notes.readNote(args.title);
  }
});

yargs.parse();
