const formula = require("./api/formulas.js");

const linhaP = '23793.38128 60001.524978 60000.063309 4 77 060000002000';
const linha = linhaP.replace(/[^0-9]/g, '');

if (linha.length != 47) {//error('A linha digitavel está incompleta!');
}

const campoA = linha.substr(0, 9);
const campoB = linha.substr(10, 10);
const campoC = linha.substr(21, 10);
const campoD = linha.substr(33);
const digitoA = Number(linha.substr(9,1));
const digitoB = Number(linha.substr(20,1));
const digitoC = Number(linha.substr(31,1));
const digitoGeral = Number(linha.substr(32,1));
const cdBarra = linha.substr(0,4) + digitoGeral +
    campoD + campoA.slice(4) + campoB + campoC;

if (digitoA != formula.CalculaDACModulo10(campoA) ||
digitoB != formula.CalculaDACModulo10(campoB) ||
digitoC != formula.CalculaDACModulo10(campoC) ||
digitoGeral != formula.CalculaDACModulo11(cdBarra)) {
    // error
    console.log('Linha digitada invalida.');
}

const dataBoleto = formula.FatorDeVencimento(campoD.substr(0,4));
const valorBoleto = +campoD.substr(4,8) + '.' + campoD.substr(9);

// 23793.38128 60001.524978 60000.063309 4 77 060000002000
// 23794770600000020003381260001524976000006330