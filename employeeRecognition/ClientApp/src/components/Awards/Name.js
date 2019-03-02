import React from 'react';

class Name extends React.Component {
    constructor() {
        super();
    }

    render() {
        let awards = this.props.state.awards;
        let optionItems = awards.map((award) =>
            <option key={award.name}>{award.name}</option>
        );

        return (
            <div>
                <select>
                    {optionItems}
                </select>
            </div>
        )
    }
}

export default Name;