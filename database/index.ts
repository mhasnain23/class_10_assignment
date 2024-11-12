
import mongoose from "mongoose";

const connectToDB = async () => {

    const conenctionURL = process.env.MONGODB_URI!

    mongoose.connect(conenctionURL).then(() => console.log("db conected successfully")).catch((e) => console.log(e))

}
export default connectToDB