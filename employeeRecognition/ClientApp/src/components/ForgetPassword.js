import React, { Component } from 'react';

export class ForgetPassword extends Component {
    displayName = ForgetPassword.name

    constructor(props){
    super(props);
    this.state = {
        email: ''
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }


  change(e) {
        this.setState({email: e.target.email});
        //this.setState({
          //  [e.target.name]: e.target.value
        //});
    }





async submit(e) {
        e.preventDefault();
        const data = {
            email: this.state.email
        }

        try {
            const response = await fetch('api/email/index',  {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('this.state.value before async submit(e) is: ' + this.state.value);
            console.log("data is: ", data);
            console.log("response is: ", response);




        }
        catch (err) {
            console.log("ERR: ", err);
        }
    }

render() {
    return (

      <div> {/*JSX ROOT*/}
        
        <div className="card">
            <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">RECOVER PASSWORD</h4>

                <p className="text-success text-center">Please enter your email</p>
                <form onSubmit={e => this.submit(e)}>
                <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                     </div>
                    <input name="" className="form-control" placeholder="Email" type="email" onChange={e => this.change(e)} value={this.state.email}/>
                </div> 
                </div> 

            <div className="row">
                    <div className = "col-md-6">

                        <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Send Recovery Password  </button>
                        </div>
                    </div>


                    </div>


                </form>
            </article>

            </div> 
      </div> // End of JSX root in render
    );
  }
}