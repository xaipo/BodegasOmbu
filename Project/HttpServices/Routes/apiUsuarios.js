/**
 * Created by xaipo on 2/16/2017.
 */
var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/OmbuDelivery';





router.post('/SaveUsuarios',function(req,res){
    //console.log(req.param('var1'));
    //res.send(req.param('var1'));
   // var vec= req.param('items');

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        // insertDocument(db, function() {
        console.log(req.body);
        var collection =db.collection('usuarios');
        collection.insert(req.body, {

        } );


        res.send('ingresado');
        // db.collection(req.param('table')).insertOne(req.body);
        // db.close();
        //  });
    });
});



module.exports=router;