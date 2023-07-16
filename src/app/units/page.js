"use client";
import React, { useState, useEffect } from "react";
import "./units.scss";
import UnitComponent from "@/components/unitContent";
import axios from "axios";
import Image from "next/image";
import apiRouth from "@/utils/routes";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
function UnitsPage() {
  const [linkVal, setLinkVal] = useState("units");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const userInfo = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (userInfo.user == null) {
      router.push("./login");
    }
    console.log("this is called", linkVal);
    setLoader(true);
    axios
      .get(`${apiRouth.prodPath}/api/units/`)
      .then((res) => {
        setLoader(false);
        setData(res.data.units);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }, [refresh, linkVal]);
  const refreshData = () => setRefresh(!refresh);
  const handleLinks = (e) => {
    setLinkVal(e.target.innerText.toLocaleLowerCase());
  };
  return (
    <main className="main-inner-content">
      <section className="side-menu">
        <div className="list" onClick={handleLinks}>
          <p className={linkVal == "units" ? "activeSubLink" : "subLink"}>
            units
          </p>
        </div>
      </section>
      <section className="contentMain">
        {loader ? (
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
          <UnitComponent title={linkVal} data={data} refresh={refreshData} />
        )}
      </section>
    </main>
  );
}

export default UnitsPage;
