import mongoose from 'mongoose';
export class ObjectId extends mongoose.Schema.Types.ObjectId {};
export const OId = mongoose.Types.ObjectId;
export type ModelMap<T> = {
  [id in string | number]: T
}