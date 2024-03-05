import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbol/factory";

export async function dashboard (req: Request,res: Response,next: NextFunction) {
    try{
        const userSymbols = await getModel().getForUser(1);
        res.render('users/dashboard', {
            userSymbols
        });   
    }
    catch(err){
        next(err)
    }
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