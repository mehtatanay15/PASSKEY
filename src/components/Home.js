import React from "react";
import Passwords from "./Passwords"

export function Home(props) {
   const  {showAlert} = props
    return (
        <div>
            <Passwords showAlert={showAlert}/>
        </div>
    );
}
