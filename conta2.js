const linhaP = '00190.50095 40144.816069 06809.350314 3 37370000000100';
// var linha = '23793.38128 60001.524978 60000.063309 4 77060000002000';
var linha = '00190500954014481606906809350314337370000000100';
var barra = '';
var vencimento = '';
var valor = '';

function DigitoVerificador(campo) {
    let soma = campo.split('').reverse().reduce((acc, item, i) => {
        let result = item * (i % 2 ? 1 : 2);
        // Se > 9 entao deve ser a soma dos dois digitos
        if (result > 9) {
            result = result - 9;
        }
        return acc + result;
    }, 0);

    if (soma % 10) {
        return 10 - soma % 10;
    }

    return 0;
}

linha = linhaP.replace(/[^0-9]/g, '');

if (linha.length != 47) {//error('A linha digitavel está incompleta!');
}

const campoA = linha.substr(0, 10);
const campoB = linha.substr(10, 10);
const campoC = linha.substr(20, 10);

if (campoA.slice(-1) != DigitoVerificador(campoA) ||
    campoB.slice(-1) != DigitoVerificador(campoB) ||
    campoC.slice(-1) != DigitoVerificador(campoC)) {
        // error
        console.log('error');
}





// barra  = barra.substr(0,4)
//         +barra.substr(32,15)
//         +barra.substr(4,5)
//         +barra.substr(10,10)
//         +barra.substr(21,10);

if (modulo11_banco(barra.substr(0, 4) + barra.substr(5, 39)) != barra.substr(4, 1))
    alert('Digito verificador ' + barra.substr(4, 1) + ', o correto é ' + modulo11_banco(barra.substr(0, 4) + barra.substr(5, 39)) + '\nO sistema não altera automaticamente o dígito correto na quinta casa!');

function f_venc() {
    if (barra.substr(5, 4) == 0)
        vencimento = 'O boleto pode ser pago em qualquer data';
    else
        vencimento = fator_vencimento(barra.substr(5, 4));
    valor = (barra.substr(9, 8) * 1) + ',' + barra.substr(17, 2);
    return (false);
}


function fator_vencimento(dias) {
    //Fator contado a partir da data base 07/10/1997
    //*** Ex: 31/12/2011 fator igual a = 5198
    //alert(dias);
    var currentDate, t, d, mes;
    t = new Date();
    currentDate = new Date();
    currentDate.setFullYear(1997, 9, 7);//alert(currentDate.toLocaleString());
    t.setTime(currentDate.getTime() + (1000 * 60 * 60 * 24 * dias));//alert(t.toLocaleString());
    mes = (currentDate.getMonth() + 1); if (mes < 10) mes = "0" + mes;
    dia = (currentDate.getDate() + 1); if (dia < 10) dia = "0" + dia;
    //campo.value = dia +"."+mes+"."+currentDate.getFullYear();campo.select();campo.focus();
    return (t.toLocaleString());
}

function modulo10(numero) {

    numero = numero.replace(/[^0-9]/g, '');
    var soma = 0;
    var peso = 2;
    var contador = numero.length - 1;
    //alert(contador);
    //numero = '00183222173';
    //for (var i=0; i <= contador - 1; i++) {
    //alert(10);
    //for (contador=10; contador >= 10 - 1; contador--) {
    while (contador >= 0) {
        //alert(contador);
        //alert(numero.substr(contador,1));
        multiplicacao = (numero.substr(contador, 1) * peso);
        if (multiplicacao >= 10) { multiplicacao = 1 + (multiplicacao - 10); }
        soma = soma + multiplicacao;
        //alert(numero.substr(contador,1)+' * '+peso+' = '+multiplicacao + ' =>' + soma) ;
        //alert(soma);
        if (peso == 2) {
            peso = 1;
        } else {
            peso = 2;
        }
        contador = contador - 1;
    }
    var digito = 10 - (soma % 10);
    //alert(numero + '\n10 - (' + soma + ' % 10) = ' + digito);
    if (digito == 10) digito = 0;
    return digito;
}


function modulo11_banco(numero) {

    numero = numero.replace(/[^0-9]/g, '');
    //debug('Barra: '+numero);
    var soma = 0;
    var peso = 2;
    var base = 9;
    var resto = 0;
    var contador = numero.length - 1;
    //debug('tamanho:'+contador);
    // var numero = "12345678909";
    for (var i = contador; i >= 0; i--) {
        //alert( peso );
        soma = soma + (numero.substring(i, i + 1) * peso);
        //debug( i+': '+numero.substring(i,i+1) + ' * ' + peso + ' = ' +( numero.substring(i,i+1) * peso)+' soma='+ soma);
        if (peso < base) {
            peso++;
        } else {
            peso = 2;
        }
    }
    var digito = 11 - (soma % 11);
    //debug( '11 - ('+soma +'%11='+(soma % 11)+') = '+digito);
    if (digito > 9) digito = 0;
    /* Utilizar o dígito 1(um) sempre que o resultado do cálculo padrão for igual a 0(zero), 1(um) ou 10(dez). */
    if (digito == 0) digito = 1;
    return digito;
}