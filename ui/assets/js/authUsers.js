const token = localStorage.getItem('authorization');
if (!token) {
  window.location = '../index.html';
}

const decoded = jwt_decode(token);

const { host } = window.location;
let hostedServer = null;

if (host === 'localhost:4000') {
  hostedServer = 'http://localhost:4000/api/v1/';
} else {
  hostedServer = 'https://store-manager-iafolayan.herokuapp.com/api/v1/';
}
