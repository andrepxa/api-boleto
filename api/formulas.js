function CalculaDACModulo10(campo) {
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

function CalculaDACModulo11(campo) {
    let multiplicador = 2;
    let soma = campo.split('').reverse().reduce((acc, item, i) => {
        let result = item * multiplicador;
        if (multiplicador > 9) {
            multiplicador = 2;
        } else {
            multiplicador++;
        }
// 23793381286000152497860000063309477060000002000
23794770600000020002379338126000006330
        return acc + result;
    }, 0);

    soma = (soma*10) % 11;
    if (soma == 11 || soma == 10 || soma == 0) {
        return 1;
    }
    
    return 11 - soma % 11;
}

function FatorDeVencimento(dias) {
    const baseBACEN = new Date('1997-10-07').getTime();
    return new Date(baseBACEN + (dias+1) * 24 * 3600000).toLocaleDateString("pt-BR");
}

module.exports = {
    CalculaDACModulo10,
    CalculaDACModulo11,
    FatorDeVencimento
 }