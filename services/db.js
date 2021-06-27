//Constantes de uso global para conexión
const mysql = require('mysql2/promise');
const config = require('../config');

/**
 * Función que se encarga de realizar una consulta en la base de datos
 * @param  sql 
 * @param  params 
 * @returns result
 */
async function query(sql, params){
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);

    return results;
} 


module.exports = {
    query
}