import React from "react";
import { TableAwards } from '../../Shared/TableAwards';

const Award = props => {
    return (
        <tr key={props.awardInfo.id}>
            <td>{props.awardInfo.sfn} {props.awardInfo.sln}</td>
            <td>{props.awardInfo.rfn} {props.awardInfo.rln}</td>
            <td>{props.awardInfo.type}</td>
            <td>{props.awardInfo.time}</td>
            <td>{props.awardInfo.date}</td>
            <TableAwards
                handleDelete={props.handleDelete}
                handleEdit={props.handleEdit}
                awardInfo={props.awardInfo}
            />
        </tr>
    );
}

export { Award };