/**
 * Created by VICTOR OQUENDO on 3/5/2017.
 */

app.controller('UsuarioController', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

    $scope.id = '';
    $scope.lista = [];
    $scope.selectedRow ;
    $scope.search = '';

    $scope.selected = "";

    $scope.obj = {
        name: '',
        password: '',
        tipo: ''
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
            url: myProvider.getUsuario() + '/getAllUsuario',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            var n = response.data.length;
            $scope.lista = [];
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
            url: myProvider.getUsuario() + '/getByIdUsuario',

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

        $scope.obj.password = SHA1($scope.obj.password);
        $http({
            method: 'POST',
            url: myProvider.getUsuario() + '/saveUsuario',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                name : $scope.obj.name,
                password: $scope.obj.password,
                tipo: $scope.obj.tipo
            }
        }).then(function successCallback(response) {
            console.log('ENTRA2');

            $scope.obj = {
                name: '',
                password: '',
                tipo: ''
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
        $scope.selected.password = SHA1($scope.selected.password);

        console.log('ENTRA1');
        $http({
            method: 'POST',
            url: myProvider.getUsuario() + '/updateUsuario',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                id :$scope.id,
                name : $scope.selected.name,
                password: $scope.selected.password,
                tipo: $scope.selected.tipo
            }
        }).then(function successCallback(response) {
            $scope.obj = {
                name: '',
                password: '',
                tipo: ''
            };
            $scope.inicializar();
            console.log('POST');
        }, function errorCallback(response) {
            console.log('falla');
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
