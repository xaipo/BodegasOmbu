/**
 * Created by xaipo on 2/15/2017.
 */
app.controller('LoginController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


$scope.estadoInicio=function(){

    $scope.us = JSON.parse(window.localStorage.getItem('se'));
    if($scope.us!=null){
        window.location ='./index.html';

    }
 //   console.log($scope.us);
}


$scope.user={
        'name':'',
        'pass':''
    }

$scope.token='';

$scope.login=function(){

//console.log('entrar1');
//console.log($scope.user);

if($scope.user.name!=undefined && $scope.user.name!=''&&$scope.user.pass!=undefined && $scope.user.pass!='')    {



$scope.user.pass=SHA1($scope.user.pass);

//console.log($scope.user.pass);

$scope.user.password=
    $scope.us = JSON.parse(window.localStorage.getItem('se'));
    $http({
        method: 'POST',
        url: myProvider.getLogin(),
        headers: {
            'Content-Type': 'application/json'
        },
        data: {

            name: $scope.user.name,
            password: $scope.user.pass

        }


    }).then(function successCallback(response) {


        if(response.data.value==undefined||response.data.value==''){

            alert('Error al ingresar');
        }else{
            var resp = {

                name:response.data.value.name,
                _id:response.data.value._id

            }
            //console.log(response.data.value);
            //console.log(resp);
            var obj= response.data;
            console.log(obj.value.tk);
            window.localStorage.setItem("se", JSON.stringify(obj.value.tk));
            window.localStorage.setItem("usuario", JSON.stringify(resp));
           window.location ='./index.html';
        }


    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        // console.log(response);
        //$scope.mesaje = response.mensaje;
        alert('error al realizar Ingreso');

    });
 }


}



      $scope.logout=function(){

        localStorage.removeItem('se');
        localStorage.removeItem('usuario');
        window.location ='./login.html';
          $scope.us = JSON.parse(window.localStorage.getItem('usuario'));4
          //llamar a un post para actualizar el usuario y eliminar el token



    }

}]);
