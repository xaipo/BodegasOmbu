/**
 * Created by xaipo on 3/4/2017.
 */
var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/OmbuDelivery';




router.post('/getReport',function(req,res){


   /* MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var name = req.body.placa;
        var password = req.body.fecha;

        db.collection('vehiculo').find({"placa":name,"password":password}, {$set: item},function(err, result) {
            assert.equal(null, err);
            console.log(result);

            db.collection('vehiculo').find({"name":name,"password":password}, {$set: item},function(err, result) {




            });
            res.send(result);

        });

        db.close();
    });*/
});4




module.exports=router;