angular.module('app')
.controller('atualizarController', ['$scope', '$cookies', 'escalaService', 'ordemFactory', 'viaturasService', 'escalaService', 'ordemService', function($scope, $cookies, escalaService, ordemFactory, viaturasService, escalaService, ordemService){
$scope.chefeTemplate = '/chefia';
	$scope.equipeTemplate = '/equipes';
	$scope.viaturaTemplate = '/viaturas';
		

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}


	$scope.imprimir = function(value){
		$cookies.put('dia', value);
		window.location.href = "/imprimir";
	}

	//alteração

	var equipes = [
					'MOPI 01 - BARRA DA TIJUCA - RUA CARLOS OSWALD N° 390 - BARRA DA TIJUCA', 
					'MOPI 02 - BOTAFOGO - RUA BAMBINA N° 37 - BOTAFOGO', 
					'MOPI 03 - LEBLON - PÇA N. SRA. AUXILIADORA S/N° - UOP LEBLON', 
					'MOPI 04 - CATETE - RUA ANTÔNIO MENDES CAMPOS N° 77 - GLÓRIA (UOP CATETE)', 
					'MOPI 05 - CENTRO - RUA SOUZA E SILVA N° 09 - GAMBOA (UOP PORTO)', 
					'MOPI 06 - MARACANÃ - AV. MARACANÃ N° 230 - MARACANÃ (UOP TIJUCA)', 
					'MOPI 07 - MÉIER - RUA DR. LEAL N° 706 - ENGENHO DE DENTRO', 
					'MOPI 08 - BANGU - RUA BIARRITZ S/N° - BANGU', 
					'RH/ADM/LOGÍSTICA', 
					'AUTOS/ADM/LOGÍSTICA',
					'PROTOCOLO/ADM/LOGÍSTICA', 
					'GABINETE/ADM/LOGÍSTICA',
					'GERÊNCIA DE OPERAÇÕES',
					'SALA DE CRISE',
					'DEPÓSITO AVANÇADO', 
					'24 HORAS',
					'SETOR DE TRANSPORTE',
					'NÚCLEO DE ESTUDOS E DIVULGAÇÃO',
					'APOIO À MOPI',
					'NÚCLEO DE ESTUDOS E PROJETOS',
					'LIVE SITES'
				];
	
	$scope.equipes = [];
	equipes.forEach(function(value){
		$scope.equipes.push({equipe: value, escalado: false})
	});


	var horas = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
	$scope.horas = [];

	horas.forEach(function(value){
		$scope.horas.push({hora: value})
	});

	$scope.viaturas = viaturasService.viaturas;


	
	$scope.buscar = function(ordem){

		var promise = ordemService.getOrdemNumero(ordem);
		promise.then(function(dados){
			setScope(dados);
		})		
	}//fim do método buscar


	//filtro comum aos checkboxes
	var filtro = function(value){
		if(value.escalado === true){
			return true;
		}
	}

	$scope.gerarViaturas = function(valor){
		var viaturas = $scope.viaturas.filter(filtro);
		var array = []
		viaturas.forEach(function(value){
			array.push(' ' + value.tipo + ' ' + value.placa);
		})

		ordemFactory.setViaturas(array.toString().trim());
		
	}

	$scope.gerarEquipe = function(valor){
		var equipes = $scope.equipes.filter(filtro);
		var array = []
		equipes.forEach(function(value){
			array.push(' ' + value.equipe);
		})

		ordemFactory.setEquipe(array.toString().trim())
	}

		function setScope(ordem){
		function formataData(data){
			var dia = data.substring(0,2) + '/';
			var mes = data.substring(2,4) + '/';
			var ano = data.substring(4);

			return dia + mes + ano;
		}

		$scope.numero = ordem.numero;
		$scope.data = formataData(ordem.data);
		$scope.inicio = {hora: ordem.apresentacao};
		$scope.fim = {hora: ordem.termino};
		$scope.acao01 = ordem.acao01.replace('- Ação programada 01: ', '');
		$scope.acao02 = ordem.acao02.replace('- Ação programada 02: ', '');
		$scope.acao03 = ordem.acao03.replace('- Ação programada 03: ', '');
		var arrayEquipes = ordem.equipe.split(',');
		var arrayViaturas = ordem.viatura.split(',');
		
		//carrega as equipes - tica as sececionadas na view
		var arraySalvaEquipe = []
		var arraySalvaViaturas = []

		arrayEquipes.forEach(function(valor){
			$scope.equipes.forEach(function(value){
				if(value.equipe === valor.trim()){
					value.escalado = true;
					arraySalvaEquipe.push(' ' + value.equipe)
					ordemFactory.setEquipe(arraySalvaEquipe.toString().trim())

				}
			})
		})

		arrayViaturas.forEach(function(valor){
			$scope.viaturas.forEach(function(value){
				if(valor.trim() === value.tipo + ' ' + value.placa){
					value.escalado = true;
					arraySalvaViaturas.push(' ' + value.tipo + ' ' + value.placa)
					ordemFactory.setViaturas(arraySalvaViaturas.toString().trim());
				}
			})
		})
	}//fim da função setScope


	$scope.salvar = function(){
		var acao01 = '';
		var acao02 = '';
		var acao03 = '';

			if(!isEmpty($scope.acao01)){
				acao01 ='- Ação programada 01: ' + $scope.acao01;
			}

			if(!isEmpty($scope.acao02)){
				acao02 ='- Ação programada 02: ' + $scope.acao02;
			}

			if(!isEmpty($scope.acao03)){
				acao03 ='- Ação programada 03: ' + $scope.acao03;
			}

			var data = $scope.data.replace(/(\/)+/g, '');
			var os = $scope.numero;

			ordemFactory.set(os, data, $scope.inicio.hora, $scope.fim.hora, acao01, acao02, acao03)
			var ordem = ordemFactory.get();
			var arrayAgentes = ordem.agentes.split(',');
			var arrayChefes = ordem.chefe.split(',');

			ordemService.atualOrdem(ordemFactory.get());
			window.location.href = "/atualizar";
	}
	
}])