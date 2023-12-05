import React from "react";

import LoginButton from "./loginSubComponents/LoginButton";
import LogoutButton from "./loginSubComponents/LogoutButton";
import Profile from "./loginSubComponents/Profile";
import PositionedMenu from "./loginSubComponents/materialUILogout";
import { useAuth0 } from "@auth0/auth0-react";
import Permission from "./usePermissions";




function LoginMain(){
    const {isLoading, error} = useAuth0;
    return(
       <div>
            {error && <p>Auth Error</p>}
            {!error && isLoading && <p>Loading...</p>}
            {!error && !isLoading &&
                <>
                    <LoginButton />
                    <PositionedMenu/>
                    {/* <Permission /> */}
                </>
            }
            
       </div>
    )
}

export default LoginMain;