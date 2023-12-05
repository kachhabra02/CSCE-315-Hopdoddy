import axios from 'axios';

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 30000 // 30 second timeout
});

function createUserObj(fName, lName, email, isMan, isAdm){
    let obj = {
        "first_name": fName,
        "last_name": lName,
        "email":email,
        "is_manager": isMan,
        "is_admin": isAdm
    };
    return obj
}

function createUser(userObj){
    API.post(`/users`, userObj).then((res) => {
        if(res.status < 300){
            console.log(res.data);
        }
    }).catch((error) => {
        console.log("Did not create User");
    });
}

function deleteUser(userId){
    API.delete(`/users/${userId}`, userObj).then((res) => {
        if(res.status < 300){
            console.log(res.data);
        }
    }).catch((error) => {
        console.log("Did not delete User");
    });
}

function updateUser(userId, userObj){
    API.put(`/users/${userId}`, userObj).then((res) => {
        if(res.status < 300){
            console.log(res.data);
        }
    }).catch((error) => {
        console.log("Did not delete User");
    });
}

function readUsers(){
    let data;
    API.get(`/users`).then((res) => {
        if(res.status < 300){
            data = res.data;
        }
        
    }).catch((error) => {
        console.log("Could not get Users")
    });
    return data;
}