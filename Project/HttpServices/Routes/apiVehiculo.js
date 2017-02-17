/**
 * Created by VICTOR OQUENDO on 2/16/2017.
 */
var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/OmbuDelivery';





router.post('/saveVehiculo',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('vehiculo');
        collection.insert(req.body, {

        } );

        res.send('Info ingresada');

        db.close();

    });
});


router.post('/updateVehiculo',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);
        var item = {
            placa: req.body.cedula,
            marca: req.body.nombre,
            modelo: req.body.telefono,
            carga: req.body.email
        };
        var id = req.body.id;
        db.collection('vehiculo').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            res.send(result);
        });

        db.close();
    });
});

router.post('/getByIdVehiculo',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var id = req.body.id;
        db.collection('vehiculo').findOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log(result);
            console.log('Item loaded');
            res.send(result);
        });

        db.close();
    });
});


router.get('/getAllVehiculo',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('vehiculo');



        collection.find().toArray(function(err, results) {
            console.log(results)
            // send HTML file populated with quotes here

            res.send(results);
        });



        db.close();

    });
});
module.exports=router;