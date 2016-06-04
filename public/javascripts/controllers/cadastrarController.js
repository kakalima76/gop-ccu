angular.module('app')
.controller('cadastrarController', ['$scope', '$http', function($scope, $http){
	console.log('cadastrarController');

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

	/*//possivelmente inútel
	var promise = $http.get('http://ccuanexos.herokuapp.com/agentes');
	promise.then(function(data){
		data.data.forEach(function(value){
			if(value[dia]){
				
			}
			
		})
	})*/

	$scope.salvar = function(){
		var obj = {}
		obj['contato'] = 'S/C'
		if(isEmpty($scope.nome) && isEmpty($scope.matricula) && isEmpty($scope.status)){
			alert('Informações essenciais faltando!');
		}else{
			obj['nome'] = $scope.nome;
			obj['contato'] = $scope.contato;
			obj['matricula'] = $scope.matricula;
			obj['chefe'] = $scope.status.status;
			var promise = $http.post('http://ccuanexos.herokuapp.com/agentes', obj);
			promise.then(function(dados){
				alert('Salvo com sucesso!');
			});
			promise.catch(function(err){
				alert('Registro já consta na base de dados.');
			})
		}


	}


}])