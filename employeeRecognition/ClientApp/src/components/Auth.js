import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

export class Auth extends Component {

dislayName = Auth.name
  render() {
    const {authed, component: Component, ...rest} = this.props;

    if( authed ) {
      return <Route {...rest} render={(props) => <Component {...props }/>}/>
    } else {
      return <Route {...rest} render={(props) => <Redirect to={{pathname: '/component/session', state: {from: props.location}}} />}/>
    }
  }
}

