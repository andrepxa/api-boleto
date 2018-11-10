const express = require('express');
const router = express.Router();

router.get('/:numBoleto', (req, res, next) => {
    const numBoleto = req.params.numBoleto;

    if (numBoleto.length === 44) {
        campo1 = numBoleto.substr(0,8);
        campo2 = numBoleto.substr(8,8);
        campo3 = numBoleto.substr(16,8);
        campo4 = numBoleto.substr(0,8);
        idMoeda = numBoleto.substr(3,1);
        dv = numBoleto.substr(4,1);
        fatorVencimento = numBoleto.substr(5,4);
        valor = numBoleto.substr(9,10);
        campoLivre = numBoleto.substr(19);
    }

// * Para c�lculo do DV do C�digo Barras, consulte Anexo V
// ** Para c�lculo do Fator de Vencimento, consulte o Anexo I II
// *** Os padr�es do BB est�o identificados nos Anexos VI, VII, X e  IX

    res.status(400).json({
        error: {
            message: 'Numero de boleto invalido.'
        }
    });

});

module.exports = router;

//23793130225083141459905006305204870010000002000
//23793381286000152497860000063309477060000002000
//23793.38128 60001.524978 60000.063309 4 77 060000002000