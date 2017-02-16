/**
 * Created by xaipo on 2/15/2017.
 */
app.controller('LoginController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

$scope.user={
        'name':'',
        'password':''
    }

$scope.encrypt=function(){

console.log($scope.text);
$scope.text=SHA1($scope.text);
console.log($scope.text);
}


$scope.login=function(){



}




}]);
