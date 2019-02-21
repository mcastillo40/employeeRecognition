
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Settings } from './components/Settings';
import { BusinessReporting } from './components/BusinessReporting';
import { Users } from './components/Users/Users';
import { Awards } from './components/Awards/Awards';
import { Addaward } from './components/Awards/Addaward';
import { Editaward } from './components/Awards/Editaward';
import { AddUser } from './components/Users/AddUser';
import { EditUser } from './components/Users/EditUser';

import { ForgetPassword } from './components/ForgetPassword';


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/ForgetPassword' component={ForgetPassword} />
        <Route path='/businessreporting' component={BusinessReporting} />
        <Route path='/users' component={Users} />
        <Route path='/award' component={Awards} />
        <Route path='/settings' component={Settings} />
        <Route path='/addUser' component={AddUser} />
        <Route path='/editUser' component={EditUser} />
        <Route path='/Addaward' component={Addaward} />
        <Route path='/Editaward' component={Editaward} />
      </Layout>
    );
  }
}
