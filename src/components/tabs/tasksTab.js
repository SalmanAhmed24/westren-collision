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
    setNote(item.note);
    setNoteId(item._id);
    setShowEdit(!showEdit);
  };
  const handleTime = (time) => {
    console.log("this is time", time);
  };
  const addTasks = () => {};
  const saveTasks = () => {};
  const deleteNote = (i) => {};
  console.log("this is options", taskCatOpt);
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
              <DatePicker selected={date} onChange={(d) => setDate(d)} />
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
              <div key={`${i.user}${ind}`} className="notes-wraper">
                <p className="notes">{i.note}</p>
                <div className="user">
                  <p>/{i.date}</p>
                  <p>/{moment(i.time, ["HH:mm"]).format("hh:mm A")}</p>
                  <p className="edit" onClick={() => editHandler(i)}>
                    Edit
                  </p>
                  <p className="delete" onClick={() => deleteNote(i)}>
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
