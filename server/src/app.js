import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import addressRouter from "./routes/address.route.js";
import bodyParser from "body-parser";
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//routes declaration
app.use("/api/v1/address", addressRouter);

// http://localhost:8000/api/v1/users/register

export { app };
