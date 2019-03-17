import React from 'react';

const TableAwards = props => {
    return <td className="button-width">
            <div className="btn-group" role="group">
                <button
                    className="btn btn-primary"
                    title="Edit"
                    onClick={id => props.handleEdit(props.awardInfo)}
                >
                    <i className="fas fa-edit"></i>
            </button>
            &nbsp;
            <button
                className="btn btn-danger"
                title="Delete"
                onClick={id => props.handleDelete(props.awardInfo.id)}
            >
                <i className="fas fa-trash-alt"></i>
            </button >
            &nbsp;
            <button className="btn btn-info" title="PDF+Email" onClick={id => props.onPrint(props.awardInfo)}
            >
                <i className="far fa-envelope"></i>
            </button >
        </div >
        </td >
}
export { TableAwards };