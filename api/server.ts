
import mongoose from "mongoose"

const DB = async (MONGO_CONNECTION) => {
    try {
        const conn = await mongoose.connect(MONGO_CONNECTION)
        return conn.connection
    } catch (err) {
        return err
    }
}

export default DB
