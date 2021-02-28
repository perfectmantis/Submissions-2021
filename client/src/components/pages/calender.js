import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Alert from "../layout/Alert";
import moment from "moment";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import shortid from "shortid";
import {
  getAllEvents,
  addEvent,
  getEventbyID,
  getAllBirthdayEvents,
  updateEvent,
} from "../../actions/events";
import Modal from "react-awesome-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "moment/locale/vi";
import { OCAlert } from "@opuscapita/react-alerts";
import { OCAlertsProvider } from "@opuscapita/react-alerts";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

class Calender extends Component {
  state = {
    show: false,
    events: [],
    name: "",
    note: "",
    timeStart: "",
    timeEnd: "",
    date: "",
    location: "",
    image: "",
    isNew: false,
    images: [],
    images_Edit: [],
    isEditTrue: false,
    isUpdate: false,
  };

  async componentDidMount() {
    await this.props.getAllEvents();
    await this.props.getAllBirthdayEvents();

    const { events } = this.props;
    const { b_events } = this.props;
    const m_bevents = [];

    b_events &&
      b_events.forEach((event) => {
        const new_Date =
          new Date(event.date).getFullYear() +
          "-" +
          ("0" + (Number(new Date(event.birthdate).getMonth()) + 1)).slice(-2) +
          "-" +
          ("0" + (Number(new Date(event.birthdate).getDate()) - 1)).slice(-2) +
          "T22:20:52.000Z";
        m_bevents.push({
          date: new_Date,
          timeStart: event.timeStart,
          timeEnd: event.timeEnd,
          name: `${event.name}'s ${this.calculate_age(
            event.birthdate
          )} Birthday Aniversary`,
          note: event.note,
          location: event.location,
          _id: "",
          type: "birthdayEvent",
          timeStart: event.timeStart,
          timeEnd: event.timeEnd,
        });
      });
    let c_events = [];
    let updatedEvents = [...m_bevents, ...events];
    if (updatedEvents) {
      c_events = updatedEvents.map((event) => ({
        title: event.name,
        start: new Date(event.date),
        end: new Date(event.date),
        id: event._id,
      }));
    }

    if (events) {
      this.setState({
        events: c_events,
      });
    }
  }
  calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await this.setState({ saving: true });
    const state = { ...this.state };
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("note", state.note);
    formData.append("location", state.location);
    formData.append("date", state.date);
    formData.append("timeStart", state.timeStart);
    formData.append("timeEnd", state.timeEnd);
    formData.append("birthday", "");
    formData.append("user", "");
    if (this.state.images.length > 0) {
      let m_image = [];
      state.images.forEach((image, index) => {
        m_image.push(image.image);
      });

      m_image.forEach((image) => {
        formData.append("image", image);
      });
    } else {
      formData.append("image", "");
    }

    if (state.id == "" || state.id == undefined) {
      await this.props.addEvent(formData);
    } else {
      await this.props.updateEvent(formData, state.id);
    }
    this.setState({ saving: false, show: false,isNew :false,isUpdate:false,isEdit:false,isEditTrue: false,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.id != this.state.id && this.state.id != "") {
      if (this.state.id) {
        await this.props.getEventbyID(this.state.id);
        const { event } = this.props;
        this.setState({
          name: event.name,
          note: event.note,
          date: moment(event.date),
          timeStart: moment(event.timeStart),
          timeEnd: moment(event.timeEnd),
          location: event.location,
          isEdit: true,
          images_Edit: event.images,
        });
      }
    }
    if (prevProps.events != this.props.events) {
      if (this.props.events) {
        await this.props.getAllEvents();
        await this.props.getAllBirthdayEvents();

        const { events } = this.props;
        const { b_events } = this.props;
        const m_bevents = [];

        b_events &&
          b_events.forEach((event) => {
            const new_Date =
              new Date(event.date).getFullYear() +
              "-" +
              ("0" + (Number(new Date(event.birthdate).getMonth()) + 1)).slice(
                -2
              ) +
              "-" +
              ("0" + (Number(new Date(event.birthdate).getDate()) - 1)).slice(
                -2
              ) +
              "T22:20:52.000Z";
            m_bevents.push({
              date: new_Date,
              timeStart: event.timeStart,
              timeEnd: event.timeEnd,
              name:
                event.name &&
                `${event.name}'s ${this.calculate_age(
                  event.birthdate
                )} Birthday Aniversary`,
              note: event.note,
              location: event.location,
              _id: "",
              type: "birthdayEvent",
            });
          });
        let c_events = [];
        let updatedEvents = [...m_bevents, ...events];
        if (updatedEvents) {
          c_events = updatedEvents.map((event) => ({
            title: event.name,
            start: new Date(event.date),
            end: new Date(event.date),
            id: event._id,
            type: event.type ? event.type : "",
            timeStart: event.timeStart,
            timeEnd: event.timeEnd,
          }));
        }
        if (events) {
          this.setState({
            events: c_events,
          });
        }
      }
    }
  }
  showError = (e) => {
    OCAlert.alertError("Birthday event cannot be updated from here.", {
      timeOut: 3000,
    });
    return;
  };

  closeBModal = (e) => {
    e.preventDefault();
    this.setState({
      showBmodal: false,
    });
  };
  //close modal
  closeModal = (e) => {
    e.preventDefault();
    this.setState({
      show: false,
      image: "",
      id: "",
      name: "",
      images: [],
      isNew: false,
      isEditTrue: false,
      isUpdate:false,
      note: "",
      timeStart: "",
      timeEnd: "",
      date: moment(new Date()),
      location: "",
      isEdit: false,
    });
  };
  //open modal for event
  openModal = (slot) => {
    if (!slot.id && slot.type == "birthdayEvent") {
      this.setState({
        showBmodal: true,
        show: false,
        name: slot.title,
        date: slot.start,
        timeStart: slot.timeStart,
        timeEnd: slot.timeEnd,
        location: `SUTYGON`,
        note: slot.title,
      });
    } else if (slot.id && slot.type == "") {
      this.setState({
        show: true,
        isNew: false,
        isEditTrue: false,
        // isEdit:false,
        id: slot.id,
        timeStart: slot.start,
        timeEnd: slot.end,
        date: slot.date,
      });
    } else if (!slot.id) {
      this.setState({
        show: true,
        id: "",
        isNew: true,
        isUpdate: false,
        name: "",
        note: "",
        timeStart: moment(new Date(slot.slots[0])),
        timeEnd: moment(new Date(slot.slots[0])).add(15, "minutes"),
        date: moment(new Date(slot.slots[0])),
        location: "",
        isEdit: false,
        isEditTrue: false,

        image: "",
      });
    }
  };

  //global handle event
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //handle event for images
  _onChange = async (e, id = "") => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.files[0],
    });
    const { images } = this.state;
    images.push({ image: e.target.files[0], id: shortid.generate() });
    this.setState(images);
  };

  //handle event for date and time
  handleChangeForDate = (date, name, e) => {
    if (name === "date") {
      this.setState({
        date: date,
      });
    } else if (name === "timeStart") {
      this.setState({
        timeStart: date,
      });
    } else if (name === "timeEnd") {
      this.setState({
        timeEnd: date,
      });
    }
  };
  isEditTrue = () => {
    this.setState({
      isEditTrue: true,
      isUpdate: true,
    });
  };

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { user } = auth;
    if (user && user.systemRole === "Employee") {
      if (user && !user.sections.includes("Calender")) {
        return <Redirect to="/Error" />;
      }
    }
    const { events } = this.state;
    return (
      <React.Fragment>
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>

          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <section id="form-action-layouts">
                  <div className="form-body">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="form-section">
                          <i className="icon-social-dropbox"></i>Calendar
                        </h4>
                      </div>
                      <Alert />

                      <div className="card-body">
                        {events ? (
                          <Calendar
                            eventPropGetter={(event) => ({
                              style: {
                                backgroundColor:
                                  event.start.getDay() < 1
                                    ? "#53997D"
                                    : event.start.getDay() < 2
                                    ? "#F73B45"
                                    : event.start.getDay() < 3
                                    ? "#FFDA43"
                                    : event.start.getDay() < 4
                                    ? "#E25FFA"
                                    : event.start.getDay() < 5
                                    ? "#979953"
                                    : event.start.getDay() < 6
                                    ? "#FF9550"
                                    : "#FF9989",
                              },
                            })}
                            selectable
                            popup
                            localizer={localizer}
                            events={events}
                            defaultDate={new Date()}
                            views={{
                              month: true,
                              week: true,
                              day: true,
                            }}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            onSelectEvent={(slotInfo) =>
                              this.openModal(slotInfo)
                            }
                            onSelectSlot={(slotInfo) =>
                              this.openModal(slotInfo)
                            }
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <footer className="footer footer-static footer-light">
              <p className="clearfix text-muted text-sm-center px-2">
                <span>
               " "All rights reserved.{" "}
                </span>
              </p>
            </footer>
          </div>
          <Modal
            visible={this.state.show}
            width="800"
            height={
              this.state.images && this.state.images.length > 4 ? "800" : "550"
            }
            effect="fadeInUp"
            onClickAway={(e) => this.closeModal(e)}
          >
            <div>
              <div className="modal-header">
                <h4 className="mt-2">
                  <strong>Event Details</strong>
                </h4>

                <button
                  type="button"
                  onClick={(e) => this.closeModal(e)}
                  className="btn btn-sm"
                >
                  X
                </button>
              </div>

              <div className="modal-body">
                <form
                  encType="multipart/form-data"
                  action="/upload"
                  method="POST"
                  onSubmit={(e) => this.onSubmit(e)}
                >
                  <div className="form-group">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <label htmlFor="exampleInputEmail1">Event Name</label>

                        {this.state.isEditTrue == true ||
                        this.state.isNew == true ? (
                          <input
                            type="text"
                            name="name"
                            className="form-control border-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Event Name"
                            value={this.state.name}
                            required
                            onChange={(e) => this.handleChange(e)}
                          />
                        ) : (
                          <input
                            type="text"
                            name="name"
                            className="form-control border-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Event Name"
                            value={this.state.name}
                            required
                            readOnly
                            // onChange={(e) => this.handleChange(e)}
                          />
                        )}
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <label htmlFor="exampleInputEmail1">Location</label>
                        {this.state.isEditTrue == true ||
                        this.state.isNew == true ? (
                          <input
                            type="text"
                            name="location"
                            value={this.state.location}
                            className="form-control border-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter location"
                            onChange={(e) => this.handleChange(e)}
                          />
                        ) : (
                          <input
                            type="text"
                            name="location"
                            value={this.state.location}
                            className="form-control border-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            readOnly
                            placeholder="Enter location"
                            onChange={(e) => this.handleChange(e)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row" style={{ margin: "-17px" }}>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <fieldset className="form-group">
                          <label for="basicInput">Date</label>
                          {this.state.isEditTrue == true ||
                          this.state.isNew == true ? (
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              // locale="vi"
                              selected={
                                this.state.date
                                  ? Date.parse(this.state.date)
                                  : ""
                              }
                              required
                              className="form-control border-primary"
                              onChange={(e) =>
                                this.handleChangeForDate(e, "date")
                              }
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                          ) : (
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              // locale="vi"
                              selected={
                                this.state.date
                                  ? Date.parse(this.state.date)
                                  : ""
                              }
                              required
                              readOnly
                              className="form-control border-primary"
                              onChange={(e) =>
                                this.handleChangeForDate(e, "date")
                              }
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                          )}
                        </fieldset>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-3">
                        <fieldset className="form-group">
                          <label for="helpInputTop">Start</label>
                          {this.state.isEditTrue == true ||
                          this.state.isNew == true ? (
                            <DatePicker
                              // locale="vi"
                              selected={
                                this.state.timeStart
                                  ? Date.parse(this.state.timeStart)
                                  : ""
                              }
                              required
                              className="form-control border-primary"
                              onChange={(e) =>
                                this.handleChangeForDate(e, "timeStart")
                              }
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          ) : (
                            <DatePicker
                              // locale="vi"
                              selected={
                                this.state.timeStart
                                  ? Date.parse(this.state.timeStart)
                                  : ""
                              }
                              required
                              className="form-control border-primary"
                              onChange={(e) =>
                                this.handleChangeForDate(e, "timeStart")
                              }
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              readOnly
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          )}
                        </fieldset>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-3">
                        <fieldset className="form-group">
                          <label for="disabledInput">End</label>
                          {this.state.isEditTrue == true ||
                          this.state.isNew == true ? (
                            <DatePicker
                              // locale="vi"
                              selected={
                                this.state.timeEnd
                                  ? Date.parse(this.state.timeEnd)
                                  : ""
                              }
                              required
                              className="form-control border-primary"
                              onChange={(e) =>
                                this.handleChangeForDate(e, "timeEnd")
                              }
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          ) : (
                            <DatePicker
                              // locale="vi"
                              selected={
                                this.state.timeEnd
                                  ? Date.parse(this.state.timeEnd)
                                  : ""
                              }
                              readOnly
                              required
                              className="form-control border-primary"
                              onChange={(e) =>
                                this.handleChangeForDate(e, "timeEnd")
                              }
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          )}
                        </fieldset>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row" style={{ marginTop: "-35px" }}>
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <label htmlFor="exampleInputEmail1">Note</label>
                        {this.state.isEditTrue == true ||
                        this.state.isNew == true ? (
                          <textarea
                            type="text"
                            name="note"
                            value={this.state.note}
                            className="form-control border-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter note"
                            onChange={(e) => this.handleChange(e)}
                          />
                        ) : (
                          <textarea
                            type="text"
                            name="note"
                            readOnly
                            value={this.state.note}
                            className="form-control border-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter note"
                            onChange={(e) => this.handleChange(e)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row" style={{ marginTop: "-10px" }}>
                      <div className="col-xl-8 col-lg-8 col-md-8">
                        {this.state.isEditTrue == true ||
                        this.state.isNew == true ? (
                          <>
                            <label htmlFor="exampleInputEmail1">
                              Upload Images
                            </label>
                            <input
                              name="image"
                              type="file"
                              className="border-primary col-md-6"
                              id="inputGroupFile01"
                              aria-describedby="inputGroupFileAddon01"
                              onChange={(e) => this._onChange(e)}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4">
                        {this.state.saving ? (
                          <button
                            type="button"
                            className="mb-2 mr-2 btn btn-raised btn-primary float-right"
                          >
                            <div
                              className="spinner-grow spinner-grow-sm "
                              role="status"
                            ></div>{" "}
                            {this.state.isEdit ? `  Updating ` : `  Saving `}
                          </button>
                        ) : (
                          <>
                            {this.state.isUpdate ? (
                              <>
                                <button
                                  type="submit"
                                  onClick={(e) => this.onSubmit(e)}
                                  className="mb-2 mr-2 ml-2 btn btn-raised btn-primary float-right"
                                >
                                  <i className="ft-check" /> Update Event{" "}
                                </button>
                              </>
                            ) : this.state.isNew ? (
                              <>
                                <button
                                  type="submit"
                                  onClick={(e) => this.onSubmit(e)}
                                  className="mb-2 mr-2 ml-2 btn btn-raised btn-primary float-right"
                                >
                                  <i className="ft-check" /> Save Event{" "}
                                </button>
                              </>
                            ) : (
                              ""
                            )}

                            {this.state.isEdit &&
                            this.state.isUpdate == false ? (
                              <button
                                type="button"
                                onClick={(e) => this.isEditTrue(e)}
                                className="mb-2 mx-3 btn btn-raised btn-primary float-right"
                              >
                                <i className="fa fa-edit"> Edit</i>
                              </button>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {this.state.images && this.state.images.length > 0 && (
                    <div className="form-group">
                      {this.state.images &&
                        this.state.images.length > 0 &&
                        this.state.images.map((image) => {
                          return (
                            <div className="hovereffect_event m-2">
                              <img
                                className="img-responsive"
                                src={URL.createObjectURL(image.image)}
                                width="80"
                                height="80"
                                alt=""
                              />
                            </div>
                          );
                        })}
                    </div>
                  )}
                  {this.state.isEdit == true &&
                  this.state.images_Edit.length > 0 ? (
                    <div className="form-group">
                      <div className="row">
                        {this.state.images_Edit &&
                          this.state.images_Edit.length > 0 &&
                          this.state.images_Edit.map((image) => {
                            return (
                              <div className="hovereffect_event m-2">
                                <img
                                  className="img-responsive"
                                  src={image.image ? image.image : ""}
                                  width="80"
                                  height="80"
                                  alt=""
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </Modal>

          <Modal
            visible={this.state.showBmodal}
            width="800"
            height={"450"}
            effect="fadeInUp"
            onClickAway={(e) => this.closeBModal(e)}
          >
            <div>
              <div className="modal-header">
                <h4 className="mt-2">
                  <strong>Birthday Event Details</strong>
                </h4>
                <button
                  type="button"
                  onClick={(e) => this.closeBModal(e)}
                  className="btn btn-sm"
                >
                  X
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <label htmlFor="exampleInputEmail1">Event Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control border-primary"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Event Name"
                        value={this.state.name}
                        required
                        onChange={(e) => this.handleChange(e)}
                        readOnly
                      />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <label htmlFor="exampleInputEmail1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={this.state.location}
                        className="form-control border-primary"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter location"
                        onChange={(e) => this.handleChange(e)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row" style={{ margin: "-8px px" }}>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <fieldset className="form-group">
                        <label for="basicInput">Date</label>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          // locale="vi"
                          selected={
                            this.state.date ? Date.parse(this.state.date) : ""
                          }
                          required
                          className="form-control border-primary"
                          onChange={(e) => this.handleChangeForDate(e, "date")}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          readOnly
                        />
                      </fieldset>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-3">
                      <fieldset className="form-group">
                        <label for="helpInputTop">Start</label>
                        <DatePicker
                          // locale="vi"
                          selected={
                            this.state.timeStart
                              ? Date.parse(this.state.timeStart)
                              : ""
                          }
                          required
                          className="form-control border-primary"
                          onChange={(e) =>
                            this.handleChangeForDate(e, "timeStart")
                          }
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          readOnly
                        />{" "}
                      </fieldset>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-3">
                      <fieldset className="form-group">
                        <label for="disabledInput">End</label>
                        <DatePicker
                          // locale="vi"
                          selected={
                            this.state.timeEnd
                              ? Date.parse(this.state.timeEnd)
                              : ""
                          }
                          required
                          className="form-control border-primary"
                          onChange={(e) =>
                            this.handleChangeForDate(e, "timeEnd")
                          }
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          readOnly
                        />{" "}
                      </fieldset>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row" style={{ marginTop: "-20px" }}>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <label htmlFor="exampleInputEmail1">Note</label>
                      <textarea
                        type="text"
                        name="note"
                        value={this.state.note}
                        className="form-control border-primary"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter note"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group text-right">
                  <button
                    onClick={(e) => this.showError()}
                    className="btn btn-primary text-center float-right"
                  >
                    Update Event
                  </button>
                </div>
                <OCAlertsProvider />
              </div>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

Calender.propTypes = {
  saved: PropTypes.bool,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  saved: state.events.saved,
  events: state.events.events,
  event: state.events.event,
  b_events: state.events.birthdayevents,
});
export default connect(mapStateToProps, {
  getAllEvents,
  getEventbyID,
  updateEvent,
  addEvent,
  getAllBirthdayEvents,
})(Calender);
