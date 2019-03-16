import React, { Component } from 'react';
//import { Chart } from 'react-google-charts'
import { Redirect } from 'react-router-dom';
import { AUTH_MODEL } from '../Shared/Auth/Auth';

export class BusinessReporting extends Component {
    displayName = BusinessReporting.name

    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            users: [],
            awards: [],
            sender_user_id: '',
            recipient_user_id: '',
            type: "",
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
            let id = '';
            let filter = '';
            let form = e.target.id;
            if (form === "filtersender") {
                id = this.state.sender_user_id;
                filter = "sender";
            }
            else if (form === "filterrecipient") {
                id = this.state.recipient_user_id;
                filter = "recipient";
            }
            else if (form === "filtertype")
                filter = "type";

            const { token } = AUTH_MODEL.get();
            const url = `api/awards/business?id=${parseInt(id, 10)}&type=${this.state.type}&filter=${filter}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
 
            const data = await response.json();
            this.setState({awards: data})
        }
        catch (err) {
            console.log("err: ", err);
        }
    }

    async componentDidMount() {
        try {
            const { token } = AUTH_MODEL.get();
            const response = await fetch('api/users/index', { headers: { authorization: `Bearer ${token}` } });
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
        if (this.state.reroute) {
            return <redirect to="/businessreporting" />
        }
        else {
            return (
                <div>
                    <h1>Set Filters</h1>
                    <br />
                    <form
                        id="filtersender"
                        onSubmit={this.showAward}
                    >
                        <div classname="form-group">
                            <label htmlfor="typeselect">Select sender id from name:</label>
                            <select classname="form-control" name="sender_user_id" id="sender_user_id" value={this.state.sender_user_id} onChange={this.onChange}>
                                {this.state.users.map(user => (
                                    <option value={user.id}>
                                        {user.first_name} {user.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button classname="btn btn-primary" type="submit">display</button>
                        </form>
                    <form
                        id="filterrecipient"
                        onSubmit={this.showAward}
                    >
                        <div classname="form-group">
                            <label htmlfor="typeselect">Select recipient id from name:</label>
                            <select classname="form-control" name="recipient_user_id" id="recipient_user_id" value={this.state.recipient_user_id} onChange={this.onChange}>
                                {this.state.users.map(user => (
                                    <option value={user.id}>
                                        {user.first_name} {user.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button classname="btn btn-primary" type="submit">display</button>
                    </form>
                    <form
                        id="filtertype"
                        onSubmit={this.showAward}
                    >
                        <div classname="form-group">
                            <label htmlfor="typeselect">type:</label>
                            <select classname="form-control" name="type" id="typeselect" value={this.state.type} onChange={this.onChange}>
                                <option value="Service">Service</option>
                                <option value="Performance">Performance</option>
                                <option value="Team Work">Team Work</option>
                            </select>
                        </div>
                        <button classname="btn btn-primary" type="submit">display</button>
                    </form>             
                </div>
            )

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
}
