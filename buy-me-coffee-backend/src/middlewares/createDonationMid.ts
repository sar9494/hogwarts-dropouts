
import {Request, Response, NextFunction}  from "express"


export const createDonationMid = (req: Request, res:Response, next:NextFunction) => {

    const {amount, specialMessage, socialURLOrBuyMeACoffee, recipientId, donorId} = req.body

    if(!amount){
         res.status(400).json({ error: "Amount are required." });
    } else if(!specialMessage){
         res.status(400).json({ error: "Social message are required." });
    } else if(!socialURLOrBuyMeACoffee){
         res.status(400).json({ error: "social URL are required." });
    } else if (!recipientId){
         res.status(400).json({ error: "Recipient ID are required." });
    }else if(!donorId){
         res.status(400).json({ error: "Donor Id are required." });
    } else{
        next();
    }
}