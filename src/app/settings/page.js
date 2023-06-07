"use client";
import UnitMake from "@/components/UnitMake/unitMake";
import "./picklist.scss";
import React, { useState } from "react";
function Settings() {
  const [linkVal, setLinkVal] = useState("picklist editor");
  const [innerLink, setInnerLink] = useState(
    linkVal == "picklist editor" ? "Unit Make" : ""
  );
  const handleLinks = (e) => {
    console.log("link", e.target.innerText.toLocaleLowerCase());
    setLinkVal(e.target.innerText.toLocaleLowerCase());
  };
  const handleInnerLinks = (e) => {
    console.log("inner link", e.target.innerText);
    setInnerLink(e.target.innerText);
  };
  return (
    <main className="main-inner-content">
      <section className="side-menu">
        <div className="list" onClick={handleLinks}>
          <p
            className={
              linkVal == "picklist editor" ? "activeSubLink" : "subLink"
            }
          >
            Picklist editor
          </p>
        </div>
        {linkVal == "picklist editor" ? (
          <div onClick={handleInnerLinks} className="inner-cus-list">
            <p className={innerLink == "Unit Make" ? "activeInnerLink" : ""}>
              Unit Make
            </p>
          </div>
        ) : null}
      </section>
      <section className="contentMain">
        <div className="para">
          {innerLink == "Unit Make" ? <UnitMake title={innerLink} /> : null}
        </div>
      </section>
    </main>
  );
}

export default Settings;
