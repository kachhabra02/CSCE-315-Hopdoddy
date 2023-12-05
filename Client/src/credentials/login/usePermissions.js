import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../AuthProvider";
import axios from 'axios';
import { useState, useEffect } from "react";

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 30000 // 30 second timeout
  });


const usePermission = () => { 
    const {user, isAuthenticated} = useAuth0();
    const {userObj, setUserObj} = useAuth();
    // const [data, setData] = useState([]);
    // const [userExists, setUserExists] = useState(false);
    function getData(){
        // let data;
        // let userExists = false;
        API.get(`/users?email=${user.email}`).then((res) => {
            if(res.status < 300){
                console.log(res.data);
                // setData(res.data);
                // setUserExists(true);
                return {data: res.data, userExists: (res.data?.length > 0)};
            }
            
        }).then(({data,userExists}) => {
            if(userExists){
                // console.log("here we go");
                //get permissions from backend
                let isAdmin = data[0]?.is_admin;
                let isManager = data[0]?.is_manager;
                // let isAdmin = true;
                // let isManager = true;
                if(isAdmin){
                    let obj = {
                        name: user.name,
                        isAdmin: true,
                        isManager: true,
                        isCashier: true
                    };
                    setUserObj(obj);
                    console.log(userObj);
                }
                else if(isManager){
                    let obj = {
                        name: user.name,
                        isAdmin: false,
                        isManager: true,
                        isCashier: true
                    };
                    setUserObj(obj);
                }
                else{
                    let obj = {
                        name: user.name,
                        isAdmin: false,
                        isManager: false,
                        isCashier: true
                    };
                    setUserObj(obj);
                }
            }
        }
            ).catch((error) => {
                console.log("Error retrieving.");
        });
    }
    return [
        {
            userObj
        },
        {
            getData
        }
    ]
}
export default usePermission