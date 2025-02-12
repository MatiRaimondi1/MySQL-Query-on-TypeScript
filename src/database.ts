require('dotenv/config');
import mysql, {Connection} from 'mysql2/promise';
import { RowDataPacket } from 'mysql2/promise';

export default class Database {
    private static instance: Database;
    private connection: Connection | null = null;

    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        if (!this.connection) {
            this.connection = await mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE
            });
            console.log('Successfully connected to the database.');
        }
    }

    public async query<T extends RowDataPacket[]>(sql: string, params?: any[]): Promise<T> {
        if (!this.connection) {
            throw new Error('You are not connected to a database.');
        }
        const [rows] = await this.connection.execute<T>(sql, params);
        return rows;
    }
}