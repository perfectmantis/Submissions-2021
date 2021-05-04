import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({
  openModal,
  handleOpen,
  handleClose,
  condition,
  note,
  onChangeCondition,
  onChangeNote,
  onSubmitOtherCondition,
  showForm,
}) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              {showForm ? "Note" : "Condition"}
              {condition == "Minor damage" ? (
                <span
                  style={{ fontSize: "25px" }}
                  className="fa fa-exclamation-triangle fa-5 text-warning"
                ></span>
              ) : condition == "Major damage" ? (
                <span
                  style={{ fontSize: "25px" }}
                  className="fa fa-times fa-5 text-danger"
                ></span>
              ) : (
                ""
              )}
            </h2>

            <div id="transition-modal-description">
              {showForm ? (
                <div className={"row"}>
                  <textarea
                    className="form-control"
                    rows={3}
                    onChange={(e) => onChangeNote(e.target.value)}
                  >
                    {note}
                  </textarea>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => onSubmitOtherCondition(condition)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="row">
                  <div
                    style={{ cursor: "pointer" }}
                    className="col-md-4 text-center"
                    onClick={() => onChangeCondition("good")}
                  >
                    <i
                      style={{ fontSize: "50px" }}
                      className="fa fa-check  text-success"
                    ></i>

                    <p>Good condition</p>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className="col-md-4 text-center"
                    onClick={() => onChangeCondition("Minor damage")}
                  >
                    <i
                      style={{ fontSize: "50px" }}
                      className="fa fa-exclamation-triangle fa-5 text-warning"
                    ></i>

                    <p>Minor damage</p>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className="col-md-4 text-center"
                    onClick={() => onChangeCondition("Major damage")}
                  >
                    <i
                      style={{ fontSize: "50px" }}
                      className="fa fa-times fa-5 text-danger"
                    ></i>

                    <p>Major damage</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
