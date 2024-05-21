import { IBookingRepository } from "../../interface/repository/IbookingRepository"

export const paymentConfirmation = async(
    bookingRepository:IBookingRepository,
    transactionId:string,
    bookingId:string
)=>{
    try{

        console.log("enterd payment confirmation --------");
        
        const userData = await bookingRepository.payment(bookingId,transactionId)
        // const paymentData = await bookingRepository.paymentData(email,amount,transactionId,userId)
        // console.log('the payment data is :',userData,paymentData)

    }catch(err){
        console.log(err)

        throw err
    }

}