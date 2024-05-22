import { IAdminRepository } from "../../interface/repository/IadminRepository"
import { IBookingRepository } from "../../interface/repository/IbookingRepository"
import { IWorkerRepository } from "../../interface/repository/IworekerRepository"

export const paymentConfirmation = async(
    bookingRepository:IBookingRepository,
    workerRepository:IWorkerRepository,
    adminRepository:IAdminRepository,
    transactionId:string,
    bookingId:string,
    workerId:string,
    amount:number,
)=>{
    try{

        await bookingRepository.payment(bookingId,transactionId)
        const adminProfit =Math.round(amount * 3 / 100)
        const workerAmount = amount - adminProfit
        await workerRepository.amountToWallet(workerId,workerAmount)
        await adminRepository.amountToWallet(adminProfit)
        
    }catch(err){
        console.log(err)

        throw err
    }

}