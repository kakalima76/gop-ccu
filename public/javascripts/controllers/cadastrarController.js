angular.module('app')
.controller('cadastrarController', ['$scope', '$http', '$filter', 'agenteService', function($scope, $http, $filter, agenteService){
	$scope.contato = '999999999'

	$scope.opcoes = 
	[
	{status: 'agente', chefe: false},
	{status: 'chefe', chefe: true}
	];

	var filtro = function(value){
		if(value[dia].status === 'plantão'){
			return true;
		}
	}

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	
	$scope.salvar = function(){
		var obj = {}
		obj['contato'] = 'S/C'
		if(isEmpty($scope.nome) && isEmpty($scope.matricula) && isEmpty($scope.status)){
			alert('Informações essenciais faltando!');
		}else{
			obj['nome'] =  $filter('uppercase')($scope.nome);
			obj['contato'] = $scope.contato;
			obj['matricula'] = $scope.matricula;
			obj['chefe'] = $scope.status.chefe;
			var promise = $http.post('http://ccuanexos.herokuapp.com/agentes', obj);
			promise.then(function(dados){
				alert('Salvo com sucesso!');
				$scope.matricula = null;
				$scope.nome = null;
				$scope.contato = '999999999';
				$scope.status = null;
			});
			promise.catch(function(err){
				alert('Registro já consta na base de dados.');
			})
		}
	}

	$scope.inserir = function(){
		if(!isEmpty($scope.matricula)){
			var promise = agenteService.get($scope.matricula);
			promise.then(function(dados){
				if(!isEmpty(dados.data)){
					agenteService.set($scope.matricula, $scope.contato);
				}else{
					alert('matricula inexistente');
				}
			})
		}
	}


}])