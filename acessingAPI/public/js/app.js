console.log('Client side Javascript file is loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener( 'submit', (e) => {
    e.preventDefault();
    const searchValue = search.value;
    message1.textContent = 'Loading....'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + searchValue ).then( (resp) =>{
    resp.json().then( (data) => {
        if( data.error ){
            console.log(data.error)
            message1.textContent = data.error;
        }else{
            console.log(data);
            message1.textContent = data.location;
            message2.textContent = data.forcast;
            search.value = '';
        }
    })
});
})