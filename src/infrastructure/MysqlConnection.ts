import Connection from '../domain/repository/Connection';
import * as mysql from 'mysql';

export default class MysqlConnection implements Connection {
    private connection: any;
    constructor(host: string, user: string, password: string, database: string) {
        this.connection = mysql.createConnection({
            host,
            user,
            password,
            database
        });
    }
    async connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.connect((error: any) => {
                if (error) {
                    return reject(error);
                }
                resolve(true);
            });
        });
    }

    async query(sql: string, params: any[] | null) {
     return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error: any, results: any) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    async end(): Promise<any> {
        {
            return new Promise((resolve, reject) => {
                this.connection.end((error: any) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(true);
                });
            });
        }
    }
 
}