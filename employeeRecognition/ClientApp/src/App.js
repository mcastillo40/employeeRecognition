import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';    
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Users } from './components/Users';
import { Award } from './components/Award';
import { Register } from './components/Register';
import { Auth } from './components/Auth';
import { ForgetPassword } from './components/ForgetPassword';

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'
import decode from 'jwt-decode';


//Fake an authentication
const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthentiacated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticatd = false
        setTimeout(cb, 100)
    }
}


//Now Let's build components that will be rendered when we get to different routes in our app
// 1. Public.
const Public = () => <h3>Public </h3> 

// 2. Protected. Only shows if user is authenticated, else redirect to login.
const Protected = () => <h3>Protected </h3>

class ULogin extends React.Component {
    state = {
        redirectToReferrer: false
    }
    ulogin = () => {
        // Going to pass this a callback function
        fakeAuth.authenticate(() => {
            this.setState(()=>({redirectToReferrer: true
            }))
        })
    }
    render() {
        const { redirectToReferrer } = this.state
        const {from} = this.props.location.state || {from: {pathname: '/'}}

        if  (redirectToReferrer === true){
            return (
                <Redirect to={from}/>
            )
        }


        return (
            <div>
            <p>HEY U LOGIN {from.pathname}</p>
            <button onClick={this.ulogin}>U LOGIN NOW</button>
            </div>
        )
    }
}



const Session = ({login}) => (
  <div>
    <button onClick={login}>Click me</button>
  </div>
)



const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props)=>(
        //if fakeauth is authenticated (if true), then we render the component
        // as normal, passing in all the props  that we're going to get from render
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location}

            }}

              />   // if NOT authenticated, then want to redirect to login page
    )}/>
)

 class App extends Component {
     state = {login: false}
  login = () => {this.setState( {login: true} ) }

  render() {
    return (
      <Router>  
        <div>
            <Layout>
                <PrivateRoute path='/protected' component={Protected} />                    
                <Route path="/public" component={Public}/>
                <Route path="/ulogin" component={ULogin}/>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} />
                <Route path='/users' component={Users} />
                <Route path='/Award' component={Award} />
                <Route path='/login' component={Login} />
                <Route path="/session" component={() => <Session login={this.login}/> } />
                <Route path='/signup' component={SignUp} />


        <Switch>
            <Route path='/forgetpassword' component={ForgetPassword} />
             <Route path='/register' component={Register} />
            <Route  path='/auth' component={Auth} />
         </Switch>

              </Layout>


        </div>

    </Router>
    );
  }
}

export default App;
