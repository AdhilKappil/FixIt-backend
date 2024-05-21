import { IResponse } from "./Iresponse";

interface IStripe {
    createPaymentIntent(amount:number,bookingId:string):Promise<IResponse>
    paymentSuccess(request:any):Promise<boolean|null>
}


export default IStripe