import React, { Component } from 'react';
import { AUTH_MODEL } from '../../Shared/Auth/Auth';

export class PasswordReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: ''
        };

        this.editPassword = this.editPassword.bind(this);
        this.cancelPassword = this.cancelPassword.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async editPassword(e) {
        e.preventDefault();

        if (this.state.password === '')
            document.getElementById('password').style.borderColor = "red";
        else {
            this.setState({ edit: !this.state.edit });

            let data = { password: this.state.password };

            try {
                const { token } = AUTH_MODEL.get();
                const url = `api/users/editpassword?id=${this.props.id}`;

                const response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    this.setState({ password: '' });
                    this.props.showEditPassword();
                    document.getElementById('password').style.borderColor = "#D0D5DB";
                }
            }
            catch (err) {
                console.log("ERROR: ", err);
            }
        }
    }

    cancelPassword() {
        document.getElementById('password').style.borderColor = "#D0D5DB";
        this.props.showEditPassword();
    }

    render() {
        return (
            <div>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password"
                    placeholder=""
                    style={{ marginBottom: '10px' }}
                />
                <button type="submit" className="btn btn-info" onClick={this.editPassword.bind(this)} style={{ marginRight: '10px' }}>Change Password</button>
                <button type="button" className="btn btn-danger" onClick={this.cancelPassword}>Cancel</button>
            </div>
        );
    }
}