import React from "react";
import { TableAwards } from '../../Shared/TableAwards';

const Detail = props => {
    return (
        <tr key={props.detailInfo.id}>
            <td>{props.detailInfo.sender_user_id}</td>
            <td>{props.detailInfo.recipient_user_id}</td>
            <td>{props.detailInfo.type}</td>
            <td>{props.detailInfo.time}</td>
            <td>{props.detailInfo.date}</td>
            <TableAwards
                handleDelete={props.handleDelete}
                handleEdit={props.handleEdit}
                awardInfo={props.detailInfo}
            />
        </tr>
    );
}

export { Detail };