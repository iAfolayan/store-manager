function slideMobileMenu() {
  document.querySelector('#menuDrop').classList.toggle('showMenu');
};

// window.onclick = (event) => {
//   if (!event.target.matches('.menuDropContent') && !event.target.matches('img')) {
//     if (document.querySelector('.menuDropContent').classList.contains('showMenu')) {
//       document.querySelector('.menuDropContent').classList.remove('showMenu');
//     }
//   }
// };

const mobileMenu = document.querySelector('.mobileMenu');

if (mobileMenu) mobileMenu.addEventListener('click', slideMobileMenu);

/* MODAL SCRIPT */
const modal = document.querySelector('.modal');
const checkoutTrigger = document.querySelector('.cartBtn');
const closeButton = document.querySelector('.close-button');
let deleteprodId = null;
let userId = null;

const toggleDeleteModal = () => {
  modal.classList.toggle('show-modal');
};

const windowOnClick = (newevent) => {
  if (newevent.target === modal) {
    toggleModal();
  }
};

if (closeButton) closeButton.addEventListener('click', toggleDeleteModal);

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
      if (response.status !== true) return sendActionMessage(response.msg, 'error');
      productRow = document.querySelector(`#${deleteprodId}`);
      productList = document.querySelector('.prdDisplay_');
      productList.removeChild(productRow);
      sendActionMessage(response.msg, 'success');
    })
    .catch(error => sendActionMessage(error, 'error'));
}

/**
 * @classDec - Logout - Remove user token from localstorage
 * @returns {null} -
 */
function logout() {
  localStorage.removeItem('authorization');
  window.location = '/';
}

/**
 * @function getSingleProductDetail
 * @classdesc getSingleProductDetail - return a product detail
 * @param {*} productid - product Id
 * @returns {null} - Return data information
 */
function getSingleProductDetail(productid) {
  const url = `${hostedServer}products/${productid.substring(1)}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  })
    .then(data => data.json())
    .then((response) => {
      if (response.status !== true) return userFeeddbackMessage(response.msg, 'danger');

      const product = response.data;
      const {
        productname, price, quantity, description, minimumallowed, createdon
      } = product;

      document.querySelector('#prdName').value = productname;
      document.querySelector('#prdPrice').value = price;
      document.querySelector('#prdQuantity').value = quantity;
      document.querySelector('#prdDescription').value = description;
      document.querySelector('#prdMinimum').value = minimumallowed;
      document.querySelector('#createdon').value = createdon;
    })
    .catch(error => sendActionMessage(error, 'danger'));
}

/**
 * @method - getCategories return all available vategory
 * @returns Categories
 */

/**
 * @method makeUserAnAdmin
 */
function makeUserAnAdmin(id) {
  userId = id;
  const url = `${hostedServer}auth/users/${userId}`;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  })
    .then(data => data.json())
    .then((response) => {
      if (response.status !== true) return sendActionMessage(response.msg, 'danger');

      window.location = 'viewusers.html';
      return sendActionMessage(response.msg, 'success');
    })
    .catch(error => sendActionMessage(error, 'danger'));
};

/**
 * @method disableAction - Disable action
 * @param {*} usrId - User Id
 * @returns {null} - No return
 */
function disableAction(usrId) {
  userId = usrId;
  toggleDeleteModal();
}

/**
 * @method disabledAccount
 * @param {*} shouldDisable - return a Boolean value
 * @returns {null} No returns
 */
// function disabledAccount() {
//   toggleDeleteModal();

//   const url = `${hostedServer}auth/users/${userId}`;

//   fetch(url, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token
//     }
//   })
//     .then(data => data.json())
//     .then((response) => {
//       if (response.status !== true) return sendActionMessage(response.msg, 'danger');
//       userRow = document.querySelector(`#${userId}`);
//       userList = document.querySelector('.usersDisplay');
//       userList.removeChild(userRow);
//       sendActionMessage(response.msg, 'success');
//     })
//     .catch(error => sendActionMessage(error, 'danger'));
// }
