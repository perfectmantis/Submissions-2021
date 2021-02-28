import React from 'react';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Router } from 'react-router'
import App from '../../containers/app/app'
import Home from '../../containers/home/home'
import signup from '../../containers/signup/signup'
import signin from '../../containers/login/Login'

import Userhome from '../../containers/userhome/userhome'
import User from '../../containers/user/user'
import AdminDashboard from '../../containers/adminDashboard/adminDashboard'
import Crime from '../../containers/crime/crime'
import Missing from '../../containers/missing/missing'
import Complaint from '../../containers/complaint/complaint'
import AddReports from '../../containers/addReports/addReports'


function checkIsAdmin(nextState, replace) {
    let user = JSON.parse(localStorage.getItem("react-localStorage-user"));
    if (!user) {
        replace({
            pathname: "/",
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

export default function Root({ history, store }) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home} />
                    <Route path='signup' component={signup} />
                    <Route path='login' component={signin} />
                    <Route component={User} onEnter={checkIsAdmin}>
                        <Route path="user" component={Userhome} />
                        <Route path="admin" component={AdminDashboard} />
                        <Route path="crimes" component={Crime} />
                        <Route path="complaints" component={Complaint} />
                        <Route path="missing" component={Missing} />
                        <Route path="fileReports" component={AddReports} />
                    </Route>
                </Route>
            </Router>
        </Provider>
    );
}



