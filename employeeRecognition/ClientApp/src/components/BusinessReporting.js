import React, { Component } from 'react';

export class BusinessReporting extends Component {
  displayName = BusinessReporting.name

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementBusinessReporting = this.incrementBusinessReporting.bind(this);
  }

  incrementBusinessReporting() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Business Reporting</h1>

        <p>This is a simple example of a React component.</p>

        <p>Current count: <strong>{this.state.currentCount}</strong></p>

        <button onClick={this.incrementBusinessReporting}>Increment</button>
      </div>
    );
  }
}
