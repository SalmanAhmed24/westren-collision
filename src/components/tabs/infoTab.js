import apiRouth from "@/utils/routes";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./allTabs.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import moment from "moment";
import InfoTabData from "../infoTabData";
function InfoTab({ item, handleClose, refreshData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [estDone, setEstDone] = useState({ label: "Yes", value: "Yes" });
  const [partsOrd, setPartsOrd] = useState({ label: "Yes", value: "Yes" });
  const [onPrem, setOnPrem] = useState({ label: "Yes", value: "Yes" });
  const [onPremDate, setOnPremDate] = useState(new Date());
  const [apDate, setApDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [ecdDate, setEcdDate] = useState(new Date());
  const [TDAssignToOpt, setTDAssignToOpt] = useState([]);
  const [TDAssignTo, setTDAssignTo] = useState("");
  const [TDComDate, setTDComDate] = useState(new Date());
  const [BDAssignTo, setBDAssignTo] = useState("");
  const [BDComDate, setBDComDate] = useState(new Date());
  const [PPAssignTo, setPPAssignTo] = useState("");
  const [PPComDate, setPPComDate] = useState(new Date());
  const [IAssignTo, setIAssignTo] = useState("");
  const [IComDate, setIComDate] = useState(new Date());
  const [IVCDate, setIVCDate] = useState(new Date());
  const [DVDate, setDVDate] = useState(new Date());
  const [PAssignTo, setPAssignTo] = useState([]);
  const [PComDate, setPComDate] = useState(new Date());
  const [refreshPage, setRefreshPage] = useState(false);
  useEffect(() => {
    axios
      .get(`${apiRouth.prodPath}/api/users`)
      .then((res) => {
        setTDAssignToOpt(
          res.data &&
            res.data.allUsers.map((i) => ({
              label: i.fullname,
              value: i.fullname,
            }))
        );
      })
      .catch((err) => console.log(err));
  }, [refreshPage]);
  const infoHandler = () => {
    setShowAdd(!showAdd);
  };
  const editHandler = () => {
    setEstDone({
      label: item.info.estimateDone,
      value: item.info.estimateDone,
    });
    setPartsOrd({
      label: item.info.partsOrdered,
      value: item.info.partsOrdered,
    });
    setOnPrem({ label: item.info.onPremise, value: item.info.onPremise });
    setOnPremDate(new Date(item.info.premiseDate));
    setApDate(new Date(item.info.approvedDate));
    setStartDate(new Date(item.info.startDate));
    setEcdDate(new Date(item.info.ecd));
    setTDAssignTo({
      label: item.info.tearDownAssignTo,
      value: item.info.tearDownAssignTo,
    });
    setTDComDate(new Date(item.info.tearDownCompleteDate));
    setBDAssignTo({
      label: item.info.bodyAssignedTo,
      value: item.info.bodyAssignedTo,
    });
    setBDComDate(new Date(item.info.bodyCompletedDate));
    setPPAssignTo({
      label: item.info.paintPrepAssignTo,
      value: item.info.paintPrepAssignTo,
    });
    setPPComDate(new Date(item.info.paintPrepCompleteDate));
    setPAssignTo({
      label: item.info.paintAssignTo,
      value: item.info.paintAssignTo,
    });
    setPComDate(new Date(item.info.paintCompleteDate));
    setIAssignTo({
      label: item.info.inspectionAssignTo,
      value: item.info.inspectionAssignTo,
    });
    setIComDate(new Date(item.info.inspectionCompleteDate));
    setIVCDate(new Date(item.info.invoiceDate));
    setDVDate(new Date(item.info.deliverDate));
    setShowAdd(!showAdd);
  };
  const refresh = () => {
    setRefreshPage(!refreshPage);
  };
  const addInfoHandler = () => {
    const dataObj = {
      estimateDone: estDone.value,
      partsOrdered: partsOrd.value,
      onPremise: onPrem.value,
      premiseDate: onPremDate,
      approvedDate: apDate,
      startDate: startDate,
      ecd: ecdDate,
      tearDownAssignTo: TDAssignTo.value,
      tearDownCompleteDate: TDComDate,
      bodyAssignedTo: BDAssignTo.value,
      bodyCompletedDate: BDComDate,
      paintPrepAssignTo: PPAssignTo.value,
      paintPrepCompleteDate: PPComDate,
      paintAssignTo: PAssignTo.value,
      paintCompleteDate: PComDate,
      inspectionAssignTo: IAssignTo.value,
      inspectionCompleteDate: IComDate,
      invoiceDate: IVCDate,
      deliverDate: DVDate,
    };
    axios
      .patch(`${apiRouth.prodPath}/api/units/addInfo/${item.id}`, dataObj)
      .then((res) => {
        refresh();
        handleClose();
        refreshData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveInfoHandler = () => {
    const dataObj = {
      estimateDone: estDone.value,
      partsOrdered: partsOrd.value,
      onPremise: onPrem.value,
      premiseDate: onPremDate,
      approvedDate: apDate,
      startDate: startDate,
      ecd: ecdDate,
      tearDownAssignTo: TDAssignTo.value,
      tearDownCompleteDate: TDComDate,
      bodyAssignedTo: BDAssignTo.value,
      bodyCompletedDate: BDComDate,
      paintPrepAssignTo: PPAssignTo.value,
      paintPrepCompleteDate: PPComDate,
      paintAssignTo: PAssignTo.value,
      paintCompleteDate: PComDate,
      inspectionAssignTo: IAssignTo.value,
      inspectionCompleteDate: IComDate,
      invoiceDate: IVCDate,
      deliverDate: DVDate,
    };
    axios
      .patch(`${apiRouth.prodPath}/api/units/addInfo/${item.id}`, dataObj)
      .then((res) => {
        refresh();
        handleClose();
        refreshData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section>
      {item.info == null ? (
        <div className="add-btn-wrap">
          <button onClick={infoHandler}>Add Info</button>
        </div>
      ) : (
        <div className="add-btn-wrap">
          <button onClick={editHandler}>Edit Info</button>
        </div>
      )}
      <section className="info-tab-wrap">
        {showAdd ? (
          <div className="tab-input-wrap">
            <div className="input-wrap">
              <label>Estimate Done</label>
              <Select
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                value={estDone}
                onChange={(v) => setEstDone(v)}
              />
            </div>
            <div className="input-wrap">
              <label>Parts Ordered</label>
              <Select
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                value={partsOrd}
                onChange={(v) => setPartsOrd(v)}
              />
            </div>
            <div className="input-wrap">
              <label>On Premise</label>
              <Select
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                value={onPrem}
                onChange={(v) => setOnPrem(v)}
              />
            </div>
            <div className="input-wrap">
              <label>On Premise Date</label>
              <DatePicker
                selected={onPremDate}
                onChange={(date) => setOnPremDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Approved Date</label>
              <DatePicker
                selected={apDate}
                onChange={(date) => setApDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>ECD</label>
              <DatePicker
                selected={ecdDate}
                onChange={(date) => setEcdDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Teardown Assigned To</label>
              <Select
                value={TDAssignTo}
                onChange={(v) => setTDAssignTo(v)}
                options={TDAssignToOpt}
              />
            </div>
            <div className="input-wrap">
              <label>Teardown Complete Date</label>
              <DatePicker
                selected={TDComDate}
                onChange={(date) => setTDComDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Body Assigned To</label>
              <Select
                value={BDAssignTo}
                onChange={(v) => setBDAssignTo(v)}
                options={TDAssignToOpt}
              />
            </div>
            <div className="input-wrap">
              <label>Body Complete Date</label>
              <DatePicker
                selected={BDComDate}
                onChange={(date) => setBDComDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Paint Prep Assigned To</label>
              <Select
                value={PPAssignTo}
                onChange={(v) => setPPAssignTo(v)}
                options={TDAssignToOpt}
              />
            </div>
            <div className="input-wrap">
              <label>Paint Prep Complete Date</label>
              <DatePicker
                selected={PPComDate}
                onChange={(date) => setPPComDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Paint Assigned To</label>
              <Select
                value={PAssignTo}
                onChange={(v) => setPAssignTo(v)}
                options={TDAssignToOpt}
              />
            </div>
            <div className="input-wrap">
              <label>Paint Prep Complete Date</label>
              <DatePicker
                selected={PPComDate}
                onChange={(date) => setPPComDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Inspection Assigned To</label>
              <Select
                value={IAssignTo}
                onChange={(v) => setIAssignTo(v)}
                options={TDAssignToOpt}
              />
            </div>
            <div className="input-wrap">
              <label>Inspection Complete Date</label>
              <DatePicker
                selected={IComDate}
                onChange={(date) => setIComDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Invoice Date</label>
              <DatePicker
                selected={IVCDate}
                onChange={(date) => setIVCDate(date)}
              />
            </div>
            <div className="input-wrap">
              <label>Delivery Date</label>
              <DatePicker
                selected={DVDate}
                onChange={(date) => setDVDate(date)}
              />
            </div>
            {item.info == null ? (
              <div className="btn-submit-wrap">
                <button onClick={addInfoHandler}>Add</button>
              </div>
            ) : (
              <div className="btn-submit-wrap">
                <button onClick={saveInfoHandler}>Save</button>
              </div>
            )}
          </div>
        ) : null}
        {item.info ? (
          <InfoTabData data={item.info} />
        ) : (
          <p>There is no info added for this unit. Click above to add info</p>
        )}
      </section>
    </section>
  );
}

export default InfoTab;
