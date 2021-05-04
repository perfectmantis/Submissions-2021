import React, { Component } from "react";
// import { getReport} from "../../../actions/order";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../../layout/Loader";
import moment from 'moment';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
class ReportOrder extends Component {

    async componentDidMount() {
        // await this.props.getOrders();
    };

    handleChange = (e, id = "") => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // handlePdf = () => {
    //     const input = document.getElementById('page');

    //     html2canvas(input)
    //         .then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF('p', 'px', 'a4');
    //             var width = pdf.internal.pageSize.getWidth();
    //             var height = pdf.internal.pageSize.getHeight();

    //             pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    //             pdf.save("download.pdf");
    //         });
    // };
    getTAble = () => {
        const { data } = this.props.location;

        let tbl_sno = 1;
        if (data) {
          const {report} = data ;
          if(data.reportType==="order") {
          if (data.report === 0) {
                return (
                    <tr>
                        <td colSpan={6} className="text-center">
                            No Order Found
            </td>
                    </tr>
                );
            }
            return report.map((record, i) => (
              <tr key={i}>
                  <td className="text-center text-muted">{tbl_sno++}</td>
                  <td className="text-center">{""}</td>
                  <td className="">{record.orderNumber}</td>

                  <td className="text-center">{record.customer.name}</td>
                  <td className="text-center">{record.product.name}</td>
                  {/* <td className="text-center">{record.status}</td> */}

                  <td className="text-center">{record.user.username}</td>
                  <td className="text-center">{moment(record.deliveryDate).format("DD-MM-YYYY")}</td>

                  

              </tr>

          )
          );
          }
          else if(data.reportType==="appointment"){
            if (data.report === 0) {
              return (
                  <tr>
                      <td colSpan={6} className="text-center">
                          No Appointment Found
          </td>
                  </tr>
              );
          }
          return report.map((record, i) => (
            <tr key={i}>
                <td className="text-center text-muted">{tbl_sno++}</td>
                <td className="text-center">{""}</td>
                <td className="">{record.appointmentNumber}</td>

                <td className="text-center">{record.customer.name}</td>
                {/* <td className="text-center">{record.status}</td> */}

                <td className="text-center">{record.user.username}</td>
                <td className="text-center">{moment(record.start).format("DD-MM-YYYY")}</td>

                

            </tr>

        )
        );
        }
          }
        };
    


    render() {
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const { data } = this.props.location;
        const { user } = this.props.auth;

        return (
            <React.Fragment>
              <Loader />
                <div className="wrapper menu-collapsed">
                <section className="invoice-template">
  <div className="card"  >
    <div className="card-content p-3">
      <div id="invoice-template" className="card-body" id="page">
        <div id="invoice-company-details" className="row">
          <div className="col-md-6 col-sm-12 text-center text-md-left">
            <div className="media" >
              <img src="assets/img/logos/logo.jpg" alt="company logo" width="180" height="130" />
              <div className="media-body">
                {/* <ul className="ml-2 px-0 list-unstyled">
                  <li className="text-bold-800">Pixinvent Creative Studio</li>
                  <li>4025 Oak Avenue,</li>
                  <li>Melbourne,</li>
                  <li>Florida 32940,</li>
                  <li>USA</li>
                </ul> */}
              </div>
            </div>

          </div>
          <div className="col-md-6 col-sm-12 text-center text-md-right">
             <p><span className="text-muted">Starting Date :</span> {data ? moment(data.startDate).format("DD-MM-YYYY"): ""}</p> 
            {/* <p><span className="text-muted">Terms :</span> Due on Receipt</p> */}
             <p><span className="text-muted">Ending Date :</span>{data ? moment(data.endDate).format("DD-MM-YYYY") :""}</p>
            <p><span className="text-muted">User :</span> {user ? user.username:""}</p>

          </div>
        </div>
        
        {/* <div id="invoice-customer-details" className="row pt-2">
          <div className="col-sm-12 text-left">
            <p className="text-muted">Bill To</p>
          </div>
          <div className="col-md-6 col-sm-12  text-center text-md-left">
            <ul className="px-0 list-unstyled">
              <li className="text-bold-800">Mr. Bret Lezama</li>
              <li>4879 Westfall Avenue,</li>
              <li>Albuquerque,</li>
              <li>New Mexico-87102.</li>
            </ul>
          </div>
          <div className="col-md-6 col-sm-12 text-center text-md-right">
            <p><span className="text-muted">Invoice Date :</span> 06/05/2016</p>
            <p><span className="text-muted">Terms :</span> Due on Receipt</p>
            <p><span className="text-muted">Due Date :</span> 10/05/2016</p>
          </div>
        </div> */}
      
        <div id="invoice-items-details" className="pt-2">
          <div className="row">
            <div className="table-responsive col-sm-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th></th>
                    <th>Appointment Number</th>
                    <th className="text-center">Tracking Number</th>
                    <th className="text-center">Customer</th>
                    <th className="text-center">User Name</th>
                    <th className="text-center">Delivery Date</th>
                     {/* <th className="text-center">Amount</th>  */}
                  </tr>
                </thead>
                <tbody>
                {this.getTAble()}
                       </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12 text-left">
              <p className="lead">Payment Methods:</p>
              {/* <div className="row">
                <div className="col-12">
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td>Bank name:</td>
                        <td className="text-right">ABC Bank, USA</td>
                      </tr>
                      <tr>
                        <td>Acc name:</td>
                        <td className="text-right">Amanda Orton</td>
                      </tr>
                      <tr>
                        <td>IBAN:</td>
                        <td className="text-right">FGS165461646546AA</td>
                      </tr>
                      <tr>
                        <td>SWIFT code:</td>
                        <td className="text-right">BTNPP34</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
            </div>
            <div className="col-md-6 col-sm-12">
              <p className="lead">Total</p>
              {/* <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Sub Total</td>
                      <td className="text-right">$ 14,900.00</td>
                    </tr>
                    <tr>
                      <td>TAX (12%)</td>
                      <td className="text-right">$ 1,788.00</td>
                    </tr>
                    <tr>
                      <td className="text-bold-800">Total</td>
                      <td className="text-bold-800 text-right"> $ 16,688.00</td>
                    </tr>
                    <tr>
                      <td>Payment Made</td>
                      <td className="pink text-right">(-) $ 4,688.00</td>
                    </tr>
                    <tr className="bg-grey bg-lighten-4">
                      <td className="text-bold-800">Balance Due</td>
                      <td className="text-bold-800 text-right">$ 12,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
              <div className="text-center">
                <p>Authorized person</p>
                {/* <img src="assets/img/pages/signature-scan.png" alt="signature" className="width-250" />
                <h6>Amanda Orton</h6>
                <p className="text-muted">Managing Director</p> */}
              </div>
            </div>
          </div>
        </div>
        <div id="invoice-footer">
          <div className="row">
            <div className="col-md-9 col-sm-12">
              <h6>Terms &amp; Condition</h6>
              <p>You know, being a test pilot isn't always the healthiest business in the world. We predict too
                much for the next year and yet far too little for the next 10.</p>
            </div>
            {/* <div class="col-md-3 col-sm-12 text-center">
              <button type="button"                             onClick={() => this.handlePdf()}
 class="btn btn-primary btn-raised my-1"><i class="fa fa-paper-plane-o"></i> Download
                PDF</button>
            </div> */}
         
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




                </div>

            </React.Fragment>

        );
    }
}


ReportOrder.propTypes = {
    auth: PropTypes.object,
    // getAllOrders: PropTypes.func.isRequired,

    // orders: PropTypes.array,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    // orders: state.order
});
export default connect(mapStateToProps, {
    // getAllOrders
})(ReportOrder);

