import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../usecaseLayer/usecase/userUseCase";

export class UserAdapter {
  private readonly userusecase: UserUseCase;

  constructor(userusecase: UserUseCase) {
    this.userusecase = userusecase; // using dependency injection to call the userusecase
  }

  // @desc  Register new user
  //route     POST api/user/singup
  //@access   Public
  async createUser(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.createUser(req.body);
      newUser &&
        res.cookie("userjwt", newUser.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(newUser.status).json({
        success: newUser.success,
        message: newUser.message,
        user: newUser.data,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc  Register new user
  //route     POST api/user/login
  //@access   Public
  async loginUser(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.loginUser(req.body);
      user &&
        res.cookie("userjwt", user.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(user.status).json({
        success: user.success,
        data: user.data,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc    Sign in or SignUp using google auth
  //route     POST api/user/googleAuth
  //@access   Public
  async googleAuth(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.googleAuth(req.body);
      user &&
        res.cookie("userjwt", user.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(user.status).json({
        success: user.success,
        data: user.data,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }


    // @desc  Add user img 
  //route     Patch api/user/UpdateProfile
  //@access   Private
  async addProfile(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.addProfile(req.body);
      user &&
      res.status(user.status).json({
        success: user.success,
        message: user.message,
        user: user.data,
      });
    } catch (err) {
      next(err);
    }
  }


    // @desc  Update User 
  //route     Patch api/user/UpdateProfile
  //@access   Private
  async updateProfile(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.updateProfile(req.body);
      user &&
      res.status(user.status).json({
        success: user.success,
        message: user.message,
        user: user.data,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc  send ottp to new user email
  //route     POST api/user/sendEmail
  //@access   Public
  async sendEmail(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.verifyEmail(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc  Checking the otp valid or not
  //route     POST api/user/emailVerification
  //@access   Public
  async emailVerification(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.emailVeification(req.body);
      user &&
        res.status(user.status).json({
          success: user.success,
          // data: user.data,
          message: user.message,
        });
    } catch (err) {
      next(err);
    }
  }

    // @desc  send ottp to forget password
  //route     POST api/user/sednOtpFogotPassword
  //@access   Public
  async sednOtpFogotPassword(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.sendOtpFogotPassword(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc    Forgot password save
  //route     POST api/user/singup
  //@access   Public
  async fogotPassword(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.forgotPassword(req.body);
      newUser &&
        res.cookie("userjwt", newUser.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(newUser.status).json({
        success: newUser.success,
        message: newUser.message,
        user: newUser.data,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc    Logout user / clear cookie
  // @route   POST /api/user/logout
  // @access  Public
  async logoutUser(req: Req, res: Res, next:Next) {
    try {
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      next(err)
    }
  }
}
