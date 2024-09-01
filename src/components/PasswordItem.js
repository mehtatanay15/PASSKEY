import React, { useContext } from "react";
import PasswordContext from "../context/passwords/PasswordContext";

const PasswordItem = (props) => {
  const context = useContext(PasswordContext);
  const { password, updatePassword } = props;
  const { deletePassword } = context;

  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm border-0" style={{ minWidth: '300px' }}>
        <div className="card-body">
          <h5 className="card-title">{password.name}</h5>
          <p className="card-text">
            {password.password}<br/>
            {password.tag}
          </p>
          <div className="d-flex justify-content-between">
            <i 
              className="fa-solid fa-trash mx-2 text-danger" 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                deletePassword(password._id);
                props.showAlert("Deleted Successfully", "success");
              }}
            ></i>
            <i 
              className="fa-regular fa-pen-to-square mx-2 text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() => { updatePassword(password); }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordItem;
