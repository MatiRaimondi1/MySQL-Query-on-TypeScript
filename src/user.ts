import Database from "./database";
import { RowDataPacket } from 'mysql2/promise';

export default class User {
    constructor(public id: number, public name: string) {}

    static async obtainAll(): Promise<User[]> {
        const db = Database.getInstance();
        await db.connect();
        const rows = await db.query<RowDataPacket[]>('SELECT * FROM user');
        return rows.map(row => new User(row.id, row.name));
    }
}