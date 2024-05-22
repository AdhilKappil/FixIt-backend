
import mongoose, { Document, Model, Schema } from "mongoose";
import { IBooking } from "../../../domainLayer/booking";

const bookingSchema: Schema = new Schema<IBooking & Document>(
{  
    userId: { type: String, required: true },
    workerId: { type: String, default:""},
    service: { type: String, required: true },
    serviceImg: { type: String, required: true },
    firstHourCharge: { type: Number, required: true },
    laterHourCharge: { type: Number, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true},
    endTime: { type: String, required: true },
    description: { type: String ,default:""},
    status: { type: String, default: "pending" },
    price: { type: Number, default:0 },
    payment:{type:Boolean, default: false},
    paymentId:{type:String, default: ""},
    latitude: {type:Number, required: true},
    longitude: {type:Number, required: true}
},    

  {
    timestamps: true,
  }
);

const BookingModel: Model<IBooking & Document> = mongoose.model<IBooking & Document>(
  "booking",
  bookingSchema
);

export default BookingModel;