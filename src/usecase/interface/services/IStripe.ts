import { Req } from "../../../infrastructure/types/expressTypes";
import { IResponse } from "./Iresponse";

interface IStripe {
    createPaymentIntent(amount:number,bookingId:string,workerId:string):Promise<IResponse>
    paymentSuccess(request:Req):Promise<boolean|null>
}


export default IStripe