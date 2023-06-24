"use client";
import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
import React, { useState, useEffect } from "react";
import "./addUnitModal.scss";
import { Poppins } from "next/font/google";
import axios from "axios";
import apiRouth from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
function EditClientModal({ open, handleClose, handleEditClient, title, item }) {
  const [clientName, setClientName] = useState("");
  const [mainContact, setMainContact] = useState("");
  const [phoneWork, setPhoneWork] = useState("");
  const [phoneMobile, setPhoneMobile] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [clientType, setClientType] = useState("");
  const [clientTypeData, setClientTypeData] = useState([]);
  const [website, setWebsite] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [secAddress, setSecAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [mainContactFlag, setMainContactFlag] = useState(false);
  const [phoneFlag, setPhoneFlag] = useState(false);
  const [clientFlag, setClientFlag] = useState(false);
  useEffect(() => {
    console.log("this works", item.fax);
    axios
      .get(`${apiRouth.prodPath}/api/${title}Type/`)
      .then((res) => {
        if (title == "client") {
          setClientTypeData(res.data.clientType);
        }
        if (title == "vendor") {
          setClientTypeData(res.data.vendorType);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setClientName(title == "client" ? item.clientName : item.vendorName);
    setMainContact(item.mainContact);
    setPhoneWork(item.phoneWork);
    setPhoneMobile(item.phoneMobile);
    setFax(item.fax);
    setEmail(item.mainEmail);
    setClientType(
      title == "client"
        ? { label: item.clientType, value: item.clientType }
        : { label: item.vendorType, value: item.vendorType }
    );
    setWebsite(item.website);
    setMainAddress(item.addressMain);
    setSecAddress(item.addressSec);
    setCity(item.city);
    setState(item.state);
    setZipCode(item.zipCode);
  }, [open]);
  const handleClientName = (e) => {
    setClientFlag(false);
    setClientName(e.target.value);
  };
  const handleMainContact = (e) => {
    setMainContactFlag(false);
    setMainContact(e.target.value);
  };
  const handlePhoneWork = (e) => {
    setPhoneWork(e.target.value);
  };
  const handlePhoneMobile = (e) => {
    setPhoneMobile(e.target.value);
    setPhoneFlag(false);
  };
  const handleClientType = (value) => {
    setClientType(value);
  };
  const handleEmail = (e) => setEmail(e.target.value);
  const handleFax = (e) => setFax(e.target.value);
  const webisteHandler = (e) => setWebsite(e.target.value);
  const mainAddressHandler = (e) => setMainAddress(e.target.value);
  const secAddressHandler = (e) => setSecAddress(e.target.value);
  const cityHandler = (e) => setCity(e.target.value);
  const stateHandler = (e) => setState(e.target.value);
  const zipCodeHandler = (e) => setZipCode(e.target.value);
  const handleSubmit = () => {
    if (email == "") {
      setEmailFlag(true);
      return;
    }
    if (mainContact == "") {
      setMainContactFlag(true);
      return;
    }
    if (phoneMobile == "") {
      setPhoneFlag(true);
      return;
    }
    if (clientName == "") {
      setClientFlag(true);
      return;
    }
    const dataObj = {
      mainContact,
      phoneWork,
      phoneMobile: Number(phoneMobile),
      fax,
      mainEmail: email,
      website,
      addressMain: mainAddress,
      addressSec: secAddress,
      city,
      state,
      zipCode,
    };
    if (title == "client") {
      dataObj.clientName = clientName;
      dataObj.clientType = clientType.value;
    }
    if (title == "vendor") {
      dataObj.vendorName = clientName;
      dataObj.vendorType = clientType.value;
    }
    handleEditClient(dataObj);
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
          <label className={poppins.className}>Name</label>
          <input
            type="text"
            onChange={handleClientName}
            className={poppins.className}
            value={clientName}
          />
          <label className={poppins.className}>Main Contact</label>
          <input
            type="text"
            onChange={handleMainContact}
            className={poppins.className}
            value={mainContact}
          />
          <label className={poppins.className}>Phone (Work)</label>
          <input
            type="number"
            onChange={handlePhoneWork}
            className={poppins.className}
            value={phoneWork}
          />
          <label className={poppins.className}>Phone (Mobile)</label>
          <input
            type={"number"}
            onChange={handlePhoneMobile}
            className={poppins.className}
            value={phoneMobile}
          />
          <label className={poppins.className}>Fax</label>
          <input
            type="text"
            onChange={handleFax}
            className={poppins.className}
            value={fax}
          />
          <label className={poppins.className}>Main email</label>
          <input
            type="email"
            onChange={handleEmail}
            className={poppins.className}
            value={email}
          />
          <label className={poppins.className}>Client Type</label>
          <Select
            options={clientTypeData.map((i) => ({
              label: i.name,
              value: i.name,
            }))}
            onChange={handleClientType}
            className={poppins.className}
            value={clientType}
          />
          <label className={poppins.className}>Website</label>
          <input
            className={poppins.className}
            type="text"
            value={website}
            onChange={webisteHandler}
          />
          <label className={poppins.className}>Address 1</label>
          <input
            className={poppins.className}
            type="text"
            value={mainAddress}
            onChange={mainAddressHandler}
          />
          <label className={poppins.className}>Address 2</label>
          <input
            className={poppins.className}
            type="text"
            value={secAddress}
            onChange={secAddressHandler}
          />
          <label className={poppins.className}>City</label>
          <input
            className={poppins.className}
            type="text"
            value={city}
            onChange={cityHandler}
          />
          <label className={poppins.className}>State</label>
          <input
            className={poppins.className}
            type="text"
            value={state}
            onChange={stateHandler}
          />
          <label className={poppins.className}>Zip Code</label>
          <input
            className={poppins.className}
            type="text"
            value={zipCode}
            onChange={zipCodeHandler}
          />
          <button className={poppins.className} onClick={() => handleSubmit()}>
            Edit Client
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default EditClientModal;
