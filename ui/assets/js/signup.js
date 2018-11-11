/* eslint-disable no-undef */
const url = 'https://store-manager-iafolayan.herokuapp.com/api/v1/auth/signup';

const signupForm = document.getElementById('signupForm');

const createUser = (event) => {
  event.preventDefault();

  const formData = {
    staffId: signupForm.staffId.value,
    title: signupForm.title.value,
    password: signupForm.password.value,
    firstname: signupForm.firstname.value,
    lastname: signupForm.lastname.value,
    emailaddress: signupForm.emailaddress.value,
    phonenumber: signupForm.phoneNumber.value,
    role: signupForm.role.value,
    gender: signupForm.gender.value,
    avatar: signupForm.profileImage.value,
    contactaddress: signupForm.address.value
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status !== true) {
        return userFeedbackMessage(response.msg, 'error');
      }

      window.location = 'createsaleattendant.html';
      return userFeedbackMessage(response.msg, 'success');
    });
};

const newUser = document.getElementById('newUser');

newUser.addEventListener('click', createUser);
