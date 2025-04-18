import {Request,Response,NextFunction} from "express"
export const checkAllValueExist=(req:Request,res:Response,next:NextFunction)=>{
    const {cardNumber,country,firstName,lastName,expiryDate,userId}=req.body
    if(!cardNumber){
        res.send({
            success:false,
            message:"card number missing"
        })
    }else if(!country){
    res.send({
        success:false,
        message:"country missing"
    })
}else if(!firstName){
    res.send({
        success:false,
        message:"first name missing"
    })
}else if(!lastName){
    res.send({
        success:false,
        message:"last name missing"
    })
}else if(!expiryDate){
    res.send({
        success:false,
        message:"expiry date missing"
    })
}else if(!userId){
    res.send({
        success:false,
        message:"user id missing"
    })
}else{
    next()
}
}