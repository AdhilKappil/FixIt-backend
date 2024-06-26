import mongoose, { Document, Model, Schema } from "mongoose";
import { IWorker } from "../../../domain/worker";

const workerSchema: Schema = new Schema<IWorker & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, default: "" },
    service: { type: String, required: true },
    district: { type: String, required: true },
    experience: { type: Number, required: true },
    profile_img: { type: String, default: "" },
    idCard_img: { type: String, default: "" },
    wallet: { type: Number, default:0 },
    status: { type: String, default: "pending" },
    isBlocked: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

const WorkerModel: Model<IWorker & Document> = mongoose.model< IWorker & Document>
("Worker", workerSchema);

export default WorkerModel;
