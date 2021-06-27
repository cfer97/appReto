const env = process.env;
//Es la constante que almacena los datos de acceso a nuestra base de datos
const config = {
    db: {
        host: env.DB_HOST || 'localhost',
        user: env.DB_USER || 'root',
        password: env.DB_PASSWORD || 'Dicormo.2701',
        database: env.DB_NAME || 'contoso',
    },
    listPerPage: env.LIST_PER_PAGE || 10,
};

//Esportamos la constante "config" para que pueda ser usada en otros archivos
module.exports = config;
