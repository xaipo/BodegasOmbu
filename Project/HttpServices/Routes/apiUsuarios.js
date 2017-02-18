/**
 * Created by xaipo on 2/16/2017.
 */
var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/OmbuDelivery';
var suid = require('rand-token').suid;
var objectId = require('mongodb').ObjectID;

router.post('/login',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var name = req.body.name;
        var password = req.body.password;
        var token = suid(200);
        var item={
            name:name,
            password:password,
            tk:token

        }
        db.collection('usuarios').findOneAndUpdate({"name":name,"password":password}, {$set: item},function(err, result) {
            assert.equal(null, err);
            console.log(result);
                res.send(result);

        });

        db.close();
    });
});


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