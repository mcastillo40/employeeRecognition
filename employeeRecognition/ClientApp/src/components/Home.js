import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
        <div>
            <h1>Welcome to the Employee Recognition Portal!</h1>

            <div className="row">
                <div className="col-md-6">
                    <a href="/users" className="btn btn-primary btn-block">View Accounts</a>
                </div>
                <div className="col-md-6">
                    <a href="/Award" className="btn btn-primary btn-block">View Awards</a>
                </div>
            </div>
        </div>
    );
  }
}
