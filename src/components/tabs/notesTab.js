import moment from "moment";
import "./allTabs.scss";
function NotesTab({ item, handleClose, refreshData }) {
  return (
    <section>
      {item.notes.length > 0 ? (
        item.notes.map((i, ind) => {
          return (
            <div key={`${i.user}${ind}`} className="notes-wraper">
              <p className="notes">{i.note}</p>
              <div className="user">
                <h3>{i.user}</h3>
                <p>/{i.date}</p>
                <p>/{moment(i.time, ["HH:mm"]).format("hh:mm A")}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>no notes present</p>
      )}
    </section>
  );
}

export default NotesTab;
