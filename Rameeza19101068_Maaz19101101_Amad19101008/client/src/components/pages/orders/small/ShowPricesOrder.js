import React from "react";

export default function ShowPricesOrder({
  insuranceAmt,
  total,
  onChangePay,
  pay_amount,
  already_pay_amount,
  customerName
}) {
  return (
    <>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4 ">
            <label className="text-center ml-2" id="setName">
              Total without insurance :
            </label>
            <div>
              <input
                style={{ width: "65%", color: "gray" }}
                type="text"
                value={Number(total) - Number(insuranceAmt)}
                className="form-control mm-input s-input text-center"
                placeholder="Total"
                name="total_without_insurance"
                id="setSizeFloat"
                required
                readOnly
              />
            </div>
          </div>

          <div className="col-md-4 ">
            <label className="text-center ml-2" id="setName">
              insurance :
            </label>
            <div>
              <input
                style={{ width: "65%", color: "gray" }}
                type="text"
                value={Number(insuranceAmt)}
                className="form-control mm-input s-input text-center"
                placeholder="Total"
                name="insurance"
                id="setSizeFloat"
                required
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4 ">
            <label className="text-center ml-2" id="setName">
              Total with insurance :
            </label>
            <div>
              <input
                style={{ width: "65%", color: "gray" }}
                value={Number(total)}
                type="text"
                className="form-control mm-input s-input text-center"
                placeholder="Total"
                name="total_without_insurance"
                id="setSizeFloat"
                required
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4 ">
            <label className="text-center ml-2" id="setName">
              Amount owe:
            </label>
            <div>
              <input
                style={{ width: "65%", color: "gray" }}
                type="text"
                value={Number(total)-Number(already_pay_amount)}
                className="form-control mm-input s-input text-center"
                placeholder="Total"
                name="total_owe"
                id="setSizeFloat"
                required
                readOnly
              />
            </div>
          </div>

          <div className="col-md-4 ">
            <label className="text-center ml-2" id="setName">
              Paid:
            </label>
            <div>
              <input
                style={{ width: "65%", color: "gray" }}
                type="text"
                value={already_pay_amount}
                className="form-control mm-input s-input text-center"
                placeholder="Paid"
                required
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="col-md-12">
        <div className="row ">
          <div className="mx-auto col-4 text-center">
            How much would {customerName} want to pay for this order today?
            <div className="input-group">
              <input
                type="number"
                min={0}
                name={"pay"}
                value={pay_amount}
                onChange={onChangePay}
                className="form-control border-primary"
              />
              <span className="input-group-addon p-1 px-2">VNĐ</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
