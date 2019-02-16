﻿import React, { Component } from 'react';
import { CreateButton } from '../../Shared/CreateButton';
import { Detail } from './Detail';
import { Link } from 'react-router-dom';
import _ from 'lodash'

export class Award extends Component {
    displayName = Award.name

    constructor(props) {
        super(props);
        this.state = { awards: [], loading: true };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch('api/Awards/Nominated');
            const data = await response.json();
            this.setState({ awards: data, loading: false });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    async handleDelete(id) {
        let url = `api/Awards/delete?id=${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.ok)
            this.setState({ awards: _.filter(this.state.awards, (aw) => aw.id !== id) })
    }

    async handleEdit(award) {
        this.props.history.push({
            pathname: '/Editaward',
            state: { award }
        })
    }

    static renderNominated(awards, handleDelete, handleEdit) {
        return (
            <div>
            <Link to='/Addaward'><CreateButton /></Link>
            <br /> <br />
            <div className="form-border">
            <table className='table'>
                <thead>
                    <tr>
                        <th>Sender id</th>
                        <th>Recipient id</th>
                        <th>Type</th>
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                        {awards.map(aw => (
                            <Detail
                                key={aw.id}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                detailInfo={aw}
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
            : Award.renderNominated(this.state.awards, this.handleDelete, this.handleEdit);
    
        return (
            <div>
                <h1>Award infomation</h1>
                {contents}
            </div>
        );
    }
}
