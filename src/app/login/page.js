"use client";
import React, { useState, useEffect } from "react";
import "./login.scss";
import axios from "axios";
import apiRouth from "@/utils/routes";
import { useDispatch } from "react-redux";
import { LOGIN_INFO } from "../../store/action/user-action";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .post(`${apiRouth.prodPath}/api/users/login`, { username, password })
      .then((res) => {
        if (res.data && res.data.error == true) {
          Swal.fire({
            icon: "error",
            title: "Wrong Credentials",
            text: `${res.data.message}`,
            showCancelButton: true,
          });
        } else {
          dispatch(LOGIN_INFO(res.data));
          setLoader(false);
          router.push("/");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section className="loginWrap">
      <form
        encType="multipart/form-data"
        className="form-wrap"
        onSubmit={handleSubmit}
      >
        <h1>Log In</h1>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <input type="submit" value={loader ? "Loading..." : "Log In"} />
      </form>
    </section>
  );
}
export default LoginPage;
