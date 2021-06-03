let users = [];
let displayedUser = [];

let index = 0;

const DISPLAYED = 9;
const row_height = 5;

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

const update_btn_pos = () => {
    let length = (displayedUser[index])?displayedUser[index].length:0;
    // console.log(document.getElementById("nextprev").style.top);
    document.getElementById("nextprev").style.top = -1*(length)*row_height + "vh";
}

const resetUsers = () => {
    users = [];
    index = 0;
    renderUsers();
}

const clearTable = () => {
    let table = document.getElementById("listOfNameWhatALongIdForUHugo"),
        size = table.childElementCount;
    for(let i = table.children.length-1; i > 0; i--){
        table.children[i].remove();
    }
}

const createUser = (inputs) => {
    let new_row = document.createElement("div");
    let sub_row = document.createElement("div");
    let td = document.createElement("p");
    td.textContent = inputs["firstname"];
    td.classList.add("firstname");
    sub_row.appendChild(td);
    let td2 = document.createElement("p");
    td2.textContent = inputs["lastname"];
    td2.classList.add("lastname");
    sub_row.appendChild(td2);
    sub_row.classList.add("name1");
    new_row.appendChild(sub_row);
    let td3 = document.createElement("p");
    td3.textContent = inputs["email"];
    td3.classList.add("email1");
    new_row.appendChild(td3);
    new_row.classList.add("row");
    return new_row;
}

const renderUsers = () => {
    let table = document.getElementById("listOfNameWhatALongIdForUHugo");

    createDisplayUser();
    clearTable();

    for(let i in displayedUser[index]){
        // children[0] for the tbody
        table.appendChild(createUser(displayedUser[index][i]));
    }
    update_btn_pos();
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
