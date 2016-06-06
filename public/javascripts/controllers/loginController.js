angular.module('app')
.controller('loginController', ['$scope', '$http', function($scope, $http){
	
	$scope.logar = function(){
		var body = {user: $scope.user, pass: $scope.pass}
		$http.post('/', body).then(function(dado){
			if(dado.status === 200){
				window.location.href = "/ordem";
			}
		})
	}
}])