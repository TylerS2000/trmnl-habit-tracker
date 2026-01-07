import { NextFunction, Request, Response } from "express";

export default function authorizeRequest(req: Request, res: Response, next: NextFunction){

    if(req.headers.authorization === process.env.API_KEY){
        next()
    } else {
        res.status(401).send('unauthorized')
    }
}