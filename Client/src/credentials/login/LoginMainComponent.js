import React from "react";

import LoginButton from "./loginSubComponents/LoginButton";
import PositionedMenu from "./loginSubComponents/PositionedMenu";
import { useAuth0 } from "@auth0/auth0-react";

function LoginMain(){
    const {isLoading, error} = useAuth0;
    return(
       <>
            {error && <p>Auth Error</p>}
            {!error && isLoading && <p>Loading...</p>}
            {!error && !isLoading &&
                <>
                    <LoginButton />
                    <PositionedMenu/>
                    {/* <Permission /> */}
                </>
            }
            
       </>
    )
}

export default LoginMain;