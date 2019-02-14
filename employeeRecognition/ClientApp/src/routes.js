import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import decode from 'jwt-decode';

import Auth from './Auth';
import Login from './Login';
import Register from './Register';

// Returns whether they're authenticated
const checkAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
    // They should have BOTH these tokens if they're logged in.
  if (!token || !refreshToken) {    
    return false;
  }

    // We don't really care about the tokens. As long as refreshToken is valid, we
    // can always get more tokens.
    // So we check if refreshToken is valid: 1) Decode the token. 2) Check if expired.
  try {
    // { exp: 12903819203 }
    const { exp } = decode(refreshToken);
    console.log(exp);
    console.log(new Date().getTime());
    // 
    if (exp < new Date().getTime() / 1000) {
      return false;
    }

  } catch (e) {
    return false;
  }

  return true;
}

//Check if they're authenticated. If so, render component. If not, redirect to somewhere.
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
  )} />
)

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/register" render={props => <Register {...props} />} />
      <AuthRoute exact path="/auth" component={Auth} />
    </Switch>
  </BrowserRouter>
);