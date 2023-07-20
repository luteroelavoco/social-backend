import 'dotenv/config'
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
import { DataBaseConnection } from './database/implementations/DataBaseConnection';

const app = express();
const dataBase = new DataBaseConnection();

dataBase.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(router);

export { app }