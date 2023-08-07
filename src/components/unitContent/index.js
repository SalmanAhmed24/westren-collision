import axios from "axios";
import ListTable from "../listTable/listTable";
import React, { useState, useEffect } from "react";
import apiRouth from "@/utils/routes";
import Swal from "sweetalert2";
import "./unitContent.scss";
import AddUnitsModal from "../modal/addUnitsModal";
import UnitsTable from "../unitsTable";
function UnitComponent({ title, data, refresh }) {
  console.log("list component", data);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [tabs, setTabs] = useState("Info");

  const handleClose = () => {
    setOpen(false);
  };
  const handleTabs = (e) => {
    setTabs(e.target.innerText);
  };
  const handleAddUnits = (dataObj) => {
    axios
      .post(`${apiRouth.prodPath}/api/units/addUnits`, dataObj)
      .then((res) => {
        if (res.data.error == true) {
          Swal.fire({
            customClass: "errorClient",
            title: "Error",
            icon: "error",
            text: `Error in creating ${title}. You have entered a previously added email or some information are missing.`,
          });
          return;
        }
        refresh();
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  return (
    <section className="unit-content-wrap">
      <div className="upper-wrap">
        <h1>{title}</h1>
        <button onClick={handleOpen}>Add New</button>
      </div>
      <div className="table-wrap">
        {data.length ? (
          <UnitsTable title={title} data={data} refresh={refresh} />
        ) : (
          <p>No {title} present right now. Please add new clients</p>
        )}
      </div>

      <AddUnitsModal
        open={open}
        handleClose={handleClose}
        handleAddUnit={handleAddUnits}
        title={title}
      />
    </section>
  );
}

export default UnitComponent;
