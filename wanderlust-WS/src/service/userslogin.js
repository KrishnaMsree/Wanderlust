const userDB = require( '../model/userslogin' );
const validator = require( '../utilities/validator' );

const userService = {}

//login a user
userService.login = ( contactNo, userPassword ) => {
    return userDB.checkUser( contactNo ).then( ( user ) => {
        console.log( "user in login : ", user );
        if( user == null ) {
            let err = new Error( "Enter registered contact number! If not registered, please register" )
            err.status = 404
            throw err
        }
        else{
            return userDB.getPassword( contactNo ).then( ( password ) => {
                if( password != userPassword ) {
                    let err = new Error( "Incorrect password" )
                    err.status = 406
                    throw err
                }
                else{
                    return user;
                }
            } )
        }
    } )
}

//register a user
userService.register = ( userRegisterDetails ) => {
    if(validator.validateEmailId(userRegisterDetails.emailId)){
        if(validator.validateContactNo(userRegisterDetails.contactNo) && validator.validatePassword(userRegisterDetails.password)){
            return userDB.checkUser( userRegisterDetails.contactNo ).then( ( user ) => {
                if( user != null ){
                    let err = new Error( "User already exists" );
                    err.status=404;
                    throw err; 
                } 
                else if( user == null ){
                    return userDB.registerUser( userRegisterDetails ).then( ( registeredData )=>{
                        if( registeredData ){
                            return registeredData
                        }
                        else{
                            return null
                        }
                    } )
                }
                else{
                    let err = new Error( "Registration failed! Please try again" );
                    err.status=404;
                    throw err;
                }  
            } )
        }
        else{
            let err = new Error( "Invalid Contact No or password" );
            err.status=404;
            throw err;
        }
    }
    else{
        let err = new Error( "Invalid emailId" );
        err.status=404;
        throw err;
    }
    
    
}

//book a trip
userService.bookTrip = ( uNum,dId, data ) => {
    return userDB.checkUser( uNum ).then( ( user ) => {
        if( user == null ){
            let err = new Error( "Something went wrong! Please try later!!" );
            err.status=404;
            throw err; 
        } 
        else{
            return userDB.bookTrip( uNum,dId,data ).then( ( modifiedData )=>{
                console.log( "service file : ",modifiedData )
                if( modifiedData != 'exists' && modifiedData != null ){
                    return modifiedData
                }
                else if( modifiedData == 'exists'  && modifiedData != null ){
                    let err = new Error( "Sorry, this trip is already booked!!!" );
                    err.status=404;
                    throw err;
                }
                else{
                    return null
                }
            } )
        }
    } )
}

//book a trip
userService.removeTrip = ( dId,userId ) => {
    console.log( "in service" );
    
    return userDB.removeTrip( dId,userId ).then( ( modifiedData )=>{
        if( modifiedData ){
            return modifiedData
        }
        else{
            return null
        }
    } )
}

userService.getUserData = ( id ) => {
    return userDB.getUserData( id ).then( ( userdata ) => {
        if( userdata ){
            return userdata
        }
        else{
            let err = new Error( "Sorry, something went wrong!!!" );
            err.status = 404;
            throw err;
        }
    } )
}


userService.getHotDeals = () => {
    return userDB.getHotDeals().then( ( hotdealdata ) => {
        if( hotdealdata ){
            return hotdealdata
        }
        else{
            let err = new Error( "Sorry, there are no hot deals right now!!!" );
            err.status = 404;
            throw err;
        }
    } )
}

userService.getDestinations = () => {
    return userDB.getDestinations().then( ( data ) => {
        if( data ){
            return data
        }
        else{
            let err = new Error( "Sorry we don't operate in this Destination" );
            err.status = 404;
            throw err;
        }
    } )
}

module.exports = userService
