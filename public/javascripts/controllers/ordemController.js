angular.module('app')
.controller('ordemController', ['$scope', '$cookies', 'escalaService', 'ordemFactory', 'viaturasService', 'escalaService', 'ordemService', function($scope, $cookies, escalaService, ordemFactory, viaturasService, escalaService, ordemService){
	$scope.chefeTemplate = '/chefia';
	$scope.equipeTemplate = '/equipes';
	$scope.viaturaTemplate = '/viaturas';
	$scope.mostrar = true;
	
	var promise = ordemFactory.getNumero();
	promise.then(function(data){
		$scope.numero = data.data[0].numero + 1;
	})
		

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}


	$scope.imprimir = function(value){
		$cookies.put('dia', value);
		window.location.href = "/imprimir";
	}

	var equipes = ['MOP01', 'MOP02', 'MOP03', 'MOP04', 'MOP05', 'MOP06', 'MOP07', 'MOP08', 'PRONTO ATENDIMENTO 1', 'PRONTO ATENDIMENTO 2', 'DEPÓSITO AVANÇADO', 'LOGÍSTICA', '24 HORAS']

	/*var equipes = ['PAF01','PAF02','PAF03','PAF04','PAF05','PAF06','PAF07','PAF08','PAF09','PAF10','PAF11','24 HORAS','NEP'];
	*/$scope.equipes = [];
	equipes.forEach(function(value){
		$scope.equipes.push({equipe: value})
	});


	var horas = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
	$scope.horas = [];

	horas.forEach(function(value){
		$scope.horas.push({hora: value})
	});

	$scope.viaturas = viaturasService.viaturas;


	function criaChefes(){
		$scope.chefes = [];
		var array = $cookies.get('chefes').split(',');

		array.forEach(function(value){
			$scope.chefes.push({nome: value, escalado: false});
		})
	}

	function criaAgentes(){
		$scope.agentes = [];
		var array = $cookies.get('agentes').split(',');

		array.forEach(function(value){
			$scope.agentes.push({nome: value, escalado: false});
		})

	}

	
	$scope.buscar = function(valorData){
		var date = valorData.replace(/(\/)+/g, '');
		/*$cookies.put('data', valorData);*/

		var filtrarAgentes = function (value) {
			if(value[date]){
				if((value[date].status === 'plantão' || value[date].status === 'extra') && value.chefe === false){
					return true;
				}
			}
		}

		var filtrarChefes = function (value) {
			if(value[date]){
				if((value[date].status === 'plantão' || value[date].status === 'extra') && value.chefe === true){
					return true;
				}
			}
		}


		var promise = escalaService.get();
		promise.then(function(data){
			var arrayAgentes = data.data.filter(filtrarAgentes);
			var arrayChefes  = data.data.filter(filtrarChefes);
			var newAgentes = []
			var newChefes = []
			
			arrayAgentes.forEach(function(value){
				newAgentes.push(value.nome + " (" + value.contato + ")" + " - " + value[date].status);
			})

			arrayChefes.forEach(function(value){
				newChefes.push(value.nome + " (" + value.contato + ")" + " - " + value[date].status);
			})

			$cookies.put('agentes', newAgentes);
			$cookies.put('chefes', newChefes);


			
		}).then(function(){
			criaChefes();
			criaAgentes();
		})
	}//fim do método buscar


	//filtro comum aos checkboxes
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
			var rg = /plantão/g;
			if(rg.test(value.nome)){
				chefes.push(value.nome.replace('plantão', 's.normal'));
			}else{
				chefes.push(value.nome.replace('extra', 's.extra'));
			}

		})

		var testeAgentes = $scope.agentes.filter(filtro);
		testeAgentes.forEach(function(value){
			var rg = /plantão/g;
			if(rg.test(value.nome)){
				agentes.push(value.nome.replace('plantão', 's.normal'));
			}else{
				agentes.push(value.nome.replace('extra', 's.extra'));
			}
		})


		strChefes = chefes.toString();
		strAgentes = agentes.toString();
		ordemFactory.setEscala(strChefes.trim(), strAgentes.trim());
	}

	$scope.gerarViaturas = function(valor){
		var viaturas = $scope.viaturas.filter(filtro);
		var array = []
		viaturas.forEach(function(value){
			array.push(' ' + value.tipo + ' ' + value.placa);
		})

		ordemFactory.setViaturas(array.toString().trim())
	}

	$scope.gerarEquipe = function(valor){
		var equipes = $scope.equipes.filter(filtro);
		var array = []
		equipes.forEach(function(value){
			array.push(' ' + value.equipe);
		})

		ordemFactory.setEquipe(array.toString().trim())
	}


	$scope.salvar = function(){
		var acao01 = '';
		var acao02 = '';
		var acao03 = '';
		var acao04 = '';
		var acao05 = '';
		var acao06 = '';
		var acao07 = '';

		if(!isEmpty($scope.acao01)){
			acao01 ='- Ação programada 01: ' + $scope.acao01;
		}

		if(!isEmpty($scope.acao02)){
			acao02 ='- Ação programada 02: ' + $scope.acao02;
		}

		if(!isEmpty($scope.acao03)){
			acao03 ='- Ação programada 03: ' + $scope.acao03;
		}

		if(!isEmpty($scope.acao04)){
			acao04 ='- Ação programada 04: ' + $scope.acao04;
		}

		if(!isEmpty($scope.acao05)){
			acao05 ='- Ação programada 05: ' + $scope.acao05;
		}

		if(!isEmpty($scope.acao06)){
			acao06 ='- Ação programada 06: ' + $scope.acao06;
		}

		if(!isEmpty($scope.acao07)){
			acao07 ='- Ação programada 07: ' + $scope.acao07;
		}




			if(!isEmpty($scope.data) && !isEmpty($scope.inicio) && !isEmpty($scope.fim) && !isEmpty($scope.acao01)){
				var data = $scope.data.replace(/(\/)+/g, '');
				var os = $scope.numero;

				ordemFactory.set(os, data, $scope.inicio.hora, $scope.fim.hora, acao01, acao02, acao03, acao04, acao05, acao06, acao07);
				var ordem = ordemFactory.get();
				var arrayAgentes = ordem.agentes.split(',');
				var arrayChefes = ordem.chefe.split(',');

				ordemService.setOrdem(ordemFactory.get())
				.then(function(){
						arrayAgentes.forEach(function(nome){	
						var rg = /s.normal/g;
						if(rg.test(nome)){
							var status = 's.normal';
						}else{
							var status = 's.extra';
						}

						var aux = nome.replace('(', '').replace(')', '').replace(/[0-9]/g, '').replace('- s.normal', '').replace('- s.extra', '').trim()
					
						if(!isEmpty(nome)){
							escalaService.atualizar(aux, os, status, data);
						}
						
					})

					arrayChefes.forEach(function(nome){
						var rg = /s.normal/g;
						if(rg.test(nome)){
							var status = 's.normal';
						}else{
							var status = 's.extra';
						}
			
						var aux = nome.replace('(', '').replace(')', '').replace(/[0-9]/g, '').replace('- s.normal', '').replace('- s.extra', '').trim();


						if(!isEmpty(nome)){
							escalaService.atualizar(aux, os, status, data);
						}
					})

					window.location.href = "/ordem";
				}).catch(function(){
					alert('Ligue para o administrador!');
				})
				
				
				
			}else{
				alert('Alguns campos faltando!!!')
			}		
	}//fim do método salvar



}])