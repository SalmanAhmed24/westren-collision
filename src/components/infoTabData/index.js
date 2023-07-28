import moment from "moment";
import "./infoTabData.scss";
function InfoTabData({ data }) {
  return (
    <section className="data-wrap">
      <div>
        <label>Estimate Done</label>
        <p>{data.estimateDone}</p>
      </div>
      <div>
        <label>Parts Ordered</label>
        <p>{data.partsOrdered}</p>
      </div>
      <div>
        <label>On Premise</label>
        <p>{data.onPremise}</p>
      </div>
      <div>
        <label>Premise Date</label>
        <p>{moment(data.premiseDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Approved Date</label>
        <p>{moment(data.approvedDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Start Date</label>
        <p>{moment(data.startDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>ECD</label>
        <p>{moment(data.ecd).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Tear Down Assign To</label>
        <p>{data.tearDownAssignTo}</p>
      </div>
      <div>
        <label>Tear Down Complete Date</label>
        <p>{moment(data.tearDownCompleteDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Body Assigned To</label>
        <p>{data.bodyAssignedTo}</p>
      </div>
      <div>
        <label>body Completed Date</label>
        <p>{moment(data.bodyCompletedDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Paint Prep Assign To</label>
        <p>{data.paintPrepAssignTo}</p>
      </div>
      <div>
        <label>Paint Prep Complete Date</label>
        <p>{moment(data.paintPrepCompleteDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Paint Assign To</label>
        <p>{data.paintAssignTo}</p>
      </div>
      <div>
        <label>Paint Complete Date</label>
        <p>{moment(data.paintCompleteDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Inspection Assign To</label>
        <p>{data.inspectionAssignTo}</p>
      </div>
      <div>
        <label>Inspection Complete Date</label>
        <p>{moment(data.inspectionCompleteDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Invoice Date</label>
        <p>{moment(data.invoiceDate).format("MM-DD-YYYY")}</p>
      </div>
      <div>
        <label>Deliver Date</label>
        <p>{moment(data.deliverDate).format("MM-DD-YYYY")}</p>
      </div>
    </section>
  );
}

export default InfoTabData;
