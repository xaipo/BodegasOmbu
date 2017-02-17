/**
 * Created by VICTOR OQUENDO on 2/16/2017.
 */
var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/OmbuDelivery';


router.post('/saveCliente',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('cliente');
        collection.insert(req.body, {

        } );

        res.send('Info ingresada');

        db.close();

    });
});

router.post('/updateCliente',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);
        var item = {
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            email: req.body.email,
            direccion: req.body.direccion
        };



        var id = req.body.id;
        db.collection('cliente').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');

            res.send(result);
        });

        db.close();
    });
});

router.post('/getByIdCliente',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var id = req.body.id;
        db.collection('cliente').findOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log(result);
            console.log('Item loaded');
            res.send(result);
        });

        db.close();
    });
});


router.get('/getAllCliente',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('cliente');



        collection.find().toArray(function(err, results) {
            console.log(results);
            res.send(results);
            // send HTML file populated with quotes here
        });



        db.close();

    });
});

module.exports=router;