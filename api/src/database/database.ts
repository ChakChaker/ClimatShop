import { Knex} from "knex";
import createKnex from 'knex'
import { config } from "../../config";

const knexOptions : Knex.Config  ={
    client: 'mysql',
    connection: {
        host: config.DB_HOST,
        user: config.DB_USER,
        database: config.DB_NAME,
        password: config.DB_AUTH,
        port: config.DB_PORT,
    },
}

export const knex: Knex  = createKnex(knexOptions)