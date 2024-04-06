
import mongoose, { Document, Model, Schema } from "mongoose";
import { IAdmin } from "../../../domainLayer/admin";

const adminSchema: Schema = new Schema<IAdmin & Document>(
{
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

},    

  {
    timestamps: true,
  }
);

const AdminModel: Model<IAdmin & Document> = mongoose.model<IAdmin & Document>(
  "Admin",
  adminSchema
);

export default AdminModel;