//Constantes de configuración
const express = require('express');
const bodyParser = require('body-parser');

//Variable de aplicación express
const app = express();

//Variable con el número de puerto a utilizar
const port = process.env.PORT || 3000;

//Constantes de ruteo
const appRetoRouter = require('./routes/appReto');
const datosRouter = require('./routes/datos');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/*app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})*/

//Asignación de ruta y de constantes de ruteo
app.use('/appReto', appRetoRouter);
app.use('/datos',datosRouter);

//Retorno de mensaje de error
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});

    return;
});


//Inicialización del servidor
app.listen(port, () =>{
    console.log('Example app listening at http://localhost:${port}')
});

