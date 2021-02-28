import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
  modal_type,
  handleClose,
  name,
  category,
  amount,
  onHandleModalFields,
  onAddCharge,
  onChangeCategory,
  allCategoryList,
}) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className="text-capitalize">
              {modal_type}
            </h2>

            <div id="transition-modal-description">
              <div className="row">
                <div className="col-md-12 ">
                  {/* zohaib */}
                  <table className="table table-sm ">
                    <thead>
                      <tr>
                        <th scope="col">
                          <TextField
                            style={{ width: "200px" }}
                            onChange={onHandleModalFields("name")}
                            placeholder={
                              modal_type == "charge" ? "Charge" : "Discount"
                            }
                            margin="normal"
                            variant="outlined"
                            inputProps={{
                              style: {
                                height: 35,
                                padding: "0 14px",
                              },
                            }}
                          />
                        </th>
                        <th scope="col">
                          {" "}
                          <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={allCategoryList.map(
                              (option) => option.title
                            )}
                            renderInput={(params) => (
                              <TextField
                                style={{ width: "200px" }}
                                {...params}
                                onChange={onHandleModalFields("category")}
                                placeholder="Category"
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                  style: {
                                    height: 35,
                                    padding: "0 14px",
                                  },
                                  ...params.InputProps,
                                  type: "search",
                                }}
                              />
                            )}
                          />
                        </th>
                        <th scope="col">
                          {" "}
                          <TextField
                            type="number"
                            style={{ width: "200px" }}
                            onChange={onHandleModalFields("amount")}
                            placeholder="Amount"
                            margin="normal"
                            variant="outlined"
                            inputProps={{
                              style: {
                                height: 35,
                                padding: "0 14px",
                              },
                            }}
                          />
                        </th>
                        <th scope="col">
                          <button
                            type={"button"}
                            onClick={() => onAddCharge(modal_type)}
                            className="btn btn-warning  mt-3"
                          >
                            + Add
                          </button>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
