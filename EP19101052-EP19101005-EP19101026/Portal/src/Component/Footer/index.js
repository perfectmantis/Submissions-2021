import React, { Component } from 'react';
import './index.css'

class Footer extends Component {
    render() {
        const footerlog = {
            width: "150px",
        }
        return (
            <div class="footer">
                <div class="div7">
                    <div className="col-lg-4 logodiv">
                        <img alt={''} style={footerlog} src={require("../../assets/img/logoWhite.png")} width="250px" />
                        <p className="footerText text-align-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                    </div>
                    <div class="sitemap-1 col-lg-4">
                        <p class="footerHeading text-white">Social Links</p>
                        <div className="row">
                            <img alt={''} width="60px" src={require("../../assets/image/fb-footer.png")} />
                            <img alt={''} width="60px" src={require("../../assets/image/twiter-footer.png")} />
                            <img alt={''} width="60px" src={require("../../assets/image/g-footer.png")} />
                            <img alt={''} width="60px" src={require("../../assets/image/in-footer.png")} />
                        </div>
                    </div>
                    <div class="sitemap-1 col-lg-4">
                        <p class="footerHeading text-white">Download</p>
                        <div className="row">
                            <img alt={''} width="120px" style={{ marginRight: 10 }} src={require("../../assets/image/gp-footer.png")} />
                            <img alt={''} width="120px" src={require("../../assets/image/app-footer.png")} />
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}

export default Footer;