'use strict'
const sql = require('mssql');
class Database {
    //ALTERAR ESSAS VARIÁVEIS DE ACORDO COM AS CONFIGURAÇÕES DO SQL DE QUEM IRÁ MEXER, DEIXAR APENAS O "config.database"
    public config = {
        user: 'sa',
        password: 'admin',
        server: '127.0.0.1', 
        database: 'teste_angular_arthur_miksza',
        port: 1433,
        instanceName: 'SQLEXPRESS'
    };

    constructor() {
    }
           
    async execQuery(query) {
        try {
            await sql.connect(this.config)
            const result = await sql.query(query);
            sql.close();
            return result;
        } catch (err) {
            sql.close();
            return err;
        }
    }
}
export default new Database();