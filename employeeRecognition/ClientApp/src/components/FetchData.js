import React, { Component } from 'react';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
    }

    async componentDidMount() {
        const response = await fetch('api/SampleData/WeatherForecasts');
        const data = await response.json();

        console.log("DATA: ", data)

        this.setState({ forecasts: data, loading: false });
    }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Created on</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.dateFormatted}>
                <td>{forecast.first_name}</td>
                <td>{forecast.last_name}</td>
                <td>{forecast.email}</td>
                <td>{forecast.create_on}</td>
                <td>{forecast.role}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1>List of user infomation</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
