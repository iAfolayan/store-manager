import jwt from 'jsonwebtoken';
import client from '../db/index';
import helper from '../utils';

const login = (req, res) => {
  const { staffid, password } = req.body;

  // Form validation
  req.checkBody('staffid', 'StaffId field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();

  // check Errors
  const errors = req.validationErrors();
  if (errors) {
    return helper.sendMessage(res, 400, errors[0].msg);
  }
  client.query(`SELECT * FROM users WHERE staffid = '${staffid}' AND password = '${password}'`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 401, 'Invalid login credentials');
    const token = jwt.sign({
      id: staffid,
      role: data.rows[0].role
    }, process.env.SECRET, {
      expiresIn: '1d'
    });
    helper.sendMessage(res, 200, 'Login successful', token);
  });
};

export default {
  login
};
