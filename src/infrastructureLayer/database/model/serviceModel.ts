import mongoose, { Document, Model, Schema } from "mongoose";
import { IService } from "../../../domainLayer/service";

const serviceSchema: Schema = new Schema<IService & Document>(
  {
    serviceName: { type: String, required: true, unique:true},
    description: { type: String, required: true },
    service_img: { type: String, required:true},
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ServiceModel: Model<IService & Document> = mongoose.model<IService & Document>(
  "Service",
  serviceSchema
);

export default ServiceModel;
