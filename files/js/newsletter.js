let users = [];
let displayedUser = [];

let index = 0;

const DISPLAYED = 10;

const createDisplayUser = () => {
    displayedUser = [];
    for(let i in users){
        if(i%DISPLAYED === 0){
            displayedUser.push([]);
        }
        displayedUser[displayedUser.length - 1].push(users[i]);
    }
}

const addUser = (first, last, email) => {
    users.push({
        firstname: first,
        lastname: last,
        email: email
    });
}

const resetUsers = () => {
    users = [];
    renderUsers();
}

const clearTable = () => {
    let table = document.getElementById("listOfNameWhatALongIdForUHugo"),
        size = table.children[0].childElementCount;
    for(let i = 1; i < size; i++){
        table.children[0].deleteRow(1);
    }
}

const createUser = (inputs) => {
    let new_row = document.createElement("tr");
    for (let i in inputs) {
        let td = document.createElement("td");
        td.textContent = inputs[i];
        td.classList.add(i);
        new_row.appendChild(td);
    }
    return new_row;
}

const renderUsers = () => {
    let table = document.getElementById("listOfNameWhatALongIdForUHugo");

    createDisplayUser();
    clearTable();

    for(let i in displayedUser[index]){
        // children[0] for the tbody
        table.children[0].appendChild(createUser(displayedUser[index][i]));
    }
}

const handleAddUsers = () => {
    let inputs = {
        firstname: document.getElementById("fname").value,
        lastname: document.getElementById("lname").value,
        email: document.getElementById("mail").value
    };
    let filled = true;
    for(let i in inputs){
        if(inputs[i] === ""){
            filled = false;
            break;
        }
    }
    if(filled) {
        addUser(inputs.firstname, inputs.lastname, inputs.email);
        renderUsers();
    }
}

const handleNextPage = () => {
    createDisplayUser();

    if(index+1 < displayedUser.length){
        index++;
    }

    // if (index === displayedUser.length-1){
    //     if(!("fatigue" in document.getElementById("btn-forward").classList)){
    //         document.getElementById("btn-forward").classList.add("fatigue");
    //     }
    // }else{
    //     if("fatigue" in document.getElementById("btn-forward").classList){
    //         document.getElementById("btn-forward").classList.remove("fatigue");
    //     }
    // }

    renderUsers();
}

const handlePreviousPage = () => {
    createDisplayUser();

    if(index-1 >= 0){
        index--;
    }

    // if (index === 0){
    //     if(!("fatigue" in document.getElementById("btn-back").classList)){
    //         document.getElementById("btn-back").classList.add("fatigue");
    //     }
    // }else{
    //     if("fatigue" in document.getElementById("btn-back").classList){
    //         document.getElementById("btn-back").classList.remove("fatigue");
    //     }
    // }

    renderUsers();
}

document.getElementById("btn-back").onclick = handlePreviousPage;
document.getElementById("btn-forward").onclick = handleNextPage;
document.getElementById("add").onclick = handleAddUsers;
document.getElementById("reset").onclick = resetUsers;
createDisplayUser();
