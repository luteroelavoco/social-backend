import { Json as JsonDatabase } from "../../models/JsonData";
import mongoose from "mongoose";
import { IJsonDataRepository } from "../IJsonDataRepository";

export class JsonDataRepository implements IJsonDataRepository {
  async save(data: string): Promise<string> {
    let jsonData = await JsonDatabase.findOne({ index: 1 });

    if (jsonData) {
      jsonData.data = data;
      await jsonData.save();
      return jsonData.data;
    }

    jsonData = await JsonDatabase.create({
      data,
      index: 1,
    });
    return jsonData.data;
  }

  async get(): Promise<string> {
    let jsonData = await JsonDatabase.findOne({ index: 1 });
    return jsonData ? jsonData.data : "";
  }
}
