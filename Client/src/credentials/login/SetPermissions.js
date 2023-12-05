import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../AuthProvider";
import axios from 'axios';
import { useState } from "react";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 30000 // 30 second timeout
});


const Permission = () => {
    const {user, isAuthenticated} = useAuth0();
    const {userObj, setUserObj} = useAuth();
    const {data, setData} = useState("");

    // function getData(userId){
    //     API.get(`/users/${userId}`).then((res) => {
    //         if(res.status < 300){
    //             setData(res.data)
    //         }
    //     }).catch((error) => {
    //         setData("");
    //     });
    // }
    if(isAuthenticated){
        let userExists = true;
        // getData(user.email);
        // if(data === ""){
        //     userExists = false;
        // }

        //get user from backend
        if(userExists){
            //get permissions from backend
            // let isAdmin = data.is_admin;
            // let isManager = data.is_manager;
            let isAdmin = true;
            let isManager = true;
            if(isAdmin){
                let obj = {
                    name: user.name,
                    isAdmin: true,
                    isManager: true,
                    isCashier: true
                }
                setUserObj(obj);
            }
            else if(isManager){
                let obj = {
                    name: user.name,
                    isAdmin: false,
                    isManager: true,
                    isCashier: true
                }
                setUserObj(obj);
            }
            else{
                let obj = {
                    name: user.name,
                    isAdmin: false,
                    isManager: false,
                    isCashier: true
                }
                setUserObj(obj);
            }
        }
        
    }

    return(<></>)
}
export default Permission