const express = require('express');
const router = express.Router();

const formula = require("../formulas.js");

router.get('/:numBoleto', (req, res, next) => {
    const numBoleto = req.params.numBoleto;
    const infBoleto = {};

    const err = new Error();

    const linha = numBoleto.replace(/[^0-9]/g, '');
    let tipoBoleto = '';

    if (linha.length === 47) {
        tipoBoleto = 'bancario';
    } else if (linha.length === 48) {
        tipoBoleto = 'concessionaria';
    }

    if (tipoBoleto !== 'bancario' && tipoBoleto !== 'concessionaria') {
        err.message = 'A linha digitavel está incompleta! #' + numBoleto.length;
        err.status = 400;
        throw err;
    }

    let campoA = '';
    let campoB = '';
    let campoC = '';
    let campoD = '';
    let digitoA = 0;
    let digitoB = 0;
    let digitoC = 0;
    let digitoGeral = 0;
    let cdBarra = '';

    if (tipoBoleto === 'bancario') {
        campoA = linha.substr(0, 9);
        campoB = linha.substr(10, 10);
        campoC = linha.substr(21, 10);
        campoD = linha.substr(33);
        digitoA = Number(linha.substr(9, 1));
        digitoB = Number(linha.substr(20, 1));
        digitoC = Number(linha.substr(31, 1));
        digitoGeral = Number(linha.substr(32, 1));
        cdBarra = linha.substr(0, 4) + digitoGeral +
            campoD + campoA.slice(4) + campoB + campoC;

        if (cdBarra.substr(4, 11) != 0) {
            infBoleto['data de vencimento'] = formula.FatorDeVencimento(campoD.substr(0, 4));
        }
        if (campoD.substr(4, 8) + '.' + campoD.substr(9)) {
            infBoleto['valor do boleto'] = 'R$ ' + +campoD.substr(4, 8) + ',' + campoD.substr(12);
        }
    } else if (tipoBoleto === 'concessionaria') {
        campoA = linha.substr(0, 11);
        campoB = linha.substr(12, 11);
        campoC = linha.substr(24, 11);
        campoD = linha.substr(36, 11);
        digitoA = Number(linha.substr(11, 1));
        digitoB = Number(linha.substr(23, 1));
        digitoC = Number(linha.substr(35, 1));
        digitoD = Number(linha.substr(47, 1));
        digitoGeral = Number(linha.substr(3, 1));
        cdBarra = campoA + campoB + campoC + campoD;

        if (campoD.substr(0, 4) != 0) {
            infBoleto['data de vencimento'] = formula.FatorDeVencimento(campoD.substr(0, 4));
        }
        if (campoD.substr(4, 8) + '.' + campoD.substr(9)) {
            infBoleto['valor do boleto'] = 'R$ ' + +cdBarra.substr(4, 9) + ',' + cdBarra.substr(13, 2);
        }
    }
    
    if (digitoA != formula.CalculaDACModulo10(campoA) ||
        digitoB != formula.CalculaDACModulo10(campoB) ||
        digitoC != formula.CalculaDACModulo10(campoC) ||
        (tipoBoleto === 'bancario' && digitoGeral != formula.CalculaDACModulo11(linha.substr(0, 4) +
            campoD + campoA.slice(4) + campoB + campoC))) {
        err.message = 'Numero do boleto invalido.';
        err.status = 400;
        throw err;
    }
    // Dependendo do 
    if (tipoBoleto === 'concessionaria' && (digitoD != formula.CalculaDACModulo10(campoD) ||
        (['6', '7'].indexOf(campoA.substr(2, 1)) != -1 && digitoGeral != formula.CalculaDACModulo10(campoA.substr(0, 3) + campoA.slice(4) + campoB + campoC + campoD))) ||
        (['8', '9'].indexOf(campoA.substr(2, 1)) != -1 && digitoGeral != formula.CalculaDACModulo11(campoA.substr(0, 3) + campoA.slice(4) + campoB + campoC + campoD))) {
        err.message = 'Numero do boleto invalido.';
        err.status = 400;
        throw err;
    }

    infBoleto['codigo de barra'] = cdBarra;

    res.status(200).json({
        message: 'Linha digitada é válida!',
        infBoleto
    });
});

module.exports = router;
