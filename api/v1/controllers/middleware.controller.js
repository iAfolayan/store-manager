import jwt from 'jsonwebtoken';
import helper from '../utils';

const isUserAuthorized = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
    if (err || !decoded) {
      return helper.sendMessage(res, 401, 'Invalid token, please login');
    }
    req.decoded = decoded;
    next();
  });
};

const isUserAdmin = (req, res, next) => {
  const { role } = req.decoded;
  if (role !== 1) {
    return helper.sendMessage(res, 403, 'Permission denied');
  }
  next();
};

export default {
  isUserAuthorized,
  isUserAdmin
};
