import { dataBaseAccess } from "../../config/dataBaseConfig";
import { IDataBaseConnection } from "../IDataBaseConnection";
import mongoose from "mongoose";

export class DataBaseConnection implements IDataBaseConnection {

  constructor() { }

  connect(): void {
    mongoose.connect(`mongodb+srv://${dataBaseAccess.userName}:${dataBaseAccess.password}@cluster0.zt5sd.mongodb.net/`);
  }

}