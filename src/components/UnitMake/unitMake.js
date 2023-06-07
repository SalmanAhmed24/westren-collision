import axios from "axios";
import React, { useState, useEffect } from "react";
import "./unitMake.scss";
import UnitTable from "../unitMakeTable/table";
import Image from "next/image";
import AddUnitModal from "../modal/addUnitModal";
function UnitMake({ title }) {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [data, setData] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchData();
  }, [refreshFlag]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData = async () => {
    setLoadingFlag(true);
    const res = await axios.get(
      "https://collision-backend.vercel.app/api/unitMake"
    );
    if (res.data && res.data.error == false) {
      setData(res.data.unitMake);
      setLoadingFlag(false);
    } else {
      setLoadingFlag(false);
    }
  };
  const handleAddUnit = async (itemObj) => {
    try {
      const res = await axios.post(
        "https://collision-backend.vercel.app/api/unitMake/addUnitMake",
        itemObj
      );
      console.log(res);
      handleClose();
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="unitMake-wrap">
      <h1 className="main-head">{title}</h1>
      <section className="top-sec">
        <button onClick={handleOpen}>Add New</button>
      </section>
      <section className="tabular-data">
        {loadingFlag && data.length == 0 ? (
          <div className="loadingWrap">
            <Image
              className="loading"
              src="/images/loading.png"
              width={100}
              height={100}
            />
            <p>Loading...</p>
          </div>
        ) : (
          <UnitTable data={data} />
        )}
      </section>
      <AddUnitModal
        open={open}
        handleClose={handleClose}
        handleAddUnit={handleAddUnit}
      />
    </main>
  );
}

export default UnitMake;
