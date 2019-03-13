import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { PasswordReset } from '../Update/PasswordReset';
import { ImageReset } from '../Update/ImageReset';

export class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.location.state.user.id,
            first_name: props.location.state.user.first_name,
            last_name: props.location.state.user.last_name,
            email: props.location.state.user.email,
            role: props.location.state.user.role,
            reRoute: false,
            showPasswordUpdate: false,
            showImageUpdate: false
        };

        this.editUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showEditPassword = this.showEditPassword.bind(this);
        this.showEditImage = this.showEditImage.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    showEditPassword() {
        this.setState({ showPasswordUpdate: !this.state.showPasswordUpdate });
    }

    showEditImage() {
        this.setState({ showImageUpdate: !this.state.showImageUpdate });
    }

    async editUser(e) {
        e.preventDefault();

        let userInfo = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            role: this.state.role,
        }

        try {
            const url = `api/users/AdminEdit?id=${this.props.location.state.user.id}`;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok)
                this.setState({ reRoute: true });
        }
        catch (e) {
            console.log("ERROR: ", e);
        }

    }

    render() {
        if (this.state.reRoute) {
            return <Redirect to="/users" />
        }
        else {
            return (
                <div>
                    <h1>Edit Employee</h1>
                    <br />
                    <form
                        id="editUser"
                        onSubmit={this.editUser.bind(this)}
                    >
                        <div className="form-group">
                            <label>First Name:</label>
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
                            <label>Last Name:</label>
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
                            <label>Email:</label>
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
                            <div className="form-group">
                                <label>Password:</label>
                                <br />
                                <span style={{ display: this.state.showPasswordUpdate ? 'none' : 'block' }}>
                                    <button type="button" className="btn btn-secondary" onClick={this.showEditPassword}>Change Password</button>
                                </span>
                                <span style={{ display: this.state.showPasswordUpdate ? 'block' : 'none' }}>
                                    <PasswordReset id={this.state.id} showEditPassword={this.showEditPassword}/>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label>Image:</label>
                                <br />
                                <span style={{ display: this.state.showImageUpdate ? 'none' : 'block' }}>
                                    <button type="button" className="btn btn-secondary" onClick={this.showEditImage}>Change Image</button>
                                </span>
                                <span style={{ display: this.state.showImageUpdate ? 'block' : 'none' }}>
                                    <ImageReset id={this.state.id} showEditImage={this.showEditImage} />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="roleSelect">Role:</label>
                            <select className="form-control" name="role" id="roleSelect" value={this.state.role} onChange={this.onChange}>
                                <option value={0}>User</option>
                                <option value={1}>Admin</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit" style={{ marginRight: '10px' }}>
                            Submit Changes
                        </button>
                        <Link to="/Users"><button type="button" className="btn btn-danger">Cancel</button></Link>
                    </form>
                </div>
            )
        }
    }
}