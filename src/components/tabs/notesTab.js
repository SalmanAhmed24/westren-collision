import moment from "moment";
import "./allTabs.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import apiRouth from "@/utils/routes";
function NotesTab({ item, handleClose, refreshData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const [note, setNote] = useState("");
  const [noteId, setNoteId] = useState("");
  const notesHandler = () => {
    setShowAdd(!showAdd);
  };
  const editHandler = (item) => {
    setNote(item.note);
    setNoteId(item._id);
    setShowEdit(!showEdit);
  };
  const addNotes = () => {
    const notesData = {
      note: note,
      date: moment().format("MM-DD-YYYY"),
      time: moment().format("hh:mm a"),
      user:
        user.user && user.user.userInfo ? user.user.userInfo.fullname : "N/A",
    };
    axios
      .patch(`${apiRouth.devPath}/api/units/addIndNotes/${item.id}`, notesData)
      .then((res) => {
        console.log(res);
        handleClose();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const saveNotes = () => {
    const notesData = {
      note: note,
      date: moment().format("MM-DD-YYYY"),
      time: moment().format("hh:mm a"),
      user:
        user.user && user.user.userInfo ? user.user.userInfo.fullname : "N/A",
      id: noteId,
    };
    axios
      .patch(`${apiRouth.devPath}/api/units/editIndNotes/${item.id}`, notesData)
      .then((res) => {
        console.log(res);
        handleClose();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const deleteNote = (i) => {
    axios
      .delete(`${apiRouth.devPath}/api/units/deleteNotes/${item.id}&&${i._id}`)
      .then((res) => {
        handleClose();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <section>
      <div className="add-btn-wrap">
        <button onClick={notesHandler}>Add Notes</button>
      </div>
      <section className="info-tab-wrap">
        {showAdd ? (
          <div className="tab-input-wrap">
            <div className="input-wrap">
              <label>Notes</label>
              <input
                className="inp"
                type="text"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="btn-submit-wrap">
              <button onClick={addNotes}>Add</button>
            </div>
          </div>
        ) : null}
        {showEdit ? (
          <div className="tab-input-wrap">
            <div className="input-wrap">
              <label>Notes</label>
              <input
                className="inp"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="btn-submit-wrap">
              <button onClick={saveNotes}>Edit</button>
            </div>
          </div>
        ) : null}
        {item.individualNotes.length > 0 ? (
          item.individualNotes.map((i, ind) => {
            return (
              <div key={`${i.user}${ind}`} className="notes-wraper">
                <p className="notes">{i.note}</p>
                <div className="user">
                  <h3>{i.user}</h3>
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
          <p>no notes present</p>
        )}
      </section>
    </section>
  );
}

export default NotesTab;
