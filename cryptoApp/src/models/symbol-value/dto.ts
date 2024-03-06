import { ObjectId } from "mongoose";

export interface DTO{
    id?: ObjectId;
    value: number;
    symbol: string;
    when: Date;
}