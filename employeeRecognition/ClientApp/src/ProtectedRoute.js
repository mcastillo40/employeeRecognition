import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './components/auth';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route 
            {...rest} 
            render={props => {
                // Check if user is authenticated
                if(auth.isAuthenticated()){
                    return <Component {...props} />;
                }
                else {  //Else, redirect user
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }

                    }/>
                }
                 
            

            }}
        />
    )
}