import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  // console.log();
  const data = jwt.verify(token, secret) as JwtPayload;
  console.log('jwt helper', token, secret);
  return data;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
