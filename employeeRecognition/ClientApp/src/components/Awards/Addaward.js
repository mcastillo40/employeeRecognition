import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Addaward extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sender_user_id: 1,
            recipient_user_id: 2,
            type: '',
            time: '',
            date: '',
            reRoute: false,
        };

        this.createAward.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async createAward(e) {
        e.preventDefault();

        try {
            let awardInfo = {
                sender_user_id: this.state.sender_user_id,
                recipient_user_id: this.state.recipient_user_id,
                type: this.state.type,
                time: this.state.time,
                date: this.state.date,
            }

            const url = 'api/awards/create';
            const response = await fetch(url, {
                method: 'POST',
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
            return <Redirect to="/award" />
        }
        else {
            return (
                <div>
                    <h1>Add Award</h1>
                    <br />
                    <form
                        id="Addaward"
                        onSubmit={this.createAward.bind(this)}
                    >
                        <div className="form-group">
                            <input
                                id="SID"
                                type="number"
                                className="form-control"
                                value={this.state.sender_user_id}
                                onChange={this.onChange}
                                name="SID"
                                placeholder="Sender ID"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="RID"
                                type="number"
                                className="form-control"
                                value={this.state.recipient_user_id}
                                onChange={this.onChange}
                                name="RID"
                                placeholder="Recipient ID"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="TypeSelect">Type:</label>
                            <select className="form-control" name="Type" id="TypeSelect" value={this.state.type} onChange={this.onChange}>
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
                            Add Award
                        </button>
                    </form>
                </div>
            )
        }
    }
}