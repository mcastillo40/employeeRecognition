// Loads when we specify the app route
import React from 'react';
import auth from './auth';

export const AppLayout = (props) => {
    return (
        <div>
            <h1>App Layout</h1>
            <button onClick={() =>{
                // auth.logout() takes a cb. So when logout successfull, 
                // we call props.history
                auth.logout(() =>{  
                    // history is available on props bc we loaded it via Route in index.js
                    props.history.push('/'); 


                });
            }}>Logout</button>            

        </div>
    
    )
}