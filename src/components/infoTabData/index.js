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
        <p>{data.premiseDate}</p>
      </div>
      <div>
        <label>Approved Date</label>
        <p>{data.approvedDate}</p>
      </div>
      <div>
        <label>Start Date</label>
        <p>{data.startDate}</p>
      </div>
      <div>
        <label>ECD</label>
        <p>{data.ecd}</p>
      </div>
      <div>
        <label>Tear Down Assign To</label>
        <p>{data.tearDownAssignTo}</p>
      </div>
      <div>
        <label>Tear Down Complete Date</label>
        <p>{data.tearDownCompleteDate}</p>
      </div>
      <div>
        <label>Body Assigned To</label>
        <p>{data.bodyAssignedTo}</p>
      </div>
      <div>
        <label>body Completed Date</label>
        <p>{data.bodyCompletedDate}</p>
      </div>
      <div>
        <label>Paint Prep Assign To</label>
        <p>{data.paintPrepAssignTo}</p>
      </div>
      <div>
        <label>Paint Prep Complete Date</label>
        <p>{data.paintPrepCompleteDate}</p>
      </div>
      <div>
        <label>Paint Assign To</label>
        <p>{data.paintAssignTo}</p>
      </div>
      <div>
        <label>Paint Complete Date</label>
        <p>{data.paintCompleteDate}</p>
      </div>
      <div>
        <label>Inspection Assign To</label>
        <p>{data.inspectionAssignTo}</p>
      </div>
      <div>
        <label>Inspection Complete Date</label>
        <p>{data.inspectionCompleteDate}</p>
      </div>
      <div>
        <label>Invoice Date</label>
        <p>{data.invoiceDate}</p>
      </div>
      <div>
        <label>Deliver Date</label>
        <p>{data.deliverDate}</p>
      </div>
    </section>
  );
}

export default InfoTabData;
