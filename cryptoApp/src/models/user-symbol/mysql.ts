import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import { DTO } from "./dto";
import { Model } from "./model";

class Mysql implements Model{

    async add(userSymbol: DTO): Promise<DTO> {
        const {userId, symbol} = userSymbol;
        const result:OkPacketParams = await query(`
        INSERT INTO users_symbols
        (user_id, symbol)
        VALUES
        (?,?)
        `,[userId,symbol]);
        const newUserSymbol = {
            ...userSymbol,
            id: result.insertId
        };
        return newUserSymbol;
    }

    async getForUser(userId: number): Promise<DTO[]> {
        const userSymbols: DTO[] = await query(`
            SELECT id, user_id, symbol
            FROM users_symbols
            WHERE user_id = ?`, [userId])
        return userSymbols;
    }

    
}

const mysql = new Mysql();
export default mysql;