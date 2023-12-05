import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
// import "./loginStyling.css";
import Permission from "../usePermissions";
import Button from "@mui/material/Button";

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    const login = () => {
        loginWithRedirect();
        // <Permission/>
    }
    return (
        !isAuthenticated && (
            <Button color='inherit' className="loginButton" onClick={() => login()}>
                Sign In
            </Button>
        )
    )
}

export default LoginButton