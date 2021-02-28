import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Loader from "../layout/Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllAppointments } from "../../actions/appointment";
import {
  getAllRentedProducts,
  getDashboardCountOrders,
} from "../../actions/rentproduct";
import { getAllProducts } from "../../actions/product";
import { getUser, updateEvents, getremoveEvents } from "../../actions/user";
import { getAllEvents, getAllBirthdayEvents } from "../../actions/events";
import { changeShopStatus, getShop } from "../../actions/dashboard";
import * as moment from "moment";
import "../../login.css";
import "../../dashbaord.css";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  state = {
    currenWeekEvents: [],
    removedevents: "",
  };
  async componentDidMount() {
    const { auth } = this.props;
    const { user } = auth && auth;
    if (user) {
      this.setState({ id: user._id });
    }
    await this.props.getDashboardCountOrders();
    await this.props.getAllAppointments();
    await this.props.getAllRentedProducts();
    await this.props.getAllProducts();
    await this.props.getShop();
    await this.props.getAllEvents();
    await this.props.getAllBirthdayEvents();

    const { r_events } = this.props;
    this.setState({ removedevents: r_events });
    await this.getEvents();
  }
  async componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props;
    const { user } = auth && auth;
    if (user) {
      await this.props.getremoveEvents(user._id);
    }
    if (prevProps.r_events != this.props.r_events) {
      const { r_events } = this.props;
      // await this.getEvents();

      this.setState({ removedevents: r_events });
    }
  }
  async changeShopStatus(status) {
    await this.props.changeShopStatus(status);
    await this.props.getShop();
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

  getfilteredEvents = (currenWeekEvents) => {
    const { r_events } = this.props;
    const { remove_arr } = r_events && r_events;
    var filteredEvents =
      currenWeekEvents &&
      currenWeekEvents.filter((a) => remove_arr && !remove_arr.includes(a._id));

    return filteredEvents;
  };
  getcurrentdaysEvents = (updatedEvents, currentdate) => {
    var currenDayEvents =
      updatedEvents &&
      updatedEvents.filter((a) => {
        var m_date =
          new Date(a.date).getFullYear() +
          "-" +
          ("0" + (Number(new Date(a.date).getMonth()) + 1)).slice(-2) +
          "-" +
          ("0" + Number(new Date(a.date).getDate())).slice(-2) +
          "T19:00:00.000Z";

        return m_date == currentdate;
      });
    return currenDayEvents;
  };
  getcurrentWeeksEvents = (currentdate, updatedEvents) => {
    var dateAfterSevenDays = moment(moment().add(5, "days")).format();
    var currenWeekEvents =
      updatedEvents &&
      updatedEvents.filter((a) => {
        var m_date =
          new Date(a.date).getFullYear() +
          "-" +
          ("0" + (Number(new Date(a.date).getMonth()) + 1)).slice(-2) +
          "-" +
          ("0" + Number(new Date(a.date).getDate())).slice(-2) +
          "T19:00:00.000Z";

        return m_date > currentdate && a.date <= dateAfterSevenDays;
      });
    return currenWeekEvents;
  };
  getbdayevent = () => {
    const { b_events } = this.props;
    const m_bevents = [];
    b_events &&
      b_events.forEach((event) => {
        const new_Date =
          new Date(event.date).getFullYear() +
          "-" +
          ("0" + (Number(new Date(event.birthdate).getMonth()) + 1)).slice(-2) +
          "-" +
          ("0" + Number(new Date(event.birthdate).getDate())).slice(-2) +
          "T19:00:00.000Z";
        const age = this.calculate_age(event.birthdate);

        // if (
        //   event.user.accountStatus == "active"
        //     ? m_bevents.push({
        //         date: new_Date,
        //         timeStart: event.timeStart,
        //         timeEnd: event.timeEnd,
        //         name:
        //           event.name && `${event.name}'s ${age} Birthday Aniversary`,
        //         note: event.note,
        //         location: event.location,
        //         _id: event._id,
        //       })
        //     : ""
        // );
      });
    return m_bevents;
  };
  getEvents() {
    const { events } = this.props;
    var currentdate =
      new Date().getFullYear() +
      "-" +
      ("0" + (Number(new Date().getMonth()) + 1)).slice(-2) +
      "-" +
      ("0" + Number(new Date().getDate())).slice(-2) +
      "T19:00:00.000Z";
    var m_bevents = this.getbdayevent();
    //updating all events
    let updatedEvents = events && m_bevents && [...m_bevents, ...events];
    const currenWeekEvents = this.getcurrentWeeksEvents(
      currentdate,
      updatedEvents
    );
    const currenDaysEvents = this.getcurrentdaysEvents(
      updatedEvents,
      currentdate
    );
    const filteredEvents = "";

    var events_arr = events &&
      filteredEvents && [...filteredEvents, ...currenDaysEvents];

    this.setState({
      currenWeekEvents: events_arr,
    });
  }

  getPendingOrder = () => {
    // e.preventDefault()
    const { rentedproducts } = this.props;
    if (rentedproducts) {
      let events = rentedproducts.filter(
        (a) => new Date(a.returnDate) - new Date() > 0
      );

      return events.length;
    }
  };
  getOverDueOrder = () => {
    const { rentedproducts } = this.props;
    if (rentedproducts) {
      var currentdate = moment(new Date()).format("MM/DD/YYYY");

      let events = rentedproducts.filter((a) =>
        moment(moment(a.returnDate).format("MM/DD/YYYY")).isBefore(currentdate)
      );

      if (events.length > 0) {
        let returningOrders = events.filter((f) => f.readyForPickUp == true);
        return returningOrders.length;
      } else {
        return 0;
      }
    }
  };

  getTodaysOrder = () => {
    // e.preventDefault()
    const { rentedproducts } = this.props;
    if (rentedproducts) {
      var currentdate = moment(new Date()).format("MM/DD/YYYY");

      let events = rentedproducts.filter((a) =>
        moment(moment(a.createdAt).format("MM/DD/YYYY")).isSame(currentdate)
      );
      return events.length;
    }
  };
  orderPickUpToday = () => {
    const { rentedproducts } = this.props;
    if (rentedproducts) {
      var currentdate = moment(new Date()).format("MM/DD/YYYY");
      let events = rentedproducts.filter((a) =>
        moment(moment(a.rentDate).format("MM/DD/YYYY")).isSame(currentdate)
      );
      let returningOrders = events.filter((f) => f.status !== "Completed");
      return returningOrders.length;
    }
  };
  getReturnOrder = () => {
    // e.preventDefault()
    const { rentedproducts } = this.props;
    if (rentedproducts) {
      var currentdate = moment(new Date()).format("MM/DD/YYYY");
      let events = rentedproducts.filter((a) =>
        moment(moment(a.returnDate).format("MM/DD/YYYY")).isSame(currentdate)
      );
      return events.length;
    }
  };

  hideAlert = async (e, id, eventID) => {
    e.preventDefault();
    await this.props.updateEvents(id, eventID);
  };
  getTodaysAppointment = () => {
    // e.preventDefault()
    const { appointment } = this.props;
    if (appointment) {
      var currentdate =
        moment(new Date()).format("YYYY-MM-DD") + "T19:00:00.000Z";
      let events = appointment.filter((a) => {
        let ap_date =
          moment(new Date(a.date)).format("YYYY-MM-DD") + "T19:00:00.000Z";
        return ap_date == currentdate;
      });

      return events.length;
    }
  };

  render() {
    const { shop } = this.props;
    const { user } = this.props.auth;
    if (user && user.systemRole == "Employee") {
      if (shop) {
        let openShop = shop[0];
        if (openShop && openShop.status == "off") {
          return (
            <Redirect
              push
              to={{
                pathname: "/storeclosed",
                shop: shop[0],
              }}
            />
          );
        }
      }
    }
    const startTime =
      this.props.shop[0] && moment(this.props.shop[0].shopStartTime);
    const {
      today_order,
      return_today,
      pickup_today,
      overdue_today,
    } = this.props.count_orders;
    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>

          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper mx-3">
                <div className="row ml-2">
                  <h2>Hello {user && user.fullname}.</h2>
                </div>
                <div class="row">
                  <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div class="card gradient-passion-fruit">
                      <div class="card-content">
                        <div class="card-body pt-2 pb-0">
                          <div class="media">
                            <div class="media-body white text-left">
                              <h3 class="font-large-1 mb-0">{this.getTodaysAppointment()}</h3>
                              <span>Today's Appointment</span>
                            </div>
                            <div class="media-right white text-right">
                              <i class="icon-bulb font-large-1"></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id="Widget-line-chart"
                          class="height-75 WidgetlineChart WidgetlineChartShadow mb-3"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div class="card gradient-back-to-earth">
                      <div class="card-content">
                        <div class="card-body pt-2 pb-0">
                          <div class="media">
                            <div class="media-body white text-left">
                              <h3 class="font-large-1 mb-0">{this.getReturnOrder()}</h3>
                              <span>RETURN TODAY</span>
                            </div>
                            <div class="media-right white text-right">
                              <i class="icon-pie-chart font-large-1"></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id="Widget-line-chart2"
                          class="height-75 WidgetlineChart WidgetlineChartShadow mb-3"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div class="card gradient-orange">
                      <div class="card-content">
                        <div class="card-body pt-2 pb-0">
                          <div class="media">
                            <div class="media-body white text-left">
                              <h3 class="font-large-1 mb-0">{this.getOverDueOrder()}</h3>
                              <span>OVERDUE ORDER</span>
                            </div>
                            <div class="media-right white text-right">
                              <i class="icon-graph font-large-1"></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id="Widget-line-chart3"
                          class="height-75 WidgetlineChart WidgetlineChartShadow mb-3"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div class="card gradient-summer">
                      <div class="card-content">
                        <div class="card-body pt-2 pb-0">
                          <div class="media">
                            <div class="media-body white text-left">
                              <h3 class="font-large-1 mb-0">{this.orderPickUpToday()}</h3>
                              <span>PICK UP TODAY</span>
                            </div>
                            <div class="media-right white text-right">
                              <i class="icon-wallet font-large-1"></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id="Widget-line-chart4"
                          class="height-75 WidgetlineChart WidgetlineChartShadow mb-3"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div class="card gradient-red-pink">
                      <div class="card-content">
                        <div class="card-body pt-2 pb-0">
                          <div class="media">
                            <div class="media-body white text-left">
                              <h3 class="font-large-1 mb-0">{this.getTodaysOrder()}</h3>
                              <span>Today's Orders</span>
                            </div>
                            <div class="media-right white text-right">
                              <i class="icon-wallet font-large-1"></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id="Widget-line-chart5"
                          class="height-75 WidgetlineChart WidgetlineChartShadow mb-3"
                        ></div>
                      </div>
                    </div>
                  </div> <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div class="card gradient-virgin-america">
                      <div class="card-content">
                        <div class="card-body pt-2 pb-0">
                          <div class="media">
                            <div class="media-body white text-left">
                              <h3 class="font-large-1 mb-0">{this.orderPickUpToday()}</h3>
                              <span>Order Needs Alteration</span>
                            </div>
                            <div class="media-right white text-right">
                              <i class="icon-wallet font-large-1"></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id="Widget-line-chart6"
                          class="height-75 WidgetlineChart WidgetlineChartShadow mb-3"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                {user && user.systemRole === "Admin" ? (
                  <>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-7 txt-sep">
                                <h2>
                                  The Store{" "}
                                  {this.props.shop[0] &&
                                    (this.props.shop[0].status === "on"
                                      ? "Opens door"
                                      : "Close the door")}{" "}
                                  At{" "}
                                </h2>{" "}
                                <span className="badge badge-info p-1 mx-1">
                                  <h1>
                                    {this.props.shop[0] &&
                                      moment(
                                        this.props.shop[0].shopStartTime
                                      ).format("hh:mm a")}
                                  </h1>
                                </span>
                                On
                                <span className="badge badge-pill badge-light mx-1">
                                  <h1>
                                    {" "}
                                    {this.props.shop[0] &&
                                      moment(
                                        this.props.shop[0].shopStartTime
                                      ).format("DD-MMM-YY")}
                                  </h1>
                                </span>{" "}
                              </div>
                              <div className="col-md-3 txt-sep">
                                <h3 className="mt-1">Status</h3>
                                <p className="badge badge-pill badge-light">
                                  {this.props.shop[0] &&
                                    (this.props.shop[0].status === "on"
                                      ? "Open door"
                                      : "Close the door")}
                                </p>
                              </div>
                              <div className="col-md-2">
                                <h3 className="mt-1">Action</h3>
                                {this.props.shop[0] &&
                                  (this.props.shop[0].status === "on" ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        this.changeShopStatus("off")
                                      }
                                      className="btn btn-link"
                                    >
                                      Close the door
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        this.changeShopStatus("on")
                                      }
                                      className="btn btn-link"
                                    >
                                      Open door
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  " "
                )}
              </div>
            </div>

            <footer className="footer footer-static footer-light">
              <p className="clearfix text-muted text-sm-center px-2">
                <span>
                
                  , All rights reserved.{" "}
                </span>
              </p>
            </footer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  getAllAppointments: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getAllEvents: PropTypes.func.isRequired,
  getAllRentedProducts: PropTypes.func.isRequired,
  changeShopStatus: PropTypes.func.isRequired,
  getShop: PropTypes.func.isRequired,
  auth: PropTypes.object,
  products: PropTypes.array,
  orders: PropTypes.array,
  rentedproducts: PropTypes.array,
  shop: PropTypes.object,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  user: state.user.user,
  auth: state.auth,
  products: state.product.products,
  appointment: state.appointment.appointments,
  shop: state.dashboard.shop,
  rentedproducts: state.rentproduct.rentproducts,
  count_orders: state.rentproduct.get_count_order,
  events: state.events.events,
  b_events: state.events.birthdayevents,
  r_events: state.events.removedevents,
});
export default connect(mapStateToProps, {
  getAllAppointments,
  getAllProducts,
  getAllRentedProducts,
  changeShopStatus,
  getShop,
  getAllEvents,
  getUser,
  getAllBirthdayEvents,
  updateEvents,
  getremoveEvents,
  getDashboardCountOrders,
  // changeStatus,
  // getAllDashboardEvents
})(Dashboard);
