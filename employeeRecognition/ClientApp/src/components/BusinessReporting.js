import React, { Component } from 'react';
import { Chart } from 'react-google-charts'
import { Redirect } from 'react-router-dom';

export class BusinessReporting extends Component {
    displayName = BusinessReporting.name

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            awards: [],
            reRoute: false,
            loading: true
        };
        this.showAward = this.showAward.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async showAward(e) {
        e.preventDefault();

        try {
            let awardInfo = {
                sender_user_id: this.state.sender_user_id,
                recipient_user_id: this.state.recipient_user_id,
                type: this.state.type,
            }

            const url = 'api/awards/business';
            const response = await fetch(url, {
                method: 'GET',
                body: JSON.stringify(awardInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("data: ", awardInfo);
            if (response.ok)
                this.setState({ reRoute: true });
        }
        catch (err) {
            console.log("err: ", err);
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('api/users/users');
            const data = await response.json();
            this.setState({ users: data, loading: false });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    static renderBusiness(awards) {
    return (
        <div>     
            <br /> <br />
            <div className="form-border">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Sender Name</th>
                            <th>Recipient Name</th>
                            <th>Award Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {awards.map(award => (
                            <tr key={award.id}>
                            <td>{award.sfn} {award.sln}</td>
                            <td>{award.rfn} {award.rln}</td>
                            <td>{award.type}</td>
                            <td>{award.date}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

    render() {
        if (this.state.reRoute) {
            return <Redirect to="/BusinessReporting" />
        }
        else {
            return (
                <div>
                    <h1>Set filters</h1>
                    <br />
                    <form
                        id="Addaward"
                        onSubmit={this.showAward.bind(this)}
                    >
                        <div className="form-group">
                            <label htmlFor="TypeSelect">Select Sender ID from Name:</label>
                            <select className="form-control" name="sender_user_id" id="sender_user_id" value={this.state.sender_user_id} onChange={this.onChange}>
                                {this.state.users.map(user => (
                                    <option value={user.id}>
                                        {user.first_name} {user.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="TypeSelect">Select Recipient ID from Name:</label>
                            <select className="form-control" name="recipient_user_id" id="recipient_user_id" value={this.state.recipient_user_id} onChange={this.onChange}>
                                {this.state.users.map(user => (
                                    <option value={user.id}>
                                        {user.first_name} {user.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="TypeSelect">Type:</label>
                            <select className="form-control" name="type" id="TypeSelect" value={this.state.type} onChange={this.onChange}>
                                <option value="Service">Service</option>
                                <option value="Performance">Performance</option>
                                <option value="Team Work">Team Work</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Display</button>
                    </form>
                </div>
            )
        }
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : BusinessReporting.renderBusiness(this.state.awards);
        return (
            <div>
                <h1>Business Reporting Infomation</h1>
                {contents}
            </div>
        );
    }
}
