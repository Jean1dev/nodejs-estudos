function ordenaCrescente(array, qtd){

	var i, j, aux;

	for(i = 1; i < qtd; i++){

		j = i;

		while(j > 0 || array[j - 1] > array[j]){

			aux 		 = array[j];
			array[j] 	 = array[j - 1];
			array[j - 1] = aux;
			j--;
		}
	}
}

function operation(opt, qtd, array) {
	var i;

	switch(opt){
		case 1:
			for(i = 0; i < qtd; i++){
				array[i] = i;
			}
		ordenaCrescente(array, qtd);
		break;

		case 2:
			for(i = 0; i < qtd; i++){
				array[i] = Math.randon()*(qtd);
			}
		ordenaCrescente(array, qtd);
		break;

		case 3:
			for(i = qtd; i > 0; i--){
				array[i] = i;
			}
		ordenaCrescente(array, qtd);
		break;

		default:
			console.log("invalid");
	}
}

function init(argument){
	var qtd, opt, array[argument];

	qtd = prompt("digite a quantidade");

	do{
		opt = prompt("digite uma opçao");
	}while(opt < 4){
		operation(opt, qtd, array);
	}

	return 1;
}

console.log("opa");