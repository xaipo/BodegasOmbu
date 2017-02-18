/**
 * Created by VICTOR OQUENDO on 2/17/2017.
 */

app.controller('ProductoController', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

    $scope.id = '';
    $scope.lista = [];
    $scope.selectedRow ;
    $scope.search = '';

    $scope.selected = "";

    $scope.obj = {
        codigo : '',
        nombre: '',
        detalle:'',
        peso:''
    };


//funcion que llama a un web services cuando inicializa la pagina
    $scope.inicializar = function () {


        $scope.lista = [];

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
            url: myProvider.getProducto() + '/getByIdProducto',

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
            url: myProvider.getProducto() + '/saveProducto',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                codigo : $scope.obj.codigo,
                nombre: $scope.obj.nombre,
                detalle: $scope.obj.detalle,
                peso: $scope.obj.peso
            }
        }).then(function successCallback(response) {
            console.log('ENTRA2');

            $scope.obj = {
                codigo : '',
                nombre: '',
                detalle:'',
                peso:''
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
            url: myProvider.getProducto() + '/updateProducto',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                id :$scope.id,
                codigo : $scope.selected.codigo,
                nombre: $scope.selected.nombre,
                detalle: $scope.selected.detalle,
                peso: $scope.selected.peso
            }
        }).then(function successCallback(response) {
            $scope.obj = {
                codigo : '',
                nombre: '',
                detalle:'',
                peso:''
            };
            $scope.inicializar();
            console.log('POST');
        }, function errorCallback(response) {
            console.log('falla');
        });
    }

}]);