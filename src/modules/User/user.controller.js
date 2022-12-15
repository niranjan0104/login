import User from '../../models/User';

const userSchema = async (req, res)=> {
    console.log("Coming here inside user ")
    let {body:{full_name, email }} = req
    try{
        console.log(full_name, email)
     const user = new User({
        full_name, email
       });
      await user.save();

      return res.status(200).json(user);

    }catch(e){
        console.log(e)
    }
}

export {userSchema}