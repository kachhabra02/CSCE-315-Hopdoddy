import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./loginStyling.css";

const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <button className="logoutButton" onClick={() => logout()}>
                Sign Out
            </button>
        )
    )
}

export default LogoutButton