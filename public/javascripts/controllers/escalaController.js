angular.module('app')
.controller('escalaController', ['$scope',function($scope){
	console.log('entrei');

	$scope.dias = [];

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
		{id: 3, status: '24horas'},
		{id: 4, status: 'extra'},
		{id: 5, status: 'complemento'},
		{id: 6, status: 'férias'},
		{id: 7, status: 'bim'},
		{id: 8, status: 'sobreaviso'},
		{id: 9, status: 'dispensa'},
		{id: 10, status: 'licença'},
		{id: 11, status: 'feira'}
	];



	var agentes = 
	[
		{nome: 'norlan', setor: 'PAF11'}, 
		{nome: 'magna', setor: 'PAF11'},
		{nome: 'luiz', setor: 'PAF11'},
		{nome: 'sandro', setor: 'PAF11'},
		{nome: 'de sá', setor: 'PAF11'},
		{nome: 'mauro', setor: 'PAF11'},
		{nome: 'queiroz', setor: 'PAF10'},
		{nome: 'manuelle', setor: 'PAF10'},
		{nome: 'daniel', setor: 'PAF10'},
		{nome: 'cristiane soares', setor: 'PAF10'},
		{nome: 'janise', setor: 'PAF10'},
		{nome: 'miranda', setor: 'PAF10'},
		{nome: 'debora', setor: 'GOP'},
		{nome: 'nieraldo', setor: 'NPMA'},
		{nome: 'aurelio', setor: 'GOP'},
		{nome: 'carmo', setor: 'GOP'}

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

	$scope.agentes = agentes.sort(compare);

	$scope.folgas = 
	[
		{valor: 0, folga: '1x1'},
		{valor: 1, folga: '2x1'},
		{valor: 2, folga: '3x1'},
		{valor: 3, folga: '4x1'}
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


	$scope.salvar = function(){
		if(!isEmpty($scope.ano) && !isEmpty($scope.mes) && !isEmpty($scope.servico)  && !isEmpty($scope.agente) && !isEmpty($scope.folga) && !isEmpty($scope.inicio) && !isEmpty($scope.fim)){
			console.log('tudo ok');
		}else{
			alert('Preencha todos os campos!!!'); 
		}
	}


}])