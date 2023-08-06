import React, { useState, useEffect } from "react";
import "./allTabs.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import axios from "axios";
import apiRouth from "@/utils/routes";
import Select from "react-select";
import Swal from "sweetalert2";
function TasksTab({ item, handleClose, refreshData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(dayjs(new Date()));
  const [taskCat, setTaskCat] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [assignedTo, setAssignTo] = useState("");
  const [title, setTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskCatOpt, setTaskCatOpt] = useState("");
  const [assignToOpt, setAssignToOpt] = useState("");
  const [taskId, setTaskId] = useState("");
  useEffect(() => {
    axios
      .get(`${apiRouth.prodPath}/api/taskCategory`)
      .then((res) => {
        if (res.data && res.data.taskCategory) {
          setTaskCatOpt(
            res.data.taskCategory.map((i) => ({ label: i.name, value: i.name }))
          );
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiRouth.prodPath}/api/users/`)
      .then((res) => {
        console.log("allUsers", res.data.allUsers);
        if (res.data && res.data.allUsers) {
          setAssignToOpt(
            res.data.allUsers.map((i) => ({
              label: i.fullname,
              value: i.fullname,
            }))
          );
        }
      })
      .catch((err) => console.log(err));
  }, [item]);
  const notesHandler = () => {
    setShowAdd(!showAdd);
  };
  const editHandler = (item) => {
    setTime(dayjs(item.time));
    setDate(new Date(item.date));
    setTaskCat({ label: item.taskCategory, value: item.taskCategory });
    setDueDate(new Date(item.dueDate));
    setAssignTo({ label: item.assignedTo, value: item.assignedTo });
    setTitle(item.title);
    setTaskDesc(item.taskDescription);
    console.log("this is id", item._id);
    setTaskId(item._id);
    setShowEdit(!showEdit);
  };
  const handleTime = (time) => {
    console.log("this is time", time);
    setTime(time);
  };
  const addTasks = () => {
    const objData = {
      date,
      time: time,
      taskCategory: taskCat.value,
      dueDate,
      assignedTo: assignedTo.value,
      title,
      taskDescription: taskDesc,
    };
    axios
      .patch(`${apiRouth.prodPath}/api/units/addTasks/${item.id}`, objData)
      .then((res) => {
        handleClose();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const saveTasks = () => {
    const objData = {
      date,
      time: time,
      taskCategory: taskCat.value,
      dueDate,
      assignedTo: assignedTo.value,
      title,
      taskDescription: taskDesc,
      id: taskId,
    };

    axios
      .patch(`${apiRouth.prodPath}/api/units/editTasks/${item.id}`, objData)
      .then((res) => {
        handleClose();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const deleteNote = (id) => {
    Swal.fire({
      title: "Delete Task",
      text: "Are you sure you want to delete the Task?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${apiRouth.prodPath}/api/units/deleteTasks/${item.id}&&${id}`
          )
          .then((res) => {
            handleClose();
            refreshData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <section>
      <div className="add-btn-wrap">
        <button onClick={notesHandler}>Add Tasks</button>
      </div>
      <section className="info-tab-wrap">
        {showAdd ? (
          <div className="tab-input-wrap">
            <div className="input-wrap">
              <label>Date</label>
              <DatePicker
                className="custom-date"
                selected={date}
                onChange={(d) => setDate(d)}
              />
            </div>
            <div className="input-wrap">
              <label>Time</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  className="cus-time"
                  value={time}
                  onChange={handleTime}
                />
              </LocalizationProvider>
            </div>
            <div className="input-wrap opt">
              <label>Task Category</label>
              <Select
                className="task-cat-cus"
                options={taskCatOpt}
                onChange={(value) => setTaskCat(value)}
                value={taskCat}
              />
            </div>
            <div className="input-wrap">
              <label>Due Date</label>
              <DatePicker
                className="custom-date"
                selected={dueDate}
                onChange={(d) => setDueDate(d)}
              />
            </div>
            <div className="input-wrap opt">
              <label>Assigned To</label>
              <Select
                className="task-cat-cus"
                options={assignToOpt}
                onChange={(value) => setAssignTo(value)}
                value={assignedTo}
              />
            </div>
            <div className="input-wrap opt">
              <label>Title</label>
              <input
                type="text"
                className="cus-text-inp"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="input-wrap opt">
              <label>Description</label>
              <textarea
                rows={5}
                cols={5}
                className="cus-text-inp"
                onChange={(e) => setTaskDesc(e.target.value)}
                value={taskDesc}
              ></textarea>
            </div>
            <div className="btn-submit-wrap">
              <button onClick={addTasks}>Add</button>
            </div>
          </div>
        ) : null}
        {showEdit ? (
          <div className="tab-input-wrap">
            <div className="input-wrap">
              <label>Date</label>
              <DatePicker
                className="custom-date"
                selected={date}
                onChange={(d) => setDate(d)}
              />
            </div>
            <div className="input-wrap">
              <label>Time</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  className="cus-time"
                  value={time}
                  onChange={handleTime}
                />
              </LocalizationProvider>
            </div>
            <div className="input-wrap opt">
              <label>Task Category</label>
              <Select
                className="task-cat-cus"
                options={taskCatOpt}
                onChange={(value) => setTaskCat(value)}
                value={taskCat}
              />
            </div>
            <div className="input-wrap">
              <label>Due Date</label>
              <DatePicker
                className="custom-date"
                selected={dueDate}
                onChange={(d) => setDueDate(d)}
              />
            </div>
            <div className="input-wrap opt">
              <label>Assigned To</label>
              <Select
                className="task-cat-cus"
                options={assignToOpt}
                onChange={(value) => setAssignTo(value)}
                value={assignedTo}
              />
            </div>
            <div className="input-wrap opt">
              <label>Title</label>
              <input
                type="text"
                className="cus-text-inp"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="input-wrap opt">
              <label>Description</label>
              <textarea
                rows={5}
                cols={5}
                className="cus-text-inp"
                onChange={(e) => setTaskDesc(e.target.value)}
                value={taskDesc}
              ></textarea>
            </div>
            <div className="btn-submit-wrap">
              <button onClick={saveTasks}>Edit</button>
            </div>
          </div>
        ) : null}
        <h1 className="tab-heading">All Tasks</h1>

        {item.tasks.length > 0 ? (
          item.tasks.map((i, ind) => {
            return (
              <div key={`${i.date}${ind}`} className="notes-wraper">
                <div className="inner-notes-wrap">
                  <label>Date</label>
                  <p>{i.date}</p>
                </div>
                <div className="inner-notes-wrap">
                  <label>Time</label>
                  <p>{moment(i.time, ["HH:mm"]).format("hh:mm A")}</p>
                </div>
                <div className="inner-notes-wrap">
                  <label>Task Category</label>
                  <p>{i.taskCategory}</p>
                </div>
                <div className="inner-notes-wrap">
                  <label>Due Date</label>
                  <p>{i.dueDate}</p>
                </div>
                <div className="inner-notes-wrap">
                  <label>Assigned To</label>
                  <p>{i.assignedTo}</p>
                </div>
                <div className="inner-notes-wrap">
                  <label>Assigned To</label>
                  <p>{i.assignedTo}</p>
                </div>
                <div className="inner-notes-wrap">
                  <label>Title</label>
                  <p>{i.title}</p>
                </div>
                <div className="inner-notes-wrap">
                  <label>Task Description</label>
                  <p>{i.taskDescription}</p>
                </div>
                <div className="action-wrap">
                  <p className="edit" onClick={() => editHandler(i)}>
                    Edit
                  </p>
                  <p className="delete" onClick={() => deleteNote(i._id)}>
                    Delete
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>no tasks present yet</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default TasksTab;
