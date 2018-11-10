const express = require('express');
const router = express.Router();

const formula = require("../formulas.js");

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


    res.status(400).json({
        error: {
            message: 'Numero de boleto invalido.'
        }
    });

});

module.exports = router;
