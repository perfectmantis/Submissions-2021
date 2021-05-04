import React from "react";

export default function Status({ title, total, remain, reservedStatus, readyForPickUp,pickedUpStatus }) {
  
  return (
    <div className="row m-auto justify">
      <div className={`d-flex align-items-center text-center rounded shadow-status-1 col-md-5 col-12 px-0  badge ${reservedStatus?reservedStatus:title}`}>
        <div className="mx-auto h5 mb-0 font-weight-400" style={{color:'#fff'}}>{reservedStatus?reservedStatus:title}</div>
      </div>
      <div className="small col-12 col-md-5 rounded bg-no">
        <div className="small text-capitalize">
          {pickedUpStatus ==false && readyForPickUp ? "Pickup Today":reservedStatus ? title : <p></p>}
          </div>
        <span className="ml-1"> {total}</span>
         <span className="ml-3 mr-2"> {remain}</span>
        {/* <div className="shadow-status-1 row m-auto">
      <span className="col-5 px-0 ml-auto">

        <div className="text-right"> Pickup</div>
        <div className="ml-1"> {total}</div>
      </span>
      <span className="col px-0">
        <div className="text-left pl-2px">today</div>
        <div className="mr-3"> {remain}</div>
      </span>

        </div> */}
      </div>
    </div>
  );
}
