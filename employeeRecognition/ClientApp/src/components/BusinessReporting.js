import React, { Component } from 'react';
import { Chart } from 'react-google-charts'
import { AUTH_MODEL } from '../Shared/Auth/Auth';
import _ from 'lodash';
import { TYPES } from '../Shared/Types';

export class BusinessReporting extends Component {
    displayName = BusinessReporting.name

    constructor(props) {
        super(props);
        this.state = {
            filter: "all",
            users: [],
            allAwards: [],
            awards: [],
            data: {},
            sender_user_id: '',
            recipient_user_id: '',
            type: "Service",
            displayFilter: false,
            reRoute: false,
            loading: true,
        };

        this.showAward = this.showAward.bind(this);
        this.onChange = this.onChange.bind(this);
        this.displaydata = this.displaydata.bind(this);
        this.displayOverallData = this.displayOverallData.bind(this);
        this.displaySenderData = this.displaySenderData.bind(this);
        this.displayRecipientData = this.displayRecipientData.bind(this);
        this.displayTypeData = this.displayTypeData.bind(this);
        this.calculateData = this.calculateData.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async showAward(e) {
        e.preventDefault();
        try {
            let id = '';
            let filter = '';
            let form = e.target.id;
            if (form === "filtersender") {
                id = this.state.sender_user_id;
                this.setState({ filter: 'sender' });
                filter = "sender";
            }
            else if (form === "filterrecipient") {
                id = this.state.recipient_user_id;
                this.setState({ filter: 'recipient' })
                filter = "recipient";
            }
            else if (form === "filtertype") {
                this.setState({ filter: 'type' })
                filter = "type";
            }

            const { token } = AUTH_MODEL.get();
            const url = `api/awards/business?id=${parseInt(id, 10)}&type=${this.state.type}&filter=${filter}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: { authorization: `Bearer ${token}` }
            });
 
            const data = await response.json();

            if (response.status === 200) {
                this.setState({ awards: data, displayFilter: true })
            }
        }
        catch (err) {
            console.log("err: ", err);
        }
    }

    async componentDidMount() {
        try {
            const { token } = AUTH_MODEL.get();
            let response = await fetch('api/users/limitedUser', { headers: { authorization: `Bearer ${token}` } });
            const users = await response.json();

            response = await fetch('api/awards/Nominated', { headers: { authorization: `Bearer ${token}` } });
            const allAwards = await response.json();

            this.setState({ users, allAwards, sender_user_id: users[0].id, recipient_user_id: users[0].id, loading: false });
        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

    calculateData(filter, state) {
        const cloneAwards = _.cloneDeep(state.awards);
        const cloneAllAwards = _.cloneDeep(state.allAwards);
        let total = cloneAwards.length;
        let types = {};
        let users = {};

        if (filter === 'all') {
            total = cloneAllAwards.length;

            for (let i in cloneAllAwards) {
                // Get which types and number for each
                if (_.isNil(types[cloneAllAwards[i].type]))
                    types[cloneAllAwards[i].type] = 1;
                else {
                    types[cloneAllAwards[i].type] += 1
                }

                // Get awards and number of awards recieved by recipient
                if (_.isNil(users[cloneAllAwards[i].recipient_user_id]))
                    users[cloneAllAwards[i].recipient_user_id] = 1;
                else {
                    users[cloneAllAwards[i].recipient_user_id] += 1
                }
            }

            // Get Type Data
            let dataTable_1 = [['Types', 'Awards']];

            _.map(types, (type_count, key) => {
                let newType = _.find(TYPES, (type_category) => {
                    return type_category === key
                })

                let newArray = [newType, type_count]
                dataTable_1.push(newArray)
            })

            // Get User sender data
            let dataTable_2 = [['User', 'Awards']];

            _.map(users, (user_count, key) => {
                let newUser = _.find(state.users, (user_id) => {
                    return user_id.id === parseInt(key, 10)
                })

                const userName = newUser.first_name + " " + newUser.last_name

                let newArray = [userName, user_count]
                dataTable_2.push(newArray)
            })

            return { total, dataTable_1, dataTable_2 }
        }
        else if (filter === 'sender') {
            for (let i in cloneAwards) {
                // Get which types and number for each
                if (_.isNil(types[cloneAwards[i].type]))
                    types[cloneAwards[i].type] = 1;
                else {
                    types[cloneAwards[i].type] += 1
                }

                // Get awards and number of awards recieved by recipient
                if (_.isNil(users[cloneAwards[i].recipient_user_id]))
                    users[cloneAwards[i].recipient_user_id] = 1;
                else {
                    users[cloneAwards[i].recipient_user_id] += 1
                }
            }

            // Get data for recipients
            let dataTable_1 = [['User', 'Awards']];

            _.map(users, (user, key) => {
                let newUser = _.find(state.users, (user_id) => {
                    return user_id.id === parseInt(key, 10)
                })

                const userName = newUser.first_name + " " + newUser.last_name

                let newArray = [userName, user]
                dataTable_1.push(newArray)
            })

            // Get data for types of awards sent
            let dataTable_2 = [['Types', 'Awards']];

            _.map(types, (type_count, key) => {
                let newType = _.find(TYPES, (type_category) => {
                    return type_category === key
                })

                let newArray = [newType, type_count]
                dataTable_2.push(newArray)
            })

            return { total, dataTable_1, dataTable_2};
        }
        else if (filter === 'recipient') {
            for (let i in cloneAwards) {
                // Get which types and number for each
                if (_.isNil(types[cloneAwards[i].type]))
                    types[cloneAwards[i].type] = 1;
                else {
                    types[cloneAwards[i].type] += 1
                }

                // Get awards and number of awards received by a particular sender 
                if (_.isNil(users[cloneAwards[i].sender_user_id]))
                    users[cloneAwards[i].sender_user_id] = 1;
                else {
                    users[cloneAwards[i].sender_user_id] += 1
                }
            }

            // Get data for senders
            let dataTable_1 = [['User', 'Awards']];

            _.map(users, (user, key) => {
                let newUser = _.find(state.users, (user_id) => {
                    return user_id.id === parseInt(key, 10)
                })

                const userName = newUser.first_name + " " + newUser.last_name

                let newArray = [userName, user]
                dataTable_1.push(newArray)
            })

            // Get data for types of awards sent
            let dataTable_2 = [['Types', 'Awards']];

            _.map(types, (type_count, key) => {
                let newType = _.find(TYPES, (type_category) => {
                    return type_category === key
                })

                let newArray = [newType, type_count]
                dataTable_2.push(newArray)
            })

            return { total, dataTable_1, dataTable_2};
        }
        else if (filter === 'type') {
            // Ensure that filter has been updated
            types[state.type] = total;
            types['Other'] = cloneAllAwards.length - total;

            let usersRecieved = {};

            for (let i in cloneAwards) {
                // Get awards and number of awards received by a particular sender 
                if (_.isNil(users[cloneAwards[i].sender_user_id]))
                    users[cloneAwards[i].sender_user_id] = 1;
                else {
                    users[cloneAwards[i].sender_user_id] += 1
                }

                // Get awards and number of awards recieved by recipient
                if (_.isNil(usersRecieved[cloneAwards[i].recipient_user_id]))
                    usersRecieved[cloneAwards[i].recipient_user_id] = 1;
                else {
                    usersRecieved[cloneAwards[i].recipient_user_id] += 1
                }
            }

            // Get data for type sent
            let dataTable_1 = [['Types', 'Awards']];

            _.map(types, (type_count, key) => {
                let newArray = [key, type_count]
                dataTable_1.push(newArray)
            })

            // Users that sent type
            let dataTable_2 = [['User', 'Awards']];

            _.map(users, (user, key) => {
                let newUser = _.find(state.users, (user_id) => {
                    return user_id.id === parseInt(key, 10)
                })

                const userName = newUser.first_name + " " + newUser.last_name

                let newArray = [userName, user]
                dataTable_2.push(newArray)
            })


            // Users that recieved type
            let dataTable_3 = [['Users', 'Awards']];
            _.map(usersRecieved, (user, key) => {
                let newUser = _.find(state.users, (user_id) => {
                    return user_id.id === parseInt(key, 10)
                })

                const userName = newUser.first_name + " " + newUser.last_name

                let newArray = [userName, user]
                dataTable_3.push(newArray)
            })

            return { total, dataTable_1, dataTable_2, dataTable_3 };
        }
    }

    displayOverallData(calculateData, state) {
        let { total, dataTable_1, dataTable_2 } = calculateData(state.filter, state);

        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>Total Awards Sent: {total}</h2>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_1}
                    options={{
                        title: 'Types Sent',
                    }}
                />

                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_2}
                    options={{
                        title: 'User Senders',
                    }}
                />
            </div >
        )
    }

    displaySenderData(calculateData, state) {
        let { total, dataTable_1, dataTable_2 } = calculateData(state.filter, state);

        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>Total Awards Sent By Sender: {total}</h2>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_1}
                    options={{
                        title: 'Recipients of Awards',
                    }}
                />

                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_2}
                    options={{
                        title: 'Type of Awards',
                    }}
                />
            </div >
        )
    }

    displayRecipientData(calculateData, state) {
        let { total, dataTable_1, dataTable_2 } = calculateData(state.filter, state);

        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>Total Awards Recieved By Recipient: {total}</h2>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_1}
                    options={{
                        title: 'Awards By Senders',
                    }}
                />

                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_2}
                    options={{
                        title: 'Type of Awards',
                    }}
                />
            </div >
        )
    }

    displayTypeData(calculateData, state) {
        let { total, dataTable_1, dataTable_2, dataTable_3 } = calculateData(state.filter, state);

        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>Total Awards Of Type: {total}</h2>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_1}
                    options={{
                        title: 'Type Sent',
                    }}
                />

                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_2}
                    options={{
                        title: 'User Senders',
                    }}
                />

                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={dataTable_3}
                    options={{
                        title: 'User Recipients',
                    }}
                />
            </div >
        )
    }

    displaydata(calculateData, displayOverallData, displaySenderData, displayRecipientData, displayTypeData, state) {
        if (!state.displayFilter) {
            return (<div>{displayOverallData(calculateData, state)}</div>);
        }
        else {
            if (state.filter === 'sender') {
                return ( <div>{displaySenderData(calculateData, state)}</div> )
            }
            else if (state.filter === 'recipient') {
                return (<div>{displayRecipientData(calculateData, state)}</div> )
            }
            else if (state.filter === 'type') {
                return (<div>{displayTypeData(calculateData, state)}</div>)
            }
        }
    }

    static renderBusinessReporting(state, showAward, onChange, displaydata, displayOverallData, displaySenderData, displayRecipientData, displayTypeData, calculateData) {
        return (
            <div>
                <form
                    id="filtersender"
                    onSubmit={showAward}
                >
                    <div className="form-group">
                        <label htmlFor="typeselect">Select By Sender:</label>
                        <div className="container" style={{ paddingLeft: '0px' }}>
                            <div className="row">
                                <div className='col-md-6' style={{ paddingLeft: '0px' }}>
                                <select className="form-control" name="sender_user_id" id="sender_user_id" value={state.sender_user_id} onChange={onChange}>
                                    {state.users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.first_name} {user.last_name}
                                        </option>
                                    ))}
                                </select>
                               </div>
                               <div className='col-md-6'>
                                    <button className="btn btn-primary" type="submit">Results</button>
                               </div>
                            </div>
                        </div>
                    </div>
                </form>
                <form
                    id="filterrecipient"
                    onSubmit={showAward}
                >
                    <div className="form-group">
                        <label htmlFor="typeselect">Select By Recipient:</label>
                        <div className="container" style={{ paddingLeft: '0px' }}>
                            <div className="row">
                                <div className='col-md-6' style={{ paddingLeft: '0px' }}>
                                    <select className="form-control" name="recipient_user_id" id="recipient_user_id" value={state.recipient_user_id} onChange={onChange}>
                                        {state.users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.first_name} {user.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <button className="btn btn-primary" type="submit">Results</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <form
                    id="filtertype"
                    onSubmit={showAward}
                >
                    <div className="form-group">
                        <label htmlFor="typeselect">Select By Type:</label>
                        <div className="container" style={{ paddingLeft: '0px' }}>
                            <div className="row">
                                <div className='col-md-6' style={{ paddingLeft: '0px' }}>
                                    <select className="form-control" name="type" id="typeselect" value={state.type} onChange={onChange}>
                                        <option value="Service">Service</option>
                                        <option value="Performance">Performance</option>
                                        <option value="Team Work">Team Work</option>
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <button className="btn btn-primary" type="submit">Results</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <hr />
                <div>{displaydata(calculateData, displayOverallData, displaySenderData, displayRecipientData, displayTypeData, state)}</div>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : BusinessReporting.renderBusinessReporting(this.state, this.showAward, this.onChange, this.displaydata, this.displayOverallData, this.displaySenderData, this.displayRecipientData, this.displayTypeData, this.calculateData);
        return (
            <div>
                <h1>Set Filters</h1>
                <br />
                {contents}
            </div>
        );
    }
}
