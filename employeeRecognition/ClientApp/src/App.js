import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Settings } from './components/Settings/Settings';
import { BusinessReporting } from './components/BusinessReporting';
import { Users } from './components/Users/Users';
import { Awards } from './components/Awards/Awards';
import { Addaward } from './components/Awards/Addaward';
import { Editaward } from './components/Awards/Editaward';
import { showAward } from './components/Awards/showAward';
import { AddUser } from './components/Users/AddUser';
import { EditUser } from './components/Users/EditUser';

import { ForgetPassword } from './components/ForgetPassword';


//import AuthenticatedComponent from './components/Auth/AuthenticatedComponent';
import { PrivateRoute } from './Shared/Auth/PrivateRoute';

export default class App extends Component {
    displayName = App.name

    render() {
        return (

            <Layout>
                <Switch>
                    <Route path='/login' component={Login} />
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute path='/signup' roles={['Admin']} component={SignUp} />
                    <PrivateRoute path='/ForgetPassword' component={ForgetPassword} />
                    <PrivateRoute path='/businessreporting' roles={['Admin']} component={BusinessReporting} />
                    <PrivateRoute path='/users' roles={['Admin']} component={Users} />
                    <PrivateRoute path='/awards' roles={['User']} component={Awards} />
                    <PrivateRoute path='/settings' component={Settings} />
                    <PrivateRoute path='/addUser' roles={['Admin']} component={AddUser} />
                    <PrivateRoute path='/editUser' roles={['Admin']} component={EditUser} />
                    <PrivateRoute path='/Addaward' roles={['User']} component={Addaward} />
                    <PrivateRoute path='/Editaward' roles={['User']} component={Editaward} />
                </Switch>

            </Layout>
        );
    }
}
