import express from 'express';
import connects from './config/db';
import UserRoute from "./modules/User/user.routes";
import bodyParser from 'body-parser';

const app = express()

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        console.log("Joi Error")
    res.status(400).json({
      type: err.type, // can be query or headers or body
      message: err.error.toString(),
      err
     }
    );
    }else{
        return res.status(500).json({ success: false, err, message: err.message });
    } 
    });

app.get("/", (req, res) => {
    res.json("hello niranjan")
});


app.use('/users' , UserRoute);





connects();
app.listen( port, () => {
    console.log(`server is listening on ${port}`);
})