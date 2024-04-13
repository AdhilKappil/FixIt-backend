import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../database/repository/userRepository';
import { AdminRepository } from '../database/repository/adminRepository';
import { IUser } from '../../domainLayer/user';
import { IAdmin } from '../../domainLayer/admin';
import UserModel from '../database/model/userModel';
import AdminModel from '../database/model/adminModel';

// Augment the express Request type to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser | IAdmin; // Define user property
    }
  }
}

class AuthMiddleware {

  // user authentication
  static async protectUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let token: string | undefined;

    console.log('User protect');
    token = req.cookies.jwt;

    const userRepository = new UserRepository(UserModel);

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
        const user = await userRepository.findUser(decoded.email);
        if (user) {
          req.user = user;
          console.log('before next');
          next();
        } else {
          console.error('User not found');
          res.status(404).send('User not found');
        }
      } catch (error) {
        console.error(error);
        res.status(401).send('Not authorized, no token');
      }
    } else {
      console.log('No token');
      res.status(401).send('Not authorized, no token');
    }
  }


  // admin authentication
  static async protectAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    let token: string | undefined;

    console.log('Admin protect');
    token = req.cookies.jwt;

    const adminRepository = new AdminRepository(AdminModel);

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
        const admin = await adminRepository.findAdmin(decoded.email);
        if (admin) {
          req.user = admin;
          console.log('before next');
          next();
        } else {
          console.error('Admin not found');
          res.status(404).send('Admin not found');
        }
      } catch (error) {
        console.error(error);
        res.status(401).send('Not authorized, no token');
      }
    } else {
      console.log('No token');
      res.status(401).send('Not authorized, no token');
    }
  }
}

export default AuthMiddleware;