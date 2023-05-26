import mongoose from "mongoose";
const connectDB = async () => {
  mongoose.set("strictQuery", false);
  return await mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log(`DB Connected Successfully`))
    .catch(() => console.log(`DB Connection Fail`));
};

export default connectDB;
