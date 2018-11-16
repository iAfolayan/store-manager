/* eslint-disable no-undef */
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
// const trigger = document.querySelector('.trigger');
const checkoutTrigger = document.querySelector('.cartBtn');
const closeButton = document.querySelector('.close-button');
let deleteprodId = null;

const toggleDeleteModal = () => {
  modal.classList.toggle('show-modal');
};

const windowOnClick = (newevent) => {
  if (newevent.target === modal) {
    toggleModal();
  }
};

// trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleDeleteModal);
// window.addEventListener('click', windowOnClick);

/**
 * @classdesc deleteAction - Delete action
 * @param {*} prodId - Product Id
 * @returns {null} - No return
 */
function deleteAction(prodId) {
  deleteprodId = prodId;
  toggleDeleteModal();
}

/**
 *
 * @param {*} msg - Feedback message
 * @param {*} type - Message type success or error
 * @return {*} - Returns message
 */

// eslint-disable-next-line require-jsdoc
function userFeedbackMessage(msg, type) {
 
  const messageBox = document.querySelector('#messageBox');

  messageBox.textContent = msg;
  messageBox.classList.add(type);

  setTimeout(() => {
    messageBox.setAttribute('style', 'display: none;');
  }, 5000);
}

/**
 * @classdesc deleteproduct - Delete product
 * @param {*} shouldDelete - return a Boolean value
 * @returns {null} No returns
 */
function deleteproduct() {
  toggleDeleteModal();

  const url = `${hostedServer}products/${deleteprodId}`;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  })
    .then(data => data.json())
    .then((response) => {
      if (response.status !== true) return userFeedbackMessage(response.msg, 'error');
      productRow = document.querySelector(`#${deleteprodId}`);
      productList = document.querySelector('.prdDisplay_');
      productList.removeChild(productRow);
      userFeedbackMessage(response.msg, 'success');
    })
    .catch(error => userFeedbackMessage(error, 'error'));
}
/* General message function */


// Logout
/**
 * classDec - Logout - Remove user token from localstorage
 * @returns {null} - 
 */
function logout() {
  localStorage.removeItem('authorization');
  window.location = '/';
}
