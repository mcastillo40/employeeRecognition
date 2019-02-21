
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Settings } from './components/Settings';
import { BusinessReporting } from './components/BusinessReporting';
import { Users } from './components/Users/Users';
import { Award } from './components/Award';
import { AddUser } from './components/Users/AddUser';
import { EditUser } from './components/Users/EditUser';

import AuthenticatedComponent from './components/Auth/AuthenticatedComponent';

import { ForgetPassword } from './components/ForgetPassword';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <Layout>
            <Switch>
                <Route path='/login' component={Login} />
                <AuthenticatedComponent>
                    <Route exact path='/' component={Home} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/ForgetPassword' component={ForgetPassword} />
                    <Route path='/businessreporting' component={BusinessReporting} />
                    <Route path='/users' component={Users} />
                    <Route path='/award' component={Award} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/addUser' component={AddUser} />
                    <Route path='/editUser' component={EditUser} />
                </AuthenticatedComponent>
            </Switch>
      </Layout>
    );
  }
}
