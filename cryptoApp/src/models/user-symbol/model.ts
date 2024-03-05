import { DTO } from "./dto";

export interface Model{
    add(userSymbol: DTO): Promise<DTO>;
}