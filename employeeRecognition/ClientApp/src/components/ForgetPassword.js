import React, { Component } from 'react';

export class ForgetPassword extends Component {
    displayName = ForgetPassword.name

    constructor(props){
    super(props);
    this.state = {email: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


handleChange(event){
    this.setState({email: event.target.value});
}



async handleSubmit(event){
    event.preventDefault();
    const data = {email: this.state.email};

    try{
        console.log("data is: ", data); 
        const response = await fetch('api/email/sendPassword', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
                }
         });

        console.log("Response is: ", response);
        const responseOK = response.ok;
        console.log("response.ok is: ", responseOK);
        if (response.ok){
            var mySpan = document.getElementById('sent_confirm');
            mySpan.style.display = "";
            mySpan = document.getElementById('incorrect_info');
            mySpan.style.display = 'none';
        }
        else{
              var mySpan = document.getElementById('incorrect_info');
            mySpan.style.display = "";
              mySpan = document.getElementById('sent_confirm');
            mySpan.style.display = 'none';
        }

    
    }

    catch (err){
        console.log("ERR: ", err);
//        var mySpan = document.getElementById('incorrect_info');
  //      mySpan.style.display = "";
    }
}




render() {
    return (

      <div> {/*JSX ROOT*/}
        
        <div className="card">
            <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">RECOVER PASSWORD</h4>

                <p className="text-success text-center">Please enter your email</p>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                     </div>
                    <input name="" className="form-control" placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange} />
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

                <span id="sent_confirm" style={{ display: "none" }}>
                        <br />
                        <span className="alert alert-info col" role="alert">Password sent. Please check your email for recovered password.</span>
                        <br /> <br />
                </span>

                <span id="incorrect_info" style={{ display: "none" }}>
                        <br />
                        <span className="alert alert-danger col" role="alert">Invalid email</span>
                        <br /> <br />
                </span>

            </article>

            </div> 
      </div> // End of JSX root in render
    );
  }
}
