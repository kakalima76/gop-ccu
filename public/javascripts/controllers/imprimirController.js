angular.module('app')
.controller('imprimirController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
	$scope.ordemTemplate = '/ordens';
	/*$scope.data = $cookies.get('dia');*/


	var filtrar = function (value) {
		if(value.data === $cookies.get('dia').replace(/(\/)+/g, '')){
			return true;
		}
	}

		var promise = $http.get('http://ccuanexos.herokuapp.com/ordem');
		promise.then(function(dados){
			
			$scope.ordens = dados.data.filter(filtrar);
			var count = 0;
			$scope.ordens.forEach(function(value){
				count++;
				value.ordem = count;
			})

		}) 

	function Data(){
		var str = {};
		str.dia = parseInt($cookies.get('dia').substring(0,2));
		str.mes = parseInt($cookies.get('dia').substring(3,5)) - 1;
		str.ano = parseInt($cookies.get('dia').substring(6));

		console.log(str);
		
		var data = new Date(str.ano, str.mes, str.dia);
		var meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
		var semana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo']
		var dia = data.getDate();
		var semana = semana[data.getDay() - 1];
		var mes = meses[data.getMonth()];
		var ano = data.getFullYear();
		var res = 'Rio de Janeiro, ' + semana + ', ' + dia + ' de ' + mes + ' de ' + ano + '.'; 

		return res;
	}

	$scope.data = Data();

	$scope.retornar = function(){
		window.location.href = "/ordem"
	}

}])