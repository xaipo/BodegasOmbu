/**
 * Created by VICTOR OQUENDO on 2/17/2017.
 */

app.controller('ClienteController', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

    $scope.id = '';
    $scope.lista = [];
    $scope.selectedRow ;
    $scope.search = '';

    $scope.selected = "";

    $scope.obj = {
        cedula : '',
        nombre: '',
        telefono:'',
        email:'',
        direccion:''
    };


//funcion que llama a un web services cuando inicializa la pagina
    $scope.inicializar = function () {


        $scope.lista = [];

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
            url: myProvider.getCliente() + '/getByIdCliente',

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

        console.log('ENTRA1');
        $http({
            method: 'POST',
            url: myProvider.getCliente() + '/saveCliente',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                cedula : $scope.obj.cedula,
                nombre: $scope.obj.nombre,
                telefono: $scope.obj.telefono,
                email: $scope.obj.email,
                direccion: $scope.obj.direccion
            }
        }).then(function successCallback(response) {
            console.log('ENTRA2');

            $scope.obj = {
                cedula : '',
                nombre: '',
                telefono:'',
                email:'',
                direccion:''
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
            url: myProvider.getCliente() + '/updateCliente',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                id :$scope.id,
                cedula : $scope.selected.cedula,
                nombre: $scope.selected.nombre,
                telefono: $scope.selected.telefono,
                email: $scope.selected.email,
                direccion: $scope.selected.direccion
            }
        }).then(function successCallback(response) {
            $scope.obj = {
                cedula : '',
                nombre: '',
                telefono:'',
                email:'',
                direccion:''
            };
            $scope.inicializar();
            console.log('POST');
        }, function errorCallback(response) {
            console.log('falla');
        });
    }

}]);