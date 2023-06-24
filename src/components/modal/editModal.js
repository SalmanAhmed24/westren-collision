import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
import React, { useState, useEffect } from "react";
import "./addUnitModal.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
function EditUnitModal({ open, handleClose, handleEditUnit, item, title }) {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(item.name);
  }, [open]);
  const handleName = (e) => {
    setName(e.target.value);
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
          <label className={poppins.className}>Name</label>
          <input
            type="text"
            onChange={handleName}
            className={poppins.className}
            value={name}
          />
          <button
            className={poppins.className}
            onClick={() => handleEditUnit({ name })}
          >
            Edit {title}
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default EditUnitModal;
