import jwt from "jsonwebtoken";
import User from "../models/User"

const isValidAccessToken = async function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied', success: false });
    }
    try{
        const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log("hi2", decode)
        let existingUser = await User.findOne({_id: decode.user.id})
        // console.log("existingUser",existingUser )
        req.user = {...existingUser.toObject(), id: existingUser._id};
        next();   
        // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        //     if(err){
        //         return res.status(403)
        //     }
        //     req.user = payload
        //     next()
        // })
    }catch(err){
        res.status(401).json({ message: 'Token is not valid', success: false })
    }

}

export default isValidAccessToken;