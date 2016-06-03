angular.module('app')
.controller('trocarController', ['$scope', '$cookies', 'escalaService', 'ordemService', function($scope, $cookies, escalaService, ordemService){
	$scope.chefeTemplate = '/chefiaTrocar';
	$scope.agentesTemplate = '/agentesTrocar';
	var resp = []


	function criaChefesDisp(){
		$scope.chefes = [];
		var array = $cookies.get('chefesDisp').split(',');

		array.forEach(function(value){
			$scope.chefes.push({nome: value, escalado: false});
		})
	}

	function criaAgentesDisp(){
		$scope.agentes = [];
		var array = $cookies.get('agentesDisp').split(',');

		array.forEach(function(value){
			$scope.agentes.push({nome: value, escalado: false});
		})

	}

	$scope.trocarAgente = function(value){
		var prompt = prompt('Digite o número da nova ordem de serviço:');
	
	}

	$scope.trocarChefe = function(value){
		var prompt = prompt('Digite o número da nova ordem de serviço:');
		
	}


	function criaChefesEscalados(){
		$scope.chefesEscalados = [];
		var array = $cookies.get('chefesEscalados').split(',');

		array.forEach(function(value){
			$scope.chefesEscalados.push({nome: value, escalado: false});
		})
	}

	function criaAgentesEscalados(){
		$scope.agentesEscalados = [];
		var array = $cookies.get('agentesEscalados').split(',');

		array.forEach(function(value){
			$scope.agentesEscalados.push({nome: value, escalado: false});
		})

	}


	
	$scope.buscar = function(valorData){
		var date = valorData.replace(/(\/)+/g, '');
		
		function filtrarOrdem(value){
			if(value.data === date){
				return true;
			}
		}

		

		var filtrarAgentesDisp = function(value){
			if(value[date]){
				if((value[date].status === 'plantão' || value[date].status === 'extra') && value.chefe === false){
				return true;
				}
			}
		}

		var filtrarChefesDisp = function(value){
			if(value[date]){
				if((value[date].status === 'plantão' || value[date].status === 'extra') && value.chefe === true){
				return true;
				}
			}
		}

		var filtrarAgentesEscalados = function(value){
			if(value[date]){
				if(value[date].status === 'escalado' && value.chefe === false){
				return true;
				}
			}
		}

		var filtrarChefesEscalados = function (value) {
			if(value[date]){
				if(value[date].status === 'escalado' && value.chefe === true){
				return true;
				}
			}
		}

		function achaOrdem(){
			var promise = ordemService.get();
			promise.then(function(dados){
				array = dados.data.filter(filtrarOrdem);
				array.forEach(function(ordem){
					resp.push(ordem.numero);
				})
			})
		}


		var promise = escalaService.get();
		promise.then(function(data){

			var arrayAgentesDisp = data.data.filter(filtrarAgentesDisp);
			var arrayChefesDisp  = data.data.filter(filtrarChefesDisp);
			var arrayAgentesEscalados = data.data.filter(filtrarAgentesEscalados);
			var arrayChefesEscalados  = data.data.filter(filtrarChefesEscalados);
			

			var newAgentesDisp = []
			var newChefesDisp = []
			var newAgentesEscalados = []
			var newChefesEscalados = []

			
			arrayAgentesDisp.forEach(function(value){
				newAgentesDisp.push(value.nome + ' - ' + value[date].status);
			})

			arrayChefesDisp.forEach(function(value){
				newChefesDisp.push(value.nome + ' - ' + value[date].status);
			})

			arrayAgentesEscalados.forEach(function(value){
				newAgentesEscalados.push(value.nome + ' - Nº P.O.F: ' + value[date].ordem);
			})

			arrayChefesEscalados.forEach(function(value){
				newChefesEscalados.push(value.nome + ' - Nº P.O.F: ' + value[date].ordem);
			})

			$cookies.put('agentesDisp', newAgentesDisp);
			$cookies.put('chefesDisp', newChefesDisp);
			$cookies.put('agentesEscalados', newAgentesEscalados);
			$cookies.put('chefesEscalados', newChefesEscalados);

			
		}).then(function(){
			achaOrdem();
			criaChefesDisp();
			criaAgentesDisp();
			criaChefesEscalados();
			criaAgentesEscalados();
		})
	}//fim do método buscar


	//filtro' comum aos checkboxes
	var filtro = function(value){
		if(value.escalado === true){
			return true;
		}
	}


	//tem esse nome  mas na verdade pega os valores de chefes e agentes para a escala
	$scope.testar = function(valor){
		var chefes = [];
		var agentes = [];
		var strChefes = null;
		var strAgentes = null;

		var testeChefes = $scope.chefes.filter(filtro);
		testeChefes.forEach(function(value){
			chefes.push(' ' + value.nome);
		})

		var testeChefes = $scope.agentes.filter(filtro);
		testeChefes.forEach(function(value){
			agentes.push(' ' + value.nome);
		})

		strChefes = chefes.toString();
		strAgentes = agentes.toString();

		ordemFactory.setEscala(strChefes.trim(), strAgentes.trim());

	}


}])