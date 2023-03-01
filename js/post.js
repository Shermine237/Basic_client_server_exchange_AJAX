//grab required elements
let btn = document.getElementById('btnSend');
let txtField = document.getElementById('message')

btn.addEventListener('click', handleClick, false);

//handleClick
async function handleClick(e){
    //grab value typed in text field
    let message = document.getElementById('message').value;
    const reqOptions = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text : message})
    };
    try{
        let rawResponse = await fetch('http://127.0.0.1:3000/server.php', reqOptions);
        let response = await handleErrors(rawResponse);
        let data = await response.json();
        let html = await createSuccessHtml(data);
    } catch (error){
        let html =  createErrorHtml(error.message);
    }
    finally {
        updateUI(html);
    }
    
}

//handleErrors
async function handleErrors(response){
    if(! response.ok){
        let data = await response.json();
        throw data;
    }
    return response;
}

function createSuccessHtml(data){
    return html = `<p>${data}</p>`;
}
//createErrorHtml
let createErrorHtml = (message) => {

    return html = `
        <h1>Une erreur s'est produite !</h1>
        <p>${message}</p>
    `
}


let updateUI = html => {
    let response = document.getElementById('response');
    //empty response container
    response.innerHTML = '';
    //replace with htmlString
    response.insertAdjacentHTML( 'beforeend', html);
}
