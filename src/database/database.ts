import mongoose from "mongoose"
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../..', '.env');
dotenv.config({ path: envPath });


let MongodbURL = process.env.MONGODB_URL
// let MongodbURL = 'mongodb+srv://alamamaan335:RT3GSvh5YTtBMmmo@cluster0.vulhmfr.mongodb.net/trainifai?retryWrites=true&w=majority&appName=Cluster0'


const connectDatabase = async () => {
    try {
        // console.log(MongodbURL);

        if (MongodbURL) {
            await mongoose.connect(MongodbURL)
            // log.info(`MongoDB connected`)
            console.log("Mongodb connected");

            // await trainBot()
            // await loadQAModel()

        }
    } catch (error) {
        // log.error(`MongoDB Not Connected ${error}`)
        console.log("Mongodb Not-connected");
    }
}

export default connectDatabase