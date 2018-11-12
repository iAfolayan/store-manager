/* eslint-disable no-undef */
// Check if token exist

const token = localStorage.getItem('authorization');
if (!token) {
  window.location = '../index.html';
}

const decoded = jwt_decode(token);

if (decoded.role !== 1) window.location = 'index.html';
