//Tracks the login status
// This class will export an instance of the class, so that we 
// mimic the singleton pattern
// We'd be managing our authentication via an interface like this that
// provides some abstraction. We'd be loading data from our local storage
// or server side, etc. 

class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb){
        this.authenticated = true
        cb() // takes in a callback, simulates asynchronous operations
    }

    logout(cb){
        this.authenticated = false
        cb()
    }

   isAuthenticated(){
        return this.authenticated
   }
    
}

export default new Auth();