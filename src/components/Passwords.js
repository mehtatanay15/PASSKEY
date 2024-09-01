import React, { useContext, useEffect, useRef, useState } from "react";
import PasswordContext from "../context/passwords/PasswordContext";
import PasswordItem from "./PasswordItem";
import AddPassword from "./addPassword";
import { useNavigate } from 'react-router-dom';

const Passwords = (props) => {
  const context = useContext(PasswordContext);
  const { passwords, getPasswords, editPassword } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getPasswords();
    } else {
      navigate("/login");
    }
  }, [getPasswords, navigate]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [password, setPassword] = useState({
    id: "",
    ename: "",
    epassword: "",
    etag: "",
  });

  const updatePassword = (currentPassword) => {
    ref.current.click();
    setPassword({
      id: currentPassword._id,
      ename: currentPassword.name,
      epassword: currentPassword.password,
      etag: currentPassword.tag,
    });
  };

  const onChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editPassword(
      password.id,
      password.ename,
      password.epassword,
      password.etag
    );
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  return (
    <>
      <AddPassword showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ename"
                    name="ename"
                    aria-describedby="nameHelp"
                    onChange={onChange}
                    value={password.ename}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="epassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="epassword"
                    name="epassword"
                    onChange={onChange}
                    value={password.epassword}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="tagHelp"
                    onChange={onChange}
                    value={password.etag}
                    required
                    minLength={5}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refClose}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h1 className="mb-4">Your Passwords</h1>
        {passwords.length === 0 ? (
          <p>No passwords to display</p>
        ) : (
          <div className="row">
            {passwords.map((password) => (
              <div className="col-md-4 mb-3" key={password._id}>
                <PasswordItem
                  showAlert={props.showAlert}
                  updatePassword={updatePassword}
                  password={password}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Passwords;
