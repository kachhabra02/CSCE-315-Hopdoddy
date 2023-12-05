import LoginMain from "./LoginMainComponent";
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function Login() {
    return (
        <Auth0Provider 
        domain = {domain}
        clientId={clientId}
        redirectUri={window.location.origin}>
             <LoginMain />
        </Auth0Provider>
    )
}
export default Login;