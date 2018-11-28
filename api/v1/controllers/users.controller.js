import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cuid from 'cuid';
import client from '../db/index';
import helper from '../utils';

const login = (req, res) => {
  const { staffId, password } = req.body;
  // Form validation
  req.checkBody('staffId', 'StaffId field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();

  // check Errors
  const errors = req.validationErrors();
  if (errors) {
    return helper.sendMessage(res, 400, errors[0].msg);
  }

  client.query(`SELECT * FROM users WHERE staffid = '${staffId}'`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error', 'danger');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 401, 'Invalid login credentials', 'danger');

    // Compare password
    bcrypt.compare(password, data.rows[0].password, (err, respass) => {
      if (!respass) return helper.sendMessage(res, 401, 'Invalid login credentials', 'danger');
      const token = jwt.sign({
        id: data.rows[0].id,
        staffId: data.rows[0].staffid,
        role: data.rows[0].role,
        firstname: data.rows[0].firstname
      }, process.env.SECRET, {
        expiresIn: '1d'
      });
      helper.sendMessage(res, 200, 'Login successful. Redirecting...', token);
    });
  });
};

const getAllUsers = (req, res) => {
  client.query('SELECT id, staffid, firstname, lastname, phonenumber, role FROM users WHERE role != 3 AND role != 1', (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error', 'danger');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'No user found', 'danger');
    return helper.sendMessage(res, 200, 'Record retrieved successfully', data.rows);
  });
};

const createUser = (req, res) => {
  const {
    id = cuid(),
    staffId,
    title,
    password,
    firstname,
    lastname,
    emailaddress,
    phonenumber,
    role,
    gender,
    contactaddress
  } = req.body;

  // Validate user pofile image
  let avatar = null;
  if (req.file) {
    avatar = req.body.filename;
  } else {
    avatar = 'defaultimage.jpg';
  }

  // Form validation
  req.checkBody('staffId', 'Staff Number field is required').notEmpty();
  req.checkBody('firstname', 'Firstname field is required').notEmpty();
  req.checkBody('lastname', 'Lastname field is required').notEmpty();
  req.checkBody('emailaddress', 'Email address field is required').notEmpty();
  req.checkBody('emailaddress', 'Invalid Email Address').isEmail();
  req.checkBody('phonenumber', 'Phone Number field is required').notEmpty();
  req.checkBody('phonenumber', 'Invalid Phone Number, Only integer allowed').isNumeric();
  req.checkBody('phonenumber', 'Incomplete Phone Number must be minimum of 11 characters')
    .isLength({ min: 11 });
  req.checkBody('role', 'Select type of User').notEmpty('');
  req.checkBody('gender', 'Select gender').notEmpty();
  req.checkBody('contactaddress', 'User contact address field is required').notEmpty();

  // check Errors
  const errors = req.validationErrors();

  if (errors) {
    return helper.sendMessage(res, 400, errors[0].msg, 'danger');
  }

  if (!phonenumber.match(/^[0-9]+$/)) {
    return helper.sendMessage(res, 400, 'Invalid Phone Number, Only integer allowed', 'danger');
  }
  client.query(`SELECT * FROM users WHERE staffid = '${staffId}'`, (err, data) => {
    if (data.rowCount === 1) return helper.sendMessage(res, 409, 'Duplicate staff id found');
    // password
    bcrypt.hash(password, 10, (errr, hash) => {
      const query = `INSERT INTO users(id, staffid, title, password, firstname, lastname,
         emailaddress, phonenumber, role, gender, avatar, contactaddress)
          VALUES('${id}','${staffId}', '${title}', '${hash}', '${firstname}',
           '${lastname}', '${emailaddress}', '${phonenumber}', ${role},
            '${gender}', '${avatar}', '${contactaddress}') RETURNING *`;
      client.query(query, (err, dataResult) => {
        if (err) {
          return helper.sendMessage(res, 500, 'Internal server error', 'danger');
        }
        return helper.sendMessage(res, 201, 'New user successfully created', dataResult.rows);
      });
    });
  });
};

const resetpassword = (req, res) => {
  const { emailaddress } = req.body;

  // Validate Email
  req.checkBody('emailaddress', 'Email Address field is required').notEmpty();
  req.checkBody('emailaddress', 'Invalid Email address').isEmail();

  // check Errors
  const errors = req.validationErrors();

  if (errors) {
    return helper.sendMessage(res, 400, errors[0].msg);
  }

  if (!emailaddress.trim()) {
    return helper.sendMessage(res, 400, 'Email address input is not valid.');
  }
  client.query(`SELECT * FROM users WHERE emailaddress='${emailaddress}'`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal Server Error');
    }
    if (data.rowCount === 0) {
      return helper.sendMessage(res, 404, `${emailaddress} is not found`);
    }
    return helper.sendMessage(res, 200, `A mail has been sent to ${emailaddress}. Kindly check and follow the link to reset your password`);
  });
};

const changePassword = (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { id } = req.decoded;

  // Form Validate
  req.checkBody('newPassword', 'New Password field is required').notEmpty();
  req.checkBody('confirmPassword', 'Confirm password field is required').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match').equals(newPassword);

  // check Errors
  const errors = req.validationErrors();

  if (errors) {
    return helper.sendMessage(res, 400, errors[0].msg, 'danger');
  }

  if (!newPassword.trim() || !confirmPassword.trim()) {
    return helper.sendMessage(res, 400, 'Input is not valid.', 'danger');
  }

  client.query(`UPDATE users SET password = ${newPassword} WHERE id=${id}`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal Server Error', 'danger');
    }

    if (data.rowCount === 0) {
      return helper.sendMessage(res, 404, 'Invalid User');
    }

    return helper.sendMessage(res, 201, 'Password Updated successfully');
  });
};

// Make a User an Admin
const makeUserAnAdmin = (req, res) => {
  const { userId } = req.params;

  client.query(`UPDATE users SET role = 1 WHERE id='${userId}'`, (err, data) => {
    if (err) {
      console.log(err)
      return helper.sendMessage(res, 500, 'Internal Server Error', 'danger');
    }

    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Invalid user', 'danger');

    return helper.sendMessage(res, 200, 'You have successfully make a user an Admin', 'success');
  });
};

const disabledUserAcoount = (req, res) => {
  const { userId } = req.params;
  client.query(`UPDATE users SET role = 3 WHERE id='${userId}'`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal Server Error', 'danger');
    }

    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Invalid user', 'danger');

    return helper.sendMessage(res, 200, 'You have successfully disabled an account ', 'success');
  });
};

export default {
  login,
  createUser,
  getAllUsers,
  resetpassword,
  changePassword,
  makeUserAnAdmin,
  disabledUserAcoount
};
