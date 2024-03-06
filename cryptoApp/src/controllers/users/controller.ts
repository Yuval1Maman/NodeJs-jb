import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbol/factory";
import getSymbolValueModel from "../../models/symbol-value/factory";
import config from 'config';


export async function dashboard (req: Request,res: Response,next: NextFunction) {
    try{
        const userSymbols = await getModel().getForUser(1);
        const symbolValues = await Promise.all(userSymbols.map(symbol => getSymbolValueModel().getLatest(symbol.symbol)))
        res.render('users/dashboard', {
            userSymbols,
            symbolValues,
            io: config.get('app.io'),
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