export interface IBooking {
    _id?: string;
    userId: string;
    workerId?: string;
    service : string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    status?: string;
    price?:number;
    latitude:number;
    longitude:number;
  }
  
  