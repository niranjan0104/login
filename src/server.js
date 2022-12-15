import express from 'express';
import connects from './config/db';
import UserRoute from "./modules/User/user"

const app = express()

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/users' , UserRoute)




connects();
app.listen( port, () => {
    console.log(`server is listening on ${port}`);
})