// you first need to import the node module 
const fs = require("fs");

// fs is a syncronous command which is used to write you own file
// first command is name of app in which you will write, second is 
// data which which you will write
fs.writeFileSync("notes.txt", "Hi i am learning Node.js!")


// it creates a file if it doesn't exist
// if you run the command with new data, previous data in the file will be overwritten


// //////////////////
// appendFileSync ///
// //////////////////
// method when you want to append the data

fs.appendFileSync('notes.txt', 'I like coding');

// 
try {
  fs.appendFileSync('message.txt', 'data to append');
  console.log('The "data to append" was appended to file!');
} catch (err) {
  /* Handle the error */
}