import jwt from 'jsonwebtoken';
import passwordGen from 'generate-password';
import bcrypt from 'bcrypt';
import client from '../db/index';
import helper from '../utils';

const login = (req, res) => {
  const { staffid, password } = req.body;
console.log(req.body);
  // Form validation
  req.checkBody('staffid', 'StaffId field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();

  // check Errors
  const errors = req.validationErrors();
  if (errors) {
    return helper.sendMessage(res, 400, errors[0].msg);
  }

  client.query(`SELECT * FROM users WHERE staffid = '${staffid}'`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 401, 'Invalid login credentials');

    // Compare password
    bcrypt.compare(password, data.rows[0].password, (err, respass) => {
      if (!respass) return helper.sendMessage(res, 401, 'Invalid login credentials');
      const token = jwt.sign({
        id: data.rows[0].id,
        role: data.rows[0].role
      }, process.env.SECRET, {
        expiresIn: '1d'
      });
      helper.sendMessage(res, 200, 'Login successful', token);
    });
  });
};

const getAllUsers = (req, res) => {
  client.query('SELECT * FROM users', (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'No user found');
    return helper.sendMessage(res, 200, 'Record retrieved successfully', data.rows);
  });
};

const createUser = (req, res) => {
  const {
    staffid,
    title,
    firstname,
    lastname,
    emailaddress,
    phonenumber,
    role,
    gender,
    contactaddress
  } = req.body;

  const password = passwordGen.generate({
    length: 10,
    numbers: true,
    excludeSimilarCharacters: true,
    symbols: true
  });

  // Validate user pofile image
  let avatar = null;
  if (req.file) {
    avatar = req.body.filename;
  } else {
    avatar = 'defaultimage.jpg';
  }

  // Form validation
  req.checkBody('staffid', 'StaffId field is required').notEmpty();
  req.checkBody('firstname', 'Firstname field is required').notEmpty();
  req.checkBody('lastname', 'Lastname field is required').notEmpty();
  req.checkBody('emailaddress', 'Email address field is required').notEmpty();
  req.checkBody('emailaddress', 'Invalid Email Address').isEmail();
  req.checkBody('phonenumber', 'Phone Number field is required').notEmpty();
  req.checkBody('phonenumber', 'Incomplete Phone Number must be minimum of 11 characters').isLength({ min: 11 });
  req.checkBody('role', 'Select type of User').notEmpty('');
  req.checkBody('gender', 'Select gender').notEmpty();
  req.checkBody('contactaddress', 'User contat address field is required').notEmpty();

  // check Errors
  const errors = req.validationErrors();

  if (errors) {
    return helper.sendMessage(res, 404, errors[0].msg);
  }
  client.query(`SELECT * FROM users WHERE staffid = '${staffid}'`, (err, data) => {
    if (data.rowCount === 1) return helper.sendMessage(res, 409, 'Duplicate staff id found');
  });
  // password
  bcrypt.hash(password, 10, (errr, hash) => {
    const query = `INSERT INTO users(staffid, title, password, firstname, lastname, emailaddress, phonenumber, role, gender, avatar, contactaddress) VALUES('${staffid}', '${title}', '${hash}', '${firstname}', '${lastname}', '${emailaddress}', '${phonenumber}', ${role}, '${gender}', '${avatar}', '${contactaddress}') RETURNING *`;
    client.query(query, (err, data) => {
      if (err) {
        return helper.sendMessage(res, 500, 'Internal server error');
      }
      return helper.sendMessage(res, 201, 'New user successfully created', data);
    });
  });
};

const resetpassword = (req, res) => {
  res.status(400).json({
    msg: 'Email is required',
  });
};

export default {
  login, createUser, getAllUsers, resetpassword
};
