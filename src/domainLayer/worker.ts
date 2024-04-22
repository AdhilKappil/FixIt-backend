
export interface IWorker {
    _id?: string;
    name: string;
    mobile : string
    email: string;
    password: string;
    // firstHourCharge : number;
    // laterHourCharge : number;
    district : string;
    service : string;
    experience : number;
    idCard_img: string;
    profile_img?: string;
    status? : string;
    isBlocked?: boolean;
    createdAt?:Date
  }