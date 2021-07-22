// for npm modules we write package name
const validator = require('validator');

// you can see the  list of the validators methods at npm package page
const email = 'mayanks@gmail.com'
console.log(validator.isEmail(email)) // true

const email2 = 'mayanks.com'
console.log(validator.isEmail(email2)) // false



// checking if url is valid
const url1 = 'https://www.npmjs.com/package/validator'
console.log(validator.isURL(url1)) // true

const url2 = 'https:www.npmjs.com/package/validator'
console.log(validator.isURL(url2)) // false