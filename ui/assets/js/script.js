/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
// eslint-disable-next-line func-names
(function () {
  document.getElementById('logo').addEventListener('click', () => {
    location.href = '../index.html';
  });
}());


const slideMobileMenu = () => {
  document.querySelector('#menuDrop').classList.toggle('showMenu');
};

window.onclick = (event) => {
  if (!event.target.matches('.menuDropContent') && !event.target.matches('img')) {
    if (document.querySelector('.menuDropContent').classList.contains('showMenu')) {
      document.querySelector('.menuDropContent').classList.remove('showMenu');
    }
  }
};

document.querySelector('.mobileMenu').addEventListener('click', slideMobileMenu);

/* MODAL SCRIPT */
const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger');
const checkoutTrigger = document.querySelector('.cartBtn');
const closeButton = document.querySelector('.close-button');

const toggleModal = () => {
  modal.classList.toggle('show-modal');
};

const windowOnClick = (newevent) => {
  if (newevent.target === modal) {
    toggleModal();
  }
};


trigger.addEventListener('click', toggleModal);
// heckoutTrigger.addEventListener("click", toggleModal2);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

/* General message function */
/**
 *
 * @param {*} msg - Feedback message
 * @param {*} type - Message type success or error
 * @return {*} - Returns message
 */

// eslint-disable-next-line require-jsdoc
function userFeedbackMessage(msg, type) {
  const body = document.querySelector('body');

  const message = document.querySelector('.message');

  message.textContent = msg;

  switch (type) {
  case 'success':
    message.classList.add('success');
    break;
  case 'error':
    message.classList.add('danger');
    break;
  default:
    message.classList.add('message');
    break;
  }

  setTimeout(() => {
    body.querySelector('.message').setAttribute('style', 'display: none;');
  }, 5000);
}

// Logout
function logout() {
  localStorage.removeItem('authorization');
  window.location = '/';
}
