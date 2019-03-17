import React from "react";
import { TableButtons } from '../../Shared/TableButtons';

const User = props => {
    return (
        <tr key={props.userInfo.id}>
            <td>{props.userInfo.first_name}</td>
            <td>{props.userInfo.last_name}</td>
            <td>{props.userInfo.email}</td>
            {/* <td><img src={`data:image/jpeg; base64,${props.userInfo.signature}`} width='200' height='200' alt="Employee's Signature"/></td>*/}
            <TableButtons
                handleDelete={props.handleDelete}
                handleEdit={props.handleEdit}
                userInfo={props.userInfo}
            />
        </tr>
    );
}

export { User };