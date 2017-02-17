/**
 * Created by VICTOR OQUENDO on 2/16/2017.
 */
var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/OmbuDelivery';





router.post('/saveOrden',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('orden');
        collection.insert(req.body, {

        } );

        res.send('Info ingresada');

        db.close();

    });
});


router.post('/updateOrden',function(req,res){


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var lista = [];
        var n = req.body.listaOrdenes.length;
        for(var i=0; i<n; i++){
            var subItem ='';
            subItem.id_producto = req.body.listaOrdenes[i].id_producto;
            subItem.cantidad = req.body.listaOrdenes[i].cantidad;
            subItem.peso_total = req.body.listaOrdenes[i].peso_total;
            lista.push(subItem);
        }

        var item = {
            id_cliente: req.body.id_cliente,
            fecha_orden: req.body.fecha_orden,
            numero_factura: req.body.numero_factura,
            fecha_factura: req.body.fecha_factura,
            hora_orden: req.body.hora_orden,
            direccion : req.body.direccion,
            observacion : req.body.observacion,
            estado : req.body.estado,
            productos: lista
        };


        var id = req.body.id;
        db.collection('orden').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');

            res.send(result);
        });

        db.close();
    });
});

router.post('/getByIdOrden',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.body);

        var id = req.body.id;
        db.collection('orden').findOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log(result);
            console.log('Item loaded');
            res.send(result);
        });

        db.close();
    });
});


router.get('/getAllOrden',function(req,res){

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body);
        var collection =db.collection('orden');



        collection.find().toArray(function(err, results) {
            console.log(results);
            res.send(results);
            // send HTML file populated with quotes here
        });



        db.close();

    });
});

module.exports=router;