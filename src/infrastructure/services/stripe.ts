import IStripe from "../../usecase/interface/services/IStripe";
import { IResponse} from "../../usecase/interface/services/Iresponse";
import { Req } from "../types/expressTypes";

import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string,{
    apiVersion: "2024-04-10"
});

class StripeService implements IStripe {

    async  createPaymentIntent(
      amount:number,
      bookingId:string,
      workerId:string
    ):Promise<IResponse> {
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'Service Payment is',
              },
              unit_amount: amount *100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://fixit-eta.vercel.app/profile/myBookings',
        cancel_url: 'https://fixit-eta.vercel.app/profile/myBookings',
        metadata: { 
          bookingId,
          amount,
          workerId
        },
      });
        return {
          success:true,
          status:200,
          data:session.id
        }
  }

  async paymentSuccess(req:Req){
    const payload = req.body;     
    const payloadString = JSON.stringify(payload, null, 2);
    const signature = req.headers["stripe-signature"];

    if (typeof signature !== "string") {
      return false;
    }

    const endpointSecret= "whsec_ddc36f00110d9789bb7719fa5be16a2d6e13285facca913b211ac489aa65e1c8";
    const header = stripe.webhooks.generateTestHeaderString({
      payload:payloadString,
      secret:endpointSecret
    });

    let event
       event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
    if (event.type == "charge.succeeded") {
      return true;
    } else {
      return false;
    }

  }
}

export default StripeService