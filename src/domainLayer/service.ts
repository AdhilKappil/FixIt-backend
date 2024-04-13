export interface IService {
    _id?: string;
    serviceName: string;
    // firstHourCharge : number;
    // laterHourCharge : number;
    description: string;
    service_img?: string;
    isBlocked?: boolean;
  }