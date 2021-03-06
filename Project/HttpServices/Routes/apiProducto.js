/**
 * Created by VICTOR OQUENDO on 2/16/2017.
 */
var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/OmbuDelivery';





router.post('/saveProducto',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('producto');
        collection.insert(req.body, {

        } );

        res.send('Info ingresada');

        db.close();

    });
});

router.post('/updateProducto',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);
        var item = {
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            detalle: req.body.detalle,
            peso: req.body.peso
        };
        var id = req.body.id;
        db.collection('producto').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            res.send(result);
        });

        db.close();
    });
});

router.post('/getByIdProducto',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var id = req.body.id;
        db.collection('producto').findOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log(result);
            console.log('Item loaded');
            res.send(result);
        });

        db.close();
    });
});


router.get('/getAllProducto',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('producto');

        collection.find().toArray(function(err, results) {
            console.log(results)
            // send HTML file populated with quotes here

            res.send(results);
        });

        db.close();

    });
});

module.exports=router;