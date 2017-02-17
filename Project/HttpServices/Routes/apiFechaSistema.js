/**
 * Created by VICTOR OQUENDO on 2/17/2017.
 */
var express= require('express');
var router= express.Router();

var assert = require('assert');

var fecha = new Date();

var dia_semana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];

var mes = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

router.get('/getFecha',function(req,res){


    var fecha_format = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
    console.log(fecha_format)
    res.send(fecha_format);

});

router.get('/getHora',function(req,res){


    var hora_format = fecha.getHours() + ":" + (fecha.getMinutes() +1) + ":" + fecha.getSeconds();
    console.log(hora_format)
    res.send(hora_format);

});

module.exports=router;