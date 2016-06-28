angular.module('app')
.controller('escalaController', ['$scope', '$http', '$q',function($scope, $http, $q){
	$scope.checado = true;
	$scope.dias = [];
	var pesquisado = [];
	$scope.anos = 
	[
		{'ano': 2016}, 
		{'ano': 2017}
	];


	$scope.meses = 
	[
		{id: 01, mes: 'janeiro'}, 
		{id: 02, mes: 'fevereiro'}, 
		{id: 03, mes: 'março'}, 
		{id: 04, mes: 'abril'}, 
		{id: 05, mes: 'maio'}, 
		{id: 06, mes: 'junho'}, 
		{id: 07, mes: 'julho'}, 
		{id: 08, mes: 'agosto'}, 
		{id: 09, mes: 'setembro'}, 
		{id: 10, mes: 'outubro'}, 
		{id: 11, mes: 'novembro'}, 
		{id: 12, mes: 'dezembro'}
	];

	$scope.servicos = 
	[
		{id: 0, status: 'expediente'},
		{id: 1, status: 'folga'},
		{id: 2, status: 'plantão'},
		{id: 4, status: 'extra'},
		{id: 5, status: 'complemento'},
		{id: 6, status: 'férias'},
		{id: 7, status: 'bim'},
		{id: 8, status: 'sobreaviso'},
		{id: 9, status: 'dispensa'},
		{id: 10, status: 'licença'},
		{id: 11, status: 'feira'}
	];

	function compare(a,b) {
	  	if(a.nome < b.nome){
	  		return -1;
	  	}else if (a.nome > b.nome){
	  		return 1;
	  	}else{
	  		return 0;
	    }	 
	}

	var agentes = [];


	var promise = $http.get('http://ccuanexos.herokuapp.com/agentes');
	promise.then(function(dados){
		dados.data.forEach(function(value){
			agentes.push({nome: value.nome});
		})

		$scope.agentes = agentes.sort(compare);
		
	})

	$scope.agentes = agentes.sort(compare);

	$scope.folgas = 
	[
		{valor: 1, folga: '0x1'},
		{valor: 2, folga: '1x1'},
		{valor: 3, folga: '2x1'},
		{valor: 4, folga: '3x1'}
	];

	function dias(val, val2){

		if((val === 1) || (val === 3) || (val === 5) || (val === 7) || (val === 8) || (val === 10) || (val === 12)){
			return 31;
		}else if(val === 2){
		//inicio do método para descobrir se é bissexto
			return (val2 % 4 == 0 && (val2 % 100 != 0 || val2 % 400 == 0)) ? 29 :  28;
		}else{
			return 30;
		}
	}

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}


	$scope.calcular = function(){
		if(!isEmpty($scope.mes) && !isEmpty($scope.ano)){
				var quantidade = dias($scope.mes.id, $scope.ano.ano);
				for(var i = 1; i <= quantidade; i++){
					$scope.dias.push({dia: i})
				}
		}else{
			alert('Preencha mês e ano!!!')
			$scope.mes = null;
		}	
	}

	$scope.pesquisar = function(agente){
		pesquisado = [];

		function filtro(value){
			if(value.nome === agente.nome){
				return true;
			}
		}


		var promise = $http.get('http://ccuanexos.herokuapp.com/agentes');
		promise.then(function(dados){
			var array = dados.data.filter(filtro);
			array.forEach(function(value){
				pesquisado.push(value);
			})

			$scope.checado = false;
		})
	}

	function popula(){
		var mes = $scope.mes.id;
		var ano = $scope.ano.ano;
		var inicio = $scope.inicio.dia;
		var fim = $scope.fim.dia;
		var passo = $scope.folga.valor;
		var agente = $scope.agente;
		var status = $scope.servico;

		function contar (inicio, fim, passo){
		cont = 0;
		do{
			inicio+=passo;
			cont++;
		}while(inicio <= fim);
		return cont;
	}


			function zeros(num){
			return (num < 10) ? '0' + num : num;
			}

			var flag = contar(inicio, fim, passo);
			var count = 0;
			for(var i = inicio; i <= fim; i+=passo){

			var data = zeros(i)+zeros(mes)+ano
			var body = 
			{
			nome: agente.nome,
			data: data,
			ordem: '0',
			status: status.status,
			ordemEspecial: 0,
			especial: ''
			}

			function filtro(value){
				if(value[data]){
					if(value[data].status === 's.plantão' || value[data].status === 's.extra'){
						return true;
					}
				}
			}

			var resp = pesquisado.filter(filtro);
			if(resp.length === 0){
				var promise = $http.put('http://ccuanexos.herokuapp.com/agentes/escala', body);
				promise.then(function(){
					count+=1;
					if(flag === count){
						alert('Escala salva com sucesso.')
					}
				});

				promise.catch(function(err){
					if(flag === count){
						alert('Verifique seus dados. Impossível realizar a operação')
					}
				});
			}


		}//fim do laço for
}//fim da função popula

	$scope.salvar = function(){
		if(!isEmpty($scope.ano) && !isEmpty($scope.mes) && !isEmpty($scope.servico)  && !isEmpty($scope.agente) && !isEmpty($scope.folga) && !isEmpty($scope.inicio) && !isEmpty($scope.fim)){
			popula();
			$scope.checado = true;
		}else{
			alert('Preencha todos os campos!!!'); 
		}
	}



}])