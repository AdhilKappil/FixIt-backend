export interface IBooking {
    _id?: string;
    userId: string;
    workerId?: string;
    service : string;
    serviceImg:string;
    firstHourCharge : number;
    laterHourCharge : number;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    status?: string;
    price?:number;
    payment?:boolean;
    paymentId?:string;
    latitude:number;
    longitude:number;
  }
  
  