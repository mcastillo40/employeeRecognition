import React, { Component } from 'react';
import { AUTH_MODEL } from '../../Shared/Auth/Auth';

export class ImageReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            signature: '',
            selectImage: true,
            loading: false,
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

        this.setState({
            signature: event.target.files[0],
            selectImage: false
        });
    }

    async editImage(e) {
        e.preventDefault();

        try {
            this.setState({ loading: true });

            const { token } = AUTH_MODEL.get();

            const url = `api/users/uploadsignature?id=${this.state.id}`
            let formData = new FormData();

            formData.append('signature', this.state.signature, this.state.signature.name);

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: { authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                this.props.showEditImage();
                //this.props.updateUser({ signature: userInfo.email });
                this.setState({ selectImage: true })
            }
        }
        catch (err) {
            console.log("ERROR: ", err);
        }
    }

    cancelImage() {
        this.setState({
            signature: '',
            selectImage: true
        });

        this.props.showEditImage();
    }

    render() {
        if (this.state.loading) {
            return (<div> <p><em>Uploading Signature...</em></p> </div>)
        }
        else {
            return (
                <div>
                    <input
                        style={{ display: 'none' }}
                        id="signature"
                        name="signature"
                        type="file"
                        onChange={this.onChange}
                        ref={fileInput => this.fileInput = fileInput}
                    />

                    <span style={{ display: this.state.selectImage ? 'block' : 'none' }}>
                        <button type="button" className="btn btn-secondary" style={{ marginRight: '10px' }} onClick={() => this.fileInput.click()}>Pick Image</button>
                        <button type="button" className="btn btn-danger" onClick={this.cancelImage}>Cancel</button>
                    </span>

                    <span style={{ display: this.state.selectImage ? 'none' : 'block' }}>
                        <button type="submit" className="btn btn-info" style={{ marginRight: '10px' }} onClick={this.editImage.bind(this)}>Update Image</button>
                        <button type="button" className="btn btn-danger" onClick={this.cancelImage}>Cancel</button>
                    </span>
                </div>
            );
        }
    }
}