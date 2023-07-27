"use client";
import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./addUnitModal.scss";
import { Poppins } from "next/font/google";
import Select from "react-select";
import axios from "axios";
import apiRouth from "@/utils/routes";
import moment from "moment";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
function AddUnitsModal({ open, handleClose, handleAddUnit, title }) {
  const [branch, setBranch] = useState("");
  const [unitLoc, setUnitLoc] = useState("");
  const [unitType, setUnitType] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [unitYear, setUnitYear] = useState("");
  const [unitMake, setUnitMake] = useState("");
  const [unitModel, setUnitModel] = useState("");
  const [unitJob, setUnitJob] = useState("");
  const [note, setNote] = useState("");
  const [branchOpt, setBranchOpt] = useState([]);
  const [unitLocOpt, setUnitLocOpt] = useState([]);
  const [unitTypeOpt, setUnitTypeOpt] = useState([]);
  const [clientOpt, setClientOpt] = useState([]);
  const [unitYearOpt, setUnitYearOpt] = useState([]);
  const [unitMakeOpt, setUnitMakeOpt] = useState([]);
  const [unitModelOpt, setUnitModelOpt] = useState([]);
  const [unitJobOpt, setUnitJobOpt] = useState([]);
  const [unitStatus, setUnitStatus] = useState("");
  const [unitStatusOpt, setUnitStatusOpt] = useState([]);

  const user = useSelector((state) => state.userReducer);
  console.log("this is user", user);
  useEffect(() => {
    axios
      .get(`${apiRouth.prodPath}/api/branch/`)
      .then((res) => {
        setBranchOpt(
          res.data.branch.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`${apiRouth.prodPath}/api/unitLoc/`)
      .then((res) => {
        setUnitLocOpt(
          res.data.unitLoc.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`${apiRouth.prodPath}/api/unitType/`)
      .then((res) => {
        setUnitTypeOpt(
          res.data.unitType.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`${apiRouth.prodPath}/api/client/`)
      .then((res) => {
        setClientOpt(
          res.data.client.map((i) => ({
            label: i.clientName,
            value: i.clientName,
          }))
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`${apiRouth.prodPath}/api/unitYear/`)
      .then((res) => {
        setUnitYearOpt(
          res.data.unitYear.map((i) => ({
            label: i.name,
            value: i.name,
          }))
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`${apiRouth.prodPath}/api/unitMake/`)
      .then((res) => {
        setUnitMakeOpt(
          res.data.unitMake.map((i) => ({
            label: i.name,
            value: i.name,
          }))
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`${apiRouth.prodPath}/api/unitMod`)
      .then((res) => {
        setUnitModelOpt(
          res.data.unitMod.map((i) => ({
            label: i.name,
            value: i.name,
          }))
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`${apiRouth.prodPath}/api/unitJob/`)
      .then((res) => {
        setUnitJobOpt(
          res.data.unitJob.map((i) => ({
            label: i.name,
            value: i.name,
          }))
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`${apiRouth.prodPath}/api/unitStatus`)
      .then((res) => {
        setUnitStatusOpt(
          res.data.unitStatus.map((i) => ({
            label: i.name,
            value: i.name,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [open]);
  const submitHandler = () => {
    const dataObj = {
      branch: branch.value,
      unitLocation: unitLoc.value,
      unitType: unitType.value,
      unitNumber,
      unitClient: clientName.value,
      unitYear: unitYear.value,
      unitMake: unitMake.value,
      unitModel: unitModel.value,
      unitJobUrgency: unitJob.value,
      unitStatus: unitStatus.map((i) => i.value),
      notes: [
        {
          note,
          date: moment().format("DD-MM-YYYY"),
          time: moment().format("HH:MM"),
          user:
            user.user && user.user.userInfo
              ? user.user.userInfo.fullname
              : "N/A",
        },
      ],
      info: null,
      tasks: null,
      work: null,
      parts: null,
      $: null,
    };
    handleAddUnit(dataObj);
  };
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="drawer-wrapper">
          <label className={poppins.className}>Branch</label>
          <Select
            options={branchOpt}
            onChange={(v) => setBranch(v)}
            value={branch}
          />
          <label className={poppins.className}>Unit Location</label>
          <Select
            options={unitLocOpt}
            onChange={(v) => setUnitLoc(v)}
            value={unitLoc}
          />
          <label className={poppins.className}>Unit Type</label>
          <Select
            options={unitTypeOpt}
            onChange={(v) => setUnitType(v)}
            value={unitType}
          />
          <label className={poppins.className}>Unit#</label>
          <input type="text" onChange={(e) => setUnitNumber(e.target.value)} />
          <label className={poppins.className}>Client</label>
          <Select
            options={clientOpt}
            onChange={(v) => setClientName(v)}
            value={clientName}
          />
          <label className={poppins.className}>Unit Year</label>
          <Select
            options={unitYearOpt}
            onChange={(v) => setUnitYear(v)}
            value={unitYear}
          />
          <label className={poppins.className}>Unit Make</label>
          <Select
            options={unitMakeOpt}
            onChange={(v) => setUnitMake(v)}
            value={unitMake}
          />
          <label className={poppins.className}>Unit Model</label>
          <Select
            options={unitModelOpt}
            onChange={(v) => setUnitModel(v)}
            value={unitModel}
          />
          <label className={poppins.className}>Unit Job Urgency</label>
          <Select
            options={unitJobOpt}
            onChange={(v) => setUnitJob(v)}
            value={unitJob}
          />
          <label className={poppins.className}>Unit Status</label>
          <Select
            isMulti={true}
            options={unitStatusOpt}
            onChange={(v) => setUnitStatus(v)}
            value={unitStatus}
          />
          <label className={poppins.className}>Notes</label>
          <textarea
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            cols={6}
            className={poppins.className}
          />
          <button className={poppins.className} onClick={() => submitHandler()}>
            Add {title}
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default AddUnitsModal;
