import  {connect} from "mongoose";
import 'dotenv/config';

const connects = async () => {
    return connect(`mongodb://localhost:27017/gates`)
    .then(() => {
        console.log("db connected")
    }).catch((e) => {
        console.log(e)
    })
}

export default connects