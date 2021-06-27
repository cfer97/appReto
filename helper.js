/**
 * Función que se encarga de calcular el numero de paginas generadas para una consulta
 * @param currentPage 
 * @param listPerPage 
 * @returns Numero de paginas que se generan en la consulta
 * 
 */
function getOffset(currentPage = 1, listPerPage){
    return (currentPage -1) * [listPerPage];
}
/**
 * Función que alida si rows esta vacio o no
 * @param rows 
 * @returns Retorna un Array vacio en caso de que no haya resultado
 */
function emptyOrRows(rows){
    if(!rows){
        return[];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}