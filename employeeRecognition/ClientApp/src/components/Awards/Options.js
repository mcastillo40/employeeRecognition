import React from "react";
var Latex = require('react-latex');
 
...
render(){
    return (
        <h3>
            <Latex>What is $(3\times 4) \div (5-3)$</Latex>
        </h3>
    );
}

const Options = props => {
    return (
        <options key={props.awardInfo.id}>
            <td>{props.awardInfo.sender_user_id}</td>
            <td>{props.awardInfo.recipient_user_id}</td>
            <td>{props.awardInfo.first_name}</td>
            <td>{props.awardInfo.last_name}</td>
        </options>
    );
}

export { Options };