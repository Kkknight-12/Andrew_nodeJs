const fs = require('fs');

const dataBuffer = fs.readFileSync('1-JSON.json');
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)
console.log(user);

/* 
$ node exercise.js
{ title: 'One Piece', author: 'Echiro Oda' } 
*/

user.title = 'My Hero Academia'
user.author = 'Kohei Horikoshi'
const userJSON = JSON.stringify(user)
fs.writeFileSync('1-JSON.json', userJSON);