import { IService } from "../../../domainLayer/service";
import { IServiceRepository } from "../../../usercaseLayer/interface/repository/IserviceRepository";
import ServiceModel from "../model/serviceModel";
import { createService } from "./service/createService";
import { findService } from "./service/findService";



// This class for exporting all the single DB operations togethor 
export class ServiceRepository implements  IServiceRepository{
  constructor(private readonly serviceModel: typeof ServiceModel) {}

  // Create new user
  async createService(newService: IService): Promise<string> {
    return createService(newService, this.serviceModel);
  }

   // Check if a user exists using email
   async findService(serviceName: string): Promise<IService | null> {
    return findService(serviceName, this.serviceModel);
  }


}
