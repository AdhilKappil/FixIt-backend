
export interface IWorker {
    _id?: string;
    name: string;
    mobile : string
    email: string;
    password: string;
    district : string;
    service : string;
    experience : number;
    idCard_img: string;
    profile_img?: string;
    wallet?:number;
    status? : string;
    isBlocked?: boolean;
    createdAt?:Date
  }