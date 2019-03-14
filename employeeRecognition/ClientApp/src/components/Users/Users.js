import React, { Component } from 'react';
import { CreateButton } from '../../Shared/CreateButton';
import { User } from './User';
import { Link } from 'react-router-dom';
import { AUTH_MODEL } from '../../Shared/Auth/Auth';
import _ from 'lodash'

export class Users extends Component {
    displayName = Users.name

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    async componentDidMount() {
        try {

            const { token } = AUTH_MODEL.get();
            const response = await fetch('api/users/index', { headers: { authorization: `Bearer ${token}` } });

            const data = await response.json();
            this.setState({ users: data, loading: false });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    async handleDelete(id) {
        try {
            let url = `api/users/delete?id=${id}`;
            const { token } = AUTH_MODEL.get();

            const response = await fetch(url, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            });

            if (response.ok)
                this.setState({ users: _.filter(this.state.users, (user) => user.id !== id) })
        }

        catch (err) {
            console.log("ERR: ", err);
        }
    }

    async handleEdit(user) {
        try{
            let url = `api/users/edit?id=${user.id}`;
            const {token} = AUTH_MODEL.get();
            const response = await fetch(url, {
                headers: {authorization: `Bearer ${token}`
                }});
            console.log("handleEdit method response is: ", response);
            if (response.ok)
                this.props.history.push({
                pathname: '/editUser',
                state: { user }})
            
        }

        catch(err){
            console.log("ERR: ", err);
            }
    }

    static renderUsersTable(users, handleDelete, handleEdit) {
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
                                    handleEdit={handleEdit}
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
            : Users.renderUsersTable(this.state.users, this.handleDelete, this.handleEdit);
        return (
            <div>
                <h1>Employees</h1>
                <br />
                {contents}
            </div>
        );
    }
}
