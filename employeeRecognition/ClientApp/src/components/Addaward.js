import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Award } from '/award';


export class AddEmployee extends Component {
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
    /* This will handle the submit form event.  
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
                    this.props.history.push("/SampleData");
                })
        }*/
        // POST request for Add employee.  
        else {
            fetch('api/SampleData/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/SampleData");
                })
        }
    }
    // This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/SampleData");
    }
    // Returns the HTML Form to the render() method.  
    renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="aId" value=1 />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="type">Type</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="type" defaultValue="" required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="date">Date</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="date" defaultValue="01/01/2001" required>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="time" >Time</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue="12:00" required />
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