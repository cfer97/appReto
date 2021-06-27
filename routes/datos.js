//Constantes de configuración
const express = require('express');
const router = express.Router();
const datos = require('../services/datos');

/*
Objeto de ruteo que se encarga de mapear las peticiones
de diferente tipo a los servicios correspondientes
*/
router.get('/', async function(req, res, next){
    try{
        res.json(await datos.getData(req.query.page));
    } catch(err){
        console.error('Error', err.message);
        next(err);
    }
});

router.post('/', async function(req, res, next){
    try{
        res.json(await datos.datosUsuario(req.body));
    } catch(err){
        console.error('Error', err.message);
        next(err);
    }
});

router.get('/:id', async function(req, res, next){
    try{
        res.json(await datos.getFormularioById(req.params.id));
    } catch(err){
        console.error('Error', err.message);
        next(err);
    }
});
module.exports = router;