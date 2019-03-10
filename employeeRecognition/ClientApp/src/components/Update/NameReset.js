import React, { Component } from 'react';

export class NameReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            first_name: props.first_name,
            last_name: props.last_name,
            email: props.email
        };

        this.editName = this.editName.bind(this);
        this.cancelName = this.cancelName.bind(this);
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

    async editName(e) {
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
                this.props.updateUser({ last_name: userInfo.last_name });
                this.props.updateUser({ first_name: userInfo.first_name });
            }
        }
        catch (err) {
            console.log("ERROR: ", err);
        }

        this.props.showEditName();
    }

    cancelName() {
        this.props.showEditName();
    }

    render() {
        return (
            <div>
                <form id="editName" onSubmit={this.editName.bind(this)}>
                    <div className="container-fluid" style={{ marginBottom: '10px' }}>
                        <div className="row">
                            <div className='col-md-6' style={{ paddingLeft: '0px' }}>
                                <input
                                    id="first_name"
                                    type="text"
                                    className="form-control"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                    name="first_name"
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div className='col-md-6'>
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
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info" style={{ marginRight: '10px' }}>Update Name</button>
                    <button type="button" className="btn btn-danger" onClick={this.cancelName}>Cancel</button>
                </form>
            </div>
        );
    }
}