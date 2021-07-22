const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

// calling command on yargs
yargs.command( {
    command: 'add', // providing name
    descirbe: 'Add a new note', // adding discription

    // adding discribe
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){  // this function will run when someone will run add command
        notes.addNotes( argv.title, argv.body )
    }
})

yargs.command( {
    command: 'remove',
    descirbe: 'remove a note',
    builder: {
        title:{
            descirbe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
});

/* 
$ node apps.js add
Adding a new note!
{ _: [ 'add' ], '$0': 'apps.js' } 
*/

yargs.command( {
    command: 'list',
    descirbe: 'List your notes',
    handler(){
        notes.listNotes();
    }
})

yargs.command( {
    command: 'read',
    descirbe: 'Read a note',
    handler(){
        console.log('Reading a notes')
    }
})

// console.log(yargs.argv)
yargs.parse()