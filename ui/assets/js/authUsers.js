/* eslint-disable no-undef */
// Check if token exist

const token = localStorage.getItem('authorization');
const logger = document.getElementById('logger');
if (!token) {
  window.location = '../index.html';
}

const decoded = jwt_decode(token);
console.log(decoded);
logger.textContent = decoded;
