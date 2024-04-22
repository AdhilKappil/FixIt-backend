import { IServiceRepository } from "../interface/repository/IserviceRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { createService } from "./service/createService";
import { editService } from "./service/editService";
import { getService } from "./service/gerService";

export class ServiceUseCase {
  private readonly serviceRepository: IServiceRepository;
  private readonly requestValidator: IRequestValidator;

  constructor(
    serviceRepository: IServiceRepository,
    requestValidator: IRequestValidator
  ) {
    this.serviceRepository = serviceRepository;
    this.requestValidator = requestValidator;
  }

  //to create service
  async createService({
    serviceName,
    firstHourCharge,
    laterHourCharge,
    description,
    service_img,
  }: {
    serviceName: string;
    firstHourCharge: number;
    laterHourCharge: number;
    description: string;
    service_img: string;
  }) {
    return createService(
      this.requestValidator,
      this.serviceRepository,
      serviceName,
      firstHourCharge,
      laterHourCharge,
      description,
      service_img
    );
  }

  // user get all user data
  async getService() {
    return getService(
    );
  }

  async editService({
    _id,
    serviceName,
    isBlocked,
    firstHourCharge,
    laterHourCharge,
    description,
    // service_img,
  }: {
    _id : string
    serviceName: string;
    isBlocked : boolean;
    firstHourCharge:number;
    laterHourCharge:number;
    description: string;
    // service_img: string;
  }) {
    return editService(
      this.requestValidator,
      this.serviceRepository,
      _id,
      serviceName,
      description,
      firstHourCharge,
      laterHourCharge,
      isBlocked,
      // service_img
    );
  }


}
