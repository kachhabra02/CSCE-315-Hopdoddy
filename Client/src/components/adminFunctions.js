import axios from 'axios';

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 30000 // 30 second timeout
});


function createUser(userObj){
    API.post(`/users`).then((res) => {
        if(res.status < 300){
            console.log(res.data);
        }
    }).catch((error) => {
    });
}