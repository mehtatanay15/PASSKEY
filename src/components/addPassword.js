import React, { useState } from "react";
import { useContext } from "react";
import PasswordContext from "../context/passwords/PasswordContext";

const AddPassword = (props) => {
    const context = useContext(PasswordContext);
    const {addPassword } = context;
    const [password,setPassword] = useState({name: "",password: "", tag: ""})
    const handleClick = (e)=>{
        e.preventDefault();
        addPassword(password.name,password.password, password.tag);
        setPassword ({name: "",password: "", tag: ""})
        props.showAlert("Added Successfully","success")
    }
    const onChange = (e) => {
        setPassword({...password,[e.target.name]: e.target.value})
    }
    return(
        <div className="container my-3">
                <h1>ADD A PASSWORD</h1>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            required
                            minLength={5}
                            value={password.name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={onChange}
                            required
                            minLength={5}
                            value={password.password}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            required
                            minLength={5}
                            value={password.tag}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>
                        Add Password
                    </button>
                </form>
            </div>
    )
}
export default AddPassword