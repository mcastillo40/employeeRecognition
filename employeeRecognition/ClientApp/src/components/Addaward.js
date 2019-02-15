import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Award } from '/award';
interface AddawardDataState {
 
    recipient_user_id: int;
    type: string;
    name: string;
    date: string;
    empData: EmployeeData;
}
export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddawardDataState> {
    constructor(props) {
        super(props);
        this.state = { recipient_user_id: 0, type: "", time: "", date: ""};
        var awid = this.props.match.params["id"];
        // This will set state for Edit employee  
        if (awid > 0) {
            fetch('api/award/' + awid)
                .then(response => response.json() as Promise<award>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, aData: data });
                });
        }
        // This will set state for Add employee  
        else {
            this.state = { recipient_user_id: 0, type: "", time: "", date: "" };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Award</h3>
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.empData.employeeId) {
            fetch('api/SampleData/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/award");
                })
        }
        // POST request for Add employee.  
        else {
            fetch('api/award/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/award");
                })
        }
    }
    // This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/award");
    }
    // Returns the HTML Form to the render() method.  
    renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.empData.department} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.empData.city} required>
                            <option value="">-- Select City --</option>
                            {cityList.map(city =>
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}