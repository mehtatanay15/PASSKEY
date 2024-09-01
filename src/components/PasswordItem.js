import React, { useContext } from "react";
import PasswordContext from "../context/passwords/PasswordContext";

const PasswordItem = (props) => {
  const context = useContext(PasswordContext);
  const { password, updatePassword } = props;
  const { deletePassword } = context;

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{password.name}</h5>
          <p className="card-text flex-grow-1">
            {password.password}<br />
            {password.tag}
          </p>
          <div className="d-flex justify-content-between mt-3">
            <i 
              className="fa-solid fa-trash text-danger" 
              style={{ cursor: 'pointer' }} 
              onClick={() => { 
                deletePassword(password._id); 
                props.showAlert("Deleted Successfully", "success");
              }}
            ></i>
            <i 
              className="fa-regular fa-pen-to-square" 
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
