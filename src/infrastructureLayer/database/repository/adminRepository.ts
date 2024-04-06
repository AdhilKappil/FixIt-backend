import { IAdmin } from "../../../domainLayer/admin";
import { IAdminRepository } from "../../../usercaseLayer/interface/repository/IadminRepository";
import AdminModel from "../model/adminModel";
import { findAdmin } from "./admin/findAdmin";



// This class for exporting all the single DB operations togethor 
export class AdminRepository implements IAdminRepository {
  constructor(private readonly adminModel: typeof AdminModel) {}


   // Check if a admin exists using email
   async findAdmin(email: string): Promise<IAdmin | null> {
    return findAdmin(email, this.adminModel);
  }

}