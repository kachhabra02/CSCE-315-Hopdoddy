import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./loginStyling.css";

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
            <button className="loginButton" onClick={() => loginWithRedirect()}>
                Sign In
            </button>
        )
    )
}

export default LoginButton