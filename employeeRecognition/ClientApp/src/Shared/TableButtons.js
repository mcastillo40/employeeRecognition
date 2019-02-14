import React from 'react';

const TableButtons = props => {
    return <td className="button-width">
            <div className="btn-group" role="group">
                <button
                    className="btn btn-primary"
                    title="Edit"
                    onClick={id => props.handleEdit(props.userInfo.id)}
                >
                    <i className="fas fa-edit"></i>
                </button>
                <button
                    className="btn btn-success"
                    title="Details"
                    onClick={id => props.handleDetails(props.userInfo.id)}
                >
                    <i className="far fa-list-alt"></i>
                </button>
                <button
                    className="btn btn-danger"
                    title="Delete"
                    onClick={id => props.handleDelete(props.userInfo.id)}
                >
                    <i className="fas fa-trash-alt"></i>
                </button >
            </div >
        </td >
}

export { TableButtons };