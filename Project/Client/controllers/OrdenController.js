/**
 * Created by VICTOR OQUENDO on 2/19/2017.
 */

app.controller('OrdenController', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {


    $scope.listaClientes = [];
    $scope.selectedCliente;
    $scope.objCliente = {
        _id:'',
        cedula : '',
        nombre: '',
        telefono:'',
        email:'',
        direccion:''
    };
    $scope.objClienteSelect='';
    $scope.searchCliente = '';


    $scope.listaProductos = [];
    $scope.listaProductosMultiselected = [];
    $scope.objProducto = {
        _id:'',
        codigo: '',
        nombre: '',
        detalle: '',
        peso: ''
    };
    $scope.objProductoSelect='';




    $scope.id = '';
    $scope.lista = [];
    $scope.selectedRow ;
    $scope.search = '';

    $scope.selected = '';
    $scope.selectedProd = '';
    $scope.selectedProdRow;


     $scope.subItem ={
         id_producto : '',
         nombre_producto:'',
         cantidad : 0,
         peso_unit:0,
         peso_total : 0,
         estado : 0
    };

    $scope.subItemBD ={
        id_producto : '',
        cantidad : 0,
        peso_total : 0,
        estado : 0
    };
    $scope.listaSubitemBD= [];

    $scope.listaSubitem = [];

    $scope.obj = {
        codigo:'',
        id_cliente: '',
        fecha_orden: '',
        numero_factura: '',
        fecha_factura: '',
        hora_orden: 0,
        minutos_orden:0,
        direccion : '',
        observacion : '',
        estado : 0,
        productos: []
    };


    $scope.changeTypeCliente=function(){
        console.log($scope.objCliente);
        $scope.objCliente=JSON.parse($scope.objClienteSelect);
        $scope.obj.id_cliente=$scope.objCliente._id;
    }

    $scope.changeTypeProducto=function(){
        console.log($scope.objProducto);
        $scope.objProducto=JSON.parse($scope.objProductoSelect);
    }

    $scope.calculoPesoTotal=function(){

        $scope.subItem.peso_total = $scope.objProducto.peso * $scope.subItem.cantidad;
    }

    $scope.calculoPesoTotalSelected=function(){

        $scope.selectedProd.peso_total = $scope.selectedProd.peso_unit * $scope.selectedProd.cantidad;
    }

    $scope.agregarProducto = function(){


        $scope.subItem.id_producto = $scope.objProducto._id;
        $scope.subItem.nombre_producto = $scope.objProducto.nombre;
        $scope.subItem.peso_unit = $scope.objProducto.peso;
        $scope.subItem.estado = 0;

        $scope.listaSubitem.push($scope.subItem);
        $scope.subItem ={
            id_producto : '',
            nombre_producto:'',
            cantidad : 0,
            peso_unit:0,
            peso_total : 0,
            estado : 0
        };


    }

    $scope.setClickedRowProducto = function(index, item){

        $scope.selectedProdRow = index;
        $scope.selectedProd = item;
        console.log('selectedProd: '+$scope.selectedProd.nombre_producto);

    }

    $scope.deleteProdSelected = function(){
        $scope.listaSubitem.splice($scope.selectedProd,1);
    }


    $scope.cargaClientesProductos = function () {


        $scope.listaClientes = [];

        $http({
            method: 'GET',
            url: myProvider.getCliente() + '/getAllCliente',
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
                    $scope.listaClientes.push($scope.aux);
                }



                console.log($scope.listaClientes);
            }
        }, function errorCallback(response) {
            console.log('entra');
            $scope.mesaje = response.mensaje;
        });



        $scope.listaProductos = [];

        $http({
            method: 'GET',
            url: myProvider.getProducto() + '/getAllProducto',
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
                    $scope.listaProductos.push($scope.aux);
                }
                console.log($scope.listaProductos);
            }
        }, function errorCallback(response) {
            console.log('entra');
            $scope.mesaje = response.mensaje;
        });


    }



//funcion que llama a un web services cuando inicializa la pagina
    $scope.inicializar = function () {


        $scope.lista = [];

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
                    $scope.lista.push($scope.aux);
                }
                console.log($scope.lista);
            }
        }, function errorCallback(response) {
            console.log('entra');
            $scope.mesaje = response.mensaje;
        });

    }


    $scope.setClickedRow = function (index, item){

        $scope.id = item._id;
        $scope.selectedRow = index;

        console.log($scope.id);
        $http({

            method: 'POST',
            url: myProvider.getOrden() + '/getByIdOrden',

            headers: {
                'Content-Type': 'application/json'
            },
            data :{id :$scope.id}


        }).then(function successCallback(response) {
            var n = response.data.length;
            if (n == 0) {
                alert('no se encontro informacion');
            } else {
                $scope.selected = response.data;
                console.log($scope.selected);
            }
        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });
    }


    $scope.save = function (){

        $scope.listaSubitemBD=[];
        for(var i=0; i<$scope.listaSubitem.length; i++){

            $scope.subItemBD ={
                id_producto : '',
                cantidad : 0,
                peso_total : 0,
                estado : 0
            };

            $scope.subItemBD.id_producto = $scope.listaSubitem[i].id_producto;
            $scope.subItemBD.cantidad = $scope.listaSubitem[i].cantidad;
            $scope.subItemBD.peso_total = $scope.listaSubitem[i].peso_total;
            $scope.subItemBD.estado = $scope.listaSubitem[i].estado;

            $scope.listaSubitemBD.push($scope.subItemBD);
        }


        $http({
            method: 'POST',
            url: myProvider.getOrden() + '/saveOrden',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{

                id_cliente: $scope.obj.id_cliente,
                codigo: $scope.obj.codigo,
                fecha_orden: $scope.obj.fecha_orden,
                numero_factura: $scope.obj.numero_factura,
                fecha_factura: $scope.obj.fecha_factura,
                hora_orden: $scope.obj.hora_orden,
                minutos_orden : $scope.minutos_orden,
                direccion : $scope.obj.direccion,
                observacion : $scope.obj.observacion,
                estado : $scope.obj.estado,
                productos: $scope.listaSubitemBD

            }
        }).then(function successCallback(response) {


            $scope.obj = {
                id_cliente: '',
                fecha_orden: '',
                numero_factura: '',
                fecha_factura: '',
                hora_orden: '',
                direccion : '',
                observacion : '',
                estado : '',
                productos: []
            };
            $scope.listaSubitemBD = [];
            $scope.listaSubitem = [];
            $scope.subItem={
                id_producto : '',
                nombre_producto:'',
                cantidad : 0,
                peso_unit:0,
                peso_total : 0,
                estado : 0
            };
            $scope.inicializar();
            console.log('POST');
        }, function errorCallback(response) {
            console.log('falla');
        });

    }


    $scope.update = function (){

        $scope.id = $scope.selected._id;
        console.log($scope.selected);

        console.log('ENTRA1');
        $http({
            method: 'POST',
            url: myProvider.getOrden() + '/updateOrden',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                id :$scope.id,
                id_cliente: $scope.selected.id_cliente,
                fecha_orden: $scope.selected.fecha_orden,
                numero_factura: $scope.selected.numero_factura,
                fecha_factura: $scope.selected.fecha_factura,
                hora_orden: $scope.selected.hora_orden,
                direccion : $scope.selected.direccion,
                observacion : $scope.selected.observacion,
                estado : $scope.selected.estado,
                productos: $scope.selected.listaSubitemBD
            }
        }).then(function successCallback(response) {
            $scope.obj = {
                id_cliente: '',
                fecha_orden: '',
                numero_factura: '',
                fecha_factura: '',
                hora_orden: '',
                direccion : '',
                observacion : '',
                estado : '',
                productos: []
            };
            $scope.inicializar();
            console.log('POST');
        }, function errorCallback(response) {
            console.log('falla');
        });
    }

}]);