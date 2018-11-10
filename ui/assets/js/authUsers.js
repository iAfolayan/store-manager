/* eslint-disable no-undef */
// Check if token exist

const token = localStorage.getItem('authorization');

if (!token) {
  window.location = '../index.html';
}

try {
  const decoded = jwt_decode(token);
  if (decoded.role === 2) window.location = 'index.html';
} catch (err) {
  window.location = '../index.html';
}
