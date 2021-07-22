// will be using chalk library
const chalk = require('chalk');

const success = "Success!"
console.log(chalk.green(success));

// Compose multiple styles using the chainable API
const colbackground = "font color will be red, background will be yellow text will be bold"
console.log(chalk.red.bgYellowBright.bold(colbackground));

// using template literal
const miles = 18;
const calculateFeet = miles => miles * 5280;

console.log(chalk`
	There are {bold 5280 feet} in a mile.
	In {bold ${miles} miles}, there are {green.bold ${calculateFeet(miles)} feet}.
`);