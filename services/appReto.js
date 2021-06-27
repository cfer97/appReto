//Constantes de configuración
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/**
 * Función que hace una consulta de todos los registros 
 * a la base de datos
 * @param  page 
 * @returns  Objeto de datos
 */
async function getData(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        'SELECT datos.idDatos, usuario.nombre, datos.oficio, datos.mascotas, datos.pasatiempo FROM usuario LEFT JOIN datos ON datos.idUsuario = usuario.idUsuario',
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
 * Función para creación de un usuario
 * @param usuario 
 * @returns  message
 */
async function usuarioNuevo(usuario){
    let sql = 'INSERT INTO usuario VALUES (NULL, ?, ?, ?, 2)';
    const result = await db.query(
        sql,
        [
            usuario.usuario,
            usuario.password,
            usuario.nombre
        ] 
    );
    let message = 'Error al crear usuario :p';

    if(result.affectedRows){
        message = 'Usuario creado'; 
    }

    return {message}; 
}

/**
 * Función para realizar una consulta en base a un usuario
 * @param  usuario 
 * @returns message
 */
async function login(usuario){
    let sql = 'SELECT idRol, usuario, password FROM usuario WHERE usuario = ?';
    const result = await db.query(
        sql,
        [
            usuario
        ] 
    );
    let message = 'Usuario no existente';

    if(result != null){

        return(result[0]);
    }

    return{message}; 
}
 
module.exports = {
    
    usuarioNuevo,
    getData,
    login 

}