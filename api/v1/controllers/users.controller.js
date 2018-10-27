import jwt from 'jsonwebtoken';
import passwordGen from 'generate-password';
import multer from 'multer';
import client from '../db/index';
import helper from '../utils';

const upload = multer({ dest: './uploads/images/' });


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
  let passport = null;
  if (req.file) {
    passport = req.body.userImage;
  } else {
    passport = 'defaultimage.jpg';
  }
  const query = `INSERT INTO users(staffid, title, password, firstname, lastname, emailaddress, phonenumber, role, gender, passport, contactaddress) VALUES('${staffid}', '${title}', '${password}', '${firstname}', '${lastname}', '${emailaddress}', '${phonenumber}', ${role}, '${gender}', '${passport}', '${contactaddress}') RETURNING *`;

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

  // check if image is upload

  if (errors) {
    return helper.sendMessage(res, 401, errors[0].msg);
  }
  client.query(query, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    return helper.sendMessage(res, 201, 'New user successfully created', data);
  });
};

export default {
  login, createUser
};
