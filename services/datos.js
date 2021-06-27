//Constantes de configuración
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/**
 * Función que realiza un select de todos 
 * los datos registrados en la tabla datos
 * @param  page 
 * @returns Objeto de Datos 
 */
async function getData(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        'SELECT datos.idDatos, usuario.idUsuario, usuario.nombre, datos.oficio, datos.mascotas, datos.pasatiempo FROM usuario LEFT JOIN datos ON datos.idUsuario = usuario.idUsuario',
        [offset, config.listPerPage]
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return{
        data,
        meta
    }
}

/**
 * Función que realiza un registro de datos
 * @param datos 
 * @returns message
 */
async function datosUsuario(datos){
    let sql = 'INSERT INTO datos VALUES (NULL, ?, ?, ?, ?)';
    const result = await db.query(
        sql,
        [
            datos.oficio,
            datos.mascotas,
            datos.pasatiempo,
            datos.idUsuario
        ] 
    );
    let message = 'Error al registrar el formulario';

    if(result.affectedRows){
        message = 'Formulario registrado'; 
    }

    return {message}; 
}

/**
 * Función que realiza un Select de datos en base a un id
 * @param id 
 * @returns rows
 */
async function getFormularioById(id){
   
    const rows = await db.query(
        'SELECT datos.idDatos, usuario.nombre, datos.oficio, datos.mascotas, datos.pasatiempo FROM usuario LEFT JOIN datos ON datos.idUsuario = ?',
        [id]
    );

    return rows[0];
}


 
module.exports = {
    
    getData,
    datosUsuario,
    getFormularioById 

}