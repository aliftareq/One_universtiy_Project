import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelper';
// import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //checkUser exist
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User regarding this id doesn't exist"
    );
  }

  //match password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password doesn't match");
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;

  //create access token (jwt)
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //create refresh token (jwt)
  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // console.log({ accessToken, refreshToken, needsPasswordChange });

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let varifiedToken = null;
  try {
    varifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  //checking deleted user's refresh token
  const { userId } = varifiedToken;
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

// const changePassword = async (
//   user: JwtPayload | null,
//   passwordData: IChangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = passwordData;

//   //checkUser exist
//   const isUserExist = await User.isUserExist(user?.userId);

//   if (!isUserExist) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       "User regarding this id doesn't exist"
//     );
//   }

//   //checking  old password
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(oldPassword, isUserExist?.password))
//   ) {
//     throw new ApiError(
//       httpStatus.UNAUTHORIZED,
//       'your old Password is Incorrect'
//     );
//   }

//   //hash  password before saving
//   const newHashPassword = await bcrypt.hash(
//     newPassword,
//     Number(config.bcrypt_salt_rounds)
//   );

//   const query = { id: user?.userId };
//   const updatedData = {
//     password: newHashPassword,
//     needsPasswordChange: false,
//     passwordChangeAt: new Date(),
//   };

//   //update Password
//   await User.findOneAndUpdate(query, updatedData);
// };

/*alternative way*/
const changePassword = async (
  user: JwtPayload | null,
  passwordData: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = passwordData;

  //checkUser exist
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  console.log(isUserExist);
  if (!isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User regarding this id doesn't exist"
    );
  }

  //checking  old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'your old Password is Incorrect'
    );
  }

  // data update
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  //updating using save method
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
