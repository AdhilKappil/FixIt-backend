import { IAdmin } from "../../../domain/admin";


export interface IAdminRepository {
  findAdmin(email: string): Promise<IAdmin | null>;
  amountToWallet(adminProfit:number): Promise<string | null>;
}