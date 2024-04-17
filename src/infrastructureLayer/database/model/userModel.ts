
import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "../../../domainLayer/user";

const userSchema: Schema = new Schema<IUser & Document>(
{
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String ,default:""},
    profile_img: { type: String, default:"" },
    isBlocked: { type: Boolean, default: false },
},    

  {
    timestamps: true,
  }
);

const UserModel: Model<IUser & Document> = mongoose.model<IUser & Document>(
  "User",
  userSchema
);

export default UserModel;