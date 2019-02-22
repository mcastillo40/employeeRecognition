import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { LandingPage } from './components/LandingPage';
import { Route, Switch } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';


function Splash(){
    return (
        <div className="Splash">
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <ProtectedRoute exact path="/app" component={AppLayout}/>
                <Route path="*" component = {()=> "404 NOT FOUND"}/>
            </Switch>
        </div>
    )
}


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Splash />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();