import React, { Component } from 'react';
import { CreateButton } from '../Shared/CreateButton';
import { TableButtons } from '../Shared/TableButtons';

export class Award extends Component {
    displayName = Award.name

    constructor(props) {
        super(props);
        this.state = { awards: [], loading: true };
        // This binding is necessary to make "this" work in the callback
        this.handleDelete = this.handleDelete.bind(this);
        //this.handleEdit = this.handleEdit.bind(this);  
    }

    async componentDidMount() {
        const response = await fetch('api/SampleData/Nominated');
        const data1 = await response.json();

        console.log("DATA: ", data1)

        this.setState({ awards: data1, loading: false });
    }
    /**/
   handleDelete(id) {
        fetch('api/SampleData/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        awards: this.state.awards.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
    }  

    static renderNominated(awards) {
        return (
            <div>
                <CreateButton />
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
                    {awards.map(aw =>
                        <tr key={aw.id}>
                            <td>{aw.sender_user_id}</td>
                            <td>{aw.recipient_user_id}</td>
                            <td>{aw.type}</td>
                            <td>{aw.time}</td>
                            <td>{aw.date}</td>
                            <td><button onClick={(id) => this.handleDelete(aw.id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            </div>
        );
    }
    //<a className="action" onClick={(id) => this.handleEdit(aw.id)}>Edit</a> |
    render() {
        let contents1 = this.state.loading
            ? <p><em>Loading...</em></p>
            : Award.renderNominated(this.state.awards);

        return (
            <div>
                <h1>List of award infomation</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents1}
            </div>
        );
    }
}
