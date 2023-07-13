import React, { useState, useEffect } from "react";
import "./employees.scss";
import axios from "axios";
import Image from "next/image";
import apiRouth from "@/utils/routes";
import UserTable from "./table";
import AddUserModal from "./addEmployessModal";
function Employess({ title }) {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [data, setData] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchData();
  }, [refreshFlag]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    setLoadingFlag(true);
    const res = await axios.get(`${apiRouth.prodPath}/api/users`);
    if (res.data && res.data.error == false) {
      setData(res.data.allUsers);
      setLoadingFlag(false);
    } else {
      setLoadingFlag(false);
    }
  };
  const handleAddUser = async (itemObj) => {
    try {
      const res = await axios.post(
        `${apiRouth.prodPath}/api/users/addUser`,
        itemObj
      );
      console.log(res);
      handleClose();
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefresh = () => setRefreshFlag(!refreshFlag);
  return (
    <main className="unitMake-wrap">
      <h1 className="main-head">{title}</h1>
      <section className="top-sec">
        <button onClick={handleOpen}>Add New</button>
      </section>
      <section className="tabular-data">
        {loadingFlag ? (
          <div className="loadingWrap">
            <Image
              className="loading"
              src="/images/loading.png"
              width={100}
              height={100}
            />
            <p>Loading...</p>
          </div>
        ) : data.length == 0 ? (
          <p>No Unit Make value found please Add values</p>
        ) : (
          <UserTable
            title={title}
            refreshUnitData={handleRefresh}
            data={data}
          />
        )}
      </section>
      <AddUserModal
        open={open}
        handleClose={handleClose}
        handleAddUser={handleAddUser}
        title={title}
      />
    </main>
  );
}

export default Employess;
