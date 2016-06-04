angular.module('app')
.controller('trocarController', ['$http', '$scope', '$cookies', 'escalaService', 'ordemService', function($http, $scope, $cookies, escalaService, ordemService){
	$scope.chefeTemplate = '/chefiaTrocar';
	$scope.agentesTemplate = '/agentesTrocar';
	$scope.resp = []

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

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

	//encontrei o problema dos agentes que não tem uma o.s ou seja não estão escalados


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

	function buscar(valorData){
		$scope.resp = [];
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
					$scope.resp.push({ordem: ordem.numero});
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

			//coloquei o N p.o.f para evitar valores nulos na hora de pesquisar pela o.s
			arrayAgentesDisp.forEach(function(value){
				newAgentesDisp.push(value.nome + ' - Nº P.O.F: ' + value[date].ordem + ' - ' + value[date].status);
			})

			arrayChefesDisp.forEach(function(value){
				newChefesDisp.push(value.nome + ' - Nº P.O.F: ' + value[date].ordem + ' - ' + value[date].status);
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
	}//fim da função buscar
	
	$scope.buscar = function(valorData){
		buscar(valorData);
	}//fim do método buscar


	//filtro' comum aos checkboxes
	var filtro = function(value){
		if(value.escalado === true){
			return true;
		}
	}

		$scope.trocarAgente = function(value, dataOrdem){
		var regex = /[0-9]+/g;//necessário para deixar apenas a o.s
		var dia = (dataOrdem.replace(/(\/)+/g, ''));
		var OSatual = value.match(regex)[0];
		var result = prompt('Digite o número da nova ordem de serviço:');
		var agenteModificado = value.replace(/( - Nº P.O.F: )/g, '').replace(/[0-9]/g, '');
		
		function desescalar(){ //define quais dos agente está presente na O.S Atual
			$scope.mostraLoad = true; //monstra o Load dos dados dos escalados
			function filtroDesescalar(value){//filtra o agente que será retirado
				if(value !== agenteModificado){
					return true;
				}
			}

			var promise = ordemService.getOrdem(OSatual);//tras a ordem de serviço a ser modificada
			promise.then(function(dados){
				return dados;
			}).then(function(dados){
				var arrayAgentesOs = dados.split(',')//traz os agentes da os em forma de array
				var novoArrayAgentesOs = arrayAgentesOs.filter(filtroDesescalar);//traz os agentes a serem atualizados na O.S pretendida
				var promise = ordemService.atualAgente(novoArrayAgentesOs.toString().trim(), OSatual)
				promise.then(function(){
					var promise = escalaService.atualizarTroca(agenteModificado, 0, 'plantão', dia);
					promise.then(function(data){
						buscar(dataOrdem);
						$scope.mostraLoad = false;
					})
					
				})
			});
				
		}//fim do método desescalar

		function escalar(){

			function testaExisteOrdem(){
				var scopeRespPuro = $scope.resp.map(function(value){ //retorna apenas as O.Ss
				return value.ordem;
				})

				function filtraScopeRespPuro(value){ //filtra para descobrir se há a O.S atual
					if(value == result){
						return true;
					}
				}

				var respExisteOrdem = scopeRespPuro.filter(filtraScopeRespPuro);

					if(respExisteOrdem.length === 0){
						return false;
					}

				return true;	
		
			}//fim da função testaExisteOrdem

				if(testaExisteOrdem() === true){//verifica se a ordem de serviço solicitada para povoar existe
					//aqui inicia o procedimento de encrementar a O.S coom um novo agente
					var promise = ordemService.getOrdem(result);//tras a ordem de serviço escolhida na prompt
					promise.then(function(dados){
					return dados;
					}).then(function(dados){
					var arrayAgentesOs = dados.split(',')//traz os agentes da os em forma de array
					arrayAgentesOs.push(agenteModificado);
					console.log(arrayAgentesOs);
					
					/*var promise = ordemService.atualAgente(novoArrayAgentesOs.toString().trim(), OSatual)
					promise.then(function(){
						var promise = escalaService.atualizarTroca(agenteModificado, 0, 'plantão', dia);
						promise.then(function(data){
							buscar(dataOrdem);
							$scope.mostraLoad = false;
						})
						
					})*/
				});

				}else{
					alert('Ordem de serviço inexistente!!!');
				}
			
		}//fim da função escalar

		if(result === '0'){ //aqui será realizada o desescalar do agente da ordem atual
			if(OSatual !== '0'){//testa para ver se o agente está apenas disponível OSatual é o N° P.O.S
				desescalar();
			}
		}else{
			escalar();
		}
		
	}//fim do método trocarAgente

	$scope.trocarChefe = function(value){		
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