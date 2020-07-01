const userDetails = require('./beanClasses/users');
const connection = require("../utilities/connections");
const collection = require('../utilities/connections');

const usersDB = {}


usersDB.generateUserId = () => {
    return connection.getUserCollection().then((model) => {
        return model.countDocuments().then((count) => {
            var id;
            if(count>0 && count<=9){
                var c = count + 1;
                id = "U100" + c;
            }
            else if(count>=10 && count<=99){
                var c = count + 1;
                id = "U10" + c;
            }
            else{
                id = 'U1001';
            }
            return id.toString()
        })
    })
}


usersDB.checkUser = (contactNo) => {
    return connection.getUserCollection().then((collection) => {
        return collection.findOne({ "contactNo": contactNo }).then((customerContact) => {
            if (customerContact) {
                return customerContact;
            }
            else return null;
        })
    })
}

usersDB.getPassword = (contactNo) => {
    return connection.getUserCollection().then((collection) => {
        return collection.find({ "contactNo": contactNo }, { _id: 0, password: 1 }).then((password) => {
            if (password.length != 0)
                return password[0].password;
            else
                return null;
        })
    })
}

usersDB.registerUser = (user) => {
    console.log(user);
    return connection.getUserCollection().then((collection) => {
        return usersDB.generateUserId().then((id)=>{
            return collection.updateOne({userId:id},{$set:{name: user.name, emailId:user.emailId, contactNo: user.contactNo, password: user.password}},{upsert:true}).then((data)=>{
                if(data.n){
                    return id
                }
                else{
                    return null
                }
            })
        })
    })
}

usersDB.getHotDeals = () => {
    return connection.getHotDealsCollection().then((collection) => {
        return collection.find().then((hotdealdata) => {
            // console.log("Hot deal data : ",hotdealdata);
            if(hotdealdata){
                return hotdealdata
            }
            else{
                return null
            }
        })
    })
}

usersDB.getDestinations = () => {
    return connection.getDestinationsCollection().then((collection) => {
        return collection.find().then((data) => {
            console.log("destinations : ",data)
            if(data){
                return data
            }
            else{
                return null
            }
        })
    })
}
module.exports = usersDB;
