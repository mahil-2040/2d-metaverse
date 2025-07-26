import  express  from "express";
import { router } from "./routes/v1";
import path from "path";
import dotenv from "dotenv";
dotenv.config({path: path.join(__dirname,"../../.env")});

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});