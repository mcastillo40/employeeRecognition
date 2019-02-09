import React, { Component } from 'react';
import { CreateButton } from '../Shared/CreateButton';
import { TableButtons } from '../Shared/TableButtons';

export class Users extends Component {
    displayName = Users.name

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };
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

    static renderUsersTable(users) {
        return (
            <div>
                <CreateButton />
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
                            {users.map(user =>
                                <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <TableButtons />
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Users.renderUsersTable(this.state.users);

        return (
            <div>
                <h1>Employees</h1>
                <br />
                {contents}
            </div>
        );
    }
}
