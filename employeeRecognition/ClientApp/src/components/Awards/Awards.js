import React, { Component } from 'react';
import { CreateButton } from '../../Shared/CreateButton';
import { Award } from './Award';
import { Link } from 'react-router-dom';
import _ from 'lodash'

export class Awards extends Component {
    displayName = Awards.name

    constructor(props) {
        super(props);
        this.state = { awards: [], loading: true };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch('api/awards/nominated');
            const data = await response.json();
            this.setState({ awards: data, loading: false });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    async handleDelete(id) {
        let url = `api/awards/delete?id=${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.ok)
            this.setState({ awards: _.filter(this.state.awards, (award) => award.id !== id) })
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
                            {awards.map(award => (
                            <Award
                                key={award.id}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                awardInfo={award}
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
            : Awards.renderNominated(this.state.awards, this.handleDelete, this.handleEdit);
    
        return (
            <div>
                <h1>Award infomation</h1>
                {contents}
            </div>
        );
    }
}
