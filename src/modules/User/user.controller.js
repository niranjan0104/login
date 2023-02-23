import bcrypt from "bcrypt";
import User from '../../models/User';
import jwt from "jsonwebtoken";

class offerController {

async userSchema (req, res) {
  
    let {body:{full_name, email, password, phoneNumber }} = req;
    try{
       const user = new User({
            full_name,
            email,
            password,
            phoneNumber
       });
       const salt = await bcrypt.genSalt(10);
       const hash = await bcrypt.hash(password, salt);
       user.password = hash

      await user.save();
      return res.status(200).json({
        "message": "signup successfully",
        "user": {_id: user._id}
      });
    }catch(e){
        // console.log("o")
        res.status(500).json({
          error : e.message
        })
    }
}

async loginSchema (req, res) {
  let {body:{ email, password }} = req;
  try{
     const user = await User.findOne({email: email}) 
        if(!user){
        return res.status(400).json({"error": "user not found"})
     };
    
     const passMatch = await bcrypt.compare(password, user.password)
        if( !passMatch ){
        return res.status(400).json({"error": "password is incorrect"})
     };
    //  const data = user._id;
     
     const payload = {
      user: {
        id: user._id
      }
    };
     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

    return res.status(200).json({
      "message": "signIn successfully",
      "accessToken": accessToken,
      "user": user
    });
  }catch(e){
      res.status(500).json({
        error: e.message
      })
  }
}

async postAddress (req, res){
  let { body: {full_name, userId, address},
        user: { id, email}
      } = req;
      console.log( id, email )
    try{
       const user = new User({
            full_name,
            userId,
            address
       });

      // await user.save();
      return res.status(200).json({
        "message": "test done",
        "user": {_id: user._id}
      });
    }catch(e){
        // console.log("o")
        res.status(500).json({
          error : e.message
        })
    }
}

async try(req, res){
  console.log("hello 11try")
}

}

export default new offerController()