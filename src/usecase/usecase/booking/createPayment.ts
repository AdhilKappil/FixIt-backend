
import ErrorResponse from "../../handler/errorResponse";
import IStripe from "../../interface/services/IStripe";
import { IResponse } from "../../interface/services/Iresponse";

export const createPayment = async(
    stripe:IStripe,
    amount:number,
    bookingId:string,
    workerId:string
):Promise<IResponse>=>{
    try{
            const res = await stripe.createPaymentIntent(amount,bookingId,workerId)
            if(res){
                return {
                    status: 200,
                    success: true,
                    message: 'created',
                    data:res.data
                }
            }
            throw ErrorResponse.badRequest('Failed to create payment intent');
    }catch(error){
        console.log(error)

        throw error
    }
}