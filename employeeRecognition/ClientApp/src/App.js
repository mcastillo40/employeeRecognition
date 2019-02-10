import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Settings } from './components/Settings';
import { BusinessReporting } from './components/BusinessReporting';
import { Users } from './components/Users';
import { Award } from './components/Award';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/businessreporting' component={BusinessReporting} />
        <Route path='/users' component={Users} />
        <Route path='/award' component={Award} />
        <Route path='/settings' component={Settings} />
      </Layout>
    );
  }
}
