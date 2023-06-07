import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import "./addUnitModal.scss";
function AddUnitModal({ open, handleClose, handleAddUnit }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleValue = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="drawer-wrapper">
          <label>Name</label>
          <input type="text" onChange={handleName} className="inp-cus" />
          <label>Value</label>
          <input type="number" onChange={handleValue} className="inp-cus" />
          <button onClick={() => handleAddUnit({ name, value })}>
            Add Unit Make
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default AddUnitModal;
