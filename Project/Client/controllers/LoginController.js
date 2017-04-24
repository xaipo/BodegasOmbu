/**
 * Created by xaipo on 2/15/2017.
 */
app.controller('LoginController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


$scope.estadoInicio=function(){

    $scope.us = JSON.parse(window.localStorage.getItem('se'));

    if($scope.us!=null){
       // window.location ='./error.html';

    }
 //   console.log($scope.us);
}


$scope.user={
        'name':'',
        'pass':''
    }

$scope.token='';

$scope.login=function(){

console.log('entrar1');
//console.log($scope.user);
var ss= Date();
var vec= ss.split(' ');
//console.log(ss);
    if($scope.user.name!=undefined && $scope.user.name!=''&&$scope.user.pass!=undefined && $scope.user.pass!='')    {

    console.log($scope.user);

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
                _id:response.data.value._id,
                tipo:response.data.value.tipo
            }
            //console.log(response.data.value);
            //console.log(resp);
            var obj= response.data.value;
            console.log(obj.tk);
            console.log(obj);
            switch(obj.tipo) {
                case 'Administrador':

                    window.localStorage.setItem("se", JSON.stringify(obj.tk));
                    window.localStorage.setItem("usuario", JSON.stringify(resp));
                  window.location ='./index.html';

                    break;
                case 'Supervisor':
                    console.log(obj);
                    window.localStorage.setItem("se", JSON.stringify(obj.tk));
                    window.localStorage.setItem("usuario", JSON.stringify(resp));
                   window.location ='Administrador/index.html';
                    break;
                case 'Operador' :
                    window.localStorage.setItem("se", JSON.stringify(obj.tk));
                    window.localStorage.setItem("usuario", JSON.stringify(resp));
                    window.location ='Normal/index.html';
                    break;
                default:

                    alert('El tipo de usuario no tiene permiso para ningun sistema')
            }
            /*window.localStorage.setItem("se", JSON.stringify(obj.value.tk));
            window.localStorage.setItem("usuario", JSON.stringify(resp));
           window.location ='./index.html';*/
        }


    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        // console.log(response);
        //$scope.mesaje = response.mensaje;
        alert('error al realizar Ingreso');

    });
 }else{

        alert('comuniquese con el amdministrador del sistema');
    }


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
