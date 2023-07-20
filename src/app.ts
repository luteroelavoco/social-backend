import 'dotenv/config'
import express from "express";
import { router } from "./routes";
import { DataBaseConnection } from './database/implementations/DataBaseConnection';


const app = express();
const dataBase = new DataBaseConnection();

dataBase.connect();

app.use(express.json());
app.use(router);

export { app }