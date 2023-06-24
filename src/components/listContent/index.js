import axios from "axios";
import ListTable from "../listTable/listTable";
import AddClientModal from "../modal/addClientModal";
import "./listContent.scss";
import React, { useState, useEffect } from "react";
import apiRouth from "@/utils/routes";
import Swal from "sweetalert2";
function ListComponent({ title, data, refresh }) {
  console.log("list component", data);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddClient = (dataObj) => {
    axios
      .post(
        `${apiRouth.prodPath}/api/${title}/${
          title == "client" ? "addClient" : "addvendor"
        }`,
        dataObj
      )
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
    <section className="list-content-wrap">
      <div className="upper-wrap">
        <h1>{title}</h1>
        <button onClick={handleOpen}>Add New</button>
      </div>
      <div className="table-wrap">
        {data.length ? (
          <ListTable title={title} data={data} refresh={refresh} />
        ) : (
          <p>No {title} present right now. Please add new clients</p>
        )}
      </div>
      <AddClientModal
        open={open}
        handleClose={handleClose}
        handleAddClient={handleAddClient}
        title={title}
      />
    </section>
  );
}

export default ListComponent;
