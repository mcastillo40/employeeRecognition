import React, { Component } from 'react';

export class EmailReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            first_name: props.first_name,
            last_name: props.last_name,
            email: props.email
        };

        this.editEmail = this.editEmail.bind(this);
        this.cancelEmail = this.cancelEmail.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        this.setState({
            id: this.props.id,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            email: this.props.email
        });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async editEmail(e) {
        e.preventDefault();

        let userInfo = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
        }

        try {
            const url = `api/users/UserEdit?id=${this.state.id}`;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                this.props.updateUser({ email: userInfo.email });
            }
        }
        catch (err) {
            console.log("ERROR: ", err);
        }

        this.props.showEditEmail();
    }

    cancelEmail() {
        this.props.showEditEmail();
    }

    render() {
        return (
            <div>
                <form id="editEmail" onSubmit={this.editEmail.bind(this)}>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChange}
                        name="email"
                        placeholder={this.props.email}
                        style={{ marginBottom: '10px' }}
                        required
                    />
                    <button type="submit" className="btn btn-info" style={{ marginRight: '10px' }}>Change Email</button>
                    <button type="button" className="btn btn-danger" onClick={this.cancelEmail}>Cancel</button>
                </form>
            </div>
        );
    }
}