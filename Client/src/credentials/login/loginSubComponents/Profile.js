import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./loginStyling.css";

const Profile = () => {
    const {user, isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (
            <article className="article">
                {user?.picture && <img src={user.picture} className="profileImage" alt ={user?.name} />}
            </article>
        )
    )
}

export default Profile