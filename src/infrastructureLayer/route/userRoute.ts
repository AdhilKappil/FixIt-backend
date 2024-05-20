import express, { NextFunction, Request, Response } from "express";
import { userAdapter } from "./injections/userInjection";
import { bookingAdapter } from "./injections/bookingInjection";
import AuthMiddleware from "../Middleware/authMiddleware";

const router = express.Router();

// roure for user registration
router.post("/signup", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.createUser(req, res, next)
);

// route for user login
router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.loginUser(req, res, next)
);

// route user google auth
router.post("/googleAuth", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.googleAuth(req, res, next)
);

// Route for user logout
router.post("/logout", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.logoutUser(req, res, next)
);

// Route for add profile
router.patch("/addProfile",AuthMiddleware.protectUser,
 (req: Request, res: Response, next: NextFunction) =>
  userAdapter.addProfile(req, res, next)
);

// Route for update user data
router.patch("/updateProfile",AuthMiddleware.protectUser,
 (req: Request, res: Response, next: NextFunction) =>
  userAdapter.updateProfile(req, res, next)
);

//routes for forgot password otp verification
router.post(
  "/sendOTPforgotPassword",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.sednOtpFogotPassword(req, res, next)
);

//routes for forgot password save
router.post(
  "/forgotPassword",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.fogotPassword(req, res, next)
);

// ========== routes for email verification =========

// roure for send otp to email
router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.sendEmail(req, res, next)
);

// route for verify email 
router.post("/verifyEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.emailVerification(req, res, next)
);


// ======= Service booking related routes =========== //

// For book service
router.post("/bookService",AuthMiddleware.protectUser,
 (req: Request, res: Response, next: NextFunction) =>
  bookingAdapter.bookService(req, res, next)
);

// For get bookings
router.get("/getBookings",AuthMiddleware.protectUser,
 (req: Request, res: Response, next: NextFunction) =>
  bookingAdapter.getBookings(req, res, next)
);

// For commit work
router.patch("/cancelBooking",AuthMiddleware.protectUser,
 (req: Request, res: Response, next: NextFunction) =>
  bookingAdapter.commitWork(req, res, next)
);




// ======== strip integration =============
// const stripe = require('stripe')('sk_test_...');

// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// let endpointSecret:string ;
  
// // endpointSecret = "whsec_ddc36f00110d9789bb7719fa5be16a2d6e13285facca913b211ac489aa65e1c8";


// router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let data ;
//   let eventType;

//   if(endpointSecret){

//     let event;
  
//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//       console.log("webhook verified");
      
//     } catch (err:any) {
//       console.log(`Webhook Error: ${err.message}`);
      
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }
//     data = event.data.object
//     eventType = event.type
//   }else{
//     data = req.body.object;
//     eventType = req.body.type
//   }

//   // handle the event 
//   if(eventType === "checkout.session.completed"){

//   }


//   res.send().end();
// });



export default router;
