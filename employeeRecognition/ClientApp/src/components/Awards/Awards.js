import React, { Component } from 'react';
import { CreateButton } from '../../Shared/CreateButton';
import { Award } from './Award';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import { AUTH_MODEL } from '../../Shared/Auth/Auth';

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
            const {token} = AUTH_MODEL.get();
            const response = await fetch('api/awards/nominated',  {headers: {authorization: `Bearer ${token}`}});
            const data = await response.json();
            this.setState({ awards: data, loading: false });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    async handleDelete(id) {
        try{
            let url = `api/awards/delete?id=${id}`;
            const {token} = AUTH_MODEL.get();
            const response = await fetch(url, {
                method: 'DELETE', headers: {authorization: `Bearer ${token}`
            }});
            if (response.ok)
                this.setState({ awards: _.filter(this.state.awards, (award) => award.id !== id) })
        }
        catch(err){
            console.log("ERR: ", err);
            }
            
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
                        <th>Sender Name</th>
                        <th>Recipient Name</th>
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
