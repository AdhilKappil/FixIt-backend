
import { IAdminRepository } from "../interface/repository/IadminRepository";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../interface/repository/IworekerRepository";
import IHashpassword from "../interface/services/Ihashpassword";
import Ijwt from "../interface/services/Ijwt";
import { acceptOrRejectRequest } from "./admin/acceptRequest";
import { blockUnblockUser } from "./admin/blockUser";
import { getJoinRequests } from "./admin/getJoinRequests";
import { getUsers } from "./admin/getUsers";
import { loginAdmin } from "./admin/loginAdmin";



export class AdminUseCase {
  private readonly adminRepository: IAdminRepository;
  private readonly  userRepository: IUserRepository;
  private readonly workerRepository: IWorkerRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;

  constructor(
    adminRepository: IAdminRepository,
    userRepository: IUserRepository,
    workerRepository:IWorkerRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ) {
    this.userRepository = userRepository
    this.adminRepository = adminRepository;
    this.workerRepository = workerRepository
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.requestValidator = requestValidator;
  }


// admin can login here
  async loginAdmin({ email, password }: { email: string; password: string }) {
    console.log('email',email, password);
    
    return loginAdmin(
      this.requestValidator,
      this.adminRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }


  // user get all user data
  async findAllUser() {
    return getUsers(
    );
  }

   // user get all user data
   async findAllRequests() {
    return getJoinRequests(
    );
  }

  // worker request accept or reject
  async acceptOrRejectRequest({ id, status }: {id: string, status:string }) {
    return acceptOrRejectRequest(
      this.requestValidator,
      this.workerRepository,
      id,
      status
    );
  }

  async blockUnblockUser(_id:string) {
    console.log(_id);
    
    return blockUnblockUser(
      this.requestValidator,
      this.userRepository,
      _id);
  }

}
