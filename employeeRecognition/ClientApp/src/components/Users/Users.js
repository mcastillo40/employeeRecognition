﻿import React, { Component } from 'react';
import { CreateButton } from '../../Shared/CreateButton';
import { User } from './User';
import { Link } from 'react-router-dom';

export class Users extends Component {
    displayName = Users.name

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };

        this.handleDelete.bind(this);
    }

    async componentDidMount() {
        try {
        const response = await fetch('api/Users/index');
        const data = await response.json();

        this.setState({ users: data, loading: false });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    handleDelete(id) {
        console.log("DELETE ME: ", id);
    }

    static renderUsersTable(users, handleDelete) {
        return (
            <div>
                <Link to='/addUser'><CreateButton /></Link>
                <br /> <br />
                <div className="form-border">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <User
                                    key={user.id}
                                    handleDelete={handleDelete}
                                    userInfo={user}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Users.renderUsersTable(this.state.users, this.handleDelete);

        return (
            <div>
                <h1>Employees</h1>
                <br />
                {contents}
            </div>
        );
    }
}
