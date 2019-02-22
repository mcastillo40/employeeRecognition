import React, { Component } from 'react';
import ReactDOM from "react-dom";
import auth from "./auth";

export const LandingPage = (props) => { //"this" is a f'nal compon, so props needs to be param
  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={
            () =>   {  // Handle the callback
                // Call auth.login with a callback method that gets 
                // triggered if login successful 
                auth.login(() => {
                    // We want to redirect user to the app
                    // Use the history property to push the app route to it
                    // Tells react router to change url to /app, and redirect the user to /app route
                    props.history.push("/app");
                });
            }
        }
      >Login</button>
    </div>
  );
};
