// with require you pass path to file -> relative path
// const firstName = require("./utils.js")
// you can store the value passed from utils in any variable


// console.log(firstName)
/* output
$ node apps.js
Utils Run
Knight in Utils
*/


// importing function
const addition = require('./utils.js')
const sum = addition(4,2)
console.log(sum);

// importing function 2
const getNotes = require('./notes.js')
const notes = getNotes()
console.log(notes)
