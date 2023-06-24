import axios from "axios";
import React, { useState, useEffect } from "react";
import "../UnitMake/unitMake.scss";
import UnitTable from "../unitMakeTable/table";
import Image from "next/image";
import AddUnitModal from "../modal/addUnitModal";
import { Poppins } from "next/font/google";
import apiRouth from "@/utils/routes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
function UnitType({ title }) {
  console.log("this is title", title);
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
    const res = await axios.get(`${apiRouth.prodPath}/api/unitType`);
    if (res.data && res.data.error == false) {
      setData(res.data.unitType);
      setLoadingFlag(false);
    } else {
      setLoadingFlag(false);
    }
  };
  const handleAddUnit = async (itemObj) => {
    try {
      const res = await axios.post(
        `${apiRouth.prodPath}/api/unitType/addunitType`,
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
        <button className={poppins.className} onClick={handleOpen}>
          Add New
        </button>
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
          <UnitTable
            title={title}
            refreshUnitData={handleRefresh}
            data={data}
          />
        )}
      </section>
      <AddUnitModal
        open={open}
        handleClose={handleClose}
        handleAddUnit={handleAddUnit}
        title={title}
      />
    </main>
  );
}

export default UnitType;
