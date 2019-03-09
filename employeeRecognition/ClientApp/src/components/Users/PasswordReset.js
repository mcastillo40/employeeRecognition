import React, { Component } from 'react';

export class PasswordReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        };

        this.changeEdit = this.changeEdit.bind(this);
        this.editPassword = this.editPassword.bind(this);
        this.cancelPassword = this.cancelPassword.bind(this);
    }

    changeEdit() {
        this.setState({ edit: !this.state.edit });
    }

    editPassword() {
        this.setState({ edit: !this.state.edit });

    }

    cancelPassword() {
        this.setState({ edit: !this.state.edit });

    }

    render() {
        if (!this.state.edit) {
            return (
                <div className="form-group">
                    <label>Password:</label>
                    <br/>
                    <button type="button" className="btn btn-secondary" onClick={this.changeEdit}>Change Password</button>
                </div>
            );
        }
        else {
            return (
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={this.props.password}
                        onChange={this.props.onChange}
                        name="password"
                        placeholder=""
                        style={{ marginBottom: '10px' }}
                    />
                    <button type="button" className="btn btn-info" onClick={this.editPassword} style={{ marginRight: '10px' }}>Change Password</button>
                    <button type="button" className="btn btn-danger" onClick={this.cancelPassword}>Cancel</button>
                </div>
            );
        }
    }
}

//const PasswordReset = props => {
//    return (
//        <div>
//            <input
//                id="password"
//                type="password"
//                className="form-control"
//                value={props.password}
//                onChange={props.onChange}
//                name="password"
//                placeholder=""
//            />
//        </div>
//    );
//}

//export { PasswordReset };