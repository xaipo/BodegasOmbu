/**
 * Created by VICTOR OQUENDO on 2/22/2017.
 */









app.controller('DeliveryController',  ['$scope', '$http', '$location', 'myProvider',  '$localStorage', function ($scope, $http, $location, myProvider, $localStorage ) {

    $scope.id_vehiculoSearch = '';
    $scope.fechaSearch = '';


    $scope.selectOrden='';
    $scope.selectProdOrden='';

    $scope.selectedOrdenRow ='';
    $scope.selectedProdOrdenRow ='';


    $scope.searchVehiculo = '';
    $scope.searchChofer = '';
    $scope.searchOrden = '';
    $scope.searchProductoOrden='';
    $scope.searchOrdenTarget = '';
    $scope.searchProductoOrdenTarget='';

    $scope.listaVehiculos = [];
    $scope.listaChoferes = [];
    $scope.listaOrdenes = [];
    $scope.listaProductoOrden= [];
    $scope.listaOrdenesTarget = [];
    $scope.listaProductoOrdenTarget= [];

    $scope.objVehiculoSelect = '';
    $scope.objChoferSelect = '';
    $scope.objOrdenSelect = '';
    $scope.objProductoOrdenSelect='';
    $scope.objOrdenSelectTarget = '';
    $scope.objProductoOrdenSelectTarget='';


    $scope.objVehiculo ={
        _id:'',
        placa:'',
        marca:'',
        modelo:'',
        carga:0
    };

    $scope.objChofer={
        _id:'',
        cedula:'',
        nombre:'',
        telefono:''
    };

    $scope.objOrden={
        _id:'',
        codigo:'',
        id_cliente: '',
        fecha_orden: '',
        numero_factura: '',
        fecha_factura: '',
        hora_orden: 0,
        minutos_orden:0,
        direccion : '',
        observacion : '',
        estado : '0',
        productos: [],

        nombre_cliente:'',
        tiempo_estimado_carga_descarga:0
    };

    $scope.productoOrden ={
        id_producto : '',
        cantidad : 0,
        peso_total : 0,
        estado : '0',

        nombre_producto:''
    };

    $scope.objOrdenTarget={
        _id:'',
        codigo:'',
        id_cliente: '',
        fecha_orden: '',
        numero_factura: '',
        fecha_factura: '',
        hora_orden: 0,
        minutos_orden:0,
        direccion : '',
        observacion : '',
        estado : '0',
        productos: [],

        nombre_cliente:''
    };

    $scope.productoOrdenTarget ={
        id_producto : '',
        cantidad : 0,
        peso_total : 0,
        estado : '0',

        nombre_producto:''
    };




    $scope.objRes ='';


    $scope.id = '';
    $scope.lista = [];
    $scope.selectedRow ;

    $scope.search = '';
    $scope.listaSubOrden = [];
    $scope.listaSubOrdenProducto = [];
    $scope.selected = "";

    $scope.cargaAcumulada = 0;

    $scope.obj = {
        codigo:'',
        id_vehiculo : '',
        id_chofer: '',
        fecha:'',
        hora_inicio:0,
        minutos_inicio:0,
        hora_retorno:0,
        minutos_retorno:0,
        estado:'0',
        ordenes :[]
    };

    $scope.objSubOrden = {
        id_orden :'',
        tiempo_estimado_carga_descarga : 0,
        productos : []
    };

    $scope.objSubOrdenProducto={
        id_producto:''
    };


    $scope.redirectConfirmacionEntregas=function(){
        window.location ='RegistroEntregarOrden.html';
    }

    $scope.redirectLogisticaEntregas=function(){
        window.location ='LogisticaEntregas.html';
    }
    $scope.redirectIngresar=function(){
        window.location ='LogisticaEntregaIngresar.html';
    }
    $scope.redirectModificar=function(index, item){

        window.localStorage.setItem("id_delivery", JSON.stringify(item._id));
        window.location ='LogisticaEntregaModificar.html';
    }


    $scope.changeTypeVehiculo=function(){
        $scope.objVehiculo=JSON.parse($scope.objVehiculoSelect);
        $scope.obj.id_vehiculo=$scope.objVehiculo._id;
        console.log($scope.objVehiculo);
    }

    $scope.changeTypeVehiculoReporte=function(){
        $scope.objVehiculo=JSON.parse($scope.objVehiculoSelect);
        $scope.id_vehiculoSearch=$scope.objVehiculo._id;
        console.log($scope.objVehiculo);
    }

    $scope.changeTypeChofer=function(){
        $scope.objChofer=JSON.parse($scope.objChoferSelect);
        $scope.obj.id_chofer=$scope.objChofer._id;
        console.log($scope.objChofer);
    }

    $scope.changeTypeOrden=function(){
        $scope.objOrden=JSON.parse($scope.objOrdenSelect);
        $scope.listaProductoOrden = [];
        var n = $scope.objOrden.productos.length;
        for(var i=0; i<n; i++){
            if($scope.objOrden.productos[i].estado == '0'){
                console.log("producto " +i);
                $scope.listaProductoOrden.push($scope.objOrden.productos[i]);
            }
        }

        $scope.listaProductoOrden.reduce(
            function (sequence, value) {
                return sequence.then(function() {
                    return promiseProductoOrdenById(value);
                }).then(function(obj) {
                    console.log('END execution with value =', obj.value,
                        'and result =', obj.result);
                });
            },
            Promise.resolve()
        ).then(function() {
                console.log('COMPLETED');
        });

        console.log($scope.objOrden);
    };

    $scope.changeTypeOrdenTarget = function(){
        $scope.objOrdenTarget=JSON.parse($scope.objOrdenSelectTarget);
        $scope.listaProductoOrdenTarget = [];
        var n = $scope.objOrdenTarget.productos.length;
        for(var i=0; i<n; i++){
            if($scope.objOrdenTarget.productos[i].estado == '1'){
                console.log("producto " +i);
                $scope.listaProductoOrdenTarget.push($scope.objOrdenTarget.productos[i]);
            }
        }


        $scope.listaProductoOrdenTarget.reduce(
            function (sequence, value) {
                return sequence.then(function() {
                    return promiseProductoOrdenById(value);
                }).then(function(obj) {
                    console.log('END execution with value =', obj.value,
                        'and result =', obj.result);
                });
            },
            Promise.resolve()
        ).then(function() {
                console.log('COMPLETED');
            });

        console.log($scope.objOrdenTarget);
    }


    $scope.changeTypeOrdenConfirmacionEntrega=function(){
        if($scope.objOrdenSelect !=''){
            $scope.objOrden=JSON.parse($scope.objOrdenSelect);
            $scope.listaProductoOrden = [];
            var n = $scope.objOrden.productos.length;
            for(var i=0; i<n; i++){
                if($scope.objOrden.productos[i].estado == '1'){
                    console.log("producto " +i);
                    $scope.listaProductoOrden.push($scope.objOrden.productos[i]);
                }
            }

            $scope.listaProductoOrden.reduce(
                function (sequence, value) {
                    return sequence.then(function() {
                        return promiseProductoOrdenById(value);
                    }).then(function(obj) {
                        console.log('END execution with value =', obj.value,
                            'and result =', obj.result);
                    });
                },
                Promise.resolve()
            ).then(function() {
                    console.log('COMPLETED');
                });

            console.log($scope.objOrden);
        }

    };


    $scope.changeTypeProductoOrden=function(){
        $scope.objProductoOrden=JSON.parse($scope.objProductoOrdenSelect);
        console.log($scope.objProductoOrden);
    }


    $scope.agregarOrdenTotal=function(){
        if($scope.objOrden != ''){

            $scope.objOrden.estado = '1'; //estado 0:pendiente 1:asignado 2:entregado
            var l1 = $scope.objOrden.productos.length;
            for(var l2=0; l2<l1; l2++){
                $scope.objOrden.productos[l2].estado = '1'; //estado 0:pendiente 1:asignado 2:entregado
            }

            //console.log("cambio estado: "+ angular.toJson($scope.objOrden));
            $scope.listaOrdenesTarget.push($scope.objOrden);

            $scope.cargaAcumulada = 0;
            var m = $scope.listaOrdenesTarget.length;

            for(var j=0; j<m; j++){
                var mm=$scope.listaOrdenesTarget[j].productos.length;

                for(var k = 0; k<mm; k++){
                    $scope.cargaAcumulada += $scope.listaOrdenesTarget[j].productos[k].peso_total;
                }
            }

            var n=$scope.listaOrdenes.length;
            var i=0;
            while(i<n){
                if($scope.listaOrdenes[i]._id == $scope.objOrden._id) {
                    $scope.listaOrdenes.splice(i ,1);
                    i=n;
                }
                i++;
            }

            $scope.objOrden='';
            $scope.listaProductoOrden = [];
            $scope.objProductoOrden = '';

            console.log("break agregar: "+ angular.toJson($scope.listaOrdenesTarget));
        }
    }


    $scope.confirmarOrdenDelivery=function(){
        if($scope.objOrden != ''){

            $scope.objOrden.estado = '2'; //estado 0:pendiente 1:asignado 2:entregado
            var l1 = $scope.objOrden.productos.length;
            for(var l2=0; l2<l1; l2++){
                $scope.objOrden.productos[l2].estado = '2'; //estado 0:pendiente 1:asignado 2:entregado
            }

            //console.log("cambio estado: "+ angular.toJson($scope.objOrden));
            $scope.listaOrdenesTarget.push($scope.objOrden);

            $scope.cargaAcumulada = 0;
            var m = $scope.listaOrdenesTarget.length;

            for(var j=0; j<m; j++){
                var mm=$scope.listaOrdenesTarget[j].productos.length;

                for(var k = 0; k<mm; k++){
                    $scope.cargaAcumulada += $scope.listaOrdenesTarget[j].productos[k].peso_total;
                }
            }

            var n=$scope.listaOrdenes.length;
            var i=0;
            while(i<n){
                if($scope.listaOrdenes[i]._id == $scope.objOrden._id) {
                    $scope.listaOrdenes.splice(i ,1);
                    i=n;
                }
                i++;
            }

            $scope.objOrden='';
            $scope.listaProductoOrden = [];
            $scope.objProductoOrden = '';

            console.log("break agregar: "+ angular.toJson($scope.listaOrdenesTarget));
        }
    }

   /* $scope.agregarProductoOrdenParcial=function(){

        if($scope.objProductoOrden != ''){

            $scope.cargaAcumulada = 0;
            var m = $scope.listaOrdenesTarget.length;
            console.log("target: "+m);
            for(var j=0; j<m; j++){
                var mm=$scope.listaOrdenesTarget[j].productos.length;
                console.log("prodtarget: "+mm);
                for(var k = 0; k<mm; k++){
                    $scope.cargaAcumulada += $scope.listaOrdenesTarget[j].productos[k].peso_total;
                }
            }

            var verf = false;
            var n=$scope.listaOrdenesTarget.length;
            var i=0;
            while(i<n){
                if($scope.listaOrdenesTarget[i]._id == $scope.objOrden._id) {
                    $scope.listaOrdenesTarget[i].productos.push($scope.objProductoOrden);
                    i=n;
                    verf = true;
                }

                i++;
            }
            if(verf==false) {
                $scope.objOrden.productos = [];
                $scope.objOrden.productos.push($scope.objProductoOrden);
                $scope.listaOrdenesTarget.push($scope.objOrden);
            }

            var n=$scope.listaOrdenes.length;
            var i=0;
            while(i<n){
                if($scope.listaOrdenes[i]._id == $scope.objOrden._id) {
                    var nn = $scope.listaOrdenes[i].productos.length;
                    var ii=0;
                    while( ii<nn) {
                        if($scope.listaOrdenes[i].productos[ii].id_producto == $scope.objProductoOrden.id_producto) {
                            $scope.listaOrdenes[i].productos.splice(ii,1);
                            $scope.listaProductoOrden.splice(ii,1);
                            ii=nn;
                        }
                        ii++;
                    }

                    if($scope.listaOrdenes[i].productos.length==0) {
                        $scope.listaOrdenes.splice(i ,1);
                        $scope.listaProductoOrden = [];
                        i=n;
                    }

                }
                i++;
            }
            $scope.objProductoOrden = '';
        }
    }*/


    $scope.quitarOrdenTarget= function () {
        if($scope.objOrdenSelectTarget!=''){
            var auxOrden=JSON.parse($scope.objOrdenSelectTarget);
            auxOrden.estado = '0'; //estado 0:pendiente 1:asignado 2:entregado
            var control = false;
            var n = $scope.listaOrdenes.length;
            var i=0;
            while(i<n){
                if($scope.listaOrdenes[i]._id==auxOrden._id){
                    var m = auxOrden.productos.length;
                    for(var j=0; j<m; j++){
                        auxOrden.productos[j].estado = '0';//estado 0:pendiente 1:asignado 2:entregado
                        $scope.listaOrdenes[i].productos.push(auxOrden.productos[j]);
                    }
                    i=n;
                    control = true;
                }
                i++;
            };

            if(!control){
                var m1 = auxOrden.productos.length;
                for(var j1=0; j1<m1; j1++){
                    auxOrden.productos[j1].estado = '0';//estado 0:pendiente 1:asignado 2:entregado
                }
                $scope.listaOrdenes.push(auxOrden);
            }


            var nn = $scope.listaOrdenesTarget.length;
            var ii=0;
            while(ii<nn) {
                if($scope.listaOrdenesTarget[ii]._id == auxOrden._id){
                    $scope.listaOrdenesTarget.splice(ii,1);
                    ii=nn;
                }
                ii++;
            };

            $scope.listaProductoOrdenTarget = [];
            $scope.objOrdenSelectTarget = '';
            $scope.listaProductoOrden = [];

            console.log("break quitar: "+ angular.toJson($scope.listaOrdenes));
        }
    }

    $scope.quitarOrdenTargetUpdate= function () {
        if($scope.objOrdenSelectTarget!=''){
            var auxOrden=JSON.parse($scope.objOrdenSelectTarget);
            auxOrden.estado = '0'; //estado 0:pendiente 1:asignado 2:entregado
            var control = false;
            var n = $scope.listaOrdenes.length;
            var i=0;
            while(i<n){
                if($scope.listaOrdenes[i]._id==auxOrden._id){
                    var m = auxOrden.productos.length;
                    for(var j=0; j<m; j++){
                        auxOrden.productos[j].estado = '0';//estado 0:pendiente 1:asignado 2:entregado
                        $scope.listaOrdenes[i].productos.push(auxOrden.productos[j]);
                    }
                    i=n;
                    control = true;
                }
                i++;
            };

            if(!control){
                var m1 = auxOrden.productos.length;
                for(var j1=0; j1<m1; j1++){
                    auxOrden.productos[j1].estado = '0';//estado 0:pendiente 1:asignado 2:entregado
                }
                $scope.listaOrdenes.push(auxOrden);
            }


            var nn = $scope.listaOrdenesTarget.length;
            var ii=0;
            while(ii<nn) {
                if($scope.listaOrdenesTarget[ii]._id == auxOrden._id){
                    $scope.listaOrdenesTarget.splice(ii,1);
                    ii=nn;
                }
                ii++;
            };

            // PROMESA ASINCRONA promiseUpdateProductoOrdenByIdOrden tabla Orden **********************************************************
            $scope.listaOrdenes.reduce(
                function (sequence, value) {
                    return sequence.then(function() {
                        return promiseUpdateProductoOrdenByIdOrden(value);
                    }).then(function(obj) {
                        console.log('update go =', obj.value,
                            'and go =', obj.result);
                    });
                },
                Promise.resolve()
            ).then(function() {
                    console.log('COMPLETED');

                });
            //  ****************************************************************************************************

            $scope.listaProductoOrdenTarget = [];
            $scope.objOrdenSelectTarget = '';
            $scope.listaProductoOrden = [];

            console.log("break quitar: "+ angular.toJson($scope.listaOrdenes));
        }
    }


    $scope.quitarOrdenConfirmacionOrdenDelivery= function () {
        if($scope.objOrdenSelectTarget!=''){
            var auxOrden=JSON.parse($scope.objOrdenSelectTarget);
            auxOrden.estado = '1'; //estado 0:pendiente 1:asignado 2:entregado
            var control = false;
            var n = $scope.listaOrdenes.length;
            var i=0;
            while(i<n){
                if($scope.listaOrdenes[i]._id==auxOrden._id){
                    var m = auxOrden.productos.length;
                    for(var j=0; j<m; j++){
                        auxOrden.productos[j].estado = '1';//estado 0:pendiente 1:asignado 2:entregado
                        $scope.listaOrdenes[i].productos.push(auxOrden.productos[j]);
                    }
                    i=n;
                    control = true;
                }
                i++;
            };

            if(!control){
                var m1 = auxOrden.productos.length;
                for(var j1=0; j1<m1; j1++){
                    auxOrden.productos[j1].estado = '1';//estado 0:pendiente 1:asignado 2:entregado
                }
                $scope.listaOrdenes.push(auxOrden);
            }


            var nn = $scope.listaOrdenesTarget.length;
            var ii=0;
            while(ii<nn) {
                if($scope.listaOrdenesTarget[ii]._id == auxOrden._id){
                    $scope.listaOrdenesTarget.splice(ii,1);
                    ii=nn;
                }
                ii++;
            };

            // PROMESA ASINCRONA promiseUpdateProductoOrdenByIdOrden tabla Orden **********************************************************
            $scope.listaOrdenes.reduce(
                function (sequence, value) {
                    return sequence.then(function() {
                        return promiseUpdateProductoOrdenByIdOrden(value);
                    }).then(function(obj) {
                        console.log('update go =', obj.value,
                            'and go =', obj.result);
                    });
                },
                Promise.resolve()
            ).then(function() {
                    console.log('COMPLETED');

                });
            //  ****************************************************************************************************

            $scope.listaProductoOrdenTarget = [];
            $scope.objOrdenSelectTarget = '';
            $scope.listaProductoOrden = [];

            console.log("break quitar confirmacion: "+ angular.toJson($scope.listaOrdenes));
        }
    }







    $scope.cargaVehiculosChoferesOrdenes = function () {


        $scope.listaVehiculos = [];

        $http({
            method: 'GET',
            url: myProvider.getVehiculo() + '/getAllVehiculo',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            var n = response.data.length;
            if (n == 0) {
                alert('no se encontro informacion');
            } else {
                for (var i = 0; i < n; i++) {
                    $scope.aux = response.data[i];
                    $scope.listaVehiculos.push($scope.aux);
                }



                console.log($scope.listaVehiculos);
            }
        }, function errorCallback(response) {
            console.log('entra');
            $scope.mesaje = response.mensaje;
        });



        $scope.listaChoferes = [];

        $http({
            method: 'GET',
            url: myProvider.getChofer() + '/getAllChofer',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            var n = response.data.length;
            if (n == 0) {
                alert('no se encontro informacion');
            } else {
                for (var i = 0; i < n; i++) {
                    $scope.aux = response.data[i];
                    $scope.listaChoferes.push($scope.aux);
                }
                console.log($scope.listaChoferes);
            }
        }, function errorCallback(response) {
            console.log('entra');
            $scope.mesaje = response.mensaje;
        });


        $scope.listaOrdenes = [];

        $http({
            method: 'GET',
            url: myProvider.getOrden() + '/getAllOrden',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            var n = response.data.length;
            if (n == 0) {
                alert('no se encontro informacion');
            } else {
                for (var i = 0; i < n; i++) {
                    $scope.aux = response.data[i];

                    if($scope.aux.estado == '0'){

                        $scope.listaOrdenes.push($scope.aux);
                    }

                }

                // PROMESA ASINCRONA CONTROL getCLIENTE BY ID **********************************************************
                $scope.listaOrdenes.reduce(
                    function (sequence, value) {
                        return sequence.then(function() {
                            return promiseClienteById(value);
                        }).then(function(obj) {
                            console.log('END execution with value =', obj.value,
                                'and result =', obj.result);
                        });
                    },
                    Promise.resolve()
                ).then(function() {
                        console.log('COMPLETED');
                    });
                //  ****************************************************************************************************


                console.log($scope.listaOrdenes);

            }
        }, function errorCallback(response) {
            console.log('entra');
            $scope.mesaje = response.mensaje;
        });

    };


    $scope.cargaOrdenes = function () {

        $scope.listaOrdenes = [];

        $http({
            method: 'GET',
            url: myProvider.getOrden() + '/getAllOrden',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            var n = response.data.length;
            if (n == 0) {
                alert('no se encontro informacion');
            } else {
                for (var i = 0; i < n; i++) {
                    $scope.aux = response.data[i];

                    if($scope.aux.estado == '1'){

                        $scope.listaOrdenes.push($scope.aux);
                    }

                }

                // PROMESA ASINCRONA CONTROL getCLIENTE BY ID **********************************************************
                $scope.listaOrdenes.reduce(
                    function (sequence, value) {
                        return sequence.then(function() {
                            return promiseClienteById(value);
                        }).then(function(obj) {
                            console.log('END execution with value =', obj.value,
                                'and result =', obj.result);
                        });
                    },
                    Promise.resolve()
                ).then(function() {
                        console.log('COMPLETED');
                    });
                //  ****************************************************************************************************


                console.log($scope.listaOrdenes);

            }
        }, function errorCallback(response) {
            console.log('entra');
            $scope.mesaje = response.mensaje;
        });

    };

//funcion que llama a un web services cuando inicializa la pagina

    $scope.inicializar = function () {

        $scope.us = JSON.parse(window.localStorage.getItem('se'));

        if($scope.us==null){
            window.location ='./error.html';

        }
        $scope.lista = [];
        $http({
            method: 'GET',
            url: myProvider.getDelivery() + '/getAllDelivery',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            var n = response.data.length;
            if (n == 0) {
                alert('no se encontro informacion');
            } else {

                for (var i = 0; i < n; i++) {

                    var auxObj = response.data[i];

                    promiseVehiculoById(auxObj);

                    promiseChoferById(auxObj);

                    // PROMESA ASINCRONA getOrdenById tabla ORDEN*******************************************************
                    auxObj.ordenes.reduce(
                     function (sequence, value) {
                     return sequence.then(function() {
                     return promiseOrdenById(value);
                     }).then(function(obj) {
                     console.log('END Ordenes with value =', obj.value,
                     'and result =', obj.result);
                     });
                     },
                     Promise.resolve()
                     ).then(function() {
                     console.log('COMPLETED ordenes: ');
                     });
                     //  ************************************************************************************************

                    $scope.lista.push(auxObj);

                }
                console.log("SALIMOS DEL POST: " + $scope.lista);
            }
        }, function errorCallback(response) {
            console.log('entra');
            $scope.mesaje = response.mensaje;
        });

    };




    $scope.generarReporteImpreso = function () {
        $scope.lista = [];
        $http({
            method: 'POST',
            url: myProvider.getDelivery() + '/getByVehiculoAndFechaDelivery',
            headers: {
                'Content-Type': 'application/json'
            },
            data :{
                id_vehiculo :$scope.id_vehiculoSearch,
                fecha : $scope.fechaSearch
            }
        }).then(function successCallback(response) {
            var n = response.data.length;
            if (n == 0) {
                alert('no se encontro informacion reporte');
            } else {

                for (var i = 0; i < n; i++) {

                    var auxObj = response.data[i];

                    promiseVehiculoById(auxObj);

                    promiseChoferById(auxObj);

                    // PROMESA ASINCRONA getOrdenById tabla ORDEN*******************************************************
                    auxObj.ordenes.reduce(
                        function (sequence, value) {
                            return sequence.then(function() {
                                return promiseOrdenById(value);
                            }).then(function(obj) {
                                console.log('END Ordenes with value =', obj.value,
                                    'and result =', obj.result);
                            });
                        },
                        Promise.resolve()
                    ).then(function() {
                            console.log('COMPLETED ordenes: ');
                        });
                    //  ************************************************************************************************

                    $scope.lista.push(auxObj);

                }
                console.log("SALIMOS DEL POST reporte: " + angular.toJson($scope.lista));
            }
        }, function errorCallback(response) {
            console.log('entra falla reporte');
            $scope.mesaje = response.mensaje;
        });

    };


    $scope.inicializarUpdate = function (){

        $scope.cargaVehiculosChoferesOrdenes();
        $scope.id = JSON.parse(window.localStorage.getItem('id_delivery'));
        $scope.obj._id = JSON.parse(window.localStorage.getItem('id_delivery'));


        //$scope.id = item._id;
        //$scope.selectedRow = index;

        console.log($scope.id);
        $http({

            method: 'POST',
            url: myProvider.getDelivery() + '/getByIdDelivery',

            headers: {
                'Content-Type': 'application/json'
            },
            data :{id :$scope.id}


        }).then(function successCallback(response) {
            var n = response.data.length;
            if (n == 0) {
                alert('no se encontro informacion ORDEN');
            } else {
                $scope.obj = response.data;

                $scope.obj.fecha =  new Date($scope.obj.fecha);

                $scope.objVehiculo._id = response.data.id_vehiculo;
                $scope.objChofer._id = response.data.id_chofer;


                promiseVehiculoByIdLoadUpdate($scope.objVehiculo);
                promiseChoferByIdLoadUpdate( $scope.objChofer);

                $scope.listaOrdenesTarget = response.data.ordenes;

                // PROMESA ASINCRONA getOrdenById tabla ORDEN*******************************************************
                $scope.listaOrdenesTarget.reduce(
                    function (sequence, value) {
                        return sequence.then(function() {
                            return promiseOrdenById(value);
                        }).then(function(obj) {


                            value._id = value.id_orden;

                            console.log('END Ordenes Target with value =', obj.value,
                                'and result =', obj.result);
                        });
                    },
                    Promise.resolve()
                ).then(function() {
                        console.log('COMPLETED ordenes: ');
                    });
                //  ************************************************************************************************


                console.log("objeto target: "+ angular.toJson($scope.listaOrdenesTarget));
            }
        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });
    }


    $scope.save = function (){


        var n = $scope.listaOrdenesTarget.length;
        for(var i=0; i<n; i++){
            var aux = {
                id_orden:'',
                tiempo_estimado_carga_descarga:0
            };
            aux.id_orden = $scope.listaOrdenesTarget[i]._id;
            aux.tiempo_estimado_carga_descarga = $scope.listaOrdenesTarget[i].tiempo_estimado_carga_descarga;

            $scope.obj.ordenes.push(aux);
        };


        $http({
            method: 'POST',
            url: myProvider.getDelivery() + '/saveDelivery',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                codigo:$scope.obj.codigo,
                id_vehiculo : $scope.obj.id_vehiculo,
                id_chofer: $scope.obj.id_chofer,
                fecha:$scope.obj.fecha,
                hora_inicio:$scope.obj.hora_inicio,
                minutos_inicio:$scope.obj.minutos_inicio,
                hora_retorno:$scope.obj.hora_retorno,
                minutos_retorno:$scope.obj.minutos_retorno,
                estado:$scope.obj.estado,
                ordenes : $scope.obj.ordenes

            }
        }).then(function successCallback(response) {
            console.log('save: ' + $scope.obj);

            // PROMESA ASINCRONA promiseUpdateProductoOrdenByIdOrden tabla Orden **********************************************************
            $scope.listaOrdenesTarget.reduce(
                function (sequence, value) {
                    return sequence.then(function() {
                        return promiseUpdateProductoOrdenByIdOrden(value);
                    }).then(function(obj) {
                        console.log('update go =', obj.value,
                            'and go =', obj.result);
                    });
                },
                Promise.resolve()
            ).then(function() {
                    console.log('COMPLETED');
                    window.location ='LogisticaEntregas.html';
                });
            //  ****************************************************************************************************


            $scope.obj = {
                codigo:'',
                id_vehiculo : '',
                id_chofer: '',
                fecha:'',
                hora_inicio:0,
                minutos_inicio:0,
                hora_retorno:0,
                minutos_retorno:0,
                estado:"0",
                ordenes :[]
            };

            $scope.listaOrdenesTarget = [];
            $scope.listaProductoOrdenTarget = [];
            $scope.objOrdenSelectTarget = '';
            $scope.listaProductoOrden = [];


            $scope.inicializar();
            console.log('POST');
        }, function errorCallback(response) {
            console.log('falla');
        });

        //window.location ='LogisticaEntregas.html';

    }


    $scope.update = function (){

        $scope.id = $scope.obj._id;
        console.log($scope.obj);

        $scope.obj.ordenes=[];
        var n = $scope.listaOrdenesTarget.length;
        for(var i=0; i<n; i++){
            var aux = {
                id_orden:'',
                tiempo_estimado_carga_descarga:0
            };
            aux.id_orden = $scope.listaOrdenesTarget[i]._id;
            aux.tiempo_estimado_carga_descarga = $scope.listaOrdenesTarget[i].tiempo_estimado_carga_descarga;

            $scope.obj.ordenes.push(aux);
        };

        console.log("break 2: " + angular.toJson($scope.obj.ordenes));





        console.log('ENTRA1');
        $http({
            method: 'POST',
            url: myProvider.getDelivery() + '/updateDelivery',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                id :$scope.id,
                codigo:$scope.obj.codigo,
                id_vehiculo : $scope.obj.id_vehiculo,
                id_chofer: $scope.obj.id_chofer,
                fecha:$scope.obj.fecha,
                hora_inicio:$scope.obj.hora_inicio,
                minutos_inicio:$scope.obj.minutos_inicio,
                hora_retorno:$scope.obj.hora_retorno,
                minutos_retorno:$scope.obj.minutos_retorno,
                estado:$scope.obj.estado,
                ordenes : $scope.obj.ordenes
            }
        }).then(function successCallback(response) {


            // PROMESA ASINCRONA promiseUpdateProductoOrdenByIdOrden tabla Orden **********************************************************
            $scope.listaOrdenesTarget.reduce(
                function (sequence, value) {
                    return sequence.then(function() {
                        return promiseUpdateProductoOrdenByIdOrden(value);
                    }).then(function(obj) {
                        console.log('update go =', obj.value,
                            'and go =', obj.result);
                    });
                },
                Promise.resolve()
            ).then(function() {
                    console.log('COMPLETED');
                    window.location ='LogisticaEntregas.html';




                });
            //  ****************************************************************************************************

            $scope.obj = {
                codigo:'',
                id_vehiculo : '',
                id_chofer: '',
                fecha:'',
                hora_inicio:0,
                minutos_inicio:0,
                hora_retorno:0,
                minutos_retorno:0,
                estado:"0",
                ordenes :[]
            };

            $scope.listaOrdenesTarget = '';
            $scope.listaProductoOrdenTarget = [];
            $scope.objOrdenSelectTarget = '';
            $scope.listaProductoOrden = [];

            $scope.inicializar();
            $scope.inicializarUpdate();
            console.log('POST');
        }, function errorCallback(response) {
            console.log('falla');
        });


    }




    $scope.updateConfirmacionOrdenDelivery = function (){


        // PROMESA ASINCRONA promiseUpdateProductoOrdenByIdOrden tabla Orden **********************************************************
        $scope.listaOrdenesTarget.reduce(
            function (sequence, value) {
                return sequence.then(function() {
                    return promiseUpdateProductoOrdenByIdOrden(value);
                }).then(function(obj) {
                    console.log('update go =', obj.value,
                        'and go =', obj.result);
                });
            },
            Promise.resolve()
        ).then(function() {
                console.log('COMPLETED');


                $scope.listaOrdenesTarget = '';
                $scope.listaProductoOrdenTarget = [];
                $scope.objOrdenSelectTarget = '';
                $scope.listaProductoOrden = [];
                window.location ='LogisticaEntregas.html';

            });
        //  ****************************************************************************************************


    }




    //BUSQUEDAS INDIVIDUALES  PROMISE******************************************************************************************



    function promiseOrdenById(value){
        return new Promise(function (fulfill, reject){
            console.log('START Orden with value =', value);
            setTimeout(function() {
                $http({

                    method: 'POST',
                    url: myProvider.getOrden() + '/getByIdOrden',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data :{id :value.id_orden}


                }).then(function successCallback(response) {
                    var n = response.data.length;
                    if (n == 0) {
                        alert('no se encontro informacion ORDEN');
                    } else {

                        value.codigo = response.data.codigo;
                        value.id_cliente = response.data.id_cliente;
                        value.numero_factura = response.data.numero_factura;
                        value.direccion = response.data.direccion;
                        value.observacion = response.data.observacion;
                        value.estado = response.data.estado;
                        value.fecha_orden = response.data.fecha_orden;
                        value.productos = response.data.productos;


                        promiseClienteById(value);


                        // PROMESA ASINCRONA getProductosOrdenById tabla producto**************************************************
                       value.productos.reduce(
                            function (sequence, value) {
                                return sequence.then(function() {
                                    return promiseProductoOrdenById(value);
                                }).then(function(obj) {

                                    console.log('END producto with value =', obj.value,
                                        'and result =', obj.result);
                                });
                            },
                            Promise.resolve()
                        ).then(function() {
                                console.log('COMPLETED');
                            });
                        //  ************************************************************************************************


                    }
                }, function errorCallback(response) {
                    console.log('entra');
                    //  Console.log(response);
                    //$scope.mesaje = response.mensaje;

                });

                fulfill( { value: value, result: value });

            }, 0 | Math.random() * 100);


        });
    }




    function promiseProductoOrdenById(value){
        return new Promise(function (fulfill, reject){
            console.log('START OrdenProducto with value =', value);
            setTimeout(function() {

                //var aa = $scope.getProductoById(value.id_producto);

                $http({

                    method: 'POST',
                    url: myProvider.getProducto() + '/getByIdProducto',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data :{id :value.id_producto}


                }).then(function successCallback(response) {
                    var n = response.data.length;
                    if (n == 0) {
                        alert('no se encontro informacion');
                    } else {

                        value.nombre_producto = response.data.nombre;

                    }
                }, function errorCallback(response) {
                    console.log('entra');
                    //  Console.log(response);
                    //$scope.mesaje = response.mensaje;

                });



                fulfill({ value: value, result: value });
            }, 0 | Math.random() * 100);
        });
    }


    function promiseClienteById(value){
        return new Promise(function (fulfill, reject){
            console.log('START cliente with value =', value);
            setTimeout(function() {

                $http({
                    method: 'POST',
                    url: myProvider.getCliente() + '/getByIdCliente',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data :{id :value.id_cliente}


                }).then(function successCallback(response) {
                    var n = response.data.length;
                    if (n == 0) {
                        alert('no se encontro informacion CLIENTE '+ value.id_cliente);
                    } else {

                        value.nombre_cliente = response.data.nombre;

                    }
                }, function errorCallback(response) {
                    console.log('entra');

                });

                fulfill({ value: value, result: value });
            }, 0 | Math.random() * 100);
        });
    }






    function promiseVehiculoById(value){
        return new Promise(function (fulfill, reject){
            console.log('START vehiculo with value =', value);
            setTimeout(function() {

                $http({

                    method: 'POST',
                    url: myProvider.getVehiculo() + '/getByIdVehiculo',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data :{id :value.id_vehiculo}


                }).then(function successCallback(response) {
                    var n = response.data.length;
                    if (n == 0) {
                        alert('no se encontro informacion VEHICULO');
                    } else {
                        value.vehiculo = response.data.placa + " (" +response.data.marca+" - " +response.data.modelo+ ")";
                    }
                }, function errorCallback(response) {
                    console.log('entra');
                });

                fulfill({ value: value, result: value });
            }, 0 | Math.random() * 100);
        });
    }

    function promiseVehiculoByIdLoadUpdate(value){
        return new Promise(function (fulfill, reject){
            console.log('START vehiculo with value =', value);
            setTimeout(function() {

                $http({

                    method: 'POST',
                    url: myProvider.getVehiculo() + '/getByIdVehiculo',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data :{id :value._id}


                }).then(function successCallback(response) {
                    var n = response.data.length;
                    if (n == 0) {
                        alert('no se encontro informacion VEHICULO');
                    } else {
                        $scope.objVehiculo = response.data;
                        $scope.objVehiculoSelect = response.data;

                        console.log("ayuda: " + angular.toJson($scope.objVehiculo));
                    }
                }, function errorCallback(response) {
                    console.log('entra');
                });

                fulfill({ value: value, result: value });
            }, 0 | Math.random() * 100);
        });
    }

    function promiseChoferById(value){
        return new Promise(function (fulfill, reject){
            console.log('START chofer with value =', value);
            setTimeout(function() {

                $http({

                    method: 'POST',
                    url: myProvider.getChofer() + '/getByIdChofer',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data :{id :value.id_chofer}


                }).then(function successCallback(response) {
                    var n = response.data.length;
                    if (n == 0) {
                        alert('no se encontro informacion CHOFER');
                    } else {
                        value.chofer = response.data.nombre + " (" +response.data.cedula+ ")";
                    }
                }, function errorCallback(response) {
                    console.log('entra');
                });

                fulfill({ value: value, result: value });
            }, 0 | Math.random() * 100);
        });
    }

    function promiseChoferByIdLoadUpdate(value){
        return new Promise(function (fulfill, reject){
            console.log('START chofer with value =', value);
            setTimeout(function() {

                $http({

                    method: 'POST',
                    url: myProvider.getChofer() + '/getByIdChofer',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data :{id :value._id}


                }).then(function successCallback(response) {
                    var n = response.data.length;
                    if (n == 0) {
                        alert('no se encontro informacion CHOFER');
                    } else {
                        $scope.objChofer = response.data;
                        $scope.objChoferSelect = JSON.stringify( $scope.objChofer);

                        console.log("chofer Json:" + angular.toJson($scope.objChofer ));
                        console.log("choferSelect Json:" + $scope.objChoferSelect );
                    }
                }, function errorCallback(response) {
                    console.log('entra');
                });

                fulfill({ value: value, result: value });
            }, 0 | Math.random() * 100);
        });
    }

    function promiseUpdateProductoOrdenByIdOrden(value){
        return new Promise(function (fulfill, reject){
            console.log('START execution with value =', value);
            setTimeout(function() {


                $http({

                    method: 'POST',
                    url: myProvider.getOrden() + '/updateOrdenEstadoProductos',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data :{
                        id :value._id,
                        estado : value.estado,
                        productos :value.productos
                    }


                }).then(function successCallback(response) {
                    var n = response.data.length;
                    if (n == 0) {
                        alert('no se encontro informacion');
                    } else {



                    }
                }, function errorCallback(response) {
                    console.log('entra');
                    //  Console.log(response);
                    //$scope.mesaje = response.mensaje;

                });



                fulfill({ value: value, result: value });
            }, 0 | Math.random() * 100);
        });
    }

    $scope.logout=function(){

        $scope.us = JSON.parse(window.localStorage.getItem('usuario'));
        console.log($scope.us);
        if($scope.us.tipo!='Administrador'){
            localStorage.removeItem('se');
            localStorage.removeItem('usuario');
            window.location ='../login.html';

        }else{
            localStorage.removeItem('se');
            localStorage.removeItem('usuario');
            window.location ='login.html';



        }
        console.log('Ingresa');





    }
}]);






