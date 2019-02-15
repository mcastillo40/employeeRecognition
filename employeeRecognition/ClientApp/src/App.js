import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import { Login } from './components/Login';
import { SignUp } from './components/SignUp';

import { Users } from './components/Users';
import { Award } from './components/Award';


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />

        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />

        <Route path='/users' component={Users} />
        <Route path='/Award' component={Award} />
 
      </Layout>

    );
  }
}
