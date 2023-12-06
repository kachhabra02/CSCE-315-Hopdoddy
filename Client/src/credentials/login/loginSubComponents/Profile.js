import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(firstName, lastName) {
  return {
    sx: {
      bgcolor: stringToColor(`${firstName} ${lastName}`),
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
}

const Profile = () => {
  const {user, isAuthenticated} = useAuth0();
  return (
    isAuthenticated && (
      // <article className="article">
      //     {user?.picture && <img src={user.picture} className="profileImage" alt ={user?.name} />}
      // </article>
      (user?.picture)
        ? <Avatar src={user.picture}/>
        : <Avatar {...stringAvatar(user.given_name, user.family_name)}/>
        
    )
  )
}

export default Profile