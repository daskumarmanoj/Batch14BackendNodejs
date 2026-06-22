import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./db.js";
import dns from "dns";
import UserRouter from "./routes/user.route.js";
import FoodRouter from "./routes/food.route.js";

const app = express();
app.use(express.json());

app.use("/api/auth", UserRouter);
app.use("/api/food", FoodRouter);

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const PORT = process.env.PORT || 5500;
connectDb();
app.listen(PORT, () => {
  console.log("Server is Runing On Port", PORT);
});
