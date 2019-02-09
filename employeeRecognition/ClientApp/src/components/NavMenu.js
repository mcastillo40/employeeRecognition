import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" exact to="/">Employee Recognition</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarContent">
                <div className="navbar-nav ml-auto">
                    <NavLink className="nav-link nav-item" exact to="/">Home
                        
                    </NavLink>
                   
                    <NavLink className="nav-link nav-item" to="/counter">Counter
                        
                    </NavLink>
                   
                    <NavLink className="nav-link nav-item" to="/fetchdata">Users
                        
                    </NavLink>

                    <NavLink className="nav-link nav-item" to="/users">Users
                    </NavLink>
                    <NavLink className="nav-link nav-item" to="/award">Awards
                    </NavLink>
                </div>
            </div>
        </nav>
    );
  }
}
