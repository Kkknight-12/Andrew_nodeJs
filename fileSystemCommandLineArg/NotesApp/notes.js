const { inverse } = require('chalk')
const chalk = require('chalk')
const fs = require('fs')


const getNotes = function (){
    return 'Your notes'
}

const addNotes = ( title, body ) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter( (note)=> note.title === title)

    if( duplicateNotes.length === 0 ){
        notes.push( {
            title: title,
            body: body
        } );
        saveNotes(notes)
        console.log('New note added');
    } else{
        console.log('Note title taken!')
    }
}
// remove notes
const removeNote = ( title ) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter( (note) =>  note.title !== title)

    if (notes.length > notesToKeep.length ){
        console.log( chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep);
    }else{
        console.log(chalk.red.inverse("No note found!"));
    }
}

const listNotes = () =>{
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'));
    notes.forEach( note => console.log(note.title))
}

const saveNotes = function (notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString()
        // making the data Js Object so that we can push our data in it
        return JSON.parse(dataJSON);
    }
    catch(e){
        return []
    }
}



module.exports = { getNotes, addNotes, removeNote, listNotes };