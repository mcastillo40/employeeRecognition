import React, { Component } from 'react';
import { AUTH_MODEL } from '../../Shared/Auth/Auth';
import { PasswordReset } from '../Update/PasswordReset';
import { EmailReset } from '../Update/EmailReset';
import { NameReset } from '../Update/NameReset';
import { Link } from 'react-router-dom';

export class Settings extends Component {
  displayName = Settings.name

  constructor(props) {
    super(props);
      this.state = {
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        role: null,
        showNameUpdate: false,
        showEmailUpdate: false,
        showPasswordUpdate: false,
        loading: true
      };

      this.showEditName = this.showEditName.bind(this);
      this.showEditEmail = this.showEditEmail.bind(this);
      this.showEditPassword = this.showEditPassword.bind(this);
      this.updateUser = this.updateUser.bind(this);
      this.LogOut.bind(this);
    }

    async componentDidMount() {
        try {
            const { userInfo } = AUTH_MODEL.get();
            const { token } = AUTH_MODEL.get();

            const response = await fetch(`api/users/getUser/?id=${parseInt(userInfo.UserId, 10)}`,
                { headers: { authorization: `Bearer ${token}` } }
            );
            let data = await response.json();

            data.id = userInfo.UserId;
            data.role = userInfo.Role;

            this.setState({ ...data, loading: false });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    updateUser(data) {
        this.setState({ [Object.keys(data)]: data[Object.keys(data)] });
    }

    showEditName() {
        this.setState({ showNameUpdate: !this.state.showNameUpdate });
    }

    showEditEmail() {
        this.setState({ showEmailUpdate: !this.state.showEmailUpdate });
    }

    showEditPassword() {
        this.setState({ showPasswordUpdate: !this.state.showPasswordUpdate });
    }

    LogOut() {
        AUTH_MODEL.remove();
    }

    render() {
        if (this.state.loading) {
            return (<p><em>Loading...</em></p>);
        }
        else {
            return (
                <div>
                    <br />
                    <h1>Your Info</h1>
                    <br />
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-md-6'>
                                <h2>{this.state.last_name}, {this.state.first_name}</h2>
                                <p style={{ fontWeight: '500' }}>{this.state.role}</p>
                                <br />
                                <p style={{ fontWeight: '400' }}>Email:  {this.state.email}</p>
                            </div>
                            <div className='col-md-6'>
                                <p><strong>Manage Account</strong></p>

                                <div>
                                    <span style={{ display: this.state.showNameUpdate ? 'none' : 'block' }}>
                                        <button type="button" className="btn btn-link" onClick={this.showEditName} style={{ paddingLeft: '0px' }}>Update Name</button>
                                    </span>
                                    <span style={{ display: this.state.showNameUpdate ? 'block' : 'none' }}>
                                        <NameReset
                                            id={this.state.id}
                                            first_name={this.state.first_name}
                                            last_name={this.state.last_name}
                                            email={this.state.email}
                                            updateUser={this.updateUser}
                                            showEditName={this.showEditName}
                                        />
                                    </span>
                                </div>

                                <div>
                                    <span style={{ display: this.state.showEmailUpdate ? 'none' : 'block' }}>
                                        <button type="button" className="btn btn-link" onClick={this.showEditEmail} style={{ paddingLeft: '0px' }}>Update Email</button>
                                    </span>
                                    <span style={{ display: this.state.showEmailUpdate ? 'block' : 'none' }}>
                                        <EmailReset
                                            id={this.state.id}
                                            first_name={this.state.first_name}
                                            last_name={this.state.last_name}
                                            email={this.state.email}
                                            updateUser={this.updateUser}
                                            showEditEmail={this.showEditEmail}
                                        />
                                    </span>
                                </div>

                                <div>
                                    <span style={{ display: this.state.showPasswordUpdate ? 'none' : 'block' }}>
                                        <button type="button" className="btn btn-link" onClick={this.showEditPassword} style={{ paddingLeft: '0px' }}>Change Password</button>
                                    </span>
                                    <span style={{ display: this.state.showPasswordUpdate ? 'block' : 'none' }}>
                                        <PasswordReset id={this.state.id} showEditPassword={this.showEditPassword} />
                                    </span>
                                </div>

                                <hr />
                                <Link to="/login" onClick={this.LogOut}><button type="button" className="btn btn-link" style={{ paddingLeft: '0px' }}>Sign Out</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
