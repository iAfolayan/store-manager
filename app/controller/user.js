import UsersData from '../data/users';

/**
 * @class UsersCtrl
 * @classdesc manages Users
 */
class UsersCtrl {
  /**
   * @description Create a new user either as an Admin or a sale attendant
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {null} - no returns
   */
  static createUser(req, res) {
    const {
      title, staffId, firstname, lastname, emailAdress, phoneNumber, role, gender, passport, contactAddress
    } = req.body;
    const newUser = {
      title, staffId, firstname, lastname, emailAdress, phoneNumber, role, gender, passport, contactAddress
    };
    UsersData.push(newUser);
    res.status(201).json({
      msg: 'New user successfully created',
      data: newUser
    });
  }

  /**
   * @description - Accept two field to login a user
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {null} - no return
   */
  static userLogin(req, res) {
    const { staffId, password } = req.body;
    const user = UsersData.find(usr => usr.staffId === staffId && usr.password === password);
    if (user) {
      return res.status(200).redirect('/attendant/admin.html');
    }
    res.status(404).json({
      msg: 'Invalid login details'
    });
  }

  /**
   * @description - Reset user password
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {null} - no returns
   */
  static resetUserPass(req, res) {

  }

  /**
   * @description - get all users
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {null} - No returns
   */
  static getAllUsers(req, res) {

  }
}

export default UsersCtrl;
