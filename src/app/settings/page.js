"use client";
import UnitMake from "@/components/UnitMake/unitMake";
import "./picklist.scss";
import React, { useState } from "react";
import Branch from "@/components/branch/branch";
import UnitLocation from "@/components/unitLocation/unitLocation";
import UnitModel from "@/components/unitModel";
import UnitJob from "@/components/unitJob";
import UnitYear from "@/components/unitYear";
import UnitType from "@/components/unitType";
import ClientTypeList from "@/components/clientTypeList";
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
            <p className={innerLink == "Branch" ? "activeInnerLink" : ""}>
              Branch
            </p>
            <p
              className={innerLink == "Unit Location" ? "activeInnerLink" : ""}
            >
              Unit Location
            </p>
            <p className={innerLink == "Unit Model" ? "activeInnerLink" : ""}>
              Unit Model
            </p>
            <p
              className={
                innerLink == "Unit Job Urgency" ? "activeInnerLink" : ""
              }
            >
              Unit Job Urgency
            </p>
            <p className={innerLink == "Unit Year" ? "activeInnerLink" : ""}>
              Unit Year
            </p>
            <p className={innerLink == "Unit Type" ? "activeInnerLink" : ""}>
              Unit Type
            </p>
            <p className={innerLink == "Client Type" ? "activeInnerLink" : ""}>
              Client Type
            </p>
          </div>
        ) : null}
      </section>
      <section className="contentMain">
        <div className="para">
          {innerLink == "Unit Make" ? <UnitMake title={innerLink} /> : null}
          {innerLink == "Branch" ? <Branch title={innerLink} /> : null}
          {innerLink == "Unit Location" ? (
            <UnitLocation title={innerLink} />
          ) : null}
          {innerLink == "Unit Model" ? <UnitModel title={innerLink} /> : null}
          {innerLink == "Unit Job Urgency" ? (
            <UnitJob title={innerLink} />
          ) : null}
          {innerLink == "Unit Year" ? <UnitYear title={innerLink} /> : null}
          {innerLink == "Unit Type" ? <UnitType title={innerLink} /> : null}
          {innerLink == "Client Type" ? (
            <ClientTypeList title={innerLink} />
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default Settings;
