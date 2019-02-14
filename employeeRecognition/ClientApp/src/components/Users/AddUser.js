import React, { Component } from 'react';

export class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: "",
            password: '',
        }
    }

    render() {
        return (
            <div>
                <h1>Add Employee</h1>
                <br />
            </div>
        )
    }
}