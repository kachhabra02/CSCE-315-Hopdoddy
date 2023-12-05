import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../AuthProvider";
import axios from 'axios';
import { useState, useEffect } from "react";

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 30000 // 30 second timeout
  });


const Permission = () => { 
    const {isLoading, error} = useAuth0();
    const {user, isAuthenticated} = useAuth0();
    const {userObj, setUserObj} = useAuth();
    const [data, setData] = useState([]);
    const [userExists, setUserExists] = useState(false);
    function getData(userId){
        API.get(`/users?email=${userId}`).then((res) => {
            if(res.status < 300){
                console.log(res.data);
                setData(res.data);
                setUserExists(true);
            }
            
        }).catch((error) => {
        });
    }
    useEffect(() => {
        if(isAuthenticated){
        //get user from backend
        getData(user.email);
        console.log(data);
        console.log(userExists);
        if(data != []){
            console.log("here we go");
            //get permissions from backend
            let isAdmin = data[0]?.is_admin;
            let isManager = data[0]?.is_manager;
            // let isAdmin = true;
            // let isManager = true;
            console.log(isAdmin);
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
    }}, [])
    
}
export default Permission