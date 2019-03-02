import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
            reRoute: false,
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

        this.setState({
            signature: event.target.files[0]
        })
    }

    async createUser(e) {
        e.preventDefault();

        try {
            // Upload user information
            let userInfo = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role,
            }

            let url = 'api/users/create';
            let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("RESPONSE: ", response);

            //url = 'api/users/uploadsignature'
            //// Upload user's signature
            //let formData = new FormData();

            //formData.append('signature', this.state.signature, this.state.signature.name);

            //response = await fetch(url, {
            //    method: 'POST',
            //    body: formData,
            //});

            if (response.ok)
                this.setState({ reRoute: true });
        }
        catch (err) {
            console.log("err: ", err);
        }
    }

    render() {
        if (this.state.reRoute) {
            return <Redirect to="/users" />
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
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="email"
                                type="text"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChange}
                                name="email"
                                placeholder="Email"
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
                            <label htmlFor="roleSelect">Upload Signature:</label>
                            <input
                                style={{ display: 'none'}}
                                id="signature"
                                name="signature"
                                type="file"
                                className="form-control"
                                onChange={this.signatureOnChange}
                                ref={fileInput => this.fileInput = fileInput}
                            />
                            <button type="button" className="btn btn-secondary" onClick={() => this.fileInput.click()}>Pick Image</button>
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Add Employee
                        </button>
                    </form>
                </div>
            )
        }
    }
}