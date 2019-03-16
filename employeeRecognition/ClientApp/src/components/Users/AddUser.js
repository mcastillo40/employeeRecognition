import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AUTH_MODEL } from '../../Shared/Auth/Auth';

var util = require('util');

export class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: "",
            password: '',
            role: 0,
            signature: '',
            imagePreviewUrl: '',
           // reRoute: false,
            loading: false
        };

        this.createUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.signatureOnChange = this.signatureOnChange.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    signatureOnChange(event) {
        event.preventDefault();
        console.log(event.target.files[0]);

        this.setState({ signature: event.target.files[0] })
    }

    async createUser(e) {
        e.preventDefault();

        try {
            this.setState({ loading: true });

            // Upload user information
            let userInfo = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role,
            }

            const { token } = AUTH_MODEL.get();
            let url = 'api/users/create';

            let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            const id = data.id;

            // Upload user's signature
            url = `api/users/uploadsignature?id=${id}`
            let formData = new FormData();

            formData.append('signature', this.state.signature, this.state.signature.name);

            response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: { authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                this.props.history.push({
                    pathname: '/users'
                })
            }
        }
        catch (err) {
            console.log("err: ", err);
        }
    }

    render() {
        if (this.state.loading) {
            return ( <div> <p><em>Creating Employee...</em></p> </div> )
        }
        else {
            return (
                <div>
                    <h1>Add Employee</h1>
                    <br />
                    <form
                        id="addUser"
                        onSubmit={this.createUser.bind(this)}
                    >
                        <div className="form-group">
                            <input
                                id="first_name"
                                type="text"
                                className="form-control"
                                value={this.state.first_name}
                                onChange={this.onChange}
                                name="first_name"
                                placeholder="First Name"
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="last_name"
                                type="text"
                                className="form-control"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                name="last_name"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChange}
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChange}
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roleSelect">Role:</label>
                            <select className="form-control" name="role" id="roleSelect" value={this.state.role} onChange={this.onChange}>
                                <option value={0}>User</option>
                                <option value={1}>Admin</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Upload Signature:</label>
                            <input
                                style={{ display: 'none' }}
                                id="signature"
                                name="signature"
                                type="file"
                                className="form-control"
                                onChange={this.signatureOnChange}
                                ref={fileInput => this.fileInput = fileInput}
                            />
                            <button type="button" className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={() => this.fileInput.click()}>Pick Image</button>
                        </div>
                        <button className="btn btn-primary" type="submit" style={{ marginRight: '10px' }}>
                            Add Employee
                        </button>
                        <Link to="/Users"><button type="button" className="btn btn-danger">Cancel</button></Link>
                    </form>
                </div>
            )
        }
    }
}