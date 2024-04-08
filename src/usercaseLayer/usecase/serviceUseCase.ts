import { IServiceRepository } from "../interface/repository/IserviceRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { createService } from "./service/createService";

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
}
