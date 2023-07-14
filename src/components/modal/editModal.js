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
  const [shortCode, setShortCode] = useState("");
  useEffect(() => {
    setName(item.name);
    setShortCode(item.shortCode);
  }, [open]);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleShortCode = (e) => setShortCode(e.target.value);
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
          {title == "Branch" ||
          title == "Unit Make" ||
          title == "Unit Model" ||
          title == "Client Type" ? (
            <>
              <label className={poppins.className}>Shortcode</label>
              <input
                type="text"
                onChange={handleShortCode}
                className={poppins.className}
                value={shortCode}
              />
            </>
          ) : null}
          {title == "Branch" ||
          title == "Unit Make" ||
          title == "Unit Model" ||
          title == "Client Type" ? (
            <button
              className={poppins.className}
              onClick={() => handleEditUnit({ name, shortCode })}
            >
              Edit {title}
            </button>
          ) : (
            <button
              className={poppins.className}
              onClick={() => handleEditUnit({ name })}
            >
              Edit {title}
            </button>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default EditUnitModal;
