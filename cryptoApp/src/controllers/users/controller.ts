import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbol/factory";

export function dashboard (req: Request,res: Response,next: NextFunction) {
    res.render('users/dashboard');
}

export async function addSymbol (req: Request,res: Response,next: NextFunction){
    try{
        const userSymbolModel = getModel();
        const inputUserSymbol = {
            ...req.body, userId: 1
        }
        const newUserSymbol = await userSymbolModel.add(inputUserSymbol);
        res.redirect('/users/dashboard');
        console.log(`new userSymbol assed with id ${newUserSymbol.id}`)
    }
    catch(err){
        next(err)
    }
}