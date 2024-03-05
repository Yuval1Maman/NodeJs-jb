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
}

const mysql = new Mysql();
export default mysql;