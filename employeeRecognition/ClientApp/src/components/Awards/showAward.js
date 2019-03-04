import React, { Component } from 'react';
var Latex = require('react-latex');

export class showAward extends Component {
    displayName = showAward.name
    constructor(props) {
        super(props);
        this.state = {
            sender_user_id: 1,
            recipient_user_id: 2,
            first_name: 'Vinh',
            last_name: 'Dong',
            type: 'Service Award',
            time: '12:00',
            date: '01/01/2019',
            reRoute: false,
        };
    }

    render() {
        return (
            <div>
                <h3>
                    <Latex displayMode={true}></Latex>
                </h3>
            </div>
        );
    }
}
