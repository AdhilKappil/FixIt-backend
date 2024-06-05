export interface IUser {
  _id?: string;
  name: string;
  mobile? : string
  email: string;
  password: string;
  profile_img?: string;
  isBlocked?: boolean;
  createdAt?:Date
}

