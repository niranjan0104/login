import express from "express";
import multer from "multer";
import { createValidator } from "express-joi-validation";
import path from "path";
import User from "../../models/User";
import signUpValidate  from "./user.validator";
import signUpController  from "./user.controller";

const validator = createValidator({
  passError: true,
});
const router= express.Router()


router.post(
   "/signup",
   validator.body(signUpValidate.signUpSchema),
   signUpController.userSchema
)

router.post(
  "/login",
  validator.body(signUpValidate.loginSchema),
  signUpController.loginSchema
)




const uploadPath = path.join(__dirname, "../public/uploads/");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/createuser" ,
  upload.single("image"),
  async ( req , res)=>{
    try{
       req.body.profileImage =  req.file.filename;
       const createdUser = await User.create(req.body)
       res.json({ message:"user created", createdUser: createdUser})
    }catch(err){
        console.log("There is a error " ,err)
    }
});


router.get("/createuser",
 async (req, res) => {
  try{
    const data = await User.find({}).sort({_id: -1});
    const count = await User.countDocuments({})
     res.json({message:"list",totalRecord: count, record: data})

  }catch(err){
    console.log(err)
  }
  }
)


export default router