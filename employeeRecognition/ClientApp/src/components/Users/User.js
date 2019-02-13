    //<tr key={user.id}>
    //    <td>{user.first_name}</td>
    //    <td>{user.last_name}</td>
    //    <td>{user.email}</td>
    //    <TableButtons />
    //</tr>

import React from "react";
import { TableButtons } from '../../Shared/TableButtons';

const User = props => {
    console.log("PROPS: ", props);
    return (
        <tr key={props.userInfo.id}>
            <td>{props.userInfo.first_name}</td>
            <td>{props.userInfo.last_name}</td>
            <td>{props.userInfo.email}</td>
            <TableButtons
                handleDelete={props.handleDelete}
                userInfo={props.userInfo}
            />
        </tr>
    );
}

export { User };