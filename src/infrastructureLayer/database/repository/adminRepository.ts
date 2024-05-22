import { IAdmin } from "../../../domainLayer/admin";
import { IAdminRepository } from "../../../usecaseLayer/interface/repository/IadminRepository";
import AdminModel from "../model/adminModel";
import { amountToWallet } from "./admin/amountToWallet";
import { findAdmin } from "./admin/findAdmin";



// This class for exporting all the single DB operations togethor 
export class AdminRepository implements IAdminRepository {
  constructor(private readonly adminModel: typeof AdminModel) {}


   // Check if a admin exists using email
   async findAdmin(email: string): Promise<IAdmin | null> {
    return findAdmin(email, this.adminModel);
  }

    // for add work amount to wallet
    async amountToWallet(adminProfit:number): Promise<string | null> {
      return amountToWallet(adminProfit,this.adminModel)
    }

}