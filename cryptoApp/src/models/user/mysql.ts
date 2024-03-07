import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import { DTO } from "./dto";
import { Model } from "./model";

class Mysql implements Model{
    async get(githubId: string): Promise<DTO> {
        const user: DTO = (await query(`
            SELECT id, github_id
            FROM users
            WHERE github_id = ?`, [githubId]))[0]
        return user;
    }

    async signup(user: DTO): Promise<DTO> {
        const { githubId } = user;
        const result: OkPacketParams = await query(`
        INSERT INTO users
        (github_id)
        VALUES
        (?)
        `,[githubId]);
        const newUser = {
            ...user,
            id: result.insertId
        };
        return newUser;
    }
}

const mysql = new Mysql();
export default mysql;