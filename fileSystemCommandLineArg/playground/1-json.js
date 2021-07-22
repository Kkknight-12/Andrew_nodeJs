const fs = require('fs');

const books = {
    title: "One Piece",
    author: "Echiro Oda"
}

// JSON.stringify will convert the Js object to JSON
const bookJson = JSON.stringify(books);
// fs.writeFileSync('1-JSON.json', bookJson)

// reading the data saved in json file
// const dataBuffer = fs.readFileSync('1-JSON.json')
// console.log(dataBuffer)
// <Buffer 7b 22 74 69 74 6c 65 22 3a 22 61 73 64 61 73 64 61 73 64 22 2c 22 61 75 74 68 6f 72 22 3a 22 61 73 64 61 73 64 61 64 61 22 7d>
/* if we try to access the data we can see that the data received is in binary form. We need to change it to string format to be able to read it. */


// 
// const dataBuffer = fs.readFileSync('1-JSON.json').toString()

// data received here will be in JSON format
// console.log(dataBuffer) // can also add .toString() method here
// {"title":"asdasdasd","author":"asdasdada"}

const dataBuffer = fs.readFileSync('1-JSON.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data)
// { title: 'asdasdasd', author: 'asdasdada' }
console.log(data.title)