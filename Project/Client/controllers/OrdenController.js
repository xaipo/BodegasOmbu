/**
 * Created by VICTOR OQUENDO on 2/19/2017.
 */

app.controller('OrdenController', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {


    $scope.listaClientes = [];
    $scope.objCliente = {
        _id:'',
        cedula : '',
        nombre: '',
        telefono:'',
        email:'',
        direccion:''
    };

    $scope.selectedCliente = function()
    {
        $scope.objCliente = $scope.listaClientes.selec
    }

    $scope.listaProductos = [];
    $scope.listaProductosMultiselected = [];
    $scope.objProducto = {
        _id:'',
        codigo: '',
        nombre: '',
        detalle: '',
        peso: ''
    };





    $scope.id = '';
    $scope.lista = [];
    $scope.selectedRow ;
    $scope.search = '';

    $scope.selected = "";


     $scope.subItem ={
        id_Orden : '',
        cantidad : '',
        peso_total : ''
    };

    $scope.listaSubitem = [];

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


        $http({
            method: 'POST',
            url: myProvider.getOrden() + '/saveOrden',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{

                id_cliente: $scope.obj.id_cliente,
                fecha_orden: $scope.obj.fecha_orden,
                numero_factura: $scope.obj.numero_factura,
                fecha_factura: $scope.obj.fecha_factura,
                hora_orden: $scope.obj.hora_orden,
                direccion : $scope.obj.direccion,
                observacion : $scope.obj.observacion,
                estado : $scope.obj.estado,
                productos: $scope.obj.productos

            }
        }).then(function successCallback(response) {
            console.log('ENTRA2');

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
                productos: $scope.selected.productos
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