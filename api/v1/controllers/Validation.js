/**
 * @classdesc Validate user input
 */
class Validation {
  /**
  *
  * @param {*} value Accept input from user
  * @return {null} - No returns
  */
  static checkParamValid(value) {
    return (req, res, next) => {
      if (req.params[value].match(/^[0-9]+$/)) {
        res.status(400).send({ msg: 'Invalid Parameter: enter a valid Parameter!' });
      } else { next(); }
    };
  }
}

export default Validation;
