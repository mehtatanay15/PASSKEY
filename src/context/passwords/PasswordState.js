import { useState } from "react";
import PasswordContext from "./PasswordContext";

const PasswordState = (props) => {
  const host = "http://localhost:5000";
  const passwordsInitial = [];
  const [passwords, setPasswords] = useState(passwordsInitial);

  // Get all passwords
  const getPasswords = async () => {
    const response = await fetch(`${host}/api/passwords/fetchallpasswords`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')  
      },
    });
    const json = await response.json();
    setPasswords(json);
  };

  // Add a password
  const addPassword = async (name, password, tag) => {
    const response = await fetch(`${host}/api/passwords/addpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token') 
      },
      body: JSON.stringify({ name, password, tag })
    });
    const pass = await response.json();
    setPasswords(passwords.concat(pass));
  };

  // Delete a password
  const deletePassword = async (id) => {
    await fetch(`${host}/api/passwords/deletepassword/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')  
      }
    });
    const newPasswords = passwords.filter((password) => password._id !== id);
    setPasswords(newPasswords);
  };

  // Edit a password
  const editPassword = async (id, name, password, tag) => {
    const response = await fetch(`${host}/api/passwords/updatepassword/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token') 
      },
      body: JSON.stringify({ name, password, tag })
    });
    const json = await response.json();
    console.log(json);
    let newPass = JSON.parse(JSON.stringify(passwords));

    for (let index = 0; index < newPass.length; index++) {
      const element = newPass[index];
      if (element._id === id) {
        newPass[index].name = name;
        newPass[index].password = password;
        newPass[index].tag = tag;
        break;
      }
    }
    setPasswords(newPass);
  };

  return (
    <PasswordContext.Provider value={{ passwords, addPassword, deletePassword, editPassword, getPasswords }}>
      {props.children}
    </PasswordContext.Provider>
  );
};

export default PasswordState;
