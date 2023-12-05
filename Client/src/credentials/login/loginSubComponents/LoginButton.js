import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./loginStyling.css";
import Permission from "../SetPermissions";

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    const login = () => {
        loginWithRedirect();
        <Permission/>
    }
    return (
        !isAuthenticated && (
            <button className="loginButton" onClick={() => login()}>
                Sign In
            </button>
        )
    )
}

export default LoginButton