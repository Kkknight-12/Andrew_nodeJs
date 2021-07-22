/* 
installing package globaly with command
npm install nodemon@1.18.5 -g

installing package globally does't reflect on package.json. it install the module on our opreating system itself
*/

console.log("HI")

function* testingNodemon(){
    let id = 0;

    while( true ){
        yield id++
    }

}
const idIterator = testingNodemon();
const zero = idIterator.next().value 
console.log(zero)

const one = idIterator.next().value 
console.log(one)

const two = idIterator.next().value 
console.log(two)