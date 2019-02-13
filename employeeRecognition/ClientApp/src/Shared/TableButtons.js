import React from 'react';

const TableButtons = () => {
    return <td className="button-width">
            <div className="btn-group" role="group">
                <button className="btn btn-primary" title="Edit">
                        <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-danger" title="Delete">
                    <i className="fas fa-trash-alt"></i>
                </button >
            </div >
        </td >
}

export { TableButtons };