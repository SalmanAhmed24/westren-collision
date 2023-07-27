import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import "./unitInfoModal.scss";
import InfoTab from "../tabs/infoTab";
import NotesTab from "../tabs/notesTab";
function UnitsInfoModal({ open, handleClose, item, refreshMain }) {
  const [tabs, setTabs] = useState("Info");
  const handleTabs = (e) => {
    setTabs(e.target.innerText);
  };
  const refreshData = () => {
    refreshMain();
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="infoModal"
    >
      <section className="default-v">
        <div className="inner-v">
          <h3>Unit#</h3>
          <p>{item.unitNumber}</p>
        </div>
        <div className="inner-v">
          <h3>Unit Make</h3>
          <p>{item.unitMake}</p>
        </div>
        <div className="inner-v">
          <h3>Unit Type</h3>
          <p>{item.unitType}</p>
        </div>
        <div className="inner-v">
          <h3>Unit Status</h3>
          <p>
            {item.unitStatus == null || item.unitStatus == ""
              ? "none"
              : item.unitStatus}
          </p>
        </div>
        <div className="inner-v">
          <h3>Client</h3>
          <p>
            {item.unitClient == null || item.unitClient == ""
              ? "none"
              : item.unitClient}
          </p>
        </div>
        <div className="inner-v">
          <h3>Unit Model</h3>
          <p>
            {item.unitModel == null || item.unitModel == ""
              ? "none"
              : item.unitModel}
          </p>
        </div>
        <div className="inner-v">
          <h3>Unit Location</h3>
          <p>
            {item.unitLocation == null || item.unitLocation == ""
              ? "none"
              : item.unitLocation}
          </p>
        </div>
        <div className="inner-v">
          <h3>Branch</h3>
          <p>
            {item.branch == null || item.branch == "" ? "none" : item.branch}
          </p>
        </div>
        <div className="inner-v">
          <h3>Year</h3>
          <p>
            {item.unitYear == null || item.unitYear == ""
              ? "none"
              : item.unitYear}
          </p>
        </div>
      </section>
      <section className="innerTabs">
        <ul className="innerTabs-ul" onClick={handleTabs}>
          <li className={tabs == "Info" ? "active-li" : ""}>Info</li>
          <li className={tabs == "Notes" ? "active-li" : ""}>Notes</li>
          <li className={tabs == "Tasks" ? "active-li" : ""}>Tasks</li>
          <li className={tabs == "Work" ? "active-li" : ""}>Work</li>
          <li className={tabs == "Parts" ? "active-li" : ""}>Parts</li>
          <li className={tabs == "$" ? "active-li" : ""}>$</li>
        </ul>
      </section>
      {tabs == "Info" ? (
        <section className="inner-content">
          <InfoTab
            item={item}
            handleClose={handleClose}
            refreshData={refreshData}
          />
        </section>
      ) : tabs == "Notes" ? (
        <section className="inner-content">
          <NotesTab
            item={item}
            handleClose={handleClose}
            refreshData={refreshData}
          />
        </section>
      ) : tabs == "Tasks" ? (
        <section className="inner-content">
          <p>This is Tasks Tab</p>
        </section>
      ) : tabs == "Work" ? (
        <section className="inner-content">
          <p>This is Work Tab</p>
        </section>
      ) : tabs == "Parts" ? (
        <section className="inner-content">
          <p>This is Parts Tab</p>
        </section>
      ) : tabs == "$" ? (
        <section className="inner-content">
          <p>This is $ Tab</p>
        </section>
      ) : null}
    </Drawer>
  );
}

export default UnitsInfoModal;
