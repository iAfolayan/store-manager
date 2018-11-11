/* eslint-disable no-undef */
// const url = 'http://localhost:4000/api/v1/auth/login';

const url = 'https://store-manager-iafolayan.herokuapp.com/api/v1/auth/login';

// eslint-disable-next-line no-undef
const loginForm = document.getElementById('loginForm');

// eslint-disable-next-line no-undef
const login = (event) => {
  event.preventDefault();

  const data = {
    staffId: loginForm.staffId.value,
    password: loginForm.password.value
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status !== true) {
        return userFeedbackMessage(response.msg, 'error');
      }

      localStorage.setItem('authorization', response.data);
      const decoded = jwt_decode(response.data);

      window.location = decoded.role === 1 ? 'attendant/admin.html' : 'attendant/index.html';
      return userFeedbackMessage(response.msg, 'success');
    })
    .catch(error => userFeedbackMessage(error, 'error'));
};
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', login);
