import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
var util = require('util');

export class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: "",
            password: '',
            role: 0,
            signature: '',
            imagePreviewUrl: '',
            reRoute: false,
        };

        this.createUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.signatureOnChange = this.signatureOnChange.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    signatureOnChange(event) {
        event.preventDefault();
        console.log(event.target.files[0]);

        this.setState({ signature: event.target.files[0] })

        //let reader = new FileReader();
        //let file = event.target.files[0];

        //reader.onloadend = () => {
        //    this.setState({
        //        signature: file,
        //        imagePreviewUrl: reader.result
        //    })
        //}
        //reader.readAsDataURL(file);
    }

    async createUser(e) {
        e.preventDefault();

        console.log("SIGNATURE 1: ", this.state.signature)

        try {
            // Modify image to be uploaded
            //const data = this.state.imagePreviewUrl.split(',')[1];
            //let raw = window.atob(data);
            //let rawLength = raw.length;
            //let array = new Uint8Array(new ArrayBuffer(rawLength));
            //for (let i = 0; i < rawLength; i++)
            //    array[i] = raw.charCodeAt(i);

            //let image = [];

            //for (let i = 0; i < rawLength; i++)
            //    image.push((array[i]));


            // Upload user information
            let userInfo = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role,
                //signature: this.state.signature,
                //signature: image
            }

            console.log("PRINT: ", util.inspect(userInfo, { showHidden: false, depth: null }))

            let url = 'api/users/create';
            //let response = await axios.request({
            //    method: 'POST',
            //    url: url,
            //    data: userInfo
            //});

            let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const id = data.id;

            // Upload user's signature
            url = `api/users/uploadsignature?id=${id}`
            let formData = new FormData();

            //console.log("PRINT Signature: ", util.inspect(this.state.signature, { showHidden: false, depth: null }))
            //console.log("PRINT Signature: ", util.inspect(this.state.signature.name, { showHidden: false, depth: null }))

            formData.append('signature', this.state.signature, this.state.signature.name);

            response = await fetch(url, {
                method: 'POST',
                body: formData,
                //headers: {'content-type': 'multipart/form-data' }
            });

            //response = await axios.post(url, this.state.signature)

            if (response.status === 201)
                this.setState({ reRoute: true });
        }
        catch (err) {
            console.log("err: ", err);
        }
    }

    render() {
        if (this.state.reRoute) {
            return <Redirect to="/users" />
        }
        else {
            return (
                <div>
                    <h1>Add Employee</h1>
                    <br />
                    <form
                        id="addUser"
                        onSubmit={this.createUser.bind(this)}
                    >
                        <div className="form-group">
                            <input
                                id="first_name"
                                type="text"
                                className="form-control"
                                value={this.state.first_name}
                                onChange={this.onChange}
                                name="first_name"
                                placeholder="First Name"
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="last_name"
                                type="text"
                                className="form-control"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                name="last_name"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChange}
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChange}
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roleSelect">Role:</label>
                            <select className="form-control" name="role" id="roleSelect" value={this.state.role} onChange={this.onChange}>
                                <option value={0}>User</option>
                                <option value={1}>Admin</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Upload Signature:</label>
                            <input
                                style={{ display: 'none'}}
                                id="signature"
                                name="signature"
                                type="file"
                                className="form-control"
                                onChange={this.signatureOnChange}
                                ref={fileInput => this.fileInput = fileInput}
                            />
                            <button type="button" className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={() => this.fileInput.click()}>Pick Image</button>
                        </div>
                        <button className="btn btn-primary" type="submit" style={{ marginRight: '10px' }}>
                            Add Employee
                        </button>
                        <Link to="/Users"><button type="button" className="btn btn-danger">Cancel</button></Link>
                    </form>
                </div>
            )
        }
    }
}