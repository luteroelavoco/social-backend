import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  state: String,
  city: String,
  street: String,
  number: Number,
  complement: String,
  cep: String,
  neighborhood: String,
})

export { addressSchema }