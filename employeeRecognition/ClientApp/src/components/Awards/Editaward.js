import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Editaward extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sender_user_id: props.location.state.sender_user_id,
            recipient_user_id: props.location.state.recipient_user_id,
            type: props.location.state.type,
            time: props.location.state.time,
            date: props.location.state.date,
            reRoute: false,
        };

        this.editAward.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async editAward(e) {
        e.preventDefault();

        try {
            let detailInfo = {
                sender_user_id: this.state.sender_user_id,
                recipient_user_id: this.state.recipient_user_id,
                type: this.state.type,
                time: this.state.time,
                date: this.state.date,
            }

            const url = `api/Award/edit?id=${this.props.location.state.award.id}`;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(detailInfo),
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
                    <h1>Edit Award</h1>
                    <br />
                    <form
                        id="editAward"
                        onSubmit={this.editAward.bind(this)}
                    >
                        <div className="form-group">
                            <input
                                id="SID"
                                type="number"
                                className="form-control"
                                value={this.state.sender_user_id}
                                onChange={this.onChange}
                                name="first_name"
                                placeholder="Sender ID"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="RID"
                                type="number"
                                className="form-control"
                                value={this.state.recipient_user_id}
                                onChange={this.onChange}
                                name="last_name"
                                placeholder="Recipient ID"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="TypeSelect">Type:</label>
                            <select className="form-control" name="type" id="TypeSelect" value={this.state.type} onChange={this.onChange}>
                                <option value={0}>Service</option>
                                <option value={1}>Performance</option>
                                <option value={2}>Team Work</option>
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