import React, { useEffect } from "react";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/Login";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";
import AddUser from "./components/pages/users/Adduser";
import View from "./components/pages/users/view";
import ViewUser from "./components/pages/users/Viewuser";
import AddCustomer from "./components/pages/customers/Addcustomer";
import AddProduct from "./components/pages/products/Addproduct";
import Orders from "./components/pages/orders/orders";
import ViewOrder from "./components/pages/orders/viewOrder";
import PerPaidScree from "./components/pages/orders/PerPaidScree";
import OrderNotes from "./components/pages/orders/orderNotes";
import Calender from "./components/pages/calender";
import AddAppointment from "./components/pages/appointments/AddAppointment";
import Appointment from "./components/pages/appointments/Appointment";
import NewAppointment from "./components/pages/appointments/NewAppointment";
import EditAppointment from "./components/pages/appointments/EditAppointment";
import ViewCustomer from "./components/pages/customers/Viewcustomer";
import ViewProduct from "./components/pages/products/Viewproduct";
import Product from "./components/pages/products/Product";
import RentProduct from "./components/pages/rent/rentproduct";
import PickRentDate from "./components/pages/rent/PickRentDate";
import Prepaid5 from "./components/pages/rent/Prepaid5";

import Checkout from "./components/pages/rent/checkout";
import ReturnProduct from "./components/pages/returnproduct/returnproduct";
import ScanBarcode from "./components/pages/returnproduct/scanBarcode";
import RentOrder from "./components/pages/rentOrder";
import ActivateAccount from "./components/pages/ActivateAccount";
import Error from "./components/pages/Error";

import Report from "./components/pages/report/report";

import ReportOrder from "./components/pages/report/reportOrder";
import MatchBarcodes from "./components/pages/returnproduct/matchBarcodes";
import ReturnPrepaid from "./components/pages/returnproduct/ReturnPrepaid";
import ReturnSummary from "./components/pages/returnproduct/ReturnSummary";
// import Calender from "./components/pages/calender";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import Barcode from "./components/pages/Barcode";
import ConfigureSystem from "./components/pages/users/ConfigureSystem";
import ConfigureSystemUser from "./components/pages/users/ConfigureSystemUser";
import EditUser from "./components/pages/users/EditUser";
// import SalaryUpdate from './components/pages/users/SalaryUpdate'
import StoreClosed from "./components/pages/StoreClosed";
import ViewCoupons from "./components/pages/coupons/ViewCoupons";
import CouponDetail from "./components/pages/coupons/CouponDetail";
import AddCoupons from "./components/pages/coupons/AddCoupons";
import IndividualBarcode from "./components/pages/IndividualItem";
import SelectType from "./components/pages/coupons/SelectType";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const Main = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Login" component={Login} />

          {/* Dashboard */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          {/* users */}
          <PrivateRoute exact path="/user/adduser" component={AddUser} />
          <PrivateRoute
            exact
            path="/user/configuresystem"
            component={ConfigureSystem}
          />
          <PrivateRoute
            exact
            path="/user/configuresystemuser"
            component={ConfigureSystemUser}
          />
          <PrivateRoute exact path="/user" component={ViewUser} />
          <PrivateRoute exact path="/user/edituser/:id" component={EditUser} />
          <PrivateRoute exact path="/user/view/:id" component={View} />
          {/* <PrivateRoute exact path='/user/updatesalary/:id' component={SalaryUpdate} /> */}
          <PrivateRoute exact path="/storeclosed" component={StoreClosed} />

          <PrivateRoute
            exact
            path="/ActivateAccount"
            component={ActivateAccount}
          />
          {/* products */}
          <PrivateRoute exact path="/product/add" component={AddProduct} />
          <PrivateRoute exact path="/product" component={ViewProduct} />
          <PrivateRoute
            exact
            path="/product/editproduct/:id"
            component={AddProduct}
          />

          {/* customers */}
          <PrivateRoute
            exact
            path="/customer/addcustomer"
            component={AddCustomer}
          />
          <PrivateRoute exact path="/customer" component={ViewCustomer} />
          <PrivateRoute
            exact
            path="/customer/editcustomer/:id"
            component={AddCustomer}
          />

          <PrivateRoute
            exact
            path="/product/viewproduct/:id"
            component={Product}
          />

          {/* rent product */}
          <PrivateRoute exact path="/rentproduct" component={RentProduct} />
          <PrivateRoute exact path="/pickrentdate" component={PickRentDate} />
          <PrivateRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/rentorder" component={RentOrder} />
          <PrivateRoute exact path="/prepaid" component={Prepaid5} />

          {/* <PrivateRoute exact path='/rentinvoice' component={RentInvoice} /> */}

          {/* return product */}
          <PrivateRoute exact path="/returnproduct" component={ReturnProduct} />
          <PrivateRoute exact path="/scanbarcode" component={ScanBarcode} />
          <PrivateRoute exact path="/matchbarcodes" component={MatchBarcodes} />
          <PrivateRoute exact path="/returnSummary" component={ReturnSummary} />
          <PrivateRoute exact path="/returnPrepaid" component={ReturnPrepaid} />
          {/* orders */}
          <PrivateRoute exact path="/orders" component={Orders} />
          <PrivateRoute
            exact
            path="/orders/vieworder/:id"
            component={ViewOrder}
          />
          <PrivateRoute
            exact
            path="/orders/prepaid/:id"
            component={PerPaidScree}
          />
          <PrivateRoute
            exact
            path="/orders/alternotes/:id"
            component={OrderNotes}
          />

          {/* appointment */}
          <PrivateRoute
            exact
            path="/appointments/add"
            component={AddAppointment}
          />
          <PrivateRoute exact path="/appointments/" component={Appointment} />
          <PrivateRoute
            exact
            path="/appointments/newappointment"
            component={NewAppointment}
          />
          <PrivateRoute
            exact
            path="/appointments/edit/:id"
            component={EditAppointment}
          />

          {/* calender */}
          <PrivateRoute exact path="/calender" component={Calender} />

          {/* report */}
          <PrivateRoute exact path="/reports" component={Report} />
          <PrivateRoute exact path="/report" component={ReportOrder} />

          {/* barcode */}
          <PrivateRoute exact path="/barcode" component={Barcode} />
          <PrivateRoute
            exact
            path="/individualbarcode/:id"
            component={IndividualBarcode}
          />
          {/* ViewCoupons */}

          <PrivateRoute exact path="/coupons" component={ViewCoupons} />
          <PrivateRoute exact path="/coupons/type" component={SelectType} />
          <PrivateRoute exact path="/coupons/add" component={AddCoupons} />
          <PrivateRoute
            exact
            path="/coupons/view/:couponId"
            component={CouponDetail}
          />

          <PrivateRoute exact path="/Error" component={Error} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Main;
