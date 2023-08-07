import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
import React, { useState, useEffect } from "react";
import "../modal/addUnitModal.scss";
import { Poppins } from "next/font/google";
import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
function EditUserModal({ open, handleClose, handleEditUser, item, title }) {
  const [userType, setUserType] = useState("");
  const [fullname, setFullname] = useState("");
  const [mainEmail, setMainEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [hireDate, setHireDate] = useState(new Date());
  const [reviewDate, setReviewDate] = useState(new Date());
  const [error, setError] = useState({ error: false, input: "", text: "" });
  useEffect(() => {
    setUserType({ label: item.userType, value: item.userType });
    setFullname(item.fullname);
    setMainEmail(item.mainEmail);
    setPhone(item.phone);
    setUsername(item.username);
    setPass(item.password);
    setHireDate(new Date(item.hireDate));
    setReviewDate(new Date(item.nextReviewDate));
  }, [open]);
  const handleName = (e) => {
    if (error.error == true && error.input == "fullname") {
      setError({ error: false, text: "", input: "" });
    }
    setFullname(e.target.value);
  };
  const handleEmail = (e) => {
    if (error.error == true && error.input == "email") {
      setError({ error: false, text: "", input: "" });
    }
    setMainEmail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleUsername = (e) => {
    if (error.error == true && error.input == "username") {
      setError({ error: false, text: "", input: "" });
    }
    setUsername(e.target.value);
  };
  const handlePass = (e) => {
    if (error.error == true && error.input == "password") {
      setError({ error: false, text: "", input: "" });
    }
    setPass(e.target.value);
  };

  const userTypeOpt = [
    { label: "Admin", value: "admin" },
    { label: "Techs", value: "techs" },
  ];

  const handleSubmit = () => {
    if (userType == "") {
      setError({
        error: true,
        text: "User Type should be selected",
        input: "user type",
      });
      return null;
    }
    if (fullname == "") {
      setError({
        error: true,
        text: "Full name is missing",
        input: "fullname",
      });
      return null;
    }
    if (mainEmail == "") {
      setError({ error: true, text: "Email is missing", input: "email" });
      return null;
    }
    if (username == "") {
      setError({ error: true, text: "Username is missing", input: "username" });
      return null;
    }
    if (password == "") {
      setError({ error: true, text: "Password is missing", input: "password" });
      return null;
    }
    const itemObj = {
      userType: userType.value,
      fullname,
      mainEmail,
      phone,
      username,
      password,
      pinCode: "",
      hireDate,
      nextReviewDate: reviewDate,
    };
    handleEditUser(itemObj);
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
          <label
            className={poppins.className}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            Type
          </label>
          <Select
            options={userTypeOpt}
            onChange={(type) => {
              if (error.error == true && error.input == "user type") {
                setError({ error: false, text: "", input: "" });
              }
              setUserType(type);
            }}
            value={userType}
          />
          {error.error && error.input == "user type" ? (
            <p style={{ color: "red" }}>{error.text}</p>
          ) : null}
          <label
            className={poppins.className}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            Full Name
          </label>
          <input type="text" onChange={handleName} value={fullname} />
          {error.error && error.input == "fullname" ? (
            <p style={{ color: "red" }}>{error.text}</p>
          ) : null}
          <label
            className={poppins.className}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            Email
          </label>
          <input type="email" onChange={handleEmail} value={mainEmail} />
          {error.error && error.input == "email" ? (
            <p style={{ color: "red" }}>{error.text}</p>
          ) : null}
          <label
            className={poppins.className}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            Phone
          </label>
          <input type="text" onChange={handlePhone} value={[phone]} />
          <label
            className={poppins.className}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            Username
          </label>
          <input type="text" onChange={handleUsername} value={username} />
          {error.error && error.input == "username" ? (
            <p style={{ color: "red" }}>{error.text}</p>
          ) : null}
          <label
            className={poppins.className}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            Password
          </label>
          <input type="password" onChange={handlePass} value={password} />
          {error.error && error.input == "password" ? (
            <p style={{ color: "red" }}>{error.text}</p>
          ) : null}
          <label
            className={poppins.className}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            Hire Date
          </label>
          <DatePicker
            selected={hireDate}
            onChange={(date) => setHireDate(date)}
          />
          <label
            className={poppins.className}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            Next Review Date
          </label>
          <DatePicker
            selected={reviewDate}
            onChange={(date) => setReviewDate(date)}
          />
          <button className={poppins.className} onClick={() => handleSubmit()}>
            Edit {title}
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default EditUserModal;
