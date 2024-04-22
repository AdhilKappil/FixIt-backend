export interface IService {
    _id?: string;
    serviceName: string;
    description: string;
    firstHourCharge : number;
    laterHourCharge : number;
    service_img?: string;
    isBlocked?: boolean;
  }