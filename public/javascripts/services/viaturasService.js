angular.module('app')
.service('viaturasService', [function(){
	var tipos = ['', 'AMAROK', 'GOL', 'ÔNIBUS','BAÚ', 'VOYAGE']

	var viaturas = 
	[
		
		{tipo: 'AMAROK', placa: 'LUP 5787'},
		{tipo: 'AMAROK', placa: 'KWR 5640'},
		{tipo: 'AMAROK', placa: 'KXC 5840'},
		{tipo: 'AMAROK', placa: 'KXC 5822'},
		{tipo: 'AMAROK', placa: 'KWQ 5231'},
		{tipo: 'AMAROK', placa: 'KWY 4899'},
		{tipo: 'AMAROK', placa: 'KWX 5751'},
		{tipo: 'AMAROK', placa: 'KWV 5777'},
		{tipo: 'AMAROK', placa: 'KXA 5127'},
		{tipo: 'AMAROK', placa: 'KWP 5822'},
		{tipo: 'AMAROK', placa: 'KWW 4772'},
		{tipo: 'AMAROK', placa: 'KWO 5031'},
		{tipo: 'AMAROK', placa: 'KRU 3092'},
		{tipo: 'AMAROK', placa: 'KWR 5642'},
		{tipo: 'AMAROK', placa: 'KXI 4978'},
		{tipo: 'AMAROK', placa: 'KXD 6261'},
		{tipo: 'AMAROK', placa: 'KXM 6442'},
		{tipo: 'AMAROK', placa: 'KXA 5128'},
		{tipo: 'AMAROK', placa: 'LTB 5687'},
		{tipo: 'AMAROK', placa: 'KWQ 5332'},
		{tipo: 'GOL', placa: 'LLW 9227' },
		{tipo: 'GOL', placa: 'KNB 6814'},
		{tipo: 'GOL', placa: 'LQV 7493'},
		{tipo: 'GOL', placa: 'LQV 7479'},
		{tipo: 'BAÚ', placa: 'KZG 8512'},
		{tipo: 'BAÚ', placa: 'KYY 4165'},
		{tipo: 'ÔNIBUS', placa: 'LMA 5251'},
		{tipo: 'ÔNIBUS', placa: 'KYL 8776'},
		{tipo: 'ÔNIBUS', placa: 'LNU 8380'},
		{tipo: 'ÔNIBUS', placa: 'LOH 6073'},
		{tipo: 'VOYAGE', placa: 'LQU 2501'}
	]

	

	return {
		viaturas: viaturas,
		tipos: tipos
	}

}])