import bcrypt from "bcrypt";
import User from '../../models/User';

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

    return res.status(200).json({
      "message": "signIn successfully",
      "user": user
    });
  }catch(e){
      res.status(500).json({
        error: e.message
      })
  }
}

}

export default new offerController()