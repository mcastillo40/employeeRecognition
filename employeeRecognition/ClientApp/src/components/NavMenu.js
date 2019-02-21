﻿import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AUTH_MODEL } from '../Shared/Auth/Auth';
import './NavMenu.css';

export class NavMenu extends Component {
    displayName = NavMenu.name

    constructor(props) {
        super(props);

        this.NavbarLinks.bind(this);
    }

    NavbarLinks() {
        if (!_.isNil(AUTH_MODEL.get().token)) {
            return (
                <div className="navbar-nav ml-auto">
                    <NavLink className="nav-link nav-item" exact to="/login">Login</NavLink>
                    <NavLink className="nav-link nav-item" exact to="/">Home</NavLink>
                    <NavLink className="nav-link nav-item" to="/businessreporting">Business Reporting</NavLink>
                    <NavLink className="nav-link nav-item" to="/users">Users</NavLink>
                    <NavLink className="nav-link nav-item" to="/award">Awards</NavLink>
                    <NavLink className="nav-link nav-item" to="/settings">Settings</NavLink>
                </div>
            );
        }
        else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" exact to="/">Employee Recognition</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    {this.NavbarLinks()}
                </div>
            </nav>
        );
  }
}
