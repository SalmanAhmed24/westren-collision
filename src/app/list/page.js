"use client";
import React, { useState, useEffect } from "react";
import "./list.scss";
import ListComponent from "@/components/listContent";
import axios from "axios";
import Image from "next/image";
import apiRouth from "@/utils/routes";
function ListPage() {
  const [linkVal, setLinkVal] = useState("client");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${apiRouth.prodPath}/api/client/`)
      .then((res) => {
        setLoader(false);
        setData(res.data.client);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }, [refresh]);
  const refreshData = () => setRefresh(!refresh);
  const handleLinks = (e) => {
    setLinkVal(e.target.innerText.toLocaleLowerCase());
  };
  return (
    <main className="main-inner-content">
      <section className="side-menu">
        <div className="list" onClick={handleLinks}>
          <p className={linkVal == "client" ? "activeSubLink" : "subLink"}>
            Client
          </p>
          <p className={linkVal == "vendor" ? "activeSubLink" : "subLink"}>
            Vendor
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
          <ListComponent title={linkVal} data={data} refresh={refreshData} />
        )}
      </section>
    </main>
  );
}

export default ListPage;
