import { Types } from "mongoose";

export interface IBooking {
  _id?: string;
  userId: Types.ObjectId | string;
  workerId?: Types.ObjectId | string;
  service: string;
  serviceImg: string;
  firstHourCharge: number;
  laterHourCharge: number;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  status?: string;
  price?: number;
  payment?: boolean;
  paymentId?: string;
  latitude: number;
  longitude: number;
}
