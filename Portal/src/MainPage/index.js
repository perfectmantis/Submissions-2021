import React, { Component } from 'react';
import {
    FirstSection,
    SecondSection,
    ThirdSection,
    FourthSection,
    SixthSection,
    Footer
} from '../Component'
import "./Header.css"
import '../assets/css/animate.css';
import Scroll from 'react-scroll';
import WOW from 'wowjs';

var Link = Scroll.Link;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scrollSpy = Scroll.scrollSpy;

class Home extends Component {
    constructor(props) {
        super(props);
        this.statsRef = React.createRef()
        this.state = {
            class: 'transparent',
            textcolor: 'white',
            show: false,

        }
    }

    listenScrollEvent = e => {
        if (window.scrollY > 400) {
            this.setState({ class: 'bg-custom', textcolor: 'black' })
        } else if (window.screenY < 400) {
            this.setState({ class: 'transparent' })
        } else {
            this.setState({ class: 'bg-custom', textcolor: 'black' })
        }
    }
    showDrawer = () => {
        this.setState({ show: !this.state.show })
    }

    snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { uid: e[0] }))


    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

        new WOW.WOW().init();
        scrollSpy.update();

    }
    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }


    render() {
        const show = this.state.show ? "show" : '';
        const toggle = this.state.show ? "toggled" : '';
        const headerbg = { backgroundColor: 'white' }
        return (
            <div className="fadeInLoad index-page">
                <div className="Header">
                    <nav style={headerbg} class={`navbar  navbar-expand-lg  ${this.state.class}  fixed-top`} color-on-scroll={500}>
                        <div className="container">
                            <div className="navbar-translate">
                                <img alt={''} style={{ width: 80 }} src={require("../assets/img/logoWhite.png")} width="250px" />
                                <button
                                    className={`navbar-toggler ${toggle}`}
                                    type="button"
                                    onClick={() => this.showDrawer()}
                                    data-toggle="collapse"
                                    data-target="#navigation"
                                    aria-controls="navigation-index"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-bar top-bar" />
                                    <span className="navbar-toggler-bar middle-bar" />
                                    <span className="navbar-toggler-bar bottom-bar" />
                                </button>
                            </div>
                            <div
                                className={`collapse navbar-collapse ${show} has-image`}
                                data-color="orange">
                                <ul className="mr-5 navbar-nav ml-auto">
                                    <li className="nav-item dropdown">
                                        <div onClick={() => this.showDrawer()} style={{ marginLeft: 20 }}>
                                            <span style={{ backgroundColor: '#fff' }} className="navbar-toggler-bar top-bar" />
                                            <span style={{ backgroundColor: '#fff' }} className="navbar-toggler-bar middle-bar" />
                                            <span style={{ backgroundColor: '#fff' }} className="navbar-toggler-bar bottom-bar" />
                                        </div>
                                    </li>
                                    <li className="nav-item active">
                                        <Link to={"FirstSection"} spy={true} smooth={true} offset={50} duration={1500} className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"SecondSection"} spy={true} smooth={true} offset={50} duration={1500} className="nav-link" href="#">Services</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"ThirdSection"} spy={true} smooth={true} offset={50} duration={1500} className="nav-link" href="#">Reports</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"FourthSection"} spy={true} smooth={true} offset={50} duration={1500} className="nav-link" href="#">About us</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to={"SixthSection"} spy={true} smooth={true} offset={50} duration={1500} className="nav-link" href="#">Teams</Link>
                                    </li>
                                    <p className="loginBtn">LOGIN</p>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <Element name="FirstSection" class="wrapper">
                    <FirstSection />
                </Element>
                <Element name="SecondSection" class="wrapper">
                    <SecondSection />
                </Element>
                <Element name="ThirdSection" class="wrapper">
                    <ThirdSection />
                </Element>
                <Element name="FourthSection" class="wrapper">
                    <FourthSection />
                </Element>
                <Element name="SixthSection" class="wrapper">
                    <SixthSection />
                </Element>
                <Footer />

            </div>
        );
    }
}

export default Home;