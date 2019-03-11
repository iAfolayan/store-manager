/**
 * 
 * declarations
 * 
 */
const mobileMenu = document.querySelector('.mobileMenu');
const closeButton = document.querySelector('.close-button');
let deleteprodId = null;
let userId = null;

/**
 * 
 * functions
 * 
 */
function slideMobileMenu() {
  document.querySelector('#menuDrop').classList.toggle('showMenu');
}

function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('show-modal');
}

/**
 * 
 * bindings
 * 
 */
mobileMenu.addEventListener('click', slideMobileMenu);
// closeButton.addEventListener('click', toggleModal);