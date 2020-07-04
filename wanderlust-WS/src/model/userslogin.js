// const userDetails = require( './beanClasses/users' );
const connection = require( "../utilities/connections" );

const usersDB = {}

let bId = 1004;

usersDB.generateUserId = () => {
    return connection.getUserCollection().then( ( model ) => {
        return model.countDocuments().then( ( count ) => {
            var id;
            if( count>0 && count<=9 ){
                var c = count + 1;
                id = "U100" + c;
            }
            else if( count>=10 && count<=99 ){
                var d = count + 1;
                id = "U10" + d;
            }
            else{
                id = 'U1001';
            }
            return id.toString()
        } )
    } )
}

function generateBookingId () {
    // return connection.getUserCollection().then((model) => {
        // return model.countDocuments().then(() => {
    var bookId = "B" + bId;
    bId += 1;
    return bookId
}

usersDB.checkUser = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.findOne( { "contactNo": contactNo } ).then( ( customerContact ) => {
            if( customerContact ) {
                return customerContact;
            }
            else return null;
        } )
    } )
}

usersDB.getPassword = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.find( { "contactNo": contactNo }, { _id: 0, password: 1 } ).then( ( password ) => {
            if( password.length != 0 )
                return password[0].password;
            else
                return null;
        } )
    } )
}

usersDB.registerUser = ( user ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return usersDB.generateUserId().then( ( id )=>{
            return collection.updateOne( {userId: id},{$set: {name: user.name, emailId: user.emailId, contactNo: user.contactNo, password: user.password}},{upsert: true} ).then( ( data )=>{
                if( data.n ){
                    return id
                }
                else{
                    return null
                }
            } )
        } )
    } )
}

usersDB.removeTrip = ( dId,userId ) => {
    var p = 0;
    var b;
    return usersDB.getUserData( userId ).then( ( userData ) => {
        console.log( userData );
        
        if( userData ){
           for( const i in userData[0].bookings ){
               console.log( userData[0].bookings[i].destinationId,dId );
               
                if( dId == userData[0].bookings[i].destinationId ){
                    console.log( "hello" )
                    p = userData[0].bookings[i].noOfPersons;
                    b = userData[0].bookings[i].bookingId;
                    console.log( p,b );
                }
           }
            return connection.getDestinationsCollection().then( ( collection ) => {              
                return collection.updateOne( {destinationId: dId},{$inc: {availability: p}} ).then( ( Ddata )=>{
                    return connection.getHotDealsCollection().then( ( conn ) => {
                        return conn.updateOne( {destinationId: dId},{$inc: {availability: p}} ).then( ( Hdata ) => {
                            if( Ddata.nModified || Hdata.nModified ){
                                return connection.getUserCollection().then( ( conn ) => {
                                    return conn.updateOne( {userId: userId},{$pull: {bookings: {bookingId: b}}} ).then( ( uData ) => {
                                        if( uData.nModified ){
                                            return dId
                                        }
                                        else{
                                            return null
                                        }
                                    } )
                                } )
                            }
                            else{
                                return null
                            }
                        } )
                    } )
                    
                    
                } )
            } )
        }
    } )
}

usersDB.bookTrip = ( uNum,dId,data ) => {
    var id = generateBookingId();
    var a = 0;
    return connection.getUserCollection().then( ( collection ) => {
        console.log( "inside1" );
        return collection.find( {contactNo: uNum} ).then( ( bookingsData ) => {
            console.log( bookingsData,bookingsData[0].bookings );
            for( const i in bookingsData[0].bookings ){
                if( dId == bookingsData[0].bookings[i].destinationId ){
                    a += 1;
                    break;
                }
                else{
                    continue
                }
            }
            if( a == 0 ){
                return collection.updateOne( {contactNo: uNum},{$push: {bookings: {bookingId: id, noOfPersons: data.noOfPersons, startDate: data.date, destinationId: dId}}} ).then( ( updatedData )=>{
                    return connection.getHotDealsCollection().then( ( model )=>{
                        return model.findOne( {destinationId: dId} ).then( ( ddata )=>{
                            var k = data.noOfPersons;
                            if( ddata ){
                                return model.updateOne( {destinationId: dId},{$inc: {availability: -k}} ).then( ( hotdata )=>{
                                    if( hotdata.nModified && updatedData.nModified ){
                                        console.log( "inside hot" );
                                        
                                        return dId
                                    }
                                    else{
                                        return null
                                    }
                                } )
                            }
                            else{
                                console.log( "inside dest" );

                                return connection.getDestinationsCollection().then( ( destModel )=>{
                                    return destModel.updateOne( {destinationId: dId},{$inc: {availability: -k}} ).then( ( destData )=>{
                                        if( destData.nModified && updatedData.nModified ){
                                            
                                            return id
                                        }
                                        else{
                                            return null
                                        }
                                    } )
                                } )
                            }
                        } )
                    } )
                } )
            }
            else{
                return'exists'
            }
        } )
    } )
}



usersDB.getHotDeals = () => {
    return connection.getHotDealsCollection().then( ( collection ) => {
        return collection.find().then( ( hotdealdata ) => {
            if( hotdealdata ){
                return hotdealdata
            }
            else{
                return null
            }
        } )
    } )
}

usersDB.getUserData = ( id ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.find( {userId: id} ).then( ( userData ) => {
            if( userData ){
                return userData
            }
            else{
                return null
            }
        } )
    } )
}

usersDB.getDestinations = () => {
    return connection.getDestinationsCollection().then( ( collection ) => {
        return collection.find().then( ( data ) => {
            if( data ){
                return data
            }
            else{
                return null
            }
        } )
    } )
}
module.exports = usersDB;
