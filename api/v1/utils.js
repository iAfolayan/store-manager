export default {
  /**
   * @description - Send message to user
   * @param {*} response - response object
   * @param {*} code - Status code
   * @param {*} message - msg
   * @param {*} data - data
   * @returns {data} - returns data
   */
  sendMessage(response, code, message, data, msgClass) {
    const responseObj = {
      status: code === 200 || code === 201,
      msg: message,
    };
    if (data) {
      responseObj.data = data;
    }
    return response.status(code).json(responseObj);
  }
};
