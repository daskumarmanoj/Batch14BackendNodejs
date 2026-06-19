import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const result = await mongoose.connect(process.env.MONODB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
