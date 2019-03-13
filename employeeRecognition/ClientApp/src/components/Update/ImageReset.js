import React, { Component } from 'react';

export class ImageReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            signature: ''
        };

        this.editImage = this.editImage.bind(this);
        this.cancelImage = this.cancelImage.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        this.setState({ id: this.props.id });
    }

    onChange(event) {
        event.preventDefault();
        this.setState({ signature: event.target.files[0] });
    }

    async editImage(e) {
        e.preventDefault();

        try {
            const url = `api/users/uploadsignature?id=${this.state.id}`
            let formData = new FormData();

            formData.append('signature', this.state.signature, this.state.signature.name);

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                //headers: {'content-type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                this.props.showEditImage();
                //this.props.updateUser({ signature: userInfo.email });
            }
        }
        catch (err) {
            console.log("ERROR: ", err);
        }

        this.props.showEditImage();
    }

    cancelImage() {
        this.props.showEditImage();
    }

    render() {
        return (
            <div>
                <input
                    style={{ display: 'none' }}
                    id="signature"
                    name="signature"
                    type="file"
                    className="form-control"
                    onChange={this.onChange}
                    ref={fileInput => this.fileInput = fileInput}
                />
                <button type="button" className="btn btn-secondary" style={{ marginBottom: '10px' }} onClick={() => this.fileInput.click()}>Pick Image</button>
                <br/>
                <button type="submit" className="btn btn-info" onClick={this.editImage.bind(this)} style={{ marginRight: '10px' }}>Update Image</button>
                <button type="button" className="btn btn-danger" onClick={this.cancelImage}>Cancel</button>
            </div>
        );
    }
}