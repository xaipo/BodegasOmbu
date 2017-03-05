/**
 * Created by VICTOR OQUENDO on 2/16/2017.
 */
var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://192.168.1.101:27017/OmbuDelivery';





router.post('/saveDelivery',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('delivery');
        collection.insert(req.body, {

        } );

        res.send('Info ingresada');

        db.close();

    });
});


router.post('/updateDelivery',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var lista = [];
        var n = req.body.ordenes.length;
        for(var i=0; i<n; i++) {
            var subItem = {
                id_orden : req.body.ordenes[i].id_orden,
                tiempo_estimado_carga_descarga : req.body.ordenes[i].tiempo_estimado_carga_descarga,
            };
            lista.push(subItem);
        }

        var item = {
            codigo: req.body.codigo,
            id_vehiculo: req.body.id_vehiculo,
            id_chofer: req.body.id_chofer,
            fecha: req.body.fecha,
            hora_inicio: req.body.hora_inicio,
            hora_retorno: req.body.hora_retorno,
            ordenes: lista
        };


        var id = req.body.id;
        db.collection('delivery').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');

            res.send(result);
        });

        db.close();
    });
});

router.post('/getByIdDelivery',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var id = req.body.id;
        db.collection('delivery').findOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log(result);
            console.log('Item loaded');
            res.send(result);
        });

        db.close();
    });
});


router.get('/getAllDelivery',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('delivery');



        collection.find().toArray(function(err, results) {
            console.log(results);
            res.send(results);
            // send HTML file populated with quotes here
        });



        db.close();

    });
});
router.post('/getByVehiculoAndFechaDelivery',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        //console.log(req.body);

        var id_vehiculo = req.body.id_vehiculo.toString();
        console.log(id_vehiculo);
        db.collection('delivery').find({"id_vehiculo": id_vehiculo}).toArray(function(err, results){
            console.log(results); // output all records
            res.send(results);
        });
        //var fecha = req.body.fecha;
      //  db.collection('delivery').find({"id_vehiculo": id_vehiculo}, function(err, result) {
          //  assert.equal(null, err);
           // console.log(result);
           // console.log('Item loaded');

        //});

        db.close();
    });
});
module.exports=router;