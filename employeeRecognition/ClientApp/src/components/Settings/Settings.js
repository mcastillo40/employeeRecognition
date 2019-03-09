import React, { Component } from 'react';
import { AUTH_MODEL } from '../../Shared/Auth/Auth';

export class Settings extends Component {
  displayName = Settings.name

  constructor(props) {
    super(props);
      this.state = {
          user: {
              first_name: "",
              last_name: "",
              email: ""
          }
      };

      //this.editUser.bind(this);
      //this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        try {
            const { userInfo } = AUTH_MODEL.get();

            const response = await fetch(`api/users/getUser/?id=${parseInt(userInfo.UserId)}`);
            const data = await response.json();

            this.setState({ user: data });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    render() {
        console.log("INFO: ", this.state.user)
    return (
      <div>
            <h1>Your Info</h1>
            <br />
            <h2>{this.state.user.first_name} {this.state.user.last_name}</h2>
            <div className="btn-group" role="group">
                <button
                    className="btn btn-primary"
                    title="Edit"
                    onClick={id => this.handleEdit(this.userInfo.UserId)}
                >
                    <i className="fas fa-edit"></i>
                </button>
            </div>
      </div>
    );
  }
}
