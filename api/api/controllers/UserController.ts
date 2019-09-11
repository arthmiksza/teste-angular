import Database from '../services/database';
import { User } from '../models/User';
class UserController {
    constructor() {
    }

    searchAll(page: number, limit: number = 20) {
        return Database.execQuery('exec pGetUsers ' + page + ', ' + limit);
    }

    searchAllWithFilter(filter: string, type: number) {
        if (filter == '') filter = null;
        let query = `exec getAllUsersWithFilter '${filter}',  ${type}`;
        return Database.execQuery(query);
    }

    searchOne(id: number) {
        return Database.execQuery('select * from usu_tb_usuario where id_usuario = ' + id);
    }

    createUser(data: User) {
        let query = `
            INSERT INTO usu_tb_usuario (tx_nome, tx_sobrenome, tx_email, tx_sexo, tx_cidade, tx_estado, tx_formacao, tx_profissao, dt_cadastro) VALUES 
            ('${data.tx_nome}', '${data.tx_sobrenome}', '${data.tx_email}',
             '${data.tx_sexo}', '${data.tx_cidade}', '${data.tx_estado}',
             '${data.tx_formacao}','${data.tx_profissao}', '${data.dt_cadastro}');
             SELECT TOP 1 id_usuario FROM usu_tb_usuario ORDER BY id_usuario DESC;
        `;
        return Database.execQuery(query);
    }

    updateUser(data: User) {
        let query = `
            UPDATE usu_tb_usuario SET 
            tx_nome = '${data.tx_nome}',
            tx_sobrenome = '${data.tx_sobrenome}',
            tx_email = '${data.tx_email}',
            tx_sexo = '${data.tx_sexo}',
            tx_cidade = '${data.tx_cidade}',
            tx_estado = '${data.tx_estado}',
            tx_formacao = '${data.tx_formacao}',
            tx_profissao = '${data.tx_profissao}',
            dt_cadastro = '${data.dt_cadastro}'
            WHERE id_usuario = ${data.id_usuario}
        `;
        return Database.execQuery(query);
    }

    deleteUser(id: number) {
        return Database.execQuery('update usu_tb_usuario set is_deleted = 1 where id_usuario = ' + id)
    }
}

export default new UserController()