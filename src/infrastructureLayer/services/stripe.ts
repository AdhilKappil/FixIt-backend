import Stripe from "stripe";
const stripe = new Stripe('sk_test_51PIUXXSCq8UdAofezmDXxgO9QstvC55MJp2skB0Uqy0LIsnPjwnR4SR2FuATUflntTeyrkv2i6BMgCVEN1m8Cqmp00Wk0ZJPqd',{
    apiVersion: "2024-04-10"
});
import IStripe from "../../usecaseLayer/interface/services/IStripe";
import { IResponse} from "../../usecaseLayer/interface/services/Iresponse";
import { Req } from "../types/expressTypes";


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
        success_url: 'http://localhost:9000/profile/myBookings',
        cancel_url: 'http://localhost:9000/profile/myBookings',
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