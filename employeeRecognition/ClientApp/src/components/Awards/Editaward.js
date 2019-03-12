import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Editaward extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            sender_user_id: props.location.state.award.sender_user_id,
            recipient_user_id: props.location.state.award.recipient_user_id,
            type: props.location.state.award.type,
            time: props.location.state.award.time,
            date: props.location.state.award.date,
            reRoute: false,
        };

        this.editAward.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        let response = await fetch('api/awards/index')
        const data = await response.json();
        this.setState({ users: data });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async editAward(e) {
        e.preventDefault();

        try {
            let awardInfo = {
                sender_user_id: this.state.sender_user_id,
                recipient_user_id: this.state.recipient_user_id,
                type: this.state.type,
                time: this.state.time,
                date: this.state.date,
            }

            const url = `api/Awards/edit?id=${this.props.location.state.award.id}`;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(awardInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok)
                this.setState({ reRoute: true });
        }
        catch (err) {
            console.log("err: ", err);
        }
    }

    render() {
        if (this.state.reRoute) {
            return <Redirect to="/awards" />
        }
        else {
            return (
                <div>
                    <h1>Edit Award</h1>
                    <br />
                    <form
                        id="editAward"
                        onSubmit={this.editAward.bind(this)}
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
                        <div className="form-group">
                            <input
                                id="time"
                                type="time"
                                className="form-control"
                                value={this.state.time}
                                onChange={this.onChange}
                                name="time"
                                placeholder="time"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="date"
                                type="date"
                                className="form-control"
                                value={this.state.date}
                                onChange={this.onChange}
                                name="date"
                                placeholder="date"
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Submit Changes
                        </button>
                    </form>
                </div>
            )
        }
    }
}