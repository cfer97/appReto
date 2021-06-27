//Constantes de configuración
const express = require('express');
const router = express.Router();
const appReto = require('../services/appReto');

/*
Objeto de ruteo que se encarga de mapear las peticiones
de diferente tipo a los servicios correspondientes
*/
router.get('/', async function(req, res, next){
    try{
        res.json(await appReto.getData(req.query.page));
    } catch(err){
        console.error('Error', err.message);
        next(err);
    }
});


router.post('/', async function(req, res, next){
    try{
        res.json(await appReto.usuarioNuevo(req.body));
    } catch(err){
        console.error('Error', err.message);
        next(err);
    }
});

router.get('/:usuario', async function(req, res, next){
    try{
        res.json(await appReto.login(req.params.usuario));
    } catch(err){
        console.error('Error', err.message);
        next(err);
    }
});
module.exports = router;