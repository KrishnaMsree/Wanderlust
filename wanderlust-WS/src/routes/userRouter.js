const express = require( 'express' );
const router = express.Router();
const setupUser = require( "../model/setupUser" )
const userservice = require( '../service/userslogin' )
const user = require( '../model/beanClasses/users' )

router.get( "/setup", ( req, res, next ) => {
    setupUser.userSetup().then( ( data ) => {
        res.send( data )
    } ).catch( err => next( err ) );
} )

//router to login
router.post( '/login', function ( req, res, next ) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login( parseInt( contactNo ), password ).then( function ( userDetails ) {
        res.json( userDetails );
    } ).catch( err => next( err ) );
} )

//router to register
router.post( '/register', function ( req, res, next ) {
    let userRegisterDetails = new user( req.body )
    userservice.register( userRegisterDetails ).then( function ( userDetails ) {
        res.json( {message: "Successfully registered with userId : "+userDetails} );
    } ).catch( err => next( err ) );
} )

//router to booking a trip
router.put( '/bookTrip/:num/:destId', function ( req, res, next ) {
    var uNum = req.params.num;
    var dId = req.params.destId;
    var data = req.body;
    userservice.bookTrip( uNum,dId,data ).then( function ( userDetails )
     {
         console.log( userDetails );
        res.json( {message: "Successfully booked the trip"} );
    } ).catch( err => next( err ) );
} )

//router to removing a trip
router.delete( '/removeTrip/:dId/:userId', function ( req, res, next ) {
    console.log( req.params.userId );
    userservice.removeTrip( req.params.dId,req.params.userId ).then( function (  ) {
        res.json( {message: "Successfully canceled the trip"} );
    } ).catch( err => next( err ) );
} )

// Router to user data
router.get( '/userData/:id',function ( req,res,next ){
    userservice.getUserData( req.params.id ).then( function ( data ){
        res.json( data );
    } ).catch( err => next( err ) );
} )


// Router to hot deals
router.get( '/hotDeals',function ( req,res,next ){
    userservice.getHotDeals().then( function ( data ){
        res.json( data );
    } ).catch( err => next( err ) );
} )

router.get( '/destinations',function ( req,res,next ){
    userservice.getDestinations().then( function ( data ){
        res.json( data );
    } ).catch( err => next( err ) );
} )

module.exports = router;

