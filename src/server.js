import express from 'express';
import connects from './config/db';
import UserRoute from "./modules/User/user.routes";

const app = express()

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json("hello niranjan")
});


app.use('/users' , UserRoute);





connects();
app.listen( port, () => {
    console.log(`server is listening on ${port}`);
})